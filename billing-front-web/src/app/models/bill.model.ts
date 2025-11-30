import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface ProductItem {
    id: number;
    productId: string;
    product?: Product;
    price: number;
    quantity: number;
    amount?: number;
}

export interface Bill {
    id: number;
    billingDate: Date;
    customerId: number;
    customer?: Customer;
    productItems: ProductItem[];
}
