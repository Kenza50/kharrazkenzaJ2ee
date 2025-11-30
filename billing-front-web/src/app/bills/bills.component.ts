import { Component, OnInit } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styles: []
})
export class BillsComponent implements OnInit {
    bills: any;

    constructor(private billingService: BillingService, private router: Router) { }

    ngOnInit(): void {
        this.billingService.getBills().subscribe({
            next: (data) => {
                this.bills = data;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    onBillDetails(b: any) {
        this.router.navigateByUrl("/bill-details/" + b.id);
    }
}
