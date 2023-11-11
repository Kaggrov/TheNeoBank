package com.capstone.capstonebackend.Repository;


import com.capstone.capstonebackend.Model.Ticket;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class TicketRepoIntegrationTest {

    @Autowired
    private TicketRepo ticketRepo;
    private Ticket ticket;

    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        ticket = new Ticket("101", "Sample", "open", "subject","category",stringList,"101",1001L);

    }
    @AfterEach
    public void tearDown() {
        ticketRepo.deleteAll();
        ticket = null;
    }

    @Test
    public void givenTicketToSaveThenShouldReturnSavedTicket() {
        ticketRepo.save(ticket);
        Ticket fetchedTicket = ticketRepo.findById(ticket.getTicketId()).get();
        assertEquals("101", fetchedTicket.getTicketId());
    }


    @Test
    public void givenGetAllTicketsThenShouldReturnListOfAllTickets() {
        ticket = new Ticket("101", "Sample", "open", "subject","category",stringList,"101",1001L);

        ticketRepo.save(ticket);

        List<Ticket> ticketList = (List<Ticket>) ticketRepo.findAll();
        assertEquals("open", ticketList.get(0).getStatus());
    }

}