const {v4: uuid} = require('uuid');
const {pool} = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    if (!obj.text || obj.text.length < 3 || obj.text.length > 50) {
      throw new Error(
        'Todo must have at least 3 characters and less than 50 characters'
      );
    }

    this.id = obj.id;
    this.text = obj.text;
  }

  static async listAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map((obj) => new TodoRecord(obj));
  }

  static async getOne(id) {
    const [results] = await pool.execute(
      'SELECT * FROM `todos` WHERE `id` = :id',
      {
        id,
      }
    );
    return results.length === 0 ? null : new TodoRecord(results[0]);
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `todos`(`text`) VALUES(:text)', {
      id: this.id,
      text: this.text,
    });

    return this.id;
  }

  async update(id, text) {
    await pool.execute('UPDATE `todos` SET `text` = :text WHERE `id` = :id', {
      id,
      text,
    });
  }

  async delete() {
    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
      id: this.id,
    });
  }
}

module.exports = {
  TodoRecord,
};
