import { Action } from "@ngrx/store";

export enum CredentialsActionTypes {
    Nickname = '[Credentials] Nickname',
    NicknameSuccess = '[Credentials] Nickname Success',
    NicknameFailure = '[Credentials] Nickname Failure',
}

export class Nickname implements Action {
    public readonly type = CredentialsActionTypes.Nickname;
    constructor(public payload: string) {}
}

export class NicknameSuccess implements Action {
    public readonly type = CredentialsActionTypes.NicknameSuccess;
    constructor(public payload: string) {}
}

export class NicknameFailure implements Action {
    public readonly type = CredentialsActionTypes.NicknameFailure;
    constructor(public payload: any) {}
}

export type CredentialsActions =
    Nickname |
    NicknameSuccess |
    NicknameFailure;