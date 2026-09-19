/**Model de donnée pour Une participation d'un pays à une édition des Jeux olympiques. */
export interface Participation {
id: number,
year: number,
city: string,
medalsCount: number,
athleteCount: number
}
/** Model de donnée pour un pays. */
export interface Olympic {
id: number,
country: string,
participations: Participation[]
}
