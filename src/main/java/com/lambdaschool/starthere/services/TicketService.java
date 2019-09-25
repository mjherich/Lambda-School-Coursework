package com.lambdaschool.starthere.services;

import com.lambdaschool.starthere.models.Ticket;

import java.util.List;

public interface TicketService
{
    List<Ticket> findAllTickets();

    Ticket save(Ticket ticket);

    void assignHelper(long ticketid, long helperid);
}
