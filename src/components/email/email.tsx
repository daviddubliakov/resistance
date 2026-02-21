import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './email.module.css';

const Email = ({ title, titleInMail }: { title?: string; titleInMail?: string }) => {
  const email = 'che.dosye@proton.mail';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не вдалося скопіювати:', err);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <a
        className={`${styles.emailLink}`}
        href={`mailto:${email}?subject=${encodeURIComponent(titleInMail || '')}`}
      >
        {title ? title : email}
      </a>
      <button onClick={handleCopy} className={`${styles.copyButton}`} title="Скопіювати пошту">
        {copied ? (
          <Icon icon="solar:check-read-linear" color="#4caf50" width="18" />
        ) : (
          <Icon icon="solar:copy-linear" color="#888" width="18" />
        )}
      </button>
    </div>
  );
};

export default Email;
