import st from './not-found-results.module.css';

export const NotFoundResults = ({ message }: { message: string }) => {
  return (
    <div className={st.container}>
      <p className={st.message}>{message}</p>
    </div>
  );
};
