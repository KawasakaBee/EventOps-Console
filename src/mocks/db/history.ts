import {
  HistoryAction,
  HistoryEntry,
  ProposalFieldChange,
} from '@/entities/history/model/types';
import { ID } from '@/shared/types/primitives.types';
import { proposals } from './proposals';
import { Proposal } from '@/entities/proposal/model/types';

export const initialHistory = [
  {
    id: "history-001",
    proposalId: "proposal-001",
    actorId: "4",
    action: "created",
    createdAt: "2026-01-29T22:00:00+03:00",
  },
  {
    id: "history-002",
    proposalId: "proposal-001",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-02-01T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-003",
    proposalId: "proposal-001",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-01T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-004",
    proposalId: "proposal-001",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-01T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-005",
    proposalId: "proposal-001",
    actorId: "2",
    action: "comment_added",
    createdAt: "2026-02-01T23:03:00+03:00",
    payload: {
      commentId: "comment-001",
    },
  },
  {
    id: "history-006",
    proposalId: "proposal-002",
    actorId: "4",
    action: "created",
    createdAt: "2026-02-14T04:00:00+03:00",
  },
  {
    id: "history-007",
    proposalId: "proposal-002",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-02-15T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-008",
    proposalId: "proposal-002",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-16T00:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-009",
    proposalId: "proposal-002",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-16T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-010",
    proposalId: "proposal-002",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-02-16T20:00:00+03:00",
    payload: {
      reviewId: "review-001",
      recommendation: "approve",
    },
  },
  {
    id: "history-011",
    proposalId: "proposal-002",
    actorId: "reviewer-009",
    action: "comment_added",
    createdAt: "2026-02-17T05:03:00+03:00",
    payload: {
      commentId: "comment-002",
    },
  },
  {
    id: "history-012",
    proposalId: "proposal-003",
    actorId: "4",
    action: "created",
    createdAt: "2026-04-20T09:00:00+03:00",
  },
  {
    id: "history-013",
    proposalId: "proposal-003",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-04-23T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-014",
    proposalId: "proposal-003",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-04-23T23:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-015",
    proposalId: "proposal-003",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-24T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-016",
    proposalId: "proposal-003",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-04-24T13:00:00+03:00",
    payload: {
      reviewId: "review-002",
      recommendation: "reject",
    },
  },
  {
    id: "history-017",
    proposalId: "proposal-003",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-24T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-018",
    proposalId: "proposal-004",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-01T16:00:00+03:00",
  },
  {
    id: "history-019",
    proposalId: "proposal-005",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-23T18:00:00+03:00",
  },
  {
    id: "history-020",
    proposalId: "proposal-005",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-03-25T19:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-021",
    proposalId: "proposal-005",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-26T00:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-022",
    proposalId: "proposal-005",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-26T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-023",
    proposalId: "proposal-005",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-03-26T13:00:00+03:00",
    payload: {
      reviewId: "review-003",
      recommendation: "approve",
    },
  },
  {
    id: "history-024",
    proposalId: "proposal-005",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-26T19:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-025",
    proposalId: "proposal-006",
    actorId: "speaker-user-012",
    action: "created",
    createdAt: "2026-02-26T23:00:00+03:00",
  },
  {
    id: "history-026",
    proposalId: "proposal-006",
    actorId: "speaker-user-012",
    action: "status_changed",
    createdAt: "2026-03-03T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-027",
    proposalId: "proposal-006",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-03T07:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-028",
    proposalId: "proposal-006",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-03T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-029",
    proposalId: "proposal-006",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-03T22:00:00+03:00",
    payload: {
      reviewId: "review-004",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-030",
    proposalId: "proposal-006",
    actorId: "manager-002",
    action: "comment_added",
    createdAt: "2026-03-04T00:03:00+03:00",
    payload: {
      commentId: "comment-003",
    },
  },
  {
    id: "history-031",
    proposalId: "proposal-006",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-04T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-032",
    proposalId: "proposal-007",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-04-15T07:00:00+03:00",
  },
  {
    id: "history-033",
    proposalId: "proposal-008",
    actorId: "speaker-user-002",
    action: "created",
    createdAt: "2026-02-06T19:00:00+03:00",
  },
  {
    id: "history-034",
    proposalId: "proposal-008",
    actorId: "speaker-user-002",
    action: "status_changed",
    createdAt: "2026-02-08T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-035",
    proposalId: "proposal-008",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-08T12:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-036",
    proposalId: "proposal-008",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-08T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-037",
    proposalId: "proposal-008",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-02-09T00:00:00+03:00",
    payload: {
      reviewId: "review-005",
      recommendation: "approve",
    },
  },
  {
    id: "history-038",
    proposalId: "proposal-008",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-09T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-039",
    proposalId: "proposal-009",
    actorId: "speaker-user-009",
    action: "created",
    createdAt: "2026-03-27T02:00:00+03:00",
  },
  {
    id: "history-040",
    proposalId: "proposal-009",
    actorId: "speaker-user-009",
    action: "status_changed",
    createdAt: "2026-03-29T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-041",
    proposalId: "proposal-009",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-29T14:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-042",
    proposalId: "proposal-010",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-03-06T03:00:00+03:00",
  },
  {
    id: "history-043",
    proposalId: "proposal-010",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-03-08T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-044",
    proposalId: "proposal-010",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-08T09:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-045",
    proposalId: "proposal-010",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-08T19:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-046",
    proposalId: "proposal-010",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-08T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-047",
    proposalId: "proposal-010",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-03-09T03:00:00+03:00",
    payload: {
      reviewId: "review-006",
      recommendation: "approve",
    },
  },
  {
    id: "history-048",
    proposalId: "proposal-010",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-03-09T15:00:00+03:00",
    payload: {
      reviewId: "review-007",
      recommendation: "approve",
    },
  },
  {
    id: "history-049",
    proposalId: "proposal-010",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-10T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-050",
    proposalId: "proposal-011",
    actorId: "speaker-user-011",
    action: "created",
    createdAt: "2026-04-05T16:00:00+03:00",
  },
  {
    id: "history-051",
    proposalId: "proposal-011",
    actorId: "speaker-user-011",
    action: "status_changed",
    createdAt: "2026-04-08T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-052",
    proposalId: "proposal-011",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-09T07:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-053",
    proposalId: "proposal-011",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-09T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-054",
    proposalId: "proposal-011",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-04-09T18:00:00+03:00",
    payload: {
      reviewId: "review-008",
      recommendation: "approve",
    },
  },
  {
    id: "history-055",
    proposalId: "proposal-011",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-10T00:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-056",
    proposalId: "proposal-012",
    actorId: "speaker-user-012",
    action: "created",
    createdAt: "2026-02-09T23:00:00+03:00",
  },
  {
    id: "history-057",
    proposalId: "proposal-012",
    actorId: "speaker-user-012",
    action: "status_changed",
    createdAt: "2026-02-12T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-058",
    proposalId: "proposal-013",
    actorId: "speaker-user-008",
    action: "created",
    createdAt: "2026-04-02T09:00:00+03:00",
  },
  {
    id: "history-059",
    proposalId: "proposal-013",
    actorId: "speaker-user-008",
    action: "status_changed",
    createdAt: "2026-04-06T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-060",
    proposalId: "proposal-013",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-06T19:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-061",
    proposalId: "proposal-013",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-04-07T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-062",
    proposalId: "proposal-013",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-07T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-063",
    proposalId: "proposal-013",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-04-07T19:00:00+03:00",
    payload: {
      reviewId: "review-009",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-064",
    proposalId: "proposal-013",
    actorId: "reviewer-010",
    action: "comment_added",
    createdAt: "2026-04-08T04:03:00+03:00",
    payload: {
      commentId: "comment-004",
    },
  },
  {
    id: "history-065",
    proposalId: "proposal-013",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-08T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-066",
    proposalId: "proposal-014",
    actorId: "speaker-user-017",
    action: "created",
    createdAt: "2026-04-08T00:00:00+03:00",
  },
  {
    id: "history-067",
    proposalId: "proposal-014",
    actorId: "speaker-user-017",
    action: "status_changed",
    createdAt: "2026-04-10T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-068",
    proposalId: "proposal-014",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-10T05:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-069",
    proposalId: "proposal-014",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-10T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-070",
    proposalId: "proposal-014",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-04-11T02:00:00+03:00",
    payload: {
      reviewId: "review-010",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-071",
    proposalId: "proposal-014",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-11T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-072",
    proposalId: "proposal-015",
    actorId: "speaker-user-007",
    action: "created",
    createdAt: "2026-02-28T00:00:00+03:00",
  },
  {
    id: "history-073",
    proposalId: "proposal-015",
    actorId: "speaker-user-007",
    action: "status_changed",
    createdAt: "2026-03-02T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-074",
    proposalId: "proposal-015",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T15:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-075",
    proposalId: "proposal-015",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-02T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-076",
    proposalId: "proposal-015",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-03-03T05:00:00+03:00",
    payload: {
      reviewId: "review-011",
      recommendation: "approve",
    },
  },
  {
    id: "history-077",
    proposalId: "proposal-015",
    actorId: "manager-002",
    action: "comment_added",
    createdAt: "2026-03-03T07:03:00+03:00",
    payload: {
      commentId: "comment-005",
    },
  },
  {
    id: "history-078",
    proposalId: "proposal-015",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-03T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-079",
    proposalId: "proposal-016",
    actorId: "speaker-user-002",
    action: "created",
    createdAt: "2026-03-21T21:00:00+03:00",
  },
  {
    id: "history-080",
    proposalId: "proposal-016",
    actorId: "speaker-user-002",
    action: "status_changed",
    createdAt: "2026-03-23T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-081",
    proposalId: "proposal-016",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-23T06:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-082",
    proposalId: "proposal-016",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-23T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-083",
    proposalId: "proposal-016",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-03-24T03:00:00+03:00",
    payload: {
      reviewId: "review-012",
      recommendation: "approve",
    },
  },
  {
    id: "history-084",
    proposalId: "proposal-017",
    actorId: "speaker-user-018",
    action: "created",
    createdAt: "2026-02-05T02:00:00+03:00",
  },
  {
    id: "history-085",
    proposalId: "proposal-017",
    actorId: "speaker-user-018",
    action: "status_changed",
    createdAt: "2026-02-09T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-086",
    proposalId: "proposal-017",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-09T15:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-087",
    proposalId: "proposal-017",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-09T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-088",
    proposalId: "proposal-017",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-02-10T14:00:00+03:00",
    payload: {
      reviewId: "review-013",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-089",
    proposalId: "proposal-017",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-11T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-090",
    proposalId: "proposal-018",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-04-03T05:00:00+03:00",
  },
  {
    id: "history-091",
    proposalId: "proposal-018",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-04-07T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-092",
    proposalId: "proposal-018",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-07T14:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-093",
    proposalId: "proposal-018",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-07T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-094",
    proposalId: "proposal-018",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-04-08T02:00:00+03:00",
    payload: {
      reviewId: "review-014",
      recommendation: "approve",
    },
  },
  {
    id: "history-095",
    proposalId: "proposal-018",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-08T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-096",
    proposalId: "proposal-018",
    actorId: "manager-002",
    action: "scheduled",
    createdAt: "2026-04-10T00:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-018",
    },
  },
  {
    id: "history-097",
    proposalId: "proposal-019",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-03-10T00:00:00+03:00",
  },
  {
    id: "history-098",
    proposalId: "proposal-019",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-03-12T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-099",
    proposalId: "proposal-019",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-12T06:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-100",
    proposalId: "proposal-019",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-12T17:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-101",
    proposalId: "proposal-019",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-12T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-102",
    proposalId: "proposal-019",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-03-13T00:00:00+03:00",
    payload: {
      reviewId: "review-015",
      recommendation: "approve",
    },
  },
  {
    id: "history-103",
    proposalId: "proposal-019",
    actorId: "manager-002",
    action: "comment_added",
    createdAt: "2026-03-13T07:03:00+03:00",
    payload: {
      commentId: "comment-006",
    },
  },
  {
    id: "history-104",
    proposalId: "proposal-019",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-13T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-105",
    proposalId: "proposal-020",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-01-29T11:00:00+03:00",
  },
  {
    id: "history-106",
    proposalId: "proposal-020",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-01-30T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-107",
    proposalId: "proposal-020",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-01-31T00:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-108",
    proposalId: "proposal-020",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-01-31T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-109",
    proposalId: "proposal-020",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-01-31T08:00:00+03:00",
    payload: {
      reviewId: "review-016",
      recommendation: "approve",
    },
  },
  {
    id: "history-110",
    proposalId: "proposal-021",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-03-03T06:00:00+03:00",
  },
  {
    id: "history-111",
    proposalId: "proposal-021",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-03-04T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-112",
    proposalId: "proposal-021",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-04T14:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-113",
    proposalId: "proposal-021",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-04T19:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-114",
    proposalId: "proposal-021",
    actorId: "reviewer-004",
    action: "comment_added",
    createdAt: "2026-03-05T04:03:00+03:00",
    payload: {
      commentId: "comment-007",
    },
  },
  {
    id: "history-115",
    proposalId: "proposal-022",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-04-02T23:00:00+03:00",
  },
  {
    id: "history-116",
    proposalId: "proposal-022",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-04-05T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-117",
    proposalId: "proposal-022",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-05T19:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-118",
    proposalId: "proposal-023",
    actorId: "speaker-user-015",
    action: "created",
    createdAt: "2026-03-21T22:00:00+03:00",
  },
  {
    id: "history-119",
    proposalId: "proposal-023",
    actorId: "speaker-user-015",
    action: "status_changed",
    createdAt: "2026-03-26T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-120",
    proposalId: "proposal-023",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-26T05:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-121",
    proposalId: "proposal-023",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-26T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-122",
    proposalId: "proposal-023",
    actorId: "reviewer-006",
    action: "comment_added",
    createdAt: "2026-03-26T10:03:00+03:00",
    payload: {
      commentId: "comment-008",
    },
  },
  {
    id: "history-123",
    proposalId: "proposal-024",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-02-18T22:00:00+03:00",
  },
  {
    id: "history-124",
    proposalId: "proposal-024",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-02-19T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-125",
    proposalId: "proposal-024",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-20T12:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-126",
    proposalId: "proposal-024",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-20T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-127",
    proposalId: "proposal-024",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-02-21T03:00:00+03:00",
    payload: {
      reviewId: "review-017",
      recommendation: "approve",
    },
  },
  {
    id: "history-128",
    proposalId: "proposal-024",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-21T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-129",
    proposalId: "proposal-024",
    actorId: "manager-003",
    action: "scheduled",
    createdAt: "2026-02-24T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-024",
    },
  },
  {
    id: "history-130",
    proposalId: "proposal-025",
    actorId: "speaker-user-023",
    action: "created",
    createdAt: "2026-03-29T06:00:00+03:00",
  },
  {
    id: "history-131",
    proposalId: "proposal-025",
    actorId: "speaker-user-023",
    action: "status_changed",
    createdAt: "2026-04-02T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-132",
    proposalId: "proposal-025",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-02T20:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-133",
    proposalId: "proposal-025",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-02T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-134",
    proposalId: "proposal-025",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-04-03T04:00:00+03:00",
    payload: {
      reviewId: "review-018",
      recommendation: "reject",
    },
  },
  {
    id: "history-135",
    proposalId: "proposal-025",
    actorId: "reviewer-009",
    action: "comment_added",
    createdAt: "2026-04-03T05:03:00+03:00",
    payload: {
      commentId: "comment-009",
    },
  },
  {
    id: "history-136",
    proposalId: "proposal-025",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-03T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-137",
    proposalId: "proposal-026",
    actorId: "speaker-user-002",
    action: "created",
    createdAt: "2026-03-20T21:00:00+03:00",
  },
  {
    id: "history-138",
    proposalId: "proposal-026",
    actorId: "speaker-user-002",
    action: "status_changed",
    createdAt: "2026-03-21T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-139",
    proposalId: "proposal-026",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-22T09:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-140",
    proposalId: "proposal-026",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-22T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-141",
    proposalId: "proposal-026",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-22T13:00:00+03:00",
    payload: {
      reviewId: "review-019",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-142",
    proposalId: "proposal-026",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-23T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-143",
    proposalId: "proposal-027",
    actorId: "speaker-user-010",
    action: "created",
    createdAt: "2026-02-02T11:00:00+03:00",
  },
  {
    id: "history-144",
    proposalId: "proposal-027",
    actorId: "speaker-user-010",
    action: "status_changed",
    createdAt: "2026-02-03T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-145",
    proposalId: "proposal-027",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-04T01:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-146",
    proposalId: "proposal-027",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-04T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-147",
    proposalId: "proposal-027",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-02-04T06:00:00+03:00",
    payload: {
      reviewId: "review-020",
      recommendation: "reject",
    },
  },
  {
    id: "history-148",
    proposalId: "proposal-027",
    actorId: "3",
    action: "comment_added",
    createdAt: "2026-02-04T07:03:00+03:00",
    payload: {
      commentId: "comment-010",
    },
  },
  {
    id: "history-149",
    proposalId: "proposal-027",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-04T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-150",
    proposalId: "proposal-028",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-03-27T23:00:00+03:00",
  },
  {
    id: "history-151",
    proposalId: "proposal-028",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-03-29T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-152",
    proposalId: "proposal-028",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-29T10:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-153",
    proposalId: "proposal-028",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-29T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-154",
    proposalId: "proposal-028",
    actorId: "reviewer-003",
    action: "review_added",
    createdAt: "2026-03-29T18:00:00+03:00",
    payload: {
      reviewId: "review-021",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-155",
    proposalId: "proposal-029",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-03-21T12:00:00+03:00",
  },
  {
    id: "history-156",
    proposalId: "proposal-029",
    actorId: "speaker-user-020",
    action: "status_changed",
    createdAt: "2026-03-22T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-157",
    proposalId: "proposal-029",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-23T04:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-158",
    proposalId: "proposal-029",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-23T10:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-159",
    proposalId: "proposal-029",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-23T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-160",
    proposalId: "proposal-029",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-03-23T19:00:00+03:00",
    payload: {
      reviewId: "review-022",
      recommendation: "reject",
    },
  },
  {
    id: "history-161",
    proposalId: "proposal-029",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-24T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-162",
    proposalId: "proposal-030",
    actorId: "speaker-user-023",
    action: "created",
    createdAt: "2026-02-18T03:00:00+03:00",
  },
  {
    id: "history-163",
    proposalId: "proposal-030",
    actorId: "speaker-user-023",
    action: "status_changed",
    createdAt: "2026-02-22T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-164",
    proposalId: "proposal-030",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-22T15:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-165",
    proposalId: "proposal-030",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-22T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-166",
    proposalId: "proposal-030",
    actorId: "reviewer-002",
    action: "comment_added",
    createdAt: "2026-02-23T06:03:00+03:00",
    payload: {
      commentId: "comment-011",
    },
  },
  {
    id: "history-167",
    proposalId: "proposal-031",
    actorId: "speaker-user-025",
    action: "created",
    createdAt: "2026-04-16T06:00:00+03:00",
  },
  {
    id: "history-168",
    proposalId: "proposal-031",
    actorId: "speaker-user-025",
    action: "updated",
    createdAt: "2026-04-17T08:00:00+03:00",
    changes: [
      {
        field: "abstract",
        previousValue: "Черновик описания",
        nextValue: "Расширенное описание доклада",
      }
    ],
  },
  {
    id: "history-169",
    proposalId: "proposal-032",
    actorId: "4",
    action: "created",
    createdAt: "2026-02-10T23:00:00+03:00",
  },
  {
    id: "history-170",
    proposalId: "proposal-032",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-02-12T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-171",
    proposalId: "proposal-032",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-12T04:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-172",
    proposalId: "proposal-032",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-12T08:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-173",
    proposalId: "proposal-032",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-12T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-174",
    proposalId: "proposal-032",
    actorId: "manager-002",
    action: "comment_added",
    createdAt: "2026-02-12T21:03:00+03:00",
    payload: {
      commentId: "comment-012",
    },
  },
  {
    id: "history-175",
    proposalId: "proposal-033",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-03-17T23:00:00+03:00",
  },
  {
    id: "history-176",
    proposalId: "proposal-033",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-03-21T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-177",
    proposalId: "proposal-033",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-21T10:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-178",
    proposalId: "proposal-033",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-21T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-179",
    proposalId: "proposal-033",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-03-22T00:00:00+03:00",
    payload: {
      reviewId: "review-023",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-180",
    proposalId: "proposal-033",
    actorId: "3",
    action: "comment_added",
    createdAt: "2026-03-22T06:03:00+03:00",
    payload: {
      commentId: "comment-013",
    },
  },
  {
    id: "history-181",
    proposalId: "proposal-033",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-22T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-182",
    proposalId: "proposal-034",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-03-03T16:00:00+03:00",
  },
  {
    id: "history-183",
    proposalId: "proposal-034",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-03-05T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-184",
    proposalId: "proposal-034",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-06T07:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-185",
    proposalId: "proposal-034",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-06T10:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-186",
    proposalId: "proposal-034",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-06T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-187",
    proposalId: "proposal-034",
    actorId: "reviewer-003",
    action: "review_added",
    createdAt: "2026-03-07T03:00:00+03:00",
    payload: {
      reviewId: "review-024",
      recommendation: "approve",
    },
  },
  {
    id: "history-188",
    proposalId: "proposal-034",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-07T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-189",
    proposalId: "proposal-035",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-01-31T21:00:00+03:00",
  },
  {
    id: "history-190",
    proposalId: "proposal-035",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-02-02T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-191",
    proposalId: "proposal-035",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-02T07:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-192",
    proposalId: "proposal-035",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-02T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-193",
    proposalId: "proposal-035",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-02-02T13:00:00+03:00",
    payload: {
      reviewId: "review-025",
      recommendation: "approve",
    },
  },
  {
    id: "history-194",
    proposalId: "proposal-035",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-02T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-195",
    proposalId: "proposal-036",
    actorId: "speaker-user-006",
    action: "created",
    createdAt: "2026-04-01T07:00:00+03:00",
  },
  {
    id: "history-196",
    proposalId: "proposal-036",
    actorId: "speaker-user-006",
    action: "status_changed",
    createdAt: "2026-04-02T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-197",
    proposalId: "proposal-036",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-02T21:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-198",
    proposalId: "proposal-036",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-04-03T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-199",
    proposalId: "proposal-036",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-03T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-200",
    proposalId: "proposal-036",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-04-03T18:00:00+03:00",
    payload: {
      reviewId: "review-026",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-201",
    proposalId: "proposal-037",
    actorId: "speaker-user-004",
    action: "created",
    createdAt: "2026-03-04T18:00:00+03:00",
  },
  {
    id: "history-202",
    proposalId: "proposal-037",
    actorId: "speaker-user-004",
    action: "status_changed",
    createdAt: "2026-03-07T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-203",
    proposalId: "proposal-037",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-08T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-204",
    proposalId: "proposal-037",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-08T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-205",
    proposalId: "proposal-037",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-03-08T21:00:00+03:00",
    payload: {
      reviewId: "review-027",
      recommendation: "approve",
    },
  },
  {
    id: "history-206",
    proposalId: "proposal-037",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-09T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-207",
    proposalId: "proposal-037",
    actorId: "2",
    action: "scheduled",
    createdAt: "2026-03-11T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-037",
    },
  },
  {
    id: "history-208",
    proposalId: "proposal-038",
    actorId: "speaker-user-012",
    action: "created",
    createdAt: "2026-04-06T10:00:00+03:00",
  },
  {
    id: "history-209",
    proposalId: "proposal-038",
    actorId: "speaker-user-012",
    action: "status_changed",
    createdAt: "2026-04-09T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-210",
    proposalId: "proposal-038",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-04-09T18:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-211",
    proposalId: "proposal-038",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-10T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-212",
    proposalId: "proposal-038",
    actorId: "reviewer-003",
    action: "review_added",
    createdAt: "2026-04-10T17:00:00+03:00",
    payload: {
      reviewId: "review-028",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-213",
    proposalId: "proposal-038",
    actorId: "reviewer-003",
    action: "comment_added",
    createdAt: "2026-04-10T19:03:00+03:00",
    payload: {
      commentId: "comment-014",
    },
  },
  {
    id: "history-214",
    proposalId: "proposal-038",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-11T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-215",
    proposalId: "proposal-039",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-01-26T04:00:00+03:00",
  },
  {
    id: "history-216",
    proposalId: "proposal-039",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-01-30T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-217",
    proposalId: "proposal-039",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-01-30T19:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-218",
    proposalId: "proposal-039",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-01-31T06:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-219",
    proposalId: "proposal-039",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-01-31T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-220",
    proposalId: "proposal-039",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-01-31T16:00:00+03:00",
    payload: {
      reviewId: "review-029",
      recommendation: "reject",
    },
  },
  {
    id: "history-221",
    proposalId: "proposal-039",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-01-31T19:00:00+03:00",
    payload: {
      reviewId: "review-030",
      recommendation: "reject",
    },
  },
  {
    id: "history-222",
    proposalId: "proposal-039",
    actorId: "reviewer-002",
    action: "comment_added",
    createdAt: "2026-02-01T03:03:00+03:00",
    payload: {
      commentId: "comment-015",
    },
  },
  {
    id: "history-223",
    proposalId: "proposal-039",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-01T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-224",
    proposalId: "proposal-040",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-03-18T11:00:00+03:00",
  },
  {
    id: "history-225",
    proposalId: "proposal-040",
    actorId: "speaker-user-020",
    action: "status_changed",
    createdAt: "2026-03-21T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-226",
    proposalId: "proposal-040",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-22T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-227",
    proposalId: "proposal-040",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-22T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-228",
    proposalId: "proposal-041",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-04-20T11:00:00+03:00",
  },
  {
    id: "history-229",
    proposalId: "proposal-041",
    actorId: "speaker-user-020",
    action: "status_changed",
    createdAt: "2026-04-23T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-230",
    proposalId: "proposal-041",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-23T16:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-231",
    proposalId: "proposal-041",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-23T21:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-232",
    proposalId: "proposal-041",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-24T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-233",
    proposalId: "proposal-041",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-04-24T07:00:00+03:00",
    payload: {
      reviewId: "review-031",
      recommendation: "approve",
    },
  },
  {
    id: "history-234",
    proposalId: "proposal-042",
    actorId: "speaker-user-002",
    action: "created",
    createdAt: "2026-04-05T23:00:00+03:00",
  },
  {
    id: "history-235",
    proposalId: "proposal-042",
    actorId: "speaker-user-002",
    action: "status_changed",
    createdAt: "2026-04-07T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-236",
    proposalId: "proposal-042",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-07T15:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-237",
    proposalId: "proposal-043",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-03-14T22:00:00+03:00",
  },
  {
    id: "history-238",
    proposalId: "proposal-043",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-03-15T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-239",
    proposalId: "proposal-043",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-16T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-240",
    proposalId: "proposal-043",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-16T20:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-241",
    proposalId: "proposal-043",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-17T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-242",
    proposalId: "proposal-043",
    actorId: "2",
    action: "comment_added",
    createdAt: "2026-03-17T13:03:00+03:00",
    payload: {
      commentId: "comment-016",
    },
  },
  {
    id: "history-243",
    proposalId: "proposal-044",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-02-11T06:00:00+03:00",
  },
  {
    id: "history-244",
    proposalId: "proposal-044",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-02-15T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-245",
    proposalId: "proposal-044",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-15T19:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-246",
    proposalId: "proposal-044",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-16T03:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-247",
    proposalId: "proposal-044",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-16T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-248",
    proposalId: "proposal-044",
    actorId: "reviewer-006",
    action: "review_added",
    createdAt: "2026-02-16T08:00:00+03:00",
    payload: {
      reviewId: "review-032",
      recommendation: "reject",
    },
  },
  {
    id: "history-249",
    proposalId: "proposal-045",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-04-06T23:00:00+03:00",
  },
  {
    id: "history-250",
    proposalId: "proposal-045",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-04-10T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-251",
    proposalId: "proposal-046",
    actorId: "speaker-user-004",
    action: "created",
    createdAt: "2026-03-08T19:00:00+03:00",
  },
  {
    id: "history-252",
    proposalId: "proposal-046",
    actorId: "speaker-user-004",
    action: "status_changed",
    createdAt: "2026-03-11T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-253",
    proposalId: "proposal-046",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-12T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-254",
    proposalId: "proposal-046",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-12T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-255",
    proposalId: "proposal-046",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-03-13T02:00:00+03:00",
    payload: {
      reviewId: "review-033",
      recommendation: "approve",
    },
  },
  {
    id: "history-256",
    proposalId: "proposal-046",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-13T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-257",
    proposalId: "proposal-047",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-04-14T08:00:00+03:00",
  },
  {
    id: "history-258",
    proposalId: "proposal-047",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-04-15T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-259",
    proposalId: "proposal-047",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-15T17:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-260",
    proposalId: "proposal-047",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-16T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-261",
    proposalId: "proposal-047",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-04-16T08:00:00+03:00",
    payload: {
      reviewId: "review-034",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-262",
    proposalId: "proposal-047",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-16T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-263",
    proposalId: "proposal-048",
    actorId: "speaker-user-015",
    action: "created",
    createdAt: "2026-02-28T04:00:00+03:00",
  },
  {
    id: "history-264",
    proposalId: "proposal-048",
    actorId: "speaker-user-015",
    action: "status_changed",
    createdAt: "2026-03-02T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-265",
    proposalId: "proposal-048",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T12:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-266",
    proposalId: "proposal-048",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-02T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-267",
    proposalId: "proposal-048",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-03-03T09:00:00+03:00",
    payload: {
      reviewId: "review-035",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-268",
    proposalId: "proposal-048",
    actorId: "2",
    action: "comment_added",
    createdAt: "2026-03-03T14:03:00+03:00",
    payload: {
      commentId: "comment-017",
    },
  },
  {
    id: "history-269",
    proposalId: "proposal-048",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-04T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-270",
    proposalId: "proposal-049",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-03-08T10:00:00+03:00",
  },
  {
    id: "history-271",
    proposalId: "proposal-050",
    actorId: "speaker-user-019",
    action: "created",
    createdAt: "2026-03-01T16:00:00+03:00",
  },
  {
    id: "history-272",
    proposalId: "proposal-050",
    actorId: "speaker-user-019",
    action: "status_changed",
    createdAt: "2026-03-05T19:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-273",
    proposalId: "proposal-050",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-06T02:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-274",
    proposalId: "proposal-050",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-06T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-275",
    proposalId: "proposal-051",
    actorId: "speaker-user-010",
    action: "created",
    createdAt: "2026-03-10T05:00:00+03:00",
  },
  {
    id: "history-276",
    proposalId: "proposal-051",
    actorId: "speaker-user-010",
    action: "status_changed",
    createdAt: "2026-03-13T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-277",
    proposalId: "proposal-051",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-13T17:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-278",
    proposalId: "proposal-051",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-13T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-279",
    proposalId: "proposal-051",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-14T00:00:00+03:00",
    payload: {
      reviewId: "review-036",
      recommendation: "approve",
    },
  },
  {
    id: "history-280",
    proposalId: "proposal-051",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-14T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-281",
    proposalId: "proposal-051",
    actorId: "manager-003",
    action: "scheduled",
    createdAt: "2026-03-16T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-051",
    },
  },
  {
    id: "history-282",
    proposalId: "proposal-052",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-02-02T02:00:00+03:00",
  },
  {
    id: "history-283",
    proposalId: "proposal-052",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-02-05T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-284",
    proposalId: "proposal-052",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-05T13:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-285",
    proposalId: "proposal-052",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-05T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-286",
    proposalId: "proposal-052",
    actorId: "manager-002",
    action: "comment_added",
    createdAt: "2026-02-05T19:03:00+03:00",
    payload: {
      commentId: "comment-018",
    },
  },
  {
    id: "history-287",
    proposalId: "proposal-053",
    actorId: "speaker-user-024",
    action: "created",
    createdAt: "2026-02-23T18:00:00+03:00",
  },
  {
    id: "history-288",
    proposalId: "proposal-054",
    actorId: "speaker-user-023",
    action: "created",
    createdAt: "2026-02-16T16:00:00+03:00",
  },
  {
    id: "history-289",
    proposalId: "proposal-054",
    actorId: "speaker-user-023",
    action: "status_changed",
    createdAt: "2026-02-18T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-290",
    proposalId: "proposal-054",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-19T02:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-291",
    proposalId: "proposal-054",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-19T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-292",
    proposalId: "proposal-054",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-02-19T19:00:00+03:00",
    payload: {
      reviewId: "review-037",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-293",
    proposalId: "proposal-054",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-02-20T01:03:00+03:00",
    payload: {
      commentId: "comment-019",
    },
  },
  {
    id: "history-294",
    proposalId: "proposal-054",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-20T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-295",
    proposalId: "proposal-055",
    actorId: "speaker-user-019",
    action: "created",
    createdAt: "2026-01-28T08:00:00+03:00",
  },
  {
    id: "history-296",
    proposalId: "proposal-055",
    actorId: "speaker-user-019",
    action: "status_changed",
    createdAt: "2026-01-31T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-297",
    proposalId: "proposal-056",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-01-24T20:00:00+03:00",
  },
  {
    id: "history-298",
    proposalId: "proposal-056",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-01-26T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-299",
    proposalId: "proposal-056",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-01-26T09:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-300",
    proposalId: "proposal-056",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-01-26T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-301",
    proposalId: "proposal-056",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-01-26T19:00:00+03:00",
    payload: {
      reviewId: "review-038",
      recommendation: "approve",
    },
  },
  {
    id: "history-302",
    proposalId: "proposal-056",
    actorId: "reviewer-009",
    action: "comment_added",
    createdAt: "2026-01-27T04:03:00+03:00",
    payload: {
      commentId: "comment-020",
    },
  },
  {
    id: "history-303",
    proposalId: "proposal-057",
    actorId: "speaker-user-025",
    action: "created",
    createdAt: "2026-03-31T22:00:00+03:00",
  },
  {
    id: "history-304",
    proposalId: "proposal-057",
    actorId: "speaker-user-025",
    action: "status_changed",
    createdAt: "2026-04-02T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-305",
    proposalId: "proposal-057",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-02T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-306",
    proposalId: "proposal-057",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-02T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-307",
    proposalId: "proposal-057",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-04-03T06:00:00+03:00",
    payload: {
      reviewId: "review-039",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-308",
    proposalId: "proposal-057",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-03T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-309",
    proposalId: "proposal-058",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-03-21T11:00:00+03:00",
  },
  {
    id: "history-310",
    proposalId: "proposal-058",
    actorId: "speaker-user-020",
    action: "status_changed",
    createdAt: "2026-03-25T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-311",
    proposalId: "proposal-058",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-26T03:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-312",
    proposalId: "proposal-058",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-26T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-313",
    proposalId: "proposal-058",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-26T21:00:00+03:00",
    payload: {
      reviewId: "review-040",
      recommendation: "approve",
    },
  },
  {
    id: "history-314",
    proposalId: "proposal-058",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-27T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-315",
    proposalId: "proposal-059",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-03-06T05:00:00+03:00",
  },
  {
    id: "history-316",
    proposalId: "proposal-059",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-03-07T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-317",
    proposalId: "proposal-060",
    actorId: "speaker-user-023",
    action: "created",
    createdAt: "2026-02-20T22:00:00+03:00",
  },
  {
    id: "history-318",
    proposalId: "proposal-060",
    actorId: "speaker-user-023",
    action: "status_changed",
    createdAt: "2026-02-21T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-319",
    proposalId: "proposal-060",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-22T03:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-320",
    proposalId: "proposal-060",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-22T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-321",
    proposalId: "proposal-060",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-02-22T19:00:00+03:00",
    payload: {
      reviewId: "review-041",
      recommendation: "approve",
    },
  },
  {
    id: "history-322",
    proposalId: "proposal-060",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-02-22T21:03:00+03:00",
    payload: {
      commentId: "comment-021",
    },
  },
  {
    id: "history-323",
    proposalId: "proposal-060",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-23T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-324",
    proposalId: "proposal-061",
    actorId: "speaker-user-008",
    action: "created",
    createdAt: "2026-02-07T23:00:00+03:00",
  },
  {
    id: "history-325",
    proposalId: "proposal-061",
    actorId: "speaker-user-008",
    action: "status_changed",
    createdAt: "2026-02-10T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-326",
    proposalId: "proposal-061",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-10T08:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-327",
    proposalId: "proposal-062",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-08T10:00:00+03:00",
  },
  {
    id: "history-328",
    proposalId: "proposal-062",
    actorId: "4",
    action: "updated",
    createdAt: "2026-03-09T11:00:00+03:00",
    changes: [
      {
        field: "abstract",
        previousValue: "Черновик описания",
        nextValue: "Расширенное описание доклада",
      }
    ],
  },
  {
    id: "history-329",
    proposalId: "proposal-063",
    actorId: "speaker-user-023",
    action: "created",
    createdAt: "2026-02-19T16:00:00+03:00",
  },
  {
    id: "history-330",
    proposalId: "proposal-063",
    actorId: "speaker-user-023",
    action: "updated",
    createdAt: "2026-02-20T18:00:00+03:00",
    changes: [
      {
        field: "abstract",
        previousValue: "Черновик описания",
        nextValue: "Расширенное описание доклада",
      }
    ],
  },
  {
    id: "history-331",
    proposalId: "proposal-064",
    actorId: "speaker-user-010",
    action: "created",
    createdAt: "2026-02-16T00:00:00+03:00",
  },
  {
    id: "history-332",
    proposalId: "proposal-064",
    actorId: "speaker-user-010",
    action: "status_changed",
    createdAt: "2026-02-20T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-333",
    proposalId: "proposal-064",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-20T09:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-334",
    proposalId: "proposal-064",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-20T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-335",
    proposalId: "proposal-064",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-02-20T18:00:00+03:00",
    payload: {
      reviewId: "review-042",
      recommendation: "approve",
    },
  },
  {
    id: "history-336",
    proposalId: "proposal-064",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-21T10:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-337",
    proposalId: "proposal-065",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-02-25T17:00:00+03:00",
  },
  {
    id: "history-338",
    proposalId: "proposal-065",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-02-27T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-339",
    proposalId: "proposal-065",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-02-28T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-340",
    proposalId: "proposal-065",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-28T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-341",
    proposalId: "proposal-065",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-02-28T19:00:00+03:00",
    payload: {
      reviewId: "review-043",
      recommendation: "reject",
    },
  },
  {
    id: "history-342",
    proposalId: "proposal-065",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-03-01T02:03:00+03:00",
    payload: {
      commentId: "comment-022",
    },
  },
  {
    id: "history-343",
    proposalId: "proposal-065",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-01T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-344",
    proposalId: "proposal-066",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-03-22T16:00:00+03:00",
  },
  {
    id: "history-345",
    proposalId: "proposal-066",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-03-25T19:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-346",
    proposalId: "proposal-066",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-25T23:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-347",
    proposalId: "proposal-067",
    actorId: "speaker-user-004",
    action: "created",
    createdAt: "2026-04-19T07:00:00+03:00",
  },
  {
    id: "history-348",
    proposalId: "proposal-067",
    actorId: "speaker-user-004",
    action: "status_changed",
    createdAt: "2026-04-23T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-349",
    proposalId: "proposal-067",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-23T15:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-350",
    proposalId: "proposal-067",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-23T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-351",
    proposalId: "proposal-067",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-04-24T12:00:00+03:00",
    payload: {
      reviewId: "review-044",
      recommendation: "approve",
    },
  },
  {
    id: "history-352",
    proposalId: "proposal-067",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-24T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-353",
    proposalId: "proposal-068",
    actorId: "speaker-user-011",
    action: "created",
    createdAt: "2026-03-09T10:00:00+03:00",
  },
  {
    id: "history-354",
    proposalId: "proposal-068",
    actorId: "speaker-user-011",
    action: "status_changed",
    createdAt: "2026-03-12T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-355",
    proposalId: "proposal-068",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-12T23:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-356",
    proposalId: "proposal-068",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-13T02:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-357",
    proposalId: "proposal-068",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-13T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-358",
    proposalId: "proposal-068",
    actorId: "reviewer-006",
    action: "comment_added",
    createdAt: "2026-03-13T14:03:00+03:00",
    payload: {
      commentId: "comment-023",
    },
  },
  {
    id: "history-359",
    proposalId: "proposal-069",
    actorId: "speaker-user-017",
    action: "created",
    createdAt: "2026-02-28T23:00:00+03:00",
  },
  {
    id: "history-360",
    proposalId: "proposal-069",
    actorId: "speaker-user-017",
    action: "status_changed",
    createdAt: "2026-03-02T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-361",
    proposalId: "proposal-069",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T10:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-362",
    proposalId: "proposal-069",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T20:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-363",
    proposalId: "proposal-069",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-02T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-364",
    proposalId: "proposal-069",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-03T15:00:00+03:00",
    payload: {
      reviewId: "review-045",
      recommendation: "reject",
    },
  },
  {
    id: "history-365",
    proposalId: "proposal-069",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-03T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-366",
    proposalId: "proposal-070",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-03-27T16:00:00+03:00",
  },
  {
    id: "history-367",
    proposalId: "proposal-070",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-03-30T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-368",
    proposalId: "proposal-070",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-31T04:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-369",
    proposalId: "proposal-071",
    actorId: "speaker-user-019",
    action: "created",
    createdAt: "2026-04-17T12:00:00+03:00",
  },
  {
    id: "history-370",
    proposalId: "proposal-071",
    actorId: "speaker-user-019",
    action: "updated",
    createdAt: "2026-04-18T17:00:00+03:00",
    changes: [
      {
        field: "abstract",
        previousValue: "Черновик описания",
        nextValue: "Расширенное описание доклада",
      }
    ],
  },
  {
    id: "history-371",
    proposalId: "proposal-072",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-03-14T21:00:00+03:00",
  },
  {
    id: "history-372",
    proposalId: "proposal-072",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-03-17T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-373",
    proposalId: "proposal-072",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-17T06:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-374",
    proposalId: "proposal-072",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-17T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-375",
    proposalId: "proposal-072",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-03-17T12:00:00+03:00",
    payload: {
      reviewId: "review-046",
      recommendation: "approve",
    },
  },
  {
    id: "history-376",
    proposalId: "proposal-072",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-18T00:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-377",
    proposalId: "proposal-072",
    actorId: "manager-003",
    action: "scheduled",
    createdAt: "2026-03-20T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-072",
    },
  },
  {
    id: "history-378",
    proposalId: "proposal-073",
    actorId: "speaker-user-004",
    action: "created",
    createdAt: "2026-03-18T22:00:00+03:00",
  },
  {
    id: "history-379",
    proposalId: "proposal-073",
    actorId: "speaker-user-004",
    action: "status_changed",
    createdAt: "2026-03-21T00:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-380",
    proposalId: "proposal-073",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-21T08:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-381",
    proposalId: "proposal-073",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-21T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-382",
    proposalId: "proposal-073",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-03-22T05:00:00+03:00",
    payload: {
      reviewId: "review-047",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-383",
    proposalId: "proposal-073",
    actorId: "reviewer-005",
    action: "comment_added",
    createdAt: "2026-03-22T10:03:00+03:00",
    payload: {
      commentId: "comment-024",
    },
  },
  {
    id: "history-384",
    proposalId: "proposal-073",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-23T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-385",
    proposalId: "proposal-074",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-01-28T21:00:00+03:00",
  },
  {
    id: "history-386",
    proposalId: "proposal-074",
    actorId: "speaker-user-020",
    action: "status_changed",
    createdAt: "2026-02-01T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-387",
    proposalId: "proposal-074",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-01T10:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-388",
    proposalId: "proposal-074",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-01T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-389",
    proposalId: "proposal-074",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-02-01T23:00:00+03:00",
    payload: {
      reviewId: "review-048",
      recommendation: "approve",
    },
  },
  {
    id: "history-390",
    proposalId: "proposal-074",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-02T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-391",
    proposalId: "proposal-074",
    actorId: "manager-003",
    action: "scheduled",
    createdAt: "2026-02-04T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-074",
    },
  },
  {
    id: "history-392",
    proposalId: "proposal-075",
    actorId: "speaker-user-011",
    action: "created",
    createdAt: "2026-02-10T01:00:00+03:00",
  },
  {
    id: "history-393",
    proposalId: "proposal-075",
    actorId: "speaker-user-011",
    action: "status_changed",
    createdAt: "2026-02-12T03:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-394",
    proposalId: "proposal-075",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-12T13:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-395",
    proposalId: "proposal-075",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-02-12T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-396",
    proposalId: "proposal-075",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-02-12T23:00:00+03:00",
    payload: {
      reviewId: "review-049",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-397",
    proposalId: "proposal-075",
    actorId: "reviewer-007",
    action: "comment_added",
    createdAt: "2026-02-13T05:03:00+03:00",
    payload: {
      commentId: "comment-025",
    },
  },
  {
    id: "history-398",
    proposalId: "proposal-075",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-13T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-399",
    proposalId: "proposal-076",
    actorId: "speaker-user-022",
    action: "created",
    createdAt: "2026-04-07T23:00:00+03:00",
  },
  {
    id: "history-400",
    proposalId: "proposal-076",
    actorId: "speaker-user-022",
    action: "status_changed",
    createdAt: "2026-04-11T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-401",
    proposalId: "proposal-076",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-11T11:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-402",
    proposalId: "proposal-076",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-12T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-403",
    proposalId: "proposal-076",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-12T11:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-404",
    proposalId: "proposal-076",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-04-13T02:00:00+03:00",
    payload: {
      reviewId: "review-050",
      recommendation: "reject",
    },
  },
  {
    id: "history-405",
    proposalId: "proposal-076",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-13T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-406",
    proposalId: "proposal-077",
    actorId: "speaker-user-014",
    action: "created",
    createdAt: "2026-02-16T17:00:00+03:00",
  },
  {
    id: "history-407",
    proposalId: "proposal-077",
    actorId: "speaker-user-014",
    action: "status_changed",
    createdAt: "2026-02-20T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-408",
    proposalId: "proposal-078",
    actorId: "speaker-user-018",
    action: "created",
    createdAt: "2026-03-09T19:00:00+03:00",
  },
  {
    id: "history-409",
    proposalId: "proposal-078",
    actorId: "speaker-user-018",
    action: "status_changed",
    createdAt: "2026-03-13T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-410",
    proposalId: "proposal-078",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-13T12:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-411",
    proposalId: "proposal-078",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-13T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-412",
    proposalId: "proposal-078",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-03-13T22:00:00+03:00",
    payload: {
      reviewId: "review-051",
      recommendation: "approve",
    },
  },
  {
    id: "history-413",
    proposalId: "proposal-078",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-14T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-414",
    proposalId: "proposal-079",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-03-09T08:00:00+03:00",
  },
  {
    id: "history-415",
    proposalId: "proposal-079",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-03-12T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-416",
    proposalId: "proposal-079",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-12T16:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-417",
    proposalId: "proposal-079",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-12T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-418",
    proposalId: "proposal-079",
    actorId: "reviewer-002",
    action: "review_added",
    createdAt: "2026-03-13T03:00:00+03:00",
    payload: {
      reviewId: "review-052",
      recommendation: "reject",
    },
  },
  {
    id: "history-419",
    proposalId: "proposal-079",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-13T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-420",
    proposalId: "proposal-080",
    actorId: "speaker-user-021",
    action: "created",
    createdAt: "2026-03-24T11:00:00+03:00",
  },
  {
    id: "history-421",
    proposalId: "proposal-080",
    actorId: "speaker-user-021",
    action: "status_changed",
    createdAt: "2026-03-25T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-422",
    proposalId: "proposal-080",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-25T18:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-423",
    proposalId: "proposal-080",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-25T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-424",
    proposalId: "proposal-080",
    actorId: "reviewer-008",
    action: "review_added",
    createdAt: "2026-03-26T13:00:00+03:00",
    payload: {
      reviewId: "review-053",
      recommendation: "approve",
    },
  },
  {
    id: "history-425",
    proposalId: "proposal-080",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-27T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-426",
    proposalId: "proposal-081",
    actorId: "speaker-user-024",
    action: "created",
    createdAt: "2026-04-18T07:00:00+03:00",
  },
  {
    id: "history-427",
    proposalId: "proposal-081",
    actorId: "speaker-user-024",
    action: "status_changed",
    createdAt: "2026-04-22T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-428",
    proposalId: "proposal-081",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-22T23:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-429",
    proposalId: "proposal-081",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-23T03:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-430",
    proposalId: "proposal-081",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-23T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-431",
    proposalId: "proposal-081",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-04-23T18:00:00+03:00",
    payload: {
      reviewId: "review-054",
      recommendation: "approve",
    },
  },
  {
    id: "history-432",
    proposalId: "proposal-081",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-04-24T03:00:00+03:00",
    payload: {
      reviewId: "review-055",
      recommendation: "approve",
    },
  },
  {
    id: "history-433",
    proposalId: "proposal-081",
    actorId: "reviewer-007",
    action: "comment_added",
    createdAt: "2026-04-24T11:03:00+03:00",
    payload: {
      commentId: "comment-026",
    },
  },
  {
    id: "history-434",
    proposalId: "proposal-081",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-24T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-435",
    proposalId: "proposal-082",
    actorId: "speaker-user-017",
    action: "created",
    createdAt: "2026-04-11T00:00:00+03:00",
  },
  {
    id: "history-436",
    proposalId: "proposal-082",
    actorId: "speaker-user-017",
    action: "status_changed",
    createdAt: "2026-04-12T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-437",
    proposalId: "proposal-082",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-04-12T07:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-438",
    proposalId: "proposal-082",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-04-12T13:00:00+03:00",
    payload: {
      reviewerId: "reviewer-006",
    },
  },
  {
    id: "history-439",
    proposalId: "proposal-082",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-04-12T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-440",
    proposalId: "proposal-083",
    actorId: "speaker-user-004",
    action: "created",
    createdAt: "2026-02-22T03:00:00+03:00",
  },
  {
    id: "history-441",
    proposalId: "proposal-083",
    actorId: "speaker-user-004",
    action: "status_changed",
    createdAt: "2026-02-24T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-442",
    proposalId: "proposal-083",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-24T20:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-443",
    proposalId: "proposal-083",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-25T01:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-444",
    proposalId: "proposal-083",
    actorId: "2",
    action: "comment_added",
    createdAt: "2026-02-25T07:03:00+03:00",
    payload: {
      commentId: "comment-027",
    },
  },
  {
    id: "history-445",
    proposalId: "proposal-084",
    actorId: "speaker-user-015",
    action: "created",
    createdAt: "2026-02-14T01:00:00+03:00",
  },
  {
    id: "history-446",
    proposalId: "proposal-084",
    actorId: "speaker-user-015",
    action: "status_changed",
    createdAt: "2026-02-15T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-447",
    proposalId: "proposal-084",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-15T16:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-448",
    proposalId: "proposal-084",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-16T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-449",
    proposalId: "proposal-084",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-02-16T11:00:00+03:00",
    payload: {
      reviewId: "review-056",
      recommendation: "reject",
    },
  },
  {
    id: "history-450",
    proposalId: "proposal-084",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-02-16T13:03:00+03:00",
    payload: {
      commentId: "comment-028",
    },
  },
  {
    id: "history-451",
    proposalId: "proposal-084",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-17T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-452",
    proposalId: "proposal-085",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-03-21T12:00:00+03:00",
  },
  {
    id: "history-453",
    proposalId: "proposal-085",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-03-23T17:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-454",
    proposalId: "proposal-085",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-24T00:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-455",
    proposalId: "proposal-085",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-24T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-456",
    proposalId: "proposal-085",
    actorId: "reviewer-007",
    action: "review_added",
    createdAt: "2026-03-24T08:00:00+03:00",
    payload: {
      reviewId: "review-057",
      recommendation: "approve",
    },
  },
  {
    id: "history-457",
    proposalId: "proposal-085",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-24T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-458",
    proposalId: "proposal-085",
    actorId: "manager-002",
    action: "scheduled",
    createdAt: "2026-03-27T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-085",
    },
  },
  {
    id: "history-459",
    proposalId: "proposal-086",
    actorId: "speaker-user-006",
    action: "created",
    createdAt: "2026-02-13T00:00:00+03:00",
  },
  {
    id: "history-460",
    proposalId: "proposal-087",
    actorId: "speaker-user-018",
    action: "created",
    createdAt: "2026-03-05T05:00:00+03:00",
  },
  {
    id: "history-461",
    proposalId: "proposal-087",
    actorId: "speaker-user-018",
    action: "status_changed",
    createdAt: "2026-03-07T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-462",
    proposalId: "proposal-087",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-07T14:00:00+03:00",
    payload: {
      reviewerId: "reviewer-005",
    },
  },
  {
    id: "history-463",
    proposalId: "proposal-087",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-07T16:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-464",
    proposalId: "proposal-087",
    actorId: "reviewer-005",
    action: "review_added",
    createdAt: "2026-03-07T19:00:00+03:00",
    payload: {
      reviewId: "review-058",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-465",
    proposalId: "proposal-087",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-03-07T23:03:00+03:00",
    payload: {
      commentId: "comment-029",
    },
  },
  {
    id: "history-466",
    proposalId: "proposal-087",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-08T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "changes_requested",
      }
    ],
    payload: {
      reason: "Нужно уточнить описание, аудиторию и практический результат доклада.",
    },
  },
  {
    id: "history-467",
    proposalId: "proposal-088",
    actorId: "speaker-user-024",
    action: "created",
    createdAt: "2026-02-08T02:00:00+03:00",
  },
  {
    id: "history-468",
    proposalId: "proposal-088",
    actorId: "speaker-user-024",
    action: "status_changed",
    createdAt: "2026-02-11T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-469",
    proposalId: "proposal-088",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-11T16:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-470",
    proposalId: "proposal-088",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-11T20:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-471",
    proposalId: "proposal-088",
    actorId: "reviewer-003",
    action: "review_added",
    createdAt: "2026-02-12T07:00:00+03:00",
    payload: {
      reviewId: "review-059",
      recommendation: "approve",
    },
  },
  {
    id: "history-472",
    proposalId: "proposal-088",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-02-12T14:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-473",
    proposalId: "proposal-089",
    actorId: "speaker-user-014",
    action: "created",
    createdAt: "2026-03-01T08:00:00+03:00",
  },
  {
    id: "history-474",
    proposalId: "proposal-089",
    actorId: "speaker-user-014",
    action: "status_changed",
    createdAt: "2026-03-04T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-475",
    proposalId: "proposal-089",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-04T17:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-476",
    proposalId: "proposal-090",
    actorId: "speaker-user-005",
    action: "created",
    createdAt: "2026-03-04T05:00:00+03:00",
  },
  {
    id: "history-477",
    proposalId: "proposal-090",
    actorId: "speaker-user-005",
    action: "status_changed",
    createdAt: "2026-03-07T07:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-478",
    proposalId: "proposal-090",
    actorId: "manager-002",
    action: "reviewer_assigned",
    createdAt: "2026-03-07T16:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-479",
    proposalId: "proposal-090",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-07T18:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-480",
    proposalId: "proposal-090",
    actorId: "3",
    action: "review_added",
    createdAt: "2026-03-08T02:00:00+03:00",
    payload: {
      reviewId: "review-060",
      recommendation: "approve",
    },
  },
  {
    id: "history-481",
    proposalId: "proposal-090",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-08T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-482",
    proposalId: "proposal-091",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-26T06:00:00+03:00",
  },
  {
    id: "history-483",
    proposalId: "proposal-091",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-03-27T12:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-484",
    proposalId: "proposal-091",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-28T01:00:00+03:00",
    payload: {
      reviewerId: "reviewer-008",
    },
  },
  {
    id: "history-485",
    proposalId: "proposal-091",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-28T14:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-486",
    proposalId: "proposal-091",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-28T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-487",
    proposalId: "proposal-091",
    actorId: "reviewer-008",
    action: "review_added",
    createdAt: "2026-03-29T09:00:00+03:00",
    payload: {
      reviewId: "review-061",
      recommendation: "reject",
    },
  },
  {
    id: "history-488",
    proposalId: "proposal-091",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-03-29T17:03:00+03:00",
    payload: {
      commentId: "comment-030",
    },
  },
  {
    id: "history-489",
    proposalId: "proposal-091",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-03-29T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  },
  {
    id: "history-490",
    proposalId: "proposal-092",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-19T19:00:00+03:00",
  },
  {
    id: "history-491",
    proposalId: "proposal-092",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-03-23T22:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-492",
    proposalId: "proposal-092",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-24T09:00:00+03:00",
    payload: {
      reviewerId: "reviewer-007",
    },
  },
  {
    id: "history-493",
    proposalId: "proposal-093",
    actorId: "speaker-user-024",
    action: "created",
    createdAt: "2026-02-11T21:00:00+03:00",
  },
  {
    id: "history-494",
    proposalId: "proposal-093",
    actorId: "speaker-user-024",
    action: "status_changed",
    createdAt: "2026-02-14T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-495",
    proposalId: "proposal-094",
    actorId: "speaker-user-005",
    action: "created",
    createdAt: "2026-04-21T06:00:00+03:00",
  },
  {
    id: "history-496",
    proposalId: "proposal-094",
    actorId: "speaker-user-005",
    action: "status_changed",
    createdAt: "2026-04-25T09:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-497",
    proposalId: "proposal-094",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-25T18:00:00+03:00",
    payload: {
      reviewerId: "reviewer-010",
    },
  },
  {
    id: "history-498",
    proposalId: "proposal-094",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-04-26T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-499",
    proposalId: "proposal-094",
    actorId: "reviewer-010",
    action: "review_added",
    createdAt: "2026-04-26T08:00:00+03:00",
    payload: {
      reviewId: "review-062",
      recommendation: "reject",
    },
  },
  {
    id: "history-500",
    proposalId: "proposal-094",
    actorId: "reviewer-010",
    action: "comment_added",
    createdAt: "2026-04-26T10:03:00+03:00",
    payload: {
      commentId: "comment-031",
    },
  },
  {
    id: "history-501",
    proposalId: "proposal-095",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-04-12T01:00:00+03:00",
  },
  {
    id: "history-502",
    proposalId: "proposal-095",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-04-16T05:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-503",
    proposalId: "proposal-095",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-04-16T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-504",
    proposalId: "proposal-095",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-04-16T13:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-505",
    proposalId: "proposal-096",
    actorId: "speaker-user-003",
    action: "created",
    createdAt: "2026-02-17T23:00:00+03:00",
  },
  {
    id: "history-506",
    proposalId: "proposal-096",
    actorId: "speaker-user-003",
    action: "status_changed",
    createdAt: "2026-02-21T04:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-507",
    proposalId: "proposal-096",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-02-21T06:00:00+03:00",
    payload: {
      reviewerId: "reviewer-002",
    },
  },
  {
    id: "history-508",
    proposalId: "proposal-096",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-21T11:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-509",
    proposalId: "proposal-096",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-02-21T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-510",
    proposalId: "proposal-096",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-02-22T13:00:00+03:00",
    payload: {
      reviewId: "review-063",
      recommendation: "approve",
    },
  },
  {
    id: "history-511",
    proposalId: "proposal-097",
    actorId: "speaker-user-013",
    action: "created",
    createdAt: "2026-01-25T19:00:00+03:00",
  },
  {
    id: "history-512",
    proposalId: "proposal-097",
    actorId: "speaker-user-013",
    action: "status_changed",
    createdAt: "2026-01-28T23:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-513",
    proposalId: "proposal-097",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-01-29T13:00:00+03:00",
    payload: {
      reviewerId: "reviewer-003",
    },
  },
  {
    id: "history-514",
    proposalId: "proposal-097",
    actorId: "manager-003",
    action: "status_changed",
    createdAt: "2026-01-29T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-515",
    proposalId: "proposal-097",
    actorId: "reviewer-003",
    action: "review_added",
    createdAt: "2026-01-29T23:00:00+03:00",
    payload: {
      reviewId: "review-064",
      recommendation: "approve",
    },
  },
  {
    id: "history-516",
    proposalId: "proposal-097",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-01-30T08:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "accepted",
      }
    ],
    payload: {
      reason: "Заявка принята по итогам ревью.",
    },
  },
  {
    id: "history-517",
    proposalId: "proposal-097",
    actorId: "manager-002",
    action: "scheduled",
    createdAt: "2026-02-02T15:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "accepted",
        nextValue: "scheduled",
      }
    ],
    payload: {
      slotId: "slot-097",
    },
  },
  {
    id: "history-518",
    proposalId: "proposal-098",
    actorId: "speaker-user-020",
    action: "created",
    createdAt: "2026-03-16T05:00:00+03:00",
  },
  {
    id: "history-519",
    proposalId: "proposal-099",
    actorId: "speaker-user-010",
    action: "created",
    createdAt: "2026-02-25T01:00:00+03:00",
  },
  {
    id: "history-520",
    proposalId: "proposal-099",
    actorId: "speaker-user-010",
    action: "status_changed",
    createdAt: "2026-02-28T02:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-521",
    proposalId: "proposal-099",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-02-28T12:00:00+03:00",
    payload: {
      reviewerId: "3",
    },
  },
  {
    id: "history-522",
    proposalId: "proposal-100",
    actorId: "4",
    action: "created",
    createdAt: "2026-03-01T00:00:00+03:00",
  },
  {
    id: "history-523",
    proposalId: "proposal-100",
    actorId: "4",
    action: "status_changed",
    createdAt: "2026-03-02T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "draft",
        nextValue: "submitted",
      }
    ],
  },
  {
    id: "history-524",
    proposalId: "proposal-100",
    actorId: "manager-003",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T10:00:00+03:00",
    payload: {
      reviewerId: "reviewer-004",
    },
  },
  {
    id: "history-525",
    proposalId: "proposal-100",
    actorId: "2",
    action: "reviewer_assigned",
    createdAt: "2026-03-02T18:00:00+03:00",
    payload: {
      reviewerId: "reviewer-009",
    },
  },
  {
    id: "history-526",
    proposalId: "proposal-100",
    actorId: "manager-002",
    action: "status_changed",
    createdAt: "2026-03-02T21:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "submitted",
        nextValue: "in_review",
      }
    ],
  },
  {
    id: "history-527",
    proposalId: "proposal-100",
    actorId: "reviewer-004",
    action: "review_added",
    createdAt: "2026-03-03T03:00:00+03:00",
    payload: {
      reviewId: "review-065",
      recommendation: "reject",
    },
  },
  {
    id: "history-528",
    proposalId: "proposal-100",
    actorId: "reviewer-009",
    action: "review_added",
    createdAt: "2026-03-03T10:00:00+03:00",
    payload: {
      reviewId: "review-066",
      recommendation: "request_changes",
    },
  },
  {
    id: "history-529",
    proposalId: "proposal-100",
    actorId: "manager-003",
    action: "comment_added",
    createdAt: "2026-03-03T14:03:00+03:00",
    payload: {
      commentId: "comment-032",
    },
  },
  {
    id: "history-530",
    proposalId: "proposal-100",
    actorId: "2",
    action: "status_changed",
    createdAt: "2026-03-04T06:00:00+03:00",
    changes: [
      {
        field: "status",
        previousValue: "in_review",
        nextValue: "rejected",
      }
    ],
    payload: {
      reason: "Заявка отклонена по итогам ревью.",
    },
  }
] satisfies HistoryEntry[];

export const history: HistoryEntry[] = [...initialHistory];

export const createHistory = (
  proposalId: ID,
  actorId: ID,
  action: HistoryAction,
): HistoryEntry => {
  const historyItem: HistoryEntry = {
    id: crypto.randomUUID(),
    proposalId,
    actorId,
    action,
    createdAt: new Date().toISOString(),
  };

  history.push(historyItem);

  return historyItem;
};

export const appendProposalHistory = (
  proposalId: ID,
  userId: ID,
  patch: Partial<Proposal>,
  action: HistoryAction,
  payload?: Record<string, unknown>,
): HistoryEntry | null => {
  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return null;

  const historyItem = createHistory(proposalId, userId, action);

  const changedKeys = Object.keys(patch) as (keyof Proposal)[];

  let resultValues: ProposalFieldChange[] = changedKeys.map((value) => ({
    field: value,
    previousValue: proposal[value],
    nextValue: patch[value],
  }));

  resultValues = resultValues.filter(
    (item) => item.previousValue !== item.nextValue,
  );

  historyItem.changes = resultValues;
  if (payload) historyItem.payload = payload;

  return historyItem;
};
