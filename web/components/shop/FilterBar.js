export function FilterBar({ filters, active, onToggle, onClear }) {
  return (
    <div className="filters">
      {filters.map(([id, label]) => (
        <button key={id} className={active.has(id) ? 'pill active' : 'pill'} type="button" onClick={() => onToggle(id)}>{label}</button>
      ))}
      <button className="clear" type="button" onClick={onClear}>Clear Selection</button>
    </div>
  );
}
