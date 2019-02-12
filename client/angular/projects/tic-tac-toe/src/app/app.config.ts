import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';

export abstract class IAppConfig {

    abstract getValue(key: string): any;
}

@Injectable()
export class AppConfig implements IAppConfig {

    // data members

    private configuration: any;

    // constructor

    constructor(private httpClient: HttpClient) {
    }

    // public functions

    public getValue(key: string): any {
        return this.configuration[key];
    }

    public async load(url: string) {
        
        return new Promise((resolve) => {

            this.httpClient.get<any>(url)
                .subscribe(configuration => {

                    this.configuration = configuration;
                    resolve();
                });
        });
    }
}

export function ConfigLoader(appConfig: AppConfig) {

    return () => appConfig.load('./assets/config.json');
}