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
  <div className={st.searchInputContainer}>
    <input
      type="text"
      placeholder={placeholder}
      className={st.searchInput}
      onChange={e => onChange?.(e.target.value)}
      value={value}
    />
    {value && <CloseIcon onClick={() => onChange?.('')} />}
  </div>
);

const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className={st.icon}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </button>
);
