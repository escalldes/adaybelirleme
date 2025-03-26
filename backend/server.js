// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// JSON body'leri okuyabilmek için middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('nodejs çalıştı');
  });

// Rota dosyasını import et
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


const authenticateToken = require('./middlewares/authenticateToken');
app.get('/api/protected-route', authenticateToken, (req, res) => {
  // Artık req.user üzerinden token'dan gelen bilgilere erişebilirsiniz
  const userId = req.user.id;
  res.json({ message: `Hoşgeldin kullanıcı ID: ${userId}` });
});
// Diğer rotalar da eklenebilir...

app.listen(port, () => {
  console.log(`Server http://localhost:${port} üzerinde çalışıyor.`);
});
