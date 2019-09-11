package com.lambdaschool.javaorders.services;

import com.lambdaschool.javaorders.models.Customer;
import com.lambdaschool.javaorders.repos.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class CustomerServiceImpl implements CustomerService
{
    @Autowired
    private CustomersRepository custrepos;

    @Override
    public List<Customer> findAll()
    {
        List<Customer> ret = new ArrayList<>();
        custrepos.findAll().iterator().forEachRemaining(ret::add);
        return ret;
    }

    @Override
    public Customer findByCustomerName(String name)
    {
        Customer customer = custrepos.findByName(name);

        if (customer == null)
        {
            throw new EntityNotFoundException("Customer Not Found " + name);
        }
        return customer;
    }
}
