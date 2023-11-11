package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Model.Transaction;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.PayeeRepo;
import com.capstone.capstonebackend.Repository.TicketRepo;
import com.capstone.capstonebackend.Repository.TransactionRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {
    @Mock
    private TransactionRepo transactionRepo;

    @Mock
    private CustomerRepo customerRepo;

    @Mock
    private PayeeRepo payeeRepo;

    @InjectMocks
    private TransactionService transactionService;

    @InjectMocks
    private  CustomerService customerService;

    private Transaction transaction;

    private Customer sender;

    private Customer customer;

    private Payee receiver;
    private List<Transaction> transactionList;
    private Optional optional;

    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        sender = new Customer(101L,"1122","1122");
        customer = new Customer(101L,"1122","1122");

        receiver = new Payee(101L, "11122", "abc", "name", "bank", customer);


        transaction = new Transaction(101L, "time", "open", "subject","category","amount",sender,receiver);

    }

    @AfterEach
    public void tearDown() {
        transaction = null;
    }

    @Test
    public void givenTransactionToSaveThenShouldReturnTransaction() {

        when(customerRepo.findById(101L)).thenReturn(Optional.ofNullable(customer));

        when(transactionRepo.save(any())).thenReturn(transaction);
        ResponseEntity<?> responseEntity = transactionService.addTransaction(transaction, 101L,101L);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());


        verify(transactionRepo, times(1)).save(any());

    }



    @Test
    public void givenGetAllTransactionsThenShouldReturnListOfAllTransactions() {
        transactionRepo.save(transaction);

        when(transactionRepo.findAll()).thenReturn(transactionList);
        List<Transaction> transactionList1 = transactionService.getAllTransactions();
        assertEquals(transactionList, transactionList1);
        verify(transactionRepo, times(1)).save(transaction);
        verify(transactionRepo, times(1)).findAll();
    }

}
