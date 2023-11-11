package com.capstone.capstonebackend.Repository;


import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Model.Transaction;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest
class TransactionRepoIntegrationTest {

    @Mock
    private TransactionRepo transactionRepo;

    @Mock
    private CustomerRepo customerRepo;

    @Mock
    private PayeeRepo payeeRepo;
    private Transaction transaction;

    private Customer customer;
    private Customer sender;

    private List<Transaction> transactionList = new ArrayList<>();

    private Payee receiver;
    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        sender = new Customer(101L,"1122","1122");
        customer = new Customer(101L,"1122","1122");

        receiver = new Payee(101L, "11122", "abc", "name", "bank", customer);


        transaction = new Transaction(101L, "time", "open", "subject","category","amount",sender,receiver);

    }
    @AfterEach
    public void tearDown() {
        transactionRepo.deleteAll();
        transaction = null;
    }

    @Test
    public void givenTransactionToSaveThenShouldReturnSavedTransaction() {

        Customer mockCustomer = new Customer();
        mockCustomer.setCustomerId(101L);

        Payee payee = new Payee();
        payee.setPayeeId(101L);

        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId(101L);

        when(customerRepo.findByCustomerId(101L)).thenReturn(mockCustomer);
        when(payeeRepo.findById(101L)).thenReturn(Optional.of(payee));
        when(transactionRepo.findById(101L)).thenReturn(Optional.of(transaction1));

        transactionRepo.save(transaction);
        Transaction fetchedTransaction = transactionRepo.findById(101L).get();
        assertEquals(101L, fetchedTransaction.getTransactionId());
    }


    @Test
    public void givenGetAllTicketsThenShouldReturnListOfAllTickets() {
        Customer mockCustomer = new Customer();
        mockCustomer.setCustomerId(101L);

        Payee payee = new Payee();
        payee.setPayeeId(101L);

        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId(101L);

        when(customerRepo.findByCustomerId(101L)).thenReturn(mockCustomer);
        when(payeeRepo.findById(101L)).thenReturn(Optional.of(payee));
        when(transactionRepo.findById(101L)).thenReturn(Optional.of(transaction1));
        when(transactionRepo.findAll()).thenReturn(transactionList);
        transactionList.add(transaction);

        transactionRepo.save(transaction);

        List<Transaction> transactionList = (List<Transaction>) transactionRepo.findAll();
        assertEquals(101L, transactionList.get(0).getTransactionId());
    }

}