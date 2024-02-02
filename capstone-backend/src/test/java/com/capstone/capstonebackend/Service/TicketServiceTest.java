package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.TicketRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {
    @Mock
    private TicketRepo ticketRepo;

    @Mock
    private CustomerRepo customerRepo;

    @InjectMocks
    private TicketService ticketService;

    @InjectMocks
    private  CustomerService customerService;

    private Ticket ticket;

    private Customer customer;
    private List<Ticket> ticketList;
    private Optional optional;

    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        customer = new Customer(101L,"1122","1122");
        ticket = new Ticket("101", "Sample", "open", "subject","category",stringList,"101",1001L);

    }

    @AfterEach
    public void tearDown() {
        ticket = null;
    }

    @Test
    public void givenTicketToSaveThenShouldReturnResult() {

        when(customerRepo.findByCustomerId(1001L)).thenReturn(customer);

        when(ticketRepo.save(any())).thenReturn(ticket);

        assertEquals("Ticket Saved Successfully", ticketService.saveTicket(ticket,1001L));


        verify(ticketRepo, times(1)).save(any());

    }



    @Test
    public void givenGetAllTicketsThenShouldReturnListOfAllTickets() {
        ticketRepo.save(ticket);

        when(ticketRepo.findAll()).thenReturn(ticketList);
        List<Ticket> ticketList1 = ticketService.getAllTickets();
        assertEquals(ticketList, ticketList1);
        verify(ticketRepo, times(1)).save(ticket);
        verify(ticketRepo, times(1)).findAll();
    }

}
