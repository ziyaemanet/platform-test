const mongoose = require('mongoose');

const revokeSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
}, { minimize: false });

module.exports = mongoose.model('revokes', revokeSchema);
