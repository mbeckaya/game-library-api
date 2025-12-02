import { CorsOptions } from 'cors';

const whitelist = [
    'http://localhost:5173' // https://github.com/mbeckaya/game-library-frontend
];

export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, '');

        if (whitelist.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
};