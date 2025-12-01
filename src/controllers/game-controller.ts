import { Request, Response } from 'express';
import { eq } from "drizzle-orm";
import status from 'http-status';
import { gamesTable } from '../db/schema';
import { db } from '../db/connection';
import { parseParamId } from '../utils/parse-param-id';
import type { Game } from '../types/game';
import { API_BASE, GAME_NOT_FOUND } from '../constants';

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
                .send(GAME_NOT_FOUND);
        }
    }

    async addGame(request: Request, response: Response) {
        const game: Game = request.body;

        const [newGame] = await db
            .insert(gamesTable)
            .values(game);

        game.id = newGame.insertId;
        game.href = `${API_BASE}/games/${game.id}`;

        response
            .status(status.CREATED)
            .location(game.href)
            .send(game);
    }

    async updateGame(request: Request, response: Response) {
        const id = parseParamId(request.params.id);
        const body: Game = request.body;

        const [game] = await db
            .select()
            .from(gamesTable)
            .where(eq(gamesTable.id, id));

        if (game) {
            await db
                .update(gamesTable)
                .set(body)
                .where(eq(gamesTable.id, id));

            if (!body.id) body.id = id;

            response
                .status(status.OK)
                .send(body);
        } else {
            response
                .status(status.NOT_FOUND)
                .send(GAME_NOT_FOUND);
        }
    }

    async deleteGame(request: Request, response: Response) {
        const id = parseParamId(request.params.id);

        await db
            .delete(gamesTable)
            .where(eq(gamesTable.id, id));

        response.sendStatus(status.NO_CONTENT);
    }
}