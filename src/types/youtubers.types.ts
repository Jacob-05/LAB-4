export interface Youtuber {
  id: number;
  name: string;
  votes: number;
  weight: number;
  image: string;
}

export interface YoutubersData {
  youtubers: Youtuber[];
} 