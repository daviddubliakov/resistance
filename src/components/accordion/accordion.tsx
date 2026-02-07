import { ReactNode, useState } from 'react';
import st from './accordion.module.css';

export const Accordion = ({
  items,
  title,
  multiple = false,
}: {
  title: string;
  items: { question: ReactNode; answer: ReactNode }[];
  multiple?: boolean;
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndices(prev => {
      if (multiple) {
        return prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
      }
      return prev.includes(index) ? [] : [index];
    });
  };

  return (
    <section className={st.accordion}>
      <h2 className={st.title}>{title}</h2>
      <ul className={st.list}>
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <li key={index} className={st.item}>
              <button
                type="button"
                className={st.trigger}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
                id={`accordion-trigger-${index}`}
              >
                <span className={st.question}>{item.question}</span>
                <span className={`${st.icon} ${isOpen ? st.iconOpen : ''}`} aria-hidden />
              </button>
              <div
                id={`accordion-content-${index}`}
                role="region"
                aria-labelledby={`accordion-trigger-${index}`}
                className={`${st.content} ${isOpen ? st.contentOpen : ''}`}
              >
                <div className={st.contentInner}>
                  <div className={st.answer}>{item.answer}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
