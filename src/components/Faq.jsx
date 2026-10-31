import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { DURATIONS } from '../config/config';

export default function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(null); // number of the open question
  const max = t(`dur${Math.max(...DURATIONS)}`);
  return (
    <section className="section">
      <h2>{t('faqTitle')}</h2>
      <div className="faq">
        {[1, 2, 3, 4, 5].map((n) => {
          const isOpen = open === n;
          return (
            <div key={n} className="faq-item">
              <h3>
                <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`faq-a${n}`} onClick={() => setOpen(isOpen ? null : n)}>
                  <span>{t(`q${n}`, { max })}</span>
                  <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
                </button>
              </h3>
              {isOpen && (
                <p id={`faq-a${n}`} className="faq-a">
                  {t(`a${n}`, { max })}{n === 5 && <> <a href="#/support">{t('navSupport')}</a></>}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
