package com.capstone.capstonebackend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Repository.AccountRepo;
import com.capstone.capstonebackend.Repository.BankRepo;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
	@Mock
    private AccountRepo accountRepo;

    @Mock
    private BankRepo bankRepo;

    @InjectMocks
    private AccountService accountService;

    private List<Account> accountList;

    private Account account;

    private Bank bank;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        bank = new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp");
        account = new Account(101L, "1234-5678-9012", "Savings", 1000, 101L, bank);
    }

    @AfterEach
    public void tearDown() {
        account = null;
    }
    
    @Test
    public void givenAccountToSaveThenShouldReturnAccount() {
        when(accountRepo.save(any())).thenReturn(account);

        Account savedAccount = accountService.saveAccount(account);
        assertEquals("1234-5678-9012", savedAccount.getAccountNo());

        verify(accountRepo, times(1)).save(any());
    }
    
    @Test
    public void givenCustomerIdThenShouldReturnListOfAccounts() {
        accountRepo.save(account);

        when(accountRepo.findByCustomerId(101L)).thenReturn(accountList);
        List<Account> accountList1 = accountService.getAccountsByCustomerId(101L);
        assertEquals(accountList, accountList1);

        verify(accountRepo, times(1)).findByCustomerId(101L);
        verify(accountRepo, times(1)).save(account);
    }
}
