import { fmtTime } from '../utils/time';

export default function TimeGrid({ slots, value, duration, onChange }) {
  return (
    <div className="time-grid">
      {slots.map(({ start, disabled }) => (
        <button key={start} type="button" className="chip time" disabled={disabled} aria-pressed={start === value} onClick={() => onChange(start)}>
          {fmtTime(start)}–{fmtTime(start + duration)}
        </button>
      ))}
    </div>
  );
}
