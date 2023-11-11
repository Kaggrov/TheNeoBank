package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Service.FileService;
import com.capstone.capstonebackend.Service.PayeeService;
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
import org.springframework.http.ResponseEntity;
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
public class PayeeControllerTest {

    private MockMvc mockMvc;
    @Mock
    PayeeService payeeService;

    @InjectMocks
    private PayeeController payeeController;

    private Payee payee;
    private Customer customer;
    private List<Payee> payeeList;

    private List<String> stringList = List.of("abc","bcd");


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(payeeController).build();
        customer = new Customer(1001L, "aa", "1123");

        payee = new Payee(101L, "11122", "abc", "name", "bank", customer);

        payeeList = new ArrayList<>();
        payeeList.add(payee);
    }

    @AfterEach
    public void tearDown() {
        payee = null;
    }


    @Test
    public void givenGetAllPayeesThenShouldReturnListOfAllPayees() throws Exception {
        when(payeeService.getAllTransferPayees(1001L)).thenReturn(payeeList);
        mockMvc.perform(MockMvcRequestBuilders.get("/payees/1001")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(payeeList)))
                .andDo(MockMvcResultHandlers.print());
        verify(payeeService).getAllTransferPayees(1001L);
        verify(payeeService, times(1)).getAllTransferPayees(1001L);

    }

    @Test
    public void givenPayeeToSaveThenShouldReturnSavedPayee() throws Exception {
        mockMvc.perform(post("/payees/1001")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(payee)))
                .andExpect(status().isOk())
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
