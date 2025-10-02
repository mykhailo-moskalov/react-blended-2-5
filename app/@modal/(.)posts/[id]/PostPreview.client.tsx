'use client';

// import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
// import { fetchPostById, fetchUserById } from '@/lib/api';
// import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect } from 'react';
// import { User } from '@/types/user';

export default function PostPreviewClient() {
  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const handleClose = () => {};

  return (
    <Modal>
      <button className={css.backBtn}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>Post title</h2>
          </div>

          <p className={css.content}>Post body</p>
        </div>
        <p className={css.user}>User name</p>
      </div>
    </Modal>
  );
}
