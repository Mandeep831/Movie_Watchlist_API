export interface TmdbMovieResult {
  tmdbId: number;
  title: string;
  overview: string;
  releaseDate: string | null;
  posterPath: string | null;
  voteAverage: number | null;
}
 
interface TmdbSearchResponse {
  results: Array<{
    id: number;
    title: string;
    overview: string;
    release_date?: string;
    poster_path?: string | null;
    vote_average?: number;
  }>;
}
 
export const searchMoviesFromTmdb = async (
  query: string
): Promise<TmdbMovieResult[]> => {
  if (!process.env.TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY is not configured");
  }
 
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;
 
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
 
  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }
 
  const data = (await response.json()) as TmdbSearchResponse;
 
  return data.results.map((movie) => ({
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date || null,
    posterPath: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    voteAverage: movie.vote_average ?? null,
  }));
};
 