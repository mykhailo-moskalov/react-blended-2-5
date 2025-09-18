import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";
import toast from "react-hot-toast";
import { Post } from "../../types/post";
interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => toast.error("Failed to delete post."),
  });

  return (
    <ul className={css.list}>
      {posts.map((p) => (
        <li className={css.listItem} key={p.id}>
          <h2 className={css.title}>{p.title}</h2>
          <p className={css.content}>{p.body}</p>
          <div className={css.footer}>
            <button
              className={css.edit}
              onClick={() => {
                toggleEditPost(p);
                toggleModal();
              }}
            >
              Edit
            </button>
            <button
              className={css.delete}
              onClick={() => {
                if (p.id) deleteMutation.mutate(p.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
