package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Model.Transaction;
import com.capstone.capstonebackend.Service.FileService;
import com.capstone.capstonebackend.Service.PayeeService;
import com.capstone.capstonebackend.Service.TicketService;
import com.capstone.capstonebackend.Service.TransactionService;
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
public class TransactionControllerTest {

    private MockMvc mockMvc;
    @Mock
    TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private Transaction transaction;
    private Customer customer;

    private Customer sender;

    private Payee receiver;
    private List<Transaction> transactionList;

    private List<String> stringList = List.of("abc","bcd");


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();
        customer = new Customer(1001L, "aa", "1123");

        sender = new Customer(101L,"1122","1122");
        customer = new Customer(101L,"1122","1122");

        receiver = new Payee(101L, "11122", "abc", "name", "bank", customer);


        transaction = new Transaction(101L, "time", "open", "subject","category","amount",sender,receiver);

        transactionList = new ArrayList<>();
        transactionList.add(transaction);
    }

    @AfterEach
    public void tearDown() {
        transaction = null;
    }


    @Test
    public void givenGetAllTransactionsThenShouldReturnListOfAllTransactions() throws Exception {
        when(transactionService.getAllTransactions()).thenReturn(transactionList);
        mockMvc.perform(MockMvcRequestBuilders.get("/transactions")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(transactionList)))
                .andDo(MockMvcResultHandlers.print());
        verify(transactionService).getAllTransactions();
        verify(transactionService, times(1)).getAllTransactions();

    }

    @Test
    public void givenTransactionToSaveThenShouldReturnSavedTransaction() throws Exception {
        mockMvc.perform(post("/transactions/101/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(transaction)))
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
