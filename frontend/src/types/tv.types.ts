type UrlImage = `/${string}.jpg`;
type StrDate = `${number}-${number}-${number}`;

export interface GetDiscoverTv {
  page: number;
  results: {
    backdrop_path: UrlImage;
    first_air_date: StrDate;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: Uppercase<string>[];
    original_language: Lowercase<string>;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: UrlImage;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

export interface GetListOfGenresTv {
  genres: { id: number; name: string }[];
}

export interface GetSearchTv {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: UrlImage;
    genre_ids: number[];
    id: number;
    origin_country: Uppercase<string>[];
    original_language: Lowercase<string>;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: UrlImage;
    first_air_date: StrDate;
    name: string;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

export interface GetTrendingTv {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: UrlImage;
    id: number;
    name: string;
    original_language: Lowercase<string>;
    original_name: string;
    overview: string;
    poster_path: UrlImage;
    media_type: Lowercase<string>;
    genre_ids: number[];
    popularity: number;
    first_air_date: StrDate;
    vote_average: number;
    vote_count: number;
    origin_country: Uppercase<string>[];
  }[];
  total_pages: number;
  total_results: number;
}
