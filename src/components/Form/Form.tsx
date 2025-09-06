import { FiSearch } from "react-icons/fi";

import style from "./Form.module.css";

interface IForm {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: IForm) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("search") as string;

    if (query === "") {
      alert("Please enter the search query!");
      return;
    }
    onSubmit(query);
  };

  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to search?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
