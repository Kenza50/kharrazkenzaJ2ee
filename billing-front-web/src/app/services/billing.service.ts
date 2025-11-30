import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BillingService {
    private host = "http://localhost:8888/billing-service";

    constructor(private http: HttpClient) { }

    public getBills(): Observable<any> {
        return this.http.get(`${this.host}/api/bills`);
    }

    public getBillById(id: number): Observable<any> {
        return this.http.get(`${this.host}/bills/${id}`);
    }
}
