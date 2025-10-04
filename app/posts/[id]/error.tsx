'use client';

import css from './PostDetails.module.css';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button className={css.backBtn} onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
