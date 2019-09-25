package com.lambdaschool.starthere.services;

import com.lambdaschool.starthere.models.Ticket;
import com.lambdaschool.starthere.models.User;
import com.lambdaschool.starthere.repository.TicketRepository;
import com.lambdaschool.starthere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service(value = "ticketService")
public class TicketServiceImpl implements TicketService
{
    @Autowired
    private TicketRepository ticketrepos;

    @Autowired
    private UserRepository userrepos;

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

    @Override
    public void assignHelper(long ticketid, long helperid)
    {
        Ticket ticket = ticketrepos.findById(ticketid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(ticketid)));
        User helper = userrepos.findById(helperid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(helperid)));
        ticket.setUser(helper);
        ticketrepos.save(ticket);
    }
}
