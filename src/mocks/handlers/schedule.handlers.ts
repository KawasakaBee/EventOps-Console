import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import {
  forbiddenError,
  proposalError,
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
import { appendProposalHistory } from '../db/history';

export const scheduleHandlers = [
  http.get('/api/schedule', ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const queryParams = parseScheduleQuery(request.url, schedule);
    let result = schedule;

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

    const history = appendProposalHistory(
      proposal.id,
      userId,
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

    const proposal = proposals.find(
      (proposal) => proposal.id === slot.proposalId,
    );

    if (!proposal) return proposalError();

    if (proposal.status !== 'scheduled') return forbiddenError();

    const usassignResult = unassignScheduleSlot(slot.id);
    if (usassignResult === null) return unassignError();

    const history = appendProposalHistory(
      proposal.id,
      userId,
      { status: 'accepted' },
      'status_changed',
    );
    if (!history) return proposalError();

    const updatedProposal = updateProposalStatus(proposal.id, 'accepted');
    if (!updatedProposal) return proposalError();

    const response: PatchScheduleUnassignResponse = usassignResult;

    return HttpResponse.json(response);
  }),
];
