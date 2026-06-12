import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import {
  forbiddenError,
  proposalError,
  queryError,
  scheduleAssignError,
  slotError,
  unassignError,
  unauthorizedError,
  validationError,
} from '../utils/httpErrors';
import {
  GetScheduleResponse,
  PatchScheduleAssignResponse,
  PatchScheduleUnassignResponse,
} from '@/entities/schedule/api/contracts';
import {
  assignScheduleSlot,
  schedule,
  unassignScheduleSlot,
} from '../db/schedule';
import { isManagerLike } from '../utils/proposalAccess';
import { parseScheduleQuery } from '@/entities/schedule/lib/parseScheduleQuery';
import { applyScheduleFilters } from '../utils/scheduleFilters';
import scheduleSlotToResponseSlot from '../utils/scheduleSlotToResponseSlot';
import {
  scheduleSchema,
  unassignScheduleSchema,
} from '@/entities/schedule/api/schema';
import zodErrorParse from '../utils/zodErrorParse';
import { isValidScheduleAssignment } from '../utils/isValidScheduleAssignment';
import scheduleAssignErrorParse from '../utils/scheduleAssignErrorParse';
import { proposals, updateProposalStatus } from '../db/proposals';
import { appendProposalHistory, createScheduleHistory } from '../db/history';
import { isId } from '@/shared/utils/typeGuards';
import { Schedule } from '@/entities/schedule/model/types';

export const scheduleHandlers = [
  http.get('/api/schedule/:id', ({ request, cookies, params }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const id = params.id;
    if (!isId(id)) return queryError();

    if (!user.eventIds.includes(id)) return forbiddenError();

    let result: Schedule = {
      days: schedule.days.filter((day) => day.eventId === id),
      times: schedule.times.filter((time) => time.eventId === id),
      slots: schedule.slots.filter((slot) => slot.eventId === id),
    };

    const queryParams = parseScheduleQuery(request.url, result);

    result = applyScheduleFilters(queryParams, result);
    const slots = scheduleSlotToResponseSlot(result.slots);

    const response: GetScheduleResponse = { ...result, slots };

    return HttpResponse.json(response);
  }),
  http.patch('/api/schedule/assign', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const rawBody = await request.json();

    const parsedBody = scheduleSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const body = parsedBody.data;

    if (!user.eventIds.includes(body.eventId)) return forbiddenError();

    const assignmentValidation = isValidScheduleAssignment(body);

    if (assignmentValidation !== true) {
      const errorBody = scheduleAssignErrorParse(assignmentValidation);
      return scheduleAssignError(errorBody);
    }

    const proposal = proposals.find(
      (proposal) => proposal.id === body.proposalId,
    );

    if (!proposal) return proposalError();

    const [slot] = scheduleSlotToResponseSlot([assignScheduleSlot(body)]);

    createScheduleHistory(slot.slot.id, userId, slot.slot.eventId, 'scheduled');

    const history = appendProposalHistory(
      proposal.id,
      userId,
      proposal.eventId,
      { status: 'scheduled' },
      'status_changed',
    );
    if (!history) return proposalError();

    const updatedProposal = updateProposalStatus(body.proposalId, 'scheduled');
    if (!updatedProposal) return proposalError();

    const response: PatchScheduleAssignResponse = { slot };

    return HttpResponse.json(response);
  }),
  http.patch('/api/schedule/unassign', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const rawBody = await request.json();

    const parsedBody = unassignScheduleSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const { slotId } = parsedBody.data;

    const slot = schedule.slots.find((item) => item.id === slotId);
    if (!slot) return slotError();

    if (!user.eventIds.includes(slot.eventId)) return forbiddenError();

    const proposal = proposals.find(
      (proposal) => proposal.id === slot.proposalId,
    );

    if (!proposal) return proposalError();

    if (proposal.status !== 'scheduled') return forbiddenError();

    const unassignResult = unassignScheduleSlot(slot.id);
    if (unassignResult === null) return unassignError();

    createScheduleHistory(slot.id, userId, slot.eventId, 'unscheduled');

    const history = appendProposalHistory(
      proposal.id,
      userId,
      proposal.eventId,
      { status: 'accepted' },
      'status_changed',
    );
    if (!history) return proposalError();

    const updatedProposal = updateProposalStatus(proposal.id, 'accepted');
    if (!updatedProposal) return proposalError();

    const response: PatchScheduleUnassignResponse = unassignResult;

    return HttpResponse.json(response);
  }),
];
