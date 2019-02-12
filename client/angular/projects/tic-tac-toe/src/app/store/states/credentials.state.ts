import { Side } from "./board.state";

export interface CredentialsState {

    readonly nickname: string;
    readonly errorMessage: string;
}

export const initialCredentialsState: CredentialsState = {

    nickname: null,
    errorMessage: null
}

export function getInitialCredentialsState(): CredentialsState {
    return initialCredentialsState;
}