import { platformsTable, genresTable, publishersTable, gamesTable } from './schema';
import { reset } from 'drizzle-seed';
import { db } from './connection';

async function seed() {
    console.log("Reset database...");
    await reset(db, {
        platformsTable,
        genresTable,
        publishersTable,
        gamesTable,
    });
    console.log("Reset database done!");

    console.log("Seeding...");

    await db.insert(platformsTable).values([
        { name: 'PSX' },
        { name: 'PS2' },
        { name: 'PS3' },
        { name: 'PS4' },
        { name: 'PS5' },
        { name: 'X360' },
        { name: 'XO' },
        { name: 'XSS' },
        { name: 'XSX' },
    ]);

    const platformsResult = await db.select().from(platformsTable);
    const getPlatformId =
        (name: string) => platformsResult.find(p => p.name === name)!.id;

    await db.insert(genresTable).values([
        { name: 'Horror' },
        { name: 'Action' },
        { name: 'Adventure' },
        { name: 'RPG' },
        { name: 'Sport' },
        { name: 'Racing' },
        { name: 'Fighting' },
        { name: 'Puzzle' },
        { name: 'Platformer' },
        { name: 'Shooter' },
        { name: 'Simulation' },
        { name: 'Strategy' },
        { name: 'Stealth' },
    ]);

    const genresResult = await db.select().from(genresTable);
    const getGenreId =
        (name: string) => genresResult.find(g => g.name === name)!.id;

    await db.insert(publishersTable).values([
        { name: 'Sony' },
        { name: 'Microsoft Studios' },
        { name: 'Ubisoft' },
        { name: 'EA' },
        { name: 'Capcom' },
        { name: 'Konami' },
        { name: 'Square Enix' },
        { name: 'Bandai Namco' },
        { name: 'SEGA' },
        { name: 'Bethesda' },
        { name: 'CD Projekt' },
        { name: 'Activision' },
        { name: '2K' },
    ]);

    const publisherResult = await db.select().from(publishersTable);
    const getPublisherId =
        (name: string) => publisherResult.find(p => p.name === name)!.id;

    const gamesList = [
        { title: 'Borderlands 4', platform: 'PS5', genre: 'Shooter', publisher: '2K', releaseYear: 2024 },
        { title: 'Lost Records: Bloom & Rage', platform: 'PS5', genre: 'Horror', publisher: 'Konami', releaseYear: 2023 },
        { title: 'Monster Hunter Rise + Sunbreak', platform: 'PS5', genre: 'Action', publisher: 'Capcom', releaseYear: 2023 },
        { title: 'Monster Hunter Wilds', platform: 'PS5', genre: 'Action', publisher: 'Capcom', releaseYear: 2024 },
        { title: 'Need for Speed: Unbound', platform: 'PS5', genre: 'Racing', publisher: 'EA', releaseYear: 2023 },
        { title: 'Ratchet & Clank', platform: 'PS5', genre: 'Action', publisher: 'Sony', releaseYear: 2021 },
        { title: 'Resident Evil 7', platform: 'PS5', genre: 'Horror', publisher: 'Capcom', releaseYear: 2017 },
        { title: 'Resident Evil Village', platform: 'PS5', genre: 'Horror', publisher: 'Capcom', releaseYear: 2021 },
        { title: 'Split Fiction', platform: 'PS5', genre: 'Adventure', publisher: 'Ubisoft', releaseYear: 2023 },
        { title: 'Stellar Blade', platform: 'PS5', genre: 'Action', publisher: 'Square Enix', releaseYear: 2023 },
        { title: 'Street Fighter 6', platform: 'PS5', genre: 'Fighting', publisher: 'Capcom', releaseYear: 2023 },
        { title: 'Silent Hill f', platform: 'PS5', genre: 'Horror', publisher: 'Konami', releaseYear: 2024 },
        { title: 'Little Nightmares III', platform: 'PS5', genre: 'Horror', publisher: 'Bandai Namco', releaseYear: 2023 },
    ];

    for (const game of gamesList) {
        await db.insert(gamesTable).values({
            title: game.title,
            platformId: getPlatformId(game.platform),
            genreId: getGenreId(game.genre),
            publisherId: getPublisherId(game.publisher),
            releaseYear: game.releaseYear,
            isDigital: false,
            isPhysical: true,
        });
    }

    console.log("Seed done!");
    process.exit(0);
}

(async () => {
    await seed();
})();
