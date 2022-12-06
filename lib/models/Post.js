const pool = require('../utils/pool');

module.exports = class Post {
  id;
  detail;
  github_id;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.github_id = row.github_id;
  }

  static async insert({ detail, github_id }) {
    const { rows } = await pool.query(
      `
            INSERT INTO posts (detail, github_id)
            VALUES ($1, $2)
            RETURNING *
            `,
      [detail, github_id]
    );
    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }
};
