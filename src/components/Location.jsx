import { useI18n } from '../i18n/I18nContext';
import { OPEN, CLOSE } from '../config/config';
import { ADDRESS, TOTAL_ROOMS } from '../config/venue';
import { BEDS } from '../config/config';
import { fmtTime } from '../utils/time';

export default function Location() {
  const { t, lang } = useI18n();
  return (
    <section className="section">
      <h2>{t('whereTitle')}</h2>
      <dl className="card info">
        <div className="row"><dt className="muted">{t('addressLabel')}</dt><dd>{ADDRESS[lang]}</dd></div>
        <div className="row"><dt className="muted">{t('hoursLabel')}</dt><dd>{t('hoursLine', { from: fmtTime(OPEN), to: fmtTime(CLOSE) })}</dd></div>
        <div className="row"><dt className="muted">{t('heroLabel')}</dt><dd>{t('roomsBeds', { rooms: TOTAL_ROOMS, beds: BEDS })}</dd></div>
      </dl>
    </section>
  );
}
