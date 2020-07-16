// Representation of the entire app state

import { UserState } from '../user/state/user.state';

// Extended by lazy loaded modules
export interface State {
  user: UserState;
}
