export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EpisodeResponse {
  results: Episode[];
  info: any;
}