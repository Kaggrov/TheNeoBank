package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.PayeeRepo;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PayeeServiceTest {
    @Mock
    private PayeeRepo payeeRepo;

    @Mock
    private CustomerRepo customerRepo;


    @InjectMocks
    private PayeeService payeeService;

    private List<Payee> payeeList;

    private Payee payee;

    private Customer customer;


    private List<String> stringList = List.of("abc", "bcd");

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        customer = new Customer(1001L, "aa", "1123");
        payee = new Payee(101L, "11122", "abc", "name", "bank", customer);

    }

    @AfterEach
    public void tearDown() {
        payee = null;
    }

    @Test
    public void givenPayeeToSaveThenShouldReturnPayee() {

        when(customerRepo.findById(1001L)).thenReturn(Optional.ofNullable(customer));

        when(payeeRepo.save(any())).thenReturn(payee);

        ResponseEntity<?> responseEntity = payeeService.savePayee(payee, 1001L);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());


        verify(payeeRepo, times(1)).save(any());

    }


    @Test
    public void givenGetAllPayeesThenShouldReturnListOfAllPayees() {
        payeeRepo.save(payee);

        when(payeeRepo.findAllByCustomerId(1001L)).thenReturn(payeeList);
        List<Payee> payeeList1 = payeeService.getAllPayees(1001L);
        assertEquals(payeeList, payeeList1);
        verify(payeeRepo, times(1)).save(payee);
        verify(payeeRepo, times(1)).findAllByCustomerId(1001L);
    }

}

