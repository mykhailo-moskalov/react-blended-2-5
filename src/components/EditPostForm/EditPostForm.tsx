import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./EditPostForm.module.css";
import { Post, PostFormValues } from "../../types/post";
import { PostFormSchema } from "../CreatePostForm/CreatePostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import toast from "react-hot-toast";

interface EditPostFormProps {
  post: Post | null;
  onClose: () => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post: PostFormValues) => editPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post edited successfully!");
      onClose();
    },
    onError: () => toast.error("Failed to edit post."),
  });

  const handleSubmit = (values: PostFormValues, actions: FormikHelpers<PostFormValues>) => {
    mutation.mutate(values, { onSuccess: () => actions.resetForm() });
  };

  return (
    <Formik
      initialValues={{
        title: post?.title || "",
        body: post?.body || "",
      }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={PostFormSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="body">Content</label>
            <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
            <ErrorMessage name="body" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || mutation.isPending}
            >
              Edit post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
