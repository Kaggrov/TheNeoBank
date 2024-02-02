package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.*;
import com.capstone.capstonebackend.Repository.*;
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
class CreditCardServiceTest {
    @Mock
    private CreditCardRepo creditCardRepo;


    @Mock
    private CustomerRepo customerRepo;

    @Mock
    private CreditCardPreferencesRepo creditCardPreferencesRepo;

    @Mock
    private AccountRepo accountRepo;

    @Mock
    private BankRepo bankRepo;

    @InjectMocks
    private CreditCardService creditCardService;

    @InjectMocks
    private  CustomerService customerService;

    @InjectMocks
    private AccountService accountService;

    @InjectMocks
    private  BankService bankService;



    private CreditCard creditCard;

    private Customer customer;

    private Account account;

    private Bank bank;

    private CreditCardPreferences creditCardPreferences;
    private List<CreditCard> creditCardList;
    private Optional optional;

    private List<String> stringList = List.of("abc","bcd");

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        customer = new Customer(1001L,"1122","1122");
        bank = new Bank(1001L,"abc","abc");
        account =  new Account(1001L,"abc","abc",1000,1001L,bank);
        creditCardPreferences = new CreditCardPreferences(1001L,true,true,true);
        creditCard = new CreditCard(1001L,"abc","abc","abc","abc","abc","abc","abc","abc",customer,creditCardPreferences,account);
    }

    @AfterEach
    public void tearDown() {
        creditCard = null;
    }

    @Test
    public void givenCreditCardToSaveThenShouldReturnResult() {

        when(customerRepo.findById(1001L)).thenReturn(Optional.ofNullable(customer));
        when(creditCardPreferencesRepo.save(any())).thenReturn(creditCardPreferences);

        when(creditCardRepo.save(any())).thenReturn(creditCard);

        ResponseEntity<?> responseEntity = creditCardService.saveCreditCard(creditCard, 1001L);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());


        verify(creditCardRepo, times(1)).save(any());

    }



    @Test
    public void givenGetAllCreditCardsThenShouldReturnListOfAllCreditCards() {
        creditCardRepo.save(creditCard);

        when(creditCardRepo.findAll()).thenReturn(creditCardList);
        List<CreditCard> creditCardList1 = creditCardService.getAllCreditCards();
        assertEquals(creditCardList, creditCardList1);
        verify(creditCardRepo, times(1)).save(creditCard);
        verify(creditCardRepo, times(1)).findAll();
    }

}
