import { Injectable, Inject, InjectionToken } from "@angular/core";
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ListenerCallback, IReducer, UnsubscribeCallback, IAction } from "./reducer";
import { IMiddleware } from "./middlewares";

export const InitialStateInjector = new InjectionToken('initial.state.injector');
export const MiddlewareInjector = new InjectionToken('initial.state.injector');
export const ReducerInjector = new InjectionToken('reducer.injector');

@Injectable()
export class Store<T> {

    // data members

    private _state: T;
    private _listeners: ListenerCallback[] = [];

    private _lastAction: IAction;
    get lastAction() {
        return this._lastAction;
    }

    private _middlewares: IMiddleware<T>[];

    // constructor

    constructor(
        @Inject(ReducerInjector) private reducer: IReducer<T>,
        @Inject(InitialStateInjector) initialState: T,
        @Inject(MiddlewareInjector) ...middlewares: IMiddleware<T>[]) {

        this._state = initialState;
        this._middlewares = middlewares;
    }

    ngOnDestroy() {
        this._lastAction = null;
        this._listeners = []
        this._middlewares.forEach(m => m.onDestroy());
        this._state = null;
    }

    // public functions

    actions(): Observable<IAction> {
        return new Observable<IAction>(subscriber => {
            return this.subscribe(action => subscriber.next(action));
        });
    }

    asObservable(): Observable<T> {
        return new Observable<T>(subscriber =>
            {
                subscriber.next(this.getState());

                return this.subscribe(() => subscriber.next(this.getState()));
            })
            .pipe(distinctUntilChanged());
    }

    /**
     * Helper function to receive only a slice of the state.
     */
    select<K1 extends keyof T>(property: K1): Observable<T[K1]>;
    select<K1 extends keyof T, K2 extends keyof T[K1]>(property1: K1, property2: K2): Observable<T[K1][K2]>;
    select<K1 extends keyof T, K2 extends keyof T[K1]>(property1: K1, property2?: K2): Observable<T[K1] | T[K1][K2]> {
        return this.asObservable()
            .pipe(map(state => {
                if (property2) {
                    return state[property1][property2];
                }

                return state[property1];
            }))
            .pipe(distinctUntilChanged());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);

        return () => {
            this._listeners = this._listeners.filter(currentListener => currentListener !== listener);
        };
    }

    getState(): T {
        return this._state;
    }

    dispatch(action: IAction): void {

        if (this.bypassAction(action))
            return;

        this._lastAction = action;
        this._state = this.reducer.buildState(this._state, action);

        this.callListeners(action);
        this.applyMiddlewares();
    }

    // private functions

    private bypassAction(action: IAction): boolean {

        if (action.bypassIfEqual && this._lastAction != null && this._lastAction.type == action.type && this._lastAction.payload == action.payload)
            return true;

        return false;
    }

    private callListeners(action) {

        this._listeners.forEach((listener: ListenerCallback) => listener(action));
    }

    private applyMiddlewares() {

        this._middlewares.forEach(middleware => {
            middleware.apply(this._state, this._lastAction);
        });
    }
}
