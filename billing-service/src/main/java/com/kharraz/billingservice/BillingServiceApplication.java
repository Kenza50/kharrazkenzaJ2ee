package com.kharraz.billingservice;

import com.kharraz.billingservice.entities.Bill;
import com.kharraz.billingservice.entities.ProductItem;
import com.kharraz.billingservice.feign.CustomerRestClient;
import com.kharraz.billingservice.feign.ProductRestClient;
import com.kharraz.billingservice.model.Customer;
import com.kharraz.billingservice.model.Product;
import com.kharraz.billingservice.repository.BillRepository;
import com.kharraz.billingservice.repository.ProductItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Collection;
import java.util.Date;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	private static final Logger log = LoggerFactory.getLogger(BillingServiceApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(BillRepository  billRepository,
										ProductItemRepository productItemRepository,
										CustomerRestClient customerRestClient,
										ProductRestClient productRestClient){

		return args -> {
			try {
				log.info("Starting billing service initialization...");
				
				// Fetch customers from customer-service via Feign client
				Collection<Customer> customers = customerRestClient.getAllCustomers().getContent();
				if (customers == null || customers.isEmpty()) {
					log.warn("No customers found in customer-service. Skipping bill generation.");
					return;
				}
				log.info("Found {} customers", customers.size());
				
				// Fetch products from inventory-service via Feign client
				Collection<Product> products = productRestClient.getAllProducts().getContent();
				if (products == null || products.isEmpty()) {
					log.warn("No products found in inventory-service. Skipping bill generation.");
					return;
				}
				log.info("Found {} products", products.size());

				// Generate bills for each customer
				customers.forEach(customer -> {
					try {
						Bill bill = Bill.builder()
								.billingDate(new Date())
								.customerId(customer.getId())
								.build();
						billRepository.save(bill);
						log.debug("Created bill {} for customer {}", bill.getId(), customer.getId());
						
						// Add product items to the bill
						products.forEach(product -> {
							try {
								ProductItem productItem = ProductItem.builder()
										.bill(bill)
										.productId(product.getId())
										.quantity(1 + new Random().nextInt(10))
										.unitPrice(product.getPrice())
										.build();
								productItemRepository.save(productItem);
								log.trace("Added product item {} to bill {}", product.getId(), bill.getId());
							} catch (Exception e) {
								log.error("Error creating product item for product {} in bill {}: {}", 
										product.getId(), bill.getId(), e.getMessage());
							}
						});
					} catch (Exception e) {
						log.error("Error creating bill for customer {}: {}", customer.getId(), e.getMessage());
					}
				});
				
				log.info("Billing service initialization completed successfully");
			} catch (Exception e) {
				log.error("Fatal error during billing service initialization: {}", e.getMessage(), e);
				throw new RuntimeException("Failed to initialize billing service", e);
			}
		};
	}

}
