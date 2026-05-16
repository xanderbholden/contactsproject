const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);

    _db = client.db();

    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};