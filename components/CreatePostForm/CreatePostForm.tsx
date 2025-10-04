'use client';

import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, fetchUsers } from '@/lib/api';

import css from './CreatePostForm.module.css';
import { User } from '@/types/user';
import toast from 'react-hot-toast';

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Content must be less than 50 characters')
    .required('Title is required'),
  body: Yup.string()
    .max(500, 'Content must be less than 500 characters')
    .required('Content is required'),
});

interface PostFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  body: string;
}

const initialValues: FormValues = {
  title: '',
  body: '',
};

export default function CreatePostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast('Post created successfully!');
      onClose();
    },
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(values);

    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.wrapper}>
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
          <div className={`${css.formGroup} ${css.selectGroup}`}>
            <label htmlFor="user">User</label>
            <span className={css.arrow}></span>
            <Field as="select" id="user" name="user" className={css.select}>
              {users &&
                users.map(({ name, id }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
            </Field>
          </div>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
