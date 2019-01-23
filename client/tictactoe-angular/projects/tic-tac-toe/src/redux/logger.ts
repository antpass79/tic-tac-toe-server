import { Injector } from "@angular/core/src/di";
//import { AppConfig } from "@se/ecg.viewer.html5/app/app.config";

export class Logger {

    // data members

    _log: boolean = false;

    // constructor

    constructor(log: boolean) {

        this._log = log;
    }

    // public functions

    log(message?: any, ...optionalParams: any[]) {

        if (!this._log)
            return;

        console.log(message, optionalParams);
    }
}

export function LoggerFactory(injector: Injector): Logger {

    //let appConfig = injector.get(AppConfig) as AppConfig;
    //return new Logger(appConfig.getValue("log"));
    return new Logger(true);
}
