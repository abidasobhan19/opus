export function ProductArt({ art, title }) {
  const word = (title || 'Opus').split(' ')[0];
  if (art === 'book') return <div className="book" />;
  if (art === 'poster') return <div className="poster-hang" />;
  if (art === 'diamond') return <div className="diamond" />;
  if (art === 'teal') return <div className="mock tealbg" />;
  if (art === 'brochure') return <div className="mock dark" />;
  if (art === 'table') return <div className="tablecard">TABLE CARD</div>;
  if (art === 'flag') return <div className="flagpole"><div className="flag" /></div>;
  return (
    <div className="mock">
      <span className="script">{word}<br /><small>MOCKUP</small></span>
    </div>
  );
}

export function artTone(art) {
  if (art === 'book' || art === 'script' || art === 'table') return 'beige';
  if (art === 'diamond') return 'sand';
  return 'grey';
}
