import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private host = "http://localhost:8888/inventory-service";

    constructor(private http: HttpClient) { }

    public getProducts(): Observable<any> {
        return this.http.get(`${this.host}/api/products`);
    }
}
