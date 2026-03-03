import st from './text-field.module.css';

export const TextField = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => (
  <input
    type="text"
    placeholder={placeholder}
    className={st.searchInput}
    onChange={e => onChange?.(e.target.value)}
    value={value}
  />
);
