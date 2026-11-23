export function Popup({ popup, onClose }) {
  if (!popup) return null;
  return (
    <div className="popup-overlay" onClick={() => popup.type === 'error' && onClose()}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className={'popup-icon ' + popup.type}>{popup.type === 'success' ? '✓' : '!'}</div>
        <h4>{popup.title}</h4>
        <p>{popup.msg}</p>
        {popup.type === 'error' ? <button type="button" onClick={onClose}>Got it</button> : null}
      </div>
    </div>
  );
}
