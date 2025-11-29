import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        port: 3306,
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PW!,
        database: process.env.DATABASE_NAME!,
    },
});
