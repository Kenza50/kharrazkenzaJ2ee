import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '../services/billing.service';

@Component({
    selector: 'app-bill-details',
    templateUrl: './bill-details.component.html',
    styles: []
})
export class BillDetailsComponent implements OnInit {
    billId!: number;
    billDetails: any;

    constructor(private billingService: BillingService, private route: ActivatedRoute) {
        this.billId = route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.billingService.getBillById(this.billId).subscribe({
            next: (data) => {
                this.billDetails = data;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
