package com.lambdaschool.devdeskqueue.repository;

import com.lambdaschool.devdeskqueue.models.Ticket;
import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, Long>
{
}
