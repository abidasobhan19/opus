const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', '..', 'admin.css'), 'utf8');

function prefixSelector(selector) {
  return selector.split(',').map((part) => {
    let s = part.trim();
    if (!s) return s;
    s = s.replace(/^html,\s*body\b/, '.adm');
    s = s.replace(/^html\b/, '.adm');
    s = s.replace(/^body\b/, '.adm');
    if (s === '*') return '.adm, .adm *';
    if (s.startsWith('.adm')) return s;
    return '.adm ' + s;
  }).join(', ');
}

function prefix(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf('@media', i);
    if (at === -1) {
      out += prefixPlain(css.slice(i));
      break;
    }
    out += prefixPlain(css.slice(i, at));
    const brace = css.indexOf('{', at);
    let depth = 0;
    let j = brace;
    for (; j < css.length; j++) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    const header = css.slice(at, brace + 1);
    const inner = css.slice(brace + 1, j - 1);
    out += header + prefixPlain(inner) + '}';
    i = j;
  }
  return out;
}

function prefixPlain(chunk) {
  return chunk.replace(/([^{}@]+)\{/g, (match, sel) => prefixSelector(sel) + ' {');
}

const outDir = path.join(__dirname, '..', 'styles');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'admin.css'), prefix(src));
console.log('wrote admin.css');
