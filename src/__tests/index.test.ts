import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { eq } from 'drizzle-orm';
import status from 'http-status';
import { db } from '../db/connection';
import { app } from '../index';
import { API_BASE } from '../constants';
import type { Game } from '../types/game';
import { gamesTable } from '../db/schema';

const testGame: Game = {
    title: 'My Dummy Game',
    platformId: 5,
    isPhysical: false,
    isDigital: true,
    genreId: 1,
    publisherId: 5,
    releaseYear: 2026
}

const createTestGame = async () => {
    const [g] = await db
        .insert(gamesTable)
        .values(testGame);

    return g.insertId;
}

const deleteGame = async (id: number) => {
    console.log('deleteGame')
    console.log(id)

    await db
        .delete(gamesTable)
        .where(eq(gamesTable.id, id));
}

describe('Game Routes', () => {
    it('GET /games => Get list of all games', async () => {
        const response = await request(app).get(`${API_BASE}/games`);

        expect(response.status).toBe(status.OK);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).greaterThan(0);
    });

    it('GET /games/1 => Get a specific game', async () => {
        const id = await createTestGame();
        const response = await request(app).get(`${API_BASE}/games/${id}`);

        expect(response.status).toBe(status.OK);
        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe(testGame.title);

        await deleteGame(response.body.id);
    });

    it('POST /games => Create a new game', async () => {
        const response = await request(app)
            .post(`${API_BASE}/games`)
            .send(testGame);

        expect(response.status).toBe(status.CREATED);
        expect(response.header.location).toBe(`${API_BASE}/games/${response.body.id}`);
        expect(response.body.title).toBe(testGame.title);

        console.log('DELETE')
        console.log(response.body.id)

        await deleteGame(response.body.id);
    });

    it('PUT /games/:id => Update an existing game', async () => {
        const id = await createTestGame();
        const payload: Game = { ...testGame };

        const response = await request(app)
            .put(`${API_BASE}/games/${id}`)
            .send(payload);

        expect(response.status).toBe(status.OK);
        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe(testGame.title);

        await deleteGame(id);
    });

    it('DELETE /games/:id => Remove a game', async () => {
        const id = await createTestGame();
        const response = await request(app).delete(`${API_BASE}/games/${id}`);

        expect(response.status).toBe(status.NO_CONTENT);
        expect(response.body).toEqual({});
    });
});
