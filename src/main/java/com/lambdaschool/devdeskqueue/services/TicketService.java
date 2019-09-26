package com.lambdaschool.devdeskqueue.services;

import com.lambdaschool.devdeskqueue.models.Ticket;

import java.util.List;

public interface TicketService
{
    List<Ticket> findAllTickets();

    List<Ticket> findTicketsByUsername(String username);

    Ticket findTicketById(long ticketid);

    Ticket save(Ticket ticket);

    void assignHelper(long ticketid, long helperid);

    void addAnswer(String answer, long ticketid);
}
