package com.lambdaschool.javaorders.services;

import com.lambdaschool.javaorders.models.Customer;
import com.lambdaschool.javaorders.models.Order;
import com.lambdaschool.javaorders.repos.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "customerservice")
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

    @Override
    public void delete(long id)
    {
        if (custrepos.findById(id).isPresent())
        {
            custrepos.deleteById(id);
        } else
        {
            throw new EntityNotFoundException("Id " + id);
        }
    }

    @Transactional
    @Override
    public Customer save(Customer customer)
    {
        // Initialize new customer object to be added to db
        Customer newCustomer = new Customer();

        newCustomer.setCustname(customer.getCustname());
        newCustomer.setCustcity(customer.getCustcity());
        newCustomer.setWorkingarea(customer.getWorkingarea());
        newCustomer.setCustcountry(customer.getCustcountry());
        newCustomer.setGrade(customer.getGrade());
        newCustomer.setOpeningamt(customer.getOpeningamt());
        newCustomer.setReceiveamt(customer.getReceiveamt());
        newCustomer.setPaymentamt(customer.getPaymentamt());
        newCustomer.setOutstandingamt(customer.getOutstandingamt());
        newCustomer.setPhone(customer.getPhone());

        // Loop over customer's orders and update them
        for (Order order : customer.getOrders())
        {
            newCustomer.getOrders().add(new Order(order.getOrdamount(), order.getAdvanceamount(), newCustomer, order.getOrddescription()));
        }

        return custrepos.save(newCustomer);
    }
}
