const crypto = require('crypto');

const KEY_LEN = 32;
const SALT_LEN = 16;
const ITERATIONS = 10000;
const DIGEST = 'sha256';

const getHash = (password, salt) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, ITERATIONS, KEY_LEN, DIGEST, (err, key) => {
    if (err) {
      reject('ERROR: FAILED TO DURING HASHING');
    } else {
      const buffer = Buffer.alloc(SALT_LEN + KEY_LEN);

      salt.copy(buffer);
      key.copy(buffer, salt.length);

      resolve(buffer.toString('base64'));
    }
  });
});

const getRandomBytes = () => new Promise((resolve, reject) => {
  crypto.randomBytes(SALT_LEN, (err, salt) => {
    if (err) {
      reject('ERROR: FAILED TO CREATE RANDOM SALT BYTES!');
    } else {
      resolve(salt);
    }
  });
});

const hash = (password) => {
  return getRandomBytes()
    .then(salt => getHash(password, salt))
    .catch((err) => {
      console.log('ERROR: ', err);
      if (err instanceof Error) {
        return Promise.reject('ERROR: UNKNOWN ERROR')
      }
      return Promise.reject(err);
    });
};

const compare = (password, storedHash) => {
  console.log('COMPARE!');
};

module.exports = { hash, compare };
