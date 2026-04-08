export interface Review {
  id?: string;
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}