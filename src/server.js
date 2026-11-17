require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');


connectDB();

const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/groups', require('./routes/group.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/albums', require('./routes/album.routes'));
app.use('/api/poll', require('./routes/poll.routes'));
app.use('/api/tickets', require('./routes/ticket.routes'));


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'My Social Networks API est opérationnelle 🚀',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint introuvable' });
});

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Conflit : cette ressource existe déjà.' });
  }
  res.status(err.status || 400).json({ error: err.message || 'Erreur serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Express lancé sur http://localhost:${PORT}`);
});