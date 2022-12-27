package com.lambdaschool.javaorders.services;

import com.lambdaschool.javaorders.models.Order;
import com.lambdaschool.javaorders.repos.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service(value = "orderservice")
public class OrderServiceImpl implements OrderService
{
    @Autowired
    private OrdersRepository ordrepos;

    @Transactional
    @Override
    public Order save(Order order)
    {
        // Initialize new order object to be added to db
        Order newOrder = new Order();

        // Set fields of new order object
        newOrder.setOrdamount(order.getOrdamount());
        newOrder.setAdvanceamount(order.getAdvanceamount());
        newOrder.setCustomer(order.getCustomer());
        newOrder.setOrddescription(order.getOrddescription());

        return ordrepos.save(newOrder);
    }
}
