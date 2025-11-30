import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { BillsComponent } from './bills/bills.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';

const routes: Routes = [
    { path: "products", component: ProductsComponent },
    { path: "customers", component: CustomersComponent },
    { path: "bills", component: BillsComponent },
    { path: "bill-details/:id", component: BillDetailsComponent },
    { path: "", redirectTo: "/products", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
