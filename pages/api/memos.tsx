import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply CORS
  await new Promise((resolve, reject) => {
    cors(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  // Connect to SQLite database
  const db = await open({
    filename: '/database/database.db',
    driver: sqlite3.Database,
  });

  // Create memos table if not exists
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memo_num INTEGER UNIQUE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Memos table created or already exists.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
    return;
  }

  if (req.method === 'GET') {
    // Retrieve all memos
    try {
      const query = 'SELECT * FROM memos ORDER BY created_at DESC';
      const rows = await db.all(query);
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  } else if (req.method === 'POST') {
    // Add a new memo
    try {
      const content = req.body.content;
      const memoNumQuery = 'SELECT MAX(memo_num) as maxMemoNum FROM memos';
      const row = await db.get(memoNumQuery);
      const memo_num = row.maxMemoNum ? row.maxMemoNum + 1 : 1;
      const insertQuery = 'INSERT INTO memos (memo_num, content) VALUES (?, ?)';
      const result = await db.run(insertQuery, [memo_num, content]);
      res.status(201).json({ id: result.lastID, memo_num, content });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  } else if (req.method === 'DELETE') {
    // Delete a memo
    try {
      const memo_num = req.query.memo_num;
      const query = 'DELETE FROM memos WHERE memo_num = ?';
      const result = await db.run(query, memo_num);
      res.json({ deletedRows: result.changes });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  } else {
    res.status(405).send('Method not allowed');
  }

  // Close the database connection
  await db.close();
}


