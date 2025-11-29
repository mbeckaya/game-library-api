import { platformsTable, genresTable, publishersTable, gamesTable } from './schema';
import { db } from './connection';

async function seed() {
    console.log("Seeding...");

    const [platform] = await db.insert(platformsTable).values({ name: 'PS5' });
    const [genre] = await db.insert(genresTable).values({ name: 'Action' });
    const [publisher] = await db.insert(publishersTable).values({ name: 'Sony' });

    await db.insert(gamesTable).values({
        title: 'Spider-Man 2',
        platformId: platform.insertId,
        genreId: genre.insertId,
        publisherId: publisher.insertId,
        releaseYear: 2023,
        isDigital: true,
        isPhysical: false,
    });

    console.log("Seed done!");
    process.exit(0);
}

(async () => {
    await seed();
})();
