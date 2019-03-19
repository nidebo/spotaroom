const path = require('path');
const express = require('express');
const app = express();
const roomService = require('./service/roomService');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const { homecards } = await roomService.getRooms();
  res.render('index', { rooms: homecards });
});

app.get('/api/homecards', async (req, res) => {
  const rooms = await roomService.getRooms();
  res.json(rooms);
});

app.listen(3000, function () {
    console.log('Server is up listening on port 3000...');
});
  