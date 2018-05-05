module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.handle('INVALID TOKEN');
  } else {
    next();
  }
};
