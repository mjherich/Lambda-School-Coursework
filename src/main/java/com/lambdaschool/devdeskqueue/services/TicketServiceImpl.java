package com.lambdaschool.devdeskqueue.services;

import com.lambdaschool.devdeskqueue.models.TicketAnswer;
import com.lambdaschool.devdeskqueue.models.User;
import com.lambdaschool.devdeskqueue.repository.TicketRepository;
import com.lambdaschool.devdeskqueue.models.Ticket;
import com.lambdaschool.devdeskqueue.repository.UserRepository;
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
    public Ticket update(Ticket ticket, long ticketid)
    {
        Ticket newTicket = ticketrepos.findById(ticketid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(ticketid)));

        if (ticket.getName() != null)
        {
            newTicket.setName(ticket.getName());
        }
        if (ticket.getCategory() != null)
        {
            newTicket.setCategory(ticket.getCategory());
        }
        if (ticket.getDescription() != null)
        {
            newTicket.setCategory(ticket.getCategory());
        }

        return ticketrepos.save(newTicket);
    }

    @Override
    public void assignHelper(long ticketid, long helperid)
    {
        Ticket ticket = ticketrepos.findById(ticketid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(ticketid)));
        User helper = userrepos.findById(helperid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(helperid)));
        ticket.setHelper(helper);
        ticketrepos.save(ticket);
    }

    @Override
    public List<Ticket> findTicketsByUsername(String username)
    {
        List<Ticket> tickets = new ArrayList<>();
        ticketrepos.findAll().iterator().forEachRemaining(tickets::add);
        tickets.removeIf(t -> !t.getStudent().getUsername().equalsIgnoreCase(username));
        return tickets;
    }

    @Override
    public List<Ticket> findInactiveTicketsByUsername(String username)
    {
        List<Ticket> tickets = new ArrayList<>();
        ticketrepos.findAll().iterator().forEachRemaining(tickets::add);
        tickets.removeIf(t -> !t.getStudent().getUsername().equalsIgnoreCase(username));
        tickets.removeIf(t -> t.isActive());
        return tickets;
    }

    @Override
    public Ticket findTicketById(long ticketid)
    {
        Ticket t = ticketrepos.findById(ticketid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(ticketid)));
        return t;
    }

    @Override
    public void addAnswer(TicketAnswer answer, long ticketid, String helperUsername)
    {
        Ticket t = ticketrepos.findById(ticketid)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(ticketid)));
        t.setResponse(answer.getAnswer());
        User helper = userrepos.findByUsername(helperUsername);
        t.setHelper(helper);
        t.setActive(false);
        ticketrepos.save(t);
    }
}
