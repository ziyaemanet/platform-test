const PORT = process.env.PORT || 8443;
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
// const path = require('path');
const fs = require('fs');
// require('dotenv').config();
const mongoose = require('mongoose');
// const jwt = require('express-jwt');
// const jwksRsa = require('jwks-rsa');

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: '',
//   }),
//   // Validate the audience and the issuer.
//   audience: 'https://localhost:8443',
//   issuer: 'https://localhost:8443',
//   algorithms: ['RS256'],
// });

const sslCert = {
  key: fs.readFileSync(`${__dirname}/../server.key`),
  cert: fs.readFileSync(`${__dirname}/../server.crt`),
  ca: fs.readFileSync(`${__dirname}/../ca.crt`),
  requestCert: true,
  rejectUnauthorized: false,
};

// configure mongoose
mongoose.Promise = Promise;
const MONGODB_URI = 'mongodb://user:password@ds014658.mlab.com:14658/dbtest';
mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || 'Mongo connected');
});

// server to redirect http to https
const appHTTP = express();
appHTTP.disable('x-powered-by');
const serverHTTP = require('http').createServer(appHTTP);

serverHTTP.listen(8080, (err) => {
  console.log(err || 'Express http redirect to https listening on port 8080');
});

appHTTP.get('*', (req, res) => {
  console.log('REDIRECTING TO HTTPS');
  res.writeHead(301, { Location: 'https://localhost:8443' });
  res.end();
});

// main https server
const app = express();
app.disable('x-powered-by');
const server = require('https').createServer(sslCert, app);

server.listen(PORT, (err) => {
  console.log(err || `Express https listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// error/send handle
app.use((req, res, next) => {
  res.handle = (err, data) => res.status(err ? 400 : 200).send(err || data);
  next();
});

// app.use('*', (req, res, next) => {
//   console.log('req.headers: ', req.headers);
//   next();
// });

// app.use('*', (req, res, next) => {
//   res.handle(null, 'SUCCESS');
//   console.log('SENDING!');
//   next();
//   // res.end();
// });

// TODO: check jwt
app.use('/user', require('./routes/user'));
// app.use('/logout', require('./routes/logout'));
app.use('/login', require('./routes/login'));
