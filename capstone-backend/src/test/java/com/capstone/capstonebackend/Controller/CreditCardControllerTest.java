package com.capstone.capstonebackend.Controller;


import com.capstone.capstonebackend.Model.*;
import com.capstone.capstonebackend.Repository.*;
import com.capstone.capstonebackend.Service.*;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class CreditCardControllerTest {

    private MockMvc mockMvc;
    @Mock
    private CreditCardRepo creditCardRepo;

    @Mock
    CreditCardService creditCardService;

    @Mock
    private CustomerRepo customerRepo;

    @Mock
    private CreditCardPreferencesRepo creditCardPreferencesRepo;

    @Mock
    private AccountRepo accountRepo;

    @Mock
    private BankRepo bankRepo;

    @InjectMocks
    private CreditCardController creditCardController;


    @InjectMocks
    private CustomerService customerService;

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
        mockMvc = MockMvcBuilders.standaloneSetup(creditCardController).build();
        customer = new Customer(1001L,"1122","1122");
        bank = new Bank(1001L,"abc","abc");
        account =  new Account(1001L,"abc","abc",1000,1001L,bank);
        creditCardPreferences = new CreditCardPreferences(1001L,true,true,true);
        creditCard = new CreditCard(1001L,"abc","1111111111","abc","abc","abc","abc","abc","abc",customer,creditCardPreferences,account);
        creditCardList = new ArrayList<>();
        creditCardList.add(creditCard);
    }

    @AfterEach
    public void tearDown() {
        creditCard = null;
    }


    @Test
    public void givenGetAllCreditCardsThenShouldReturnListOfAllCreditCards() throws Exception {
        when(creditCardService.getAllCreditCards()).thenReturn(creditCardList);
        mockMvc.perform(MockMvcRequestBuilders.get("/creditCards")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(creditCard)))
                .andDo(MockMvcResultHandlers.print());
        verify(creditCardService).getAllCreditCards();
        verify(creditCardService, times(1)).getAllCreditCards();

    }

    @Test
    void givenCreditCardIdThenShouldReturnRespectiveCreditCard() throws Exception {
        when(creditCardService.getCreditCardsByCustomerId(1001L)).thenReturn(creditCardList);
        mockMvc.perform(get("/creditCards/1001"))
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
