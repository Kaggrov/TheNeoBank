package com.capstone.capstonebackend.Controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Service.AccountService;
import com.capstone.capstonebackend.Service.BankService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {
	private MockMvc mockMvc;
	@Mock
    AccountService accountService;
    
    @Mock
    BankService bankService;
    
    @InjectMocks
    private AccountController accountController;

    private Account account;
    private List<Account> accountList;
    
    private Bank bank;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
        
        bank=new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp");
        account = new Account(1L, "1234-5678-9012", "Savings", 50000, 101L, bank);
        accountList = new ArrayList<>();
        accountList.add(account);
    }

    @AfterEach
    public void tearDown() {
        account = null;
    }
    
    @Test
    public void givenGetAllAccountDetailsThenShouldReturnListOfAllAccounts() throws Exception {
        when(accountService.getAllAccounts()).thenReturn(accountList);
        mockMvc.perform(MockMvcRequestBuilders.get("/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(accountList)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        verify(accountService).getAllAccounts();
    }
    
    @Test
    public void givenCustomerIdThenShouldReturnListOfAccountsByCustomerId() throws Exception {
        when(accountService.getAccountsByCustomerId(101L)).thenReturn(accountList);
        mockMvc.perform(MockMvcRequestBuilders.get("/accounts/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(accountList)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        verify(accountService).getAccountsByCustomerId(101L);
    }
    
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
}
