import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const LINKS = [['home', '#/', 'navHome'], ['book', '#/book', 'navBook'], ['find', '#/find', 'navFind']];

export default function Header({ page }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [page]); // close the phone menu after navigating

  return (
    <header className="header no-print">
      <div className="container header-in">
        <a href="#/" className="logo-link"><Logo size="small" /></a>
        <nav id="main-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {LINKS.map(([key, href, label]) => (
            <a key={key} href={href} className="nav-link" aria-current={page === key ? 'page' : undefined}>{t(label)}</a>
          ))}
        </nav>
        <div className="header-right">
          <LanguageSwitcher />
          <button type="button" className="menu-btn" aria-label={t('menu')} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
