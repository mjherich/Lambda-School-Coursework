package com.lambdaschool.javaorders.controllers;

import com.lambdaschool.javaorders.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomersController
{
    @Autowired
    private CustomersService customersService;

    // GET http://localhost:2019/customer/order - Returns all customers with their orders
    @GetMapping(value = "/customer/order",
            produces = {"application/json"})
    public ResponseEntity<?> listAllOrders()
    {

    }

    // GET http://localhost:2019/customer/name/{custname} - Returns all orders for a particular customer based on name
    @GetMapping(value = "/customer/name/{custname}",
            produces = {"application/json"})
    public ResponseEntity<?> getCustomerOrders(
            @PathVariable
                    String custname)
    {
        Customer c = customersService.find
    }

    // POST http://localhost:2019/data/customer/new - Adds a new customer including any new orders

}
