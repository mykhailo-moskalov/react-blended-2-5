'use client';

import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { Post } from '@/types/post';

export default function PostPreviewClient() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const [user, setUser] = useState<User | null>(null);

  const { data: post } = useQuery<Post>({
    queryKey: ['posts', postId],
    queryFn: () => fetchPostById(postId),
    refetchOnMount: false,
    enabled: !!id,
  });

  const userId = post?.userId;

  useEffect(() => {
    if (!userId) return;

    const fn = async () => {
      const resp = await fetchUserById(userId);
      setUser(resp);
    };
    fn();
  }, [userId]);

  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post?.title}</h2>
          </div>

          <p className={css.content}>{post?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
