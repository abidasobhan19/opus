function fail(res, result) {
  if (!result || !result.error) return false;
  res.status(result.status || 400).json({ error: result.error });
  return true;
}

function wrap(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function csv(res, filename, body) {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.send(body);
}

module.exports = { fail, csv, wrap };
