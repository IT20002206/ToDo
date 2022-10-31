const {createPool} = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todolist',
  namedPlaceholders: true,
});

module.exports = {
  pool,
};
