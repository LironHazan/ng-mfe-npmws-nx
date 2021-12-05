import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedDataAccess<T> {

    private _data: BehaviorSubject<{event: string, data: T}> = new BehaviorSubject({event: '', data: {} as T});

    public register(): Observable<{event: string, data: T}> {
      return this._data.asObservable();
    }

    public update(data: {event: string, data: T}) {
        this._data.next(data);
    }
}
