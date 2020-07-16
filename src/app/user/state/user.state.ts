import { User } from '../user';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

export const UserInitialState: UserState = {
  maskUserName: true,
  currentUser: null
};
