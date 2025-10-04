'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';

export default function PostDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const handleClickBack = () => router.back();

  const { data: post } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(Number(id)),
    refetchOnMount: false,
  });

  const userId = post?.userId;

  const { data: user } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserById(Number(userId)),
    refetchOnMount: false,
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClickBack} className={css.backBtn}>
            ← Back
          </button>

          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>{post?.title}</h2>
              </div>

              <p className={css.content}>{post?.body}</p>
            </div>
            <p className={css.user}>Author: {user?.name}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
