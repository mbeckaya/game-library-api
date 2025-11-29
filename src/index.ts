import express from 'express';
import 'dotenv/config';
import GameController from './controllers/game-controller';
import { API_BASE, PORT } from './constants';

const app = express();

const gameController = new GameController();

app.use(express.json());

app.get(`${API_BASE}/games`, gameController.getGames);

app.get(`${API_BASE}/games/:id`, gameController.getGame);

app.post(`${API_BASE}/games/`, gameController.addGame);

app.put(`${API_BASE}/games/:id`, gameController.updateGame);

app.delete(`${API_BASE}/games/:id`, gameController.deleteGame);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});