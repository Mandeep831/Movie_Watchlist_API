export default interface Watchlist {
    id?: string;
    userId: string;
    movieId: string;
    status: string;
    createdAt?: Date;
    updateAt?: Date;
}