package com.lambdaschool.starthere.services;

import com.lambdaschool.starthere.models.Ticket;
import com.lambdaschool.starthere.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "ticketService")
public class TicketServiceImpl implements TicketService
{
    @Autowired
    private TicketRepository ticketrepos;

    @Override
    public List<Ticket> findAllTickets()
    {
        List<Ticket> tickets = new ArrayList<>();
        ticketrepos.findAll().iterator().forEachRemaining(tickets::add);
        return tickets;
    }

    @Override
    public Ticket save(Ticket ticket)
    {
        return ticketrepos.save(ticket);
    }
}
