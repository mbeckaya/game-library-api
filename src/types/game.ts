export interface Game {
    title: string,
    platformId: number,
    isPhysical: boolean,
    isDigital: boolean,
    genreId: number,
    publisherId: number,
    releaseYear: number,
    id?: number,
    href?: string,
}