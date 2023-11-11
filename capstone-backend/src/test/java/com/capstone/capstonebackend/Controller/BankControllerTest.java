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

import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Service.BankService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class BankControllerTest {
private MockMvc mockMvc;
    
    @Mock
    BankService bankService;

    @InjectMocks
    private BankController bankController;

    private Bank bank;
    private List<Bank> bankList;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bankController).build();
        
        bank = new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp");
        bankList = new ArrayList<>();
        bankList.add(bank);
    }

    @AfterEach
    public void tearDown() {
        bank = null;
    }
    
    @Test
    public void givenGetAllBanksThenShouldReturnListOfAllBanks() throws Exception {
        when(bankService.getAllBanks()).thenReturn(bankList);
        mockMvc.perform(MockMvcRequestBuilders.get("/banks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(bankList)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        verify(bankService).getAllBanks();
    }
    
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
