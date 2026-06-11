import checkUniqueIds from '@/mocks/scenarios/checkUniqueIds';
import { events } from '../db/events';
import { MockScenario } from './types';

const getDatePart = (value: string): string => value.slice(0, 10);

const isValidDate = (value: string): boolean =>
  !Number.isNaN(Date.parse(value));

const getDurationMinutes = (startTime: string, endTime: string): number => {
  const startMs = new Date(startTime).getTime();
  const endMs = new Date(endTime).getTime();

  return (endMs - startMs) / 1000 / 60;
};

export const assertIntegrity = (data: MockScenario) => {
  const errors: string[] = [];

  const eventsById = new Map(events.map((event) => [event.id, event]));
  const usersById = new Map(data.users.map((user) => [user.id, user]));
  const speakersById = new Map(
    data.speakers.map((speaker) => [speaker.id, speaker]),
  );
  const proposalsById = new Map(
    data.proposals.map((proposal) => [proposal.id, proposal]),
  );
  const tracksById = new Map(data.tracks.map((track) => [track.id, track]));
  const scheduleSlotsById = new Map(
    data.schedule.slots.map((slot) => [slot.id, slot]),
  );
  const scheduleDayKeys = new Set(
    data.schedule.days.map((day) => `${day.eventId}:${day.date}`),
  );

  // Проверки на дублирующиеся id
  checkUniqueIds(data.users, 'users', errors);
  checkUniqueIds(data.speakers, 'speakers', errors);
  checkUniqueIds(data.proposals, 'proposals', errors);
  checkUniqueIds(data.reviews, 'reviews', errors);
  checkUniqueIds(data.reviewers, 'reviewers', errors);
  checkUniqueIds(data.comments, 'comments', errors);
  checkUniqueIds(data.history, 'history', errors);
  checkUniqueIds(data.scheduleHistory, 'scheduleHistory', errors);
  checkUniqueIds(data.audit, 'audit', errors);
  checkUniqueIds(data.tracks, 'tracks', errors);
  checkUniqueIds(data.schedule.slots, 'schedule.slots', errors);

  // Events -> tracks
  for (const event of events) {
    if (!isValidDate(event.startTime)) {
      errors.push(`Событие ${event.id} имеет невалидный startTime`);
    }

    if (!isValidDate(event.createdAt)) {
      errors.push(`Событие ${event.id} имеет невалидный createdAt`);
    }

    for (const trackId of event.trackIds) {
      if (!tracksById.has(trackId)) {
        errors.push(
          `Событие ${event.id} ссылается на несуществующий трек ${trackId}`,
        );
      }
    }
  }

  // Users -> events / speakers
  for (const user of data.users) {
    for (const eventId of user.eventIds) {
      if (!eventsById.has(eventId)) {
        errors.push(
          `Пользователь ${user.id} ссылается на несуществующее событие ${eventId}`,
        );
      }
    }

    if (!user.speakerId) continue;

    if (!speakersById.has(user.speakerId)) {
      errors.push(
        `Профиль юзера ${user.id} ссылается на несуществующего спикера ${user.speakerId}`,
      );
    }

    if (user.role !== 'speaker') {
      errors.push(
        `У пользователя ${user.id} указан speakerId, но его роль ${user.role}, а не speaker`,
      );
    }
  }

  // Proposals -> events / tracks / speakers
  for (const proposal of data.proposals) {
    const event = eventsById.get(proposal.eventId);

    if (!event) {
      errors.push(
        `Заявка ${proposal.id} ссылается на несуществующее событие ${proposal.eventId}`,
      );
    }

    if (!speakersById.has(proposal.ownerId)) {
      errors.push(
        `Заявка ${proposal.id} ссылается на несуществующего owner-спикера ${proposal.ownerId}`,
      );
    }

    for (const speakerId of proposal.speakerIds) {
      if (!speakersById.has(speakerId)) {
        errors.push(
          `Заявка ${proposal.id} ссылается на несуществующего спикера ${speakerId}`,
        );
      }
    }

    if (!tracksById.has(proposal.trackId)) {
      errors.push(
        `Заявка ${proposal.id} ссылается на несуществующий трек ${proposal.trackId}`,
      );
    }

    if (event && !event.trackIds.includes(proposal.trackId)) {
      errors.push(
        `Заявка ${proposal.id} относится к событию ${proposal.eventId}, но её трек ${proposal.trackId} не входит в trackIds события`,
      );
    }

    if (!isValidDate(proposal.createdAt)) {
      errors.push(`Заявка ${proposal.id} имеет невалидный createdAt`);
    }

    if (!isValidDate(proposal.updatedAt)) {
      errors.push(`Заявка ${proposal.id} имеет невалидный updatedAt`);
    }
  }

  // Reviewers -> users / proposals / events
  for (const reviewer of data.reviewers) {
    const reviewerUser = usersById.get(reviewer.id);

    if (!reviewerUser) {
      errors.push(`Reviewer ${reviewer.id} не найден среди пользователей`);
    } else if (reviewerUser.role !== 'reviewer') {
      errors.push(
        `Reviewer ${reviewer.id} связан с пользователем роли ${reviewerUser.role}, а не reviewer`,
      );
    }

    for (const proposalId of reviewer.proposalIds) {
      const proposal = proposalsById.get(proposalId);

      if (!proposal) {
        errors.push(
          `Reviewer ${reviewer.id} ссылается на несуществующую заявку ${proposalId}`,
        );
        continue;
      }

      if (reviewerUser && !reviewerUser.eventIds.includes(proposal.eventId)) {
        errors.push(
          `Reviewer ${reviewer.id} назначен на заявку ${proposal.id} из event ${proposal.eventId}, но не имеет доступа к этому событию`,
        );
      }
    }
  }

  // Reviews -> proposals / reviewers / events
  for (const review of data.reviews) {
    const proposal = proposalsById.get(review.proposalId);
    const reviewer = usersById.get(review.reviewerId);

    if (!proposal) {
      errors.push(
        `Ревью ${review.id} ссылается на несуществующую заявку ${review.proposalId}`,
      );
    }

    if (!reviewer) {
      errors.push(
        `Автором ревью ${review.id} указан несуществующий пользователь ${review.reviewerId}`,
      );
    } else if (reviewer.role !== 'reviewer') {
      errors.push(
        `Юзер ${review.reviewerId} указан как ревьюер, хотя имеет роль ${reviewer.role}`,
      );
    }

    if (proposal && reviewer && !reviewer.eventIds.includes(proposal.eventId)) {
      errors.push(
        `Ревью ${review.id} написано пользователем ${reviewer.id}, у которого нет доступа к event ${proposal.eventId} заявки ${proposal.id}`,
      );
    }
  }

  // Comments -> proposals / users / events
  for (const comment of data.comments) {
    const proposal = proposalsById.get(comment.proposalId);
    const actor = usersById.get(comment.actorId);

    if (!proposal) {
      errors.push(
        `Комментарий ${comment.id} ссылается на несуществующую заявку ${comment.proposalId}`,
      );
    }

    if (!actor) {
      errors.push(
        `Автором комментария ${comment.id} указан несуществующий пользователь ${comment.actorId}`,
      );
    } else if (actor.role !== comment.actorRole) {
      errors.push(
        `У автора комментария ${comment.id} не совпадают фактическая и указанная роли`,
      );
    }

    if (proposal && actor && !actor.eventIds.includes(proposal.eventId)) {
      errors.push(
        `Комментарий ${comment.id} оставлен пользователем ${actor.id}, у которого нет доступа к event ${proposal.eventId} заявки ${proposal.id}`,
      );
    }
  }

  // Proposal history -> proposals / events / users
  for (const historyItem of data.history) {
    const proposal = proposalsById.get(historyItem.proposalId);

    if (!eventsById.has(historyItem.eventId)) {
      errors.push(
        `История ${historyItem.id} ссылается на несуществующее событие ${historyItem.eventId}`,
      );
    }

    if (!proposal) {
      errors.push(
        `История ${historyItem.id} ссылается на несуществующую заявку ${historyItem.proposalId}`,
      );
    } else if (proposal.eventId !== historyItem.eventId) {
      errors.push(
        `История ${historyItem.id} относится к event ${historyItem.eventId}, но заявка ${proposal.id} относится к event ${proposal.eventId}`,
      );
    }

    const actor = usersById.get(historyItem.actorId);

    if (!actor) {
      errors.push(
        `Автором истории ${historyItem.id} указан несуществующий пользователь ${historyItem.actorId}`,
      );
    } else if (!actor.eventIds.includes(historyItem.eventId)) {
      errors.push(
        `Автор истории ${historyItem.id} не имеет доступа к event ${historyItem.eventId}`,
      );
    }

    if (!isValidDate(historyItem.createdAt)) {
      errors.push(`История ${historyItem.id} имеет невалидный createdAt`);
    }
  }

  // Schedule days / times
  for (const day of data.schedule.days) {
    if (!eventsById.has(day.eventId)) {
      errors.push(
        `День расписания ${day.date} ссылается на несуществующее событие ${day.eventId}`,
      );
    }

    if (!isValidDate(day.date)) {
      errors.push(`День расписания ${day.date} имеет невалидную дату`);
    }
  }

  for (const time of data.schedule.times) {
    if (!eventsById.has(time.eventId)) {
      errors.push(
        `Временная отметка расписания ${time.time} ссылается на несуществующее событие ${time.eventId}`,
      );
    }

    if (!isValidDate(time.time)) {
      errors.push(
        `Временная отметка расписания ${time.time} имеет невалидную дату`,
      );
      continue;
    }

    const dayKey = `${time.eventId}:${getDatePart(time.time)}`;

    if (!scheduleDayKeys.has(dayKey)) {
      errors.push(
        `Временная отметка ${time.time} относится к event ${time.eventId}, но для этого дня нет schedule.days`,
      );
    }
  }

  // Schedule slots -> events / tracks / days / proposals
  for (const slot of data.schedule.slots) {
    const event = eventsById.get(slot.eventId);

    if (!event) {
      errors.push(
        `Слот расписания ${slot.id} ссылается на несуществующее событие ${slot.eventId}`,
      );
    }

    if (!tracksById.has(slot.trackId)) {
      errors.push(
        `Слот расписания ${slot.id} ссылается на несуществующий трек ${slot.trackId}`,
      );
    }

    if (event && !event.trackIds.includes(slot.trackId)) {
      errors.push(
        `Слот расписания ${slot.id} относится к event ${slot.eventId}, но его трек ${slot.trackId} не входит в trackIds события`,
      );
    }

    const dayKey = `${slot.eventId}:${slot.date}`;

    if (!scheduleDayKeys.has(dayKey)) {
      errors.push(
        `Слот расписания ${slot.id} относится к дню ${slot.date} event ${slot.eventId}, но такого schedule.days нет`,
      );
    }

    if (!isValidDate(slot.startTime) || !isValidDate(slot.endTime)) {
      errors.push(
        `Слот расписания ${slot.id} имеет невалидные startTime/endTime`,
      );
      continue;
    }

    if (getDatePart(slot.startTime) !== slot.date) {
      errors.push(
        `У слота ${slot.id} date=${slot.date}, но startTime относится к ${getDatePart(slot.startTime)}`,
      );
    }

    if (getDatePart(slot.endTime) !== slot.date) {
      errors.push(
        `У слота ${slot.id} date=${slot.date}, но endTime относится к ${getDatePart(slot.endTime)}`,
      );
    }

    const slotDuration = getDurationMinutes(slot.startTime, slot.endTime);

    if (slotDuration <= 0) {
      errors.push(
        `У слота ${slot.id} некорректный временной диапазон: ${slot.startTime} → ${slot.endTime}`,
      );
    }

    if (!slot.proposalId) continue;

    const proposal = proposalsById.get(slot.proposalId);

    if (!proposal) {
      errors.push(
        `Слот расписания ${slot.id} ссылается на несуществующую заявку ${slot.proposalId}`,
      );
      continue;
    }

    if (proposal.eventId !== slot.eventId) {
      errors.push(
        `Слот ${slot.id} находится в event ${slot.eventId}, но заявка ${proposal.id} относится к event ${proposal.eventId}`,
      );
    }

    if (proposal.trackId !== slot.trackId) {
      errors.push(
        `Слот ${slot.id} находится в треке ${slot.trackId}, но заявка ${proposal.id} относится к треку ${proposal.trackId}`,
      );
    }

    if (proposal.status !== 'scheduled') {
      errors.push(
        `Слот ${slot.id} содержит заявку ${proposal.id} со статусом ${proposal.status}, хотя заявка в расписании должна быть scheduled`,
      );
    }

    if (proposal.duration !== slotDuration) {
      errors.push(
        `Слот ${slot.id} имеет длительность ${slotDuration} минут, но заявка ${proposal.id} имеет duration=${proposal.duration}`,
      );
    }
  }

  // Schedule history -> slots / events / users
  for (const scheduleHistoryItem of data.scheduleHistory) {
    if (!eventsById.has(scheduleHistoryItem.eventId)) {
      errors.push(
        `История расписания ${scheduleHistoryItem.id} ссылается на несуществующее событие ${scheduleHistoryItem.eventId}`,
      );
    }

    const actor = usersById.get(scheduleHistoryItem.actorId);

    if (!actor) {
      errors.push(
        `Автором истории расписания ${scheduleHistoryItem.id} указан несуществующий пользователь ${scheduleHistoryItem.actorId}`,
      );
    } else if (!actor.eventIds.includes(scheduleHistoryItem.eventId)) {
      errors.push(
        `Автор истории расписания ${scheduleHistoryItem.id} не имеет доступа к event ${scheduleHistoryItem.eventId}`,
      );
    }

    const slot = scheduleSlotsById.get(scheduleHistoryItem.slotId);

    if (scheduleHistoryItem.action === 'scheduled' && !slot) {
      errors.push(
        `История расписания ${scheduleHistoryItem.id} ссылается на несуществующий слот ${scheduleHistoryItem.slotId}`,
      );
    }

    if (slot && slot.eventId !== scheduleHistoryItem.eventId) {
      errors.push(
        `История расписания ${scheduleHistoryItem.id} относится к event ${scheduleHistoryItem.eventId}, но слот ${slot.id} относится к event ${slot.eventId}`,
      );
    }

    if (!isValidDate(scheduleHistoryItem.createdAt)) {
      errors.push(
        `История расписания ${scheduleHistoryItem.id} имеет невалидный createdAt`,
      );
    }
  }

  // Audit -> events / users / entities
  for (const auditItem of data.audit) {
    if (!eventsById.has(auditItem.eventId)) {
      errors.push(
        `Audit ${auditItem.id} ссылается на несуществующее событие ${auditItem.eventId}`,
      );
    }

    const actor = usersById.get(auditItem.actorId);

    if (!actor) {
      errors.push(
        `Audit ${auditItem.id} содержит несуществующего actorId ${auditItem.actorId}`,
      );
    } else if (!actor.eventIds.includes(auditItem.eventId)) {
      errors.push(
        `Actor ${auditItem.actorId} в audit ${auditItem.id} не имеет доступа к event ${auditItem.eventId}`,
      );
    }

    if (auditItem.entityType === 'proposal') {
      const proposal = proposalsById.get(auditItem.entityId);

      if (!proposal) {
        errors.push(
          `Audit ${auditItem.id} ссылается на несуществующую заявку ${auditItem.entityId}`,
        );
      } else if (proposal.eventId !== auditItem.eventId) {
        errors.push(
          `Audit ${auditItem.id} относится к event ${auditItem.eventId}, но заявка ${proposal.id} относится к event ${proposal.eventId}`,
        );
      }
    }

    if (auditItem.entityType === 'scheduleSlot') {
      const slot = scheduleSlotsById.get(auditItem.entityId);

      if (slot && slot.eventId !== auditItem.eventId) {
        errors.push(
          `Audit ${auditItem.id} относится к event ${auditItem.eventId}, но слот ${slot.id} относится к event ${slot.eventId}`,
        );
      }
    }

    if (!isValidDate(auditItem.createdAt)) {
      errors.push(`Audit ${auditItem.id} имеет невалидный createdAt`);
    }
  }

  if (errors.length > 0) {
    throw new Error(
      ['Проверка mock сценария нашла ошибки:', ...errors].join('\n'),
    );
  }
};
