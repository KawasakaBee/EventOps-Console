import checkUniqueIds from '@/shared/utils/checkUniqueIds';
import { MockScenario } from './types';

export const assertIntegrity = (data: MockScenario) => {
  const errors: string[] = [];

  const usersById = new Map(data.users.map((user) => [user.id, user]));
  const speakersById = new Map(
    data.speakers.map((speaker) => [speaker.id, speaker]),
  );
  const proposalsById = new Map(
    data.proposals.map((proposal) => [proposal.id, proposal]),
  );
  const tracksById = new Map(data.tracks.map((track) => [track.id, track]));

  // Проверки на дублирующиеся id
  checkUniqueIds(data.users, 'users', errors);
  checkUniqueIds(data.speakers, 'speakers', errors);
  checkUniqueIds(data.proposals, 'proposals', errors);
  checkUniqueIds(data.reviews, 'reviews', errors);
  checkUniqueIds(data.comments, 'comments', errors);
  checkUniqueIds(data.history, 'history', errors);
  checkUniqueIds(data.tracks, 'tracks', errors);

  //   Проверка на существование указанных в заявках спикеров в списке реальных спикеров
  for (const proposal of data.proposals) {
    for (const speakerId of proposal.speakerIds) {
      if (!speakersById.has(speakerId)) {
        errors.push(
          `Заявка ${proposal.id} ссылается на несуществующего спикера ${speakerId}`,
        );
      }
    }
  }

  for (const review of data.reviews) {
    //   Проверка на существование указанных в ревью заявок в списке реальных заявок
    if (!proposalsById.has(review.proposalId)) {
      errors.push(
        `Ревью ${review.id} ссылается на несуществующую заявку ${review.proposalId}`,
      );
    }

    // Проверка на существование указанных в ревью ревьюеров в списке реальных юзеров, а так же соответствие их ролей
    if (!usersById.has(review.reviewerId)) {
      errors.push(
        `Автором ревью ${review.id} указан несуществующий пользователь ${review.reviewerId}`,
      );
    } else {
      const reviewer = usersById.get(review.reviewerId);
      if (reviewer && reviewer.role !== 'reviewer') {
        errors.push(
          `Юзер ${review.reviewerId} указан как ревьюер, хотя имеет другую роль`,
        );
      }
    }
  }

  //   Проверка на существование указанных в комментариях авторов в списке реальных юзеров, а так же соответствие их ролей
  for (const comment of data.comments) {
    if (!usersById.has(comment.actorId)) {
      errors.push(
        `Автором комментария ${comment.id} указан несуществующий пользователь ${comment.actorId}`,
      );
    } else {
      const commentator = usersById.get(comment.actorId);
      if (commentator && commentator.role !== comment.actorRole) {
        errors.push(
          `У автора комментария ${comment.id} не совпадают фактическая и указанная роли`,
        );
      }
    }
  }

  for (const history of data.history) {
    // Проверка на существование указанных в истории заявок в списке реальных заявок
    if (!proposalsById.has(history.proposalId)) {
      errors.push(
        `История ${history.id} ссылается на несуществующую заявку ${history.proposalId}`,
      );
    }

    // Проверка на существование указанных в истории авторов в списке реальных юзеров
    if (!usersById.has(history.actorId)) {
      errors.push(
        `Автором истории ${history.id} указан несуществующий пользователь ${history.actorId}`,
      );
    }
  }

  for (const speaker of data.speakers) {
    if (!usersById.has(speaker.userId)) {
      //   Проверка на существование спикеров в списке реальных юзеров
      errors.push(
        `Профиль спикера ${speaker.id} ссылается на несуществующего юзера ${speaker.userId}`,
      );
    } else {
      //   Проверка на соответствие ролей
      const user = usersById.get(speaker.userId);
      if (user && user.role !== 'speaker') {
        errors.push(
          `Юзер ${speaker.id} указан как спикер, хотя имеет другую роль`,
        );
      }
    }
  }

  //   Проверка на существование треков, указанных в заявках в списке реальных треков
  for (const proposal of data.proposals) {
    if (!tracksById.has(proposal.trackId)) {
      errors.push(
        `УЗаявка ${proposal.id} ссылается на несуществующий трек ${proposal.trackId}`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      ['Проверка mock сценария нашла ошибки:', ...errors].join('\n'),
    );
  }
};
