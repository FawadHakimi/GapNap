import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../i18n/I18nContext';
import { fmtPrice, fmtTime } from '../utils/time';
import Logo from './Logo';

export default function Bill({ booking, onClose, closeLabel }) {
  const { t, fmtDate, fmtDateTime } = useI18n();
  const rows = [
    ['bookingNo', booking.number],
    ['name', booking.name],
    ['phone', booking.phone],
    ['bed', booking.bed],
    ['date', fmtDate(booking.date, { dateStyle: 'full' })],
    ['time', `${fmtTime(booking.start)}–${fmtTime(booking.start + booking.duration)}`],
    ['duration', t(`dur${booking.duration}`)],
    ['amount', fmtPrice(booking.amount)],
    ['paidAt', fmtDateTime(booking.paidAt)],
  ];
  return (
    <section className="bill">
      <div className="center"><Logo size="small" /></div>
      <p className="paid">{t('paidDone')}</p>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k} className="row"><dt className="muted">{t(k)}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className="qr"><div className="qr-box"><QRCodeSVG value={booking.number} size={96} bgColor="#ffffff" fgColor="#111111" /></div></div>
      <div className="actions no-print">
        <button type="button" className="btn" onClick={() => window.print()}>{t('print')}</button>
        <button type="button" className="btn primary" onClick={onClose}>{closeLabel}</button>
      </div>
    </section>
  );
}
