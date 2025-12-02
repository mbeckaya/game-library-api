import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import GameController from './controllers/game-controller';
import { API_BASE, PORT } from './constants';
import { corsOptions } from './middlewares/cors';
import { validateGameBody } from './middlewares/game-middleware';
import { notFound } from './middlewares/not-found';

const gameController = new GameController();

export const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get(`${API_BASE}/games`, gameController.getGames);

app.get(`${API_BASE}/games/:id`, gameController.getGame);

app.post(`${API_BASE}/games`, validateGameBody, gameController.addGame);

app.put(`${API_BASE}/games/:id`, validateGameBody, gameController.updateGame);

app.delete(`${API_BASE}/games/:id`, gameController.deleteGame);

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});