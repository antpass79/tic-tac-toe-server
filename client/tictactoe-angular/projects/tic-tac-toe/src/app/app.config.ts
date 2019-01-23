import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

    // data members

    private configuration: any;
    private env: Object = null;

    // constructor

    constructor(private httpClient: HttpClient) {
    }

    // public functions

    public getValue(key: any) {
        return this.configuration[key];
    }

    public load(url) {
        return new Promise((resolve) => {

            this.httpClient.get<any>(url)
                .subscribe(configuration => {

                    this.configuration = configuration;
                    resolve();
                });
        });
    }
}
