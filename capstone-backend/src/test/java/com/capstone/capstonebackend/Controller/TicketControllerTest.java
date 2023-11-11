package com.capstone.capstonebackend.Controller;


import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Service.FileService;
import com.capstone.capstonebackend.Service.TicketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TicketControllerTest {

    private MockMvc mockMvc;
    @Mock
    TicketService ticketService;

    @Mock
    FileService fileService;
    @InjectMocks
    private TicketController ticketController;

    private Ticket ticket;
    private List<Ticket> ticketList;

    private List<String> stringList = List.of("abc","bcd");


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ticketController).build();
        ticket = new Ticket("101", "Sample", "open", "subject","category",stringList,"101",1001L);

        ticketList = new ArrayList<>();
        ticketList.add(ticket);
    }

    @AfterEach
    public void tearDown() {
        ticket = null;
    }


    @Test
    public void givenGetAllTicketsThenShouldReturnListOfAllTickets() throws Exception {
        when(ticketService.getAllTickets()).thenReturn(ticketList);
        mockMvc.perform(MockMvcRequestBuilders.get("/tickets")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(ticket)))
                .andDo(MockMvcResultHandlers.print());
        verify(ticketService).getAllTickets();
        verify(ticketService, times(1)).getAllTickets();

    }

    @Test
    void givenTicketIdThenShouldReturnRespectiveTicket() throws Exception {
        when(ticketService.getAllCustomerTickets(ticket.getCustomer())).thenReturn(ticketList);
        mockMvc.perform(get("/tickets/1001"))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andDo(MockMvcResultHandlers.print());

    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
