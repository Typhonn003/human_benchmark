export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  user_points: IUserPoint[];
}

interface IUserPoint {
  id: string;
  user_id: string;
  game_id: string;
  points: number;
  game: IGame;
}

interface IGame {
  id: string;
  name: string;
}

export interface IUserUpdate {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}
