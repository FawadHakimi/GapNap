import { useI18n } from '../i18n/I18nContext';
import { OPEN, CLOSE } from '../config/config';
import { ADDRESS } from '../config/venue';
import { fmtTime } from '../utils/time';
import ContactButtons from './ContactButtons';
import SupportForm from './SupportForm';

export default function Support({ initialBooking }) {
  const { t, lang } = useI18n();
  return (
    <section>
      <h1 className="page-title">{t('supportTitle')}</h1>
      <p className="muted">{t('supportLead')}</p>
      <h2>{t('contactTitle')}</h2>
      <ContactButtons />
      <h2>{t('formTitle')}</h2>
      <SupportForm initialBooking={initialBooking} />
      <h2>{t('infoTitle')}</h2>
      <dl className="card info">
        <div className="row"><dt className="muted">{t('hoursLabel')}</dt><dd>{t('hoursLine', { from: fmtTime(OPEN), to: fmtTime(CLOSE) })}</dd></div>
        <div className="row"><dt className="muted">{t('addressLabel')}</dt><dd>{ADDRESS[lang]}</dd></div>
      </dl>
    </section>
  );
}
