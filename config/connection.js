const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

module.exports = mongoose.connection;