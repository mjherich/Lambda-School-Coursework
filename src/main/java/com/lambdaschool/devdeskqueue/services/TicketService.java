package com.lambdaschool.devdeskqueue.services;

import com.lambdaschool.devdeskqueue.models.Ticket;
import com.lambdaschool.devdeskqueue.models.TicketAnswer;

import java.util.List;

public interface TicketService
{
    List<Ticket> findAllTickets();

    List<Ticket> findTicketsByUsername(String username);

    List<Ticket> findInactiveTicketsByUsername(String username);

    Ticket findTicketById(long ticketid);

    Ticket save(Ticket ticket);

    Ticket update(Ticket ticket, long ticketid);

    void assignHelper(long ticketid, long helperid);

    void addAnswer(TicketAnswer answer, long ticketid, String helperUsername);
}
