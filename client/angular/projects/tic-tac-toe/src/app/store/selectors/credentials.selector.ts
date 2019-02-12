import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { CredentialsState } from "../states/credentials.state";

const selectCredentialsState = (state: AppState) => state.credentials;

export const listenForNickname = createSelector(
    selectCredentialsState,
    (state: CredentialsState) => state.nickname
);

export const listenForNicknameErrorMessage = createSelector(
    selectCredentialsState,
    (state: CredentialsState) => state.errorMessage
);
