import { Logger } from "./logger";
import { IAction } from "./reducer";

export interface IMiddleware<T> {

    apply(state: T, action: IAction): boolean;

    onDestroy(): void;
}

export class LogMiddleware<T> implements IMiddleware<T> {

    private _logger: Logger;

    constructor(logger: Logger) {
        this._logger = logger;
    }

    apply(state: T, action: IAction) {

        this._logger.log(action);
        this._logger.log(state);
        return false;
    }

    onDestroy() {
        this._logger = null;
    }
}

export class DevToolsMiddleware<T> implements IMiddleware<T> {

    private devTools;

    constructor(initialState: T) {

        const extension = window['__REDUX_DEVTOOLS_EXTENSION__'];
        if (extension) {
            this.devTools = extension.connect();

            this.devTools.init(initialState);
        }
    }

    apply(state: T, action: IAction) {
        if (this.devTools) {
            this.devTools.send(action.type, state);
        }

        return true;
    }

    onDestroy() {
        this.devTools.unsubscribe();
    }

    subscribe(fn) {
        if (this.devTools) {
            this.devTools.subscribe(fn);
        }
    }
}
