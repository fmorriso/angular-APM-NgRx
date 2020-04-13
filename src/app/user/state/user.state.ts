// State for this feature (User)
import { User } from '../user';

export interface UserState {
	maskUserName: boolean;
	currentUser: User;
}

export const initialState: UserState = {
	maskUserName: true,
	currentUser: null,
};