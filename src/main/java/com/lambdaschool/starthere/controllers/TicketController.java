package com.lambdaschool.starthere.controllers;

import com.lambdaschool.starthere.models.Ticket;
import com.lambdaschool.starthere.services.TicketService;
import com.lambdaschool.starthere.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController
{
    @Autowired
    private TicketService ticketService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/tickets", produces = {"application/json"})
    public ResponseEntity<?> listAllTickets()
    {
        List<Ticket> allTickets = ticketService.findAllTickets();
        return new ResponseEntity<>(allTickets, HttpStatus.OK);
    }

    @PostMapping(value = "/create", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket, Principal principal)
    {
        Ticket newTicket = new Ticket();
        newTicket.setName(ticket.getName());
        newTicket.setCategory(ticket.getCategory());
        newTicket.setDescription(ticket.getDescription());
        newTicket.setStudent(userService.findByName(principal.getName()));

        ticket = ticketService.save(newTicket);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newTicketURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{ticketid}").buildAndExpand(newTicket.getTicketid()).toUri();
        responseHeaders.setLocation(newTicketURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }
}
