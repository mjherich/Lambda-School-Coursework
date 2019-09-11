package com.lambdaschool.javaorders.services;

import com.lambdaschool.javaorders.models.Customer;

import java.util.List;

public interface CustomerService
{
    List<Customer> findAll();
    Customer findByCustomerName(String name);
}
