import { useCallback, useEffect, useRef, useState } from 'react';
import { AuditPaginationResource } from './types';
import { fetchAuditPagination } from '../api/auditApi';
import { useAppDispatch } from '@/shared/store/hooks';
import { resetAuditFilters } from './auditSlice';
import { UsersResource } from '@/entities/user/api/types';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { fetchUsers } from '@/entities/user/api/userApi';
import { usePathname, useRouter } from 'next/navigation';
import { fetchReviewers } from '@/entities/reviewer/api/reviewerApi';
import { ReviewersResource } from '@/entities/reviewer/api/types';
import { CommentsResource } from '@/entities/comment/api/types';
import { fetchComments } from '@/entities/comment/api/commentApi';

const useAuditData = (searchParams: string) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [pagination, setPagination] = useState<AuditPaginationResource>({
    status: 'loading',
    data: null,
    errorProps: null,
  });

  const [reviewers, setReviewers] = useState<ReviewersResource>({
    status: 'loading',
    data: [],
  });

  const [comments, setComments] = useState<CommentsResource>({
    status: 'loading',
    data: [],
  });

  const [users, setUsers] = useState<UsersResource>({
    status: 'loading',
    data: [],
  });

  const paginationVersionRef = useRef(0);

  const reviewersToResource = toLoadableResource(
    reviewers.status,
    reviewers.data,
    'Данные ревьюера не удалось загрузить',
  );

  const commentsToResource = toLoadableResource(
    comments.status,
    comments.data,
    'Данные комментария не удалось загрузить',
  );

  const usersToResource = toLoadableResource(
    users.status,
    users.data,
    'Данные пользователя не удалось загрузить',
  );

  const auditFiltersReset = useCallback(() => {
    dispatch(resetAuditFilters());

    router.push(pathname);
  }, [dispatch, router, pathname]);

  // useEffect

  useEffect(() => {
    const getReviewers = async () => {
      const reviewersResource = await fetchReviewers();
      setReviewers(reviewersResource);
    };

    const getComments = async () => {
      const commentsResource = await fetchComments();
      setComments(commentsResource);
    };

    const getUsers = async () => {
      const usersResource = await fetchUsers();
      setUsers(usersResource);
    };

    getReviewers();
    getComments();
    getUsers();
  }, []);

  useEffect(() => {
    const getPagination = async () => {
      const saveVersion = ++paginationVersionRef.current;

      const paginationResource = await fetchAuditPagination(
        searchParams,
        getPagination,
        auditFiltersReset,
      );

      if (saveVersion !== paginationVersionRef.current) return;

      setPagination(paginationResource);
    };

    getPagination();
  }, [searchParams, auditFiltersReset]);

  // handlers

  return {
    pagination,
    reviewers: reviewersToResource,
    comments: commentsToResource,
    users: usersToResource,
    auditFiltersReset,
  };
};

export default useAuditData;
