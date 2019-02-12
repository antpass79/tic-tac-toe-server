import { initialCredentialsState, CredentialsState } from "../states/credentials.state";
import { CredentialsActions, CredentialsActionTypes } from "../actions/credentials.actions";

export const credentialsReducer = (
    state = initialCredentialsState,
    action: CredentialsActions
): CredentialsState => {

    switch (action.type) {
        case CredentialsActionTypes.NicknameSuccess: {
            return {
                ...state, nickname: action.payload, errorMessage: null
            };
        }
        case CredentialsActionTypes.NicknameFailure: {
            return {
                ...state, nickname: null, errorMessage: 'Invalid nickname'
            };
        }

        default:
            return state;
    }
}