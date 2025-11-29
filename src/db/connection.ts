import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST ?? 'localhost',
    user: process.env.DATABASE_USER ?? 'root',
    password: process.env.DATABASE_PW ?? '',
    database: process.env.DATABASE_NAME ?? 'game_library',
});

export const db = drizzle(pool);