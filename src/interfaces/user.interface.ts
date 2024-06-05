export interface IUserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  active: boolean;
  user_points: UserPoint[];
}

interface UserPoint {
  id: string;
  user_id: string;
  game_id: string;
  points: number;
  game: Game;
}

interface Game {
  id: string;
  name: string;
}
