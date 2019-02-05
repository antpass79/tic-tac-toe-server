import { HttpClient } from "@angular/common/http";

import { IAppConfig } from "../app/app.config";
import { Injectable } from "@angular/core";

@Injectable()
export class MockAppConfig implements IAppConfig {

    // data members

    private configuration: any;

    // constructor

    constructor() {

        this.configuration = {
            "endpoint": "http://localhost:3000/tictactoe/"
        };
    }

    // public functions

    public getValue(key: string): any {
        return this.configuration[key];
    }
}
