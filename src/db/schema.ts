import { boolean, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const platformsTable = mysqlTable('platforms', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar({ length: 10 }).notNull(),
});

export const genresTable = mysqlTable('genres', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar({ length: 50 }).notNull(),
});

export const publishersTable = mysqlTable('publishers', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar({ length: 50 }).notNull(),
});

export const gamesTable = mysqlTable('games', {
    id: int('id').autoincrement().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    platformId: int('platform_id').notNull().references(() => platformsTable.id),
    isPhysical: boolean('is_physical').notNull().default(false),
    isDigital: boolean('is_digital').notNull().default(false),
    genreId: int('genre_id').notNull().references(() => genresTable.id),
    publisherId: int('publisher_id').notNull().references(() => publishersTable.id),
    releaseYear: int('release_year').notNull()
});