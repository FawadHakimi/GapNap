export default function StatusMessage({ kind = 'error', children, action }) {
  return (
    <div className={`msg msg-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span>{children}</span>
      {action}
    </div>
  );
}
