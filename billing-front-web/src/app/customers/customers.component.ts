import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styles: []
})
export class CustomersComponent implements OnInit {
    customers: any;

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {
        this.customerService.getCustomers().subscribe({
            next: (data) => {
                this.customers = data;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
