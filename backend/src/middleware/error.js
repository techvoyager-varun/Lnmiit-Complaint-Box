function errorHandler(err, _req, res, _next) {
  console.error(err);
  if (err && typeof err === 'object' && 'status' in err) {
    const status = err.status ?? 500;
    const message = err.message ?? 'Server error';
    res.status(status).json({ message });
    return;
  }
  res.status(500).json({ message: 'Server error' });
}

module.exports = { errorHandler };


