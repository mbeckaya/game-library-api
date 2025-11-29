import { Request, Response } from 'express';
import { eq } from "drizzle-orm";
import status from 'http-status';
import { gamesTable } from '../db/schema';
import { db } from '../db/connection';
import { parseParamId } from '../utils/parse-param-id';
import { gameSchema } from '../validators/game-schema';
import type { Game } from '../types/game';
import { API_BASE } from '../constants';

export default class GameController {
    async getGames(request: Request, response: Response) {
        const games: Game[] = await db.select().from(gamesTable);
        const gamesWithHref: Game[] = games.map(game => ({
            ...game,
            href: `${API_BASE}/games/${game.id}`,
        }));

        response
            .status(status.OK)
            .send(gamesWithHref);
    }

    async getGame(request: Request, response: Response) {
        const id = parseParamId(request.params.id);

        const [game] = await db
            .select()
            .from(gamesTable)
            .where(eq(gamesTable.id, id));

        if (game) {
            response
                .status(status.OK)
                .send(game);
        } else {
            response
                .status(status.NOT_FOUND)
                .send('Game not found');
        }
    }

    async addGame(request: Request, response: Response) {
        const { error } = gameSchema.validate(request.body);

        if (error) {
            response
                .status(status.BAD_REQUEST)
                .send({ error: error.details });
            return false;
        }

        const game: Game = request.body;

        const [newGame] = await db
            .insert(gamesTable)
            .values(game);

        game.href = `${API_BASE}/games/${newGame.insertId}`;

        response
            .status(status.CREATED)
            .location(game.href)
            .send(game);
    }

    async updateGame(request: Request, response: Response) {
        const { error } = gameSchema.validate(request.body);

        if (error) {
            response
                .status(status.BAD_REQUEST)
                .send({ error: error.details });
            return false;
        }

        const id = parseParamId(request.params.id);
        const [game] = await db
            .select()
            .from(gamesTable)
            .where(eq(gamesTable.id, id));

        if (game) {
            await db
                .update(gamesTable)
                .set(request.body)
                .where(eq(gamesTable.id, id));

            response
                .status(status.OK)
                .send();
        } else {
            response
                .status(status.NOT_FOUND)
                .send('Game not found');
        }
    }

    async deleteGame(request: Request, response: Response) {
        const id = parseParamId(request.params.id);

        const result = await db
            .delete(gamesTable)
            .where(eq(gamesTable.id, id));

        if (result.rowsAffected === 0) {
            return response
                .status(status.NOT_FOUND)
                .send('Game not found');
        }

        response
            .status(status.OK)
            .send();
    }
}