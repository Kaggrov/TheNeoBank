package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Ticket;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@SpringBootTest
class PayeeRepoIntegrationTest {

    @Mock
    private PayeeRepo payeeRepo;

    @Mock
    private  CustomerRepo customerRepo;



    private Payee payee;

    private  Customer customer;

    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        customer = new Customer(1001L, "aa", "1123");
        payee = new Payee(101L, "11122", "abc", "name", "bank", customer);

    }
    @AfterEach
    public void tearDown() {
        payeeRepo.deleteAll();
        payee = null;
    }

    @Test
    public void givenPayeeToSaveThenShouldReturnSavedPayee() {
        Customer mockCustomer = new Customer();
        mockCustomer.setCustomerId(1001L);
        payeeRepo.save(payee);

        List<Payee> fetchedPayee = payeeRepo.findAllByCustomerId(1001L);
        fetchedPayee.add(payee);
        assertEquals(101L, fetchedPayee.get(0).getPayeeId());
    }


    @Test
    public void givenGetAllPayeeThenShouldReturnListOfAllPayees() {
        Customer mockCustomer = new Customer();
        mockCustomer.setCustomerId(1001L);

        when(customerRepo.findByCustomerId(1001L)).thenReturn(mockCustomer);

        payee = new Payee(101L, "11122", "abc", "name", "bank", mockCustomer);
        payeeRepo.save(payee);

        List<Payee> payeeList = (List<Payee>)payeeRepo.findAll();
        payeeList.add(payee);
        assertEquals(101L, payeeList.get(0).getPayeeId());

    }

}
