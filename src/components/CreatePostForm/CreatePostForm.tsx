import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import toast from "react-hot-toast";
import { PostFormValues } from "../../types/post";

interface CreatePostFormProps {
  onClose: () => void;
}

const initialValues: PostFormValues = {
  title: "",
  body: "",
};

export const PostFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  body: Yup.string().max(500, "Content is too long").required("Content is required"),
});

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (post: PostFormValues) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
      onClose();
    },
    onError: () => toast.error("Failed to create post."),
  });

  const handleSubmit = (values: PostFormValues, actions: FormikHelpers<PostFormValues>) => {
    mutation.mutate(values, { onSuccess: () => actions.resetForm() });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostFormSchema}>
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="body">Content</label>
            <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
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
              Create post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
