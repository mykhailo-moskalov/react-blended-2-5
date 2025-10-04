import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { Post } from '@/types/post';
import { deletePost } from '@/lib/api';
import css from './PostList.module.css';
import toast from 'react-hot-toast';

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <Link className={css.link} href={`/posts/${post.id}`} scroll={false}>
              View details
            </Link>
            <button
              className={css.link}
              onClick={() => {
                toggleModal();
                toggleEditPost(post);
              }}
            >
              Edit
            </button>
            <button className={css.button} onClick={() => mutation.mutate(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
