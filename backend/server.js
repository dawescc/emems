const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const createMemosTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS memos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            memo_num INTEGER UNIQUE,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Memos table created or already exists.");
        }
    });
};

createMemosTable();

app.get('/memos', (req, res) => {
    const query = "SELECT * FROM memos ORDER BY created_at DESC";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post('/memos', (req, res) => {
    const content = req.body.content;
    const memoNumQuery = "SELECT MAX(memo_num) as maxMemoNum FROM memos";
    db.get(memoNumQuery, [], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        const memo_num = row.maxMemoNum ? row.maxMemoNum + 1 : 1;
        const insertQuery = "INSERT INTO memos (memo_num, content) VALUES (?, ?)";
        db.run(insertQuery, [memo_num, content], function (err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).json({ id: this.lastID, memo_num, content });
            }
        });
    });
});

app.delete('/memos/:memo_num', (req, res) => {
    const query = "DELETE FROM memos WHERE memo_num = ?";
    db.run(query, [req.params.memo_num], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json({ deletedRows: this.changes });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
