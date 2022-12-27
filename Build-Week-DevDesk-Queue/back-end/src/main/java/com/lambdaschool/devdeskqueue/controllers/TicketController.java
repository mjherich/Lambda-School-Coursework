package com.lambdaschool.devdeskqueue.controllers;

import com.lambdaschool.devdeskqueue.models.Ticket;
import com.lambdaschool.devdeskqueue.models.TicketAnswer;
import com.lambdaschool.devdeskqueue.models.UserRoles;
import com.lambdaschool.devdeskqueue.services.TicketService;
import com.lambdaschool.devdeskqueue.services.UserService;
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

    // Lists all tickets
    // GET localhost:2019/tickets/tickets
    @GetMapping(value = "/tickets", produces = {"application/json"})
    public ResponseEntity<?> listAllTickets()
    {
        List<Ticket> allTickets = ticketService.findAllTickets();
        return new ResponseEntity<>(allTickets, HttpStatus.OK);
    }

    // Lists tickets of the logged in user
    // GET localhost:2019/tickets/myTickets
    @GetMapping(value = "/tickets/myTickets", produces = {"application/json"})
    public ResponseEntity<?> listTicketsByUserId(Principal principal)
    {
        String studUsername = principal.getName();
        List<Ticket> userTickets = ticketService.findTicketsByUsername(studUsername);
        return new ResponseEntity<>(userTickets, HttpStatus.OK);
    }

    // Lists inactive tickets of the logged in user
    // GET localhost:2019/tickets/myInactiveTickets
    @GetMapping(value = "/tickets/myInactiveTickets", produces = {"application/json"})
    public ResponseEntity<?> listInactiveTicketsByUserId(Principal principal)
    {
        String studUsername = principal.getName();
        List<Ticket> userTickets = ticketService.findInactiveTicketsByUsername(studUsername);
        return new ResponseEntity<>(userTickets, HttpStatus.OK);
    }

    // Finds a ticket by the ticket id
    // GET localhost:2019/tickets/findById/{ticketid}
    @GetMapping(value = "/findById/{ticketid}", produces = {"application/json"})
    public ResponseEntity<?> findTicketById(@PathVariable long ticketid)
    {
        Ticket t = ticketService.findTicketById(ticketid);
        return new ResponseEntity<>(t, HttpStatus.OK);
    }

    // Creates a ticket and assigns to the current user (must be a student role)
    // POST localhost:2019/tickets/create
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

    // Assigns a ticket to a helper
    @PutMapping(value = "/{ticketid}/assign/{userid}", produces = {"application/json"})
    public ResponseEntity<?> assignTicket(@PathVariable long ticketid, @PathVariable long userid)
    {
        // Check if userid is a helper orelse throw error
        List<UserRoles> roles = userService.findUserById(userid).getUserroles();
        for (UserRoles ur : roles)
        {
            if (ur.getRole().getName() != "helper")
            {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        ticketService.assignHelper(ticketid, userid);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // PUT localhost:2019/tickets/answer/{ticketid}
    @PutMapping(value = "/answer/{ticketid}", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> answerTicket(@RequestBody TicketAnswer answer, @PathVariable long ticketid, Principal principal)
    {
        ticketService.addAnswer(answer, ticketid, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // PUT localhost:2019/tickets/update/{ticketid}
    @PutMapping(value = "/update/{ticketid}", consumes = {"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> updateTicket(@RequestBody Ticket ticket, @PathVariable long ticketid)
    {
        ticketService.update(ticket, ticketid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
