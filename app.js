const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'interiittask'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('A user connected');

  // Simulated live score data
  const liveScores = [
    { team: 'Team A', score: 0 },
    { team: 'Team B', score: 0 }
  ];

  socket.emit('updateScores', liveScores);
  db.query(
    'UPDATE scores SET score = score + ? WHERE team = ?',
    ["Team A", 0],
    (err, results) => {
      if (err) throw err;}
    );
    db.query(
        'UPDATE scores SET score = score + ? WHERE team = ?',
        ["Team B", 0],
        (err, results) => {
          if (err) throw err;}
        );




  socket.on('updateScore', ({ team, points }) => {
    db.query(
      'UPDATE scores SET score = score + ? WHERE team = ?',
      [points, team],
      (err, results) => {
        if (err) throw err;

        db.query('SELECT * FROM scores', (err, rows) => {
          if (err) throw err;

          const updatedScores = rows.map(row => {
            return { team: row.team, score: row.score };
          });

          io.emit('updateScores', updatedScores);
        });
      }
    );
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
