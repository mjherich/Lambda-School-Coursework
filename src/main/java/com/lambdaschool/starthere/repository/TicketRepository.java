package com.lambdaschool.starthere.repository;

import com.lambdaschool.starthere.models.Ticket;
import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, Long>
{
}
