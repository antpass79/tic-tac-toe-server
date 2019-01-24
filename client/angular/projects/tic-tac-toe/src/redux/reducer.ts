export interface ListenerCallback {
    (action: IAction): void;
}

export interface UnsubscribeCallback {
    (): void;
}

export interface IAction {
    type: string;
    bypassIfEqual?: boolean;
    payload?: any;
}

export interface IReducer<T> {

    buildState(state: T, action: IAction): T;
}
