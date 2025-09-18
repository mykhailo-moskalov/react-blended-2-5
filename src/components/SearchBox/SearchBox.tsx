import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      defaultValue={value}
      onChange={onSearch}
    />
  );
}
