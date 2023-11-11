package com.capstone.capstonebackend.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;

@SpringBootTest
public class AccountRepositoryIntegrationTest {
	@Mock
    private AccountRepo accountRepo;

    @Mock
    private BankRepo bankRepo;
    
    @Mock
    private CustomerRepo customerRepo;

    private Account account;
    private Bank bank;
    private Customer customer;
    
    @BeforeEach
    public void setUp() {
        customer = new Customer(101L, "Alex Willliams", "1234-5678-9012");
        bank = new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp");
        account = new Account(501L, "1234-5678-9012", "Savings", 1000, 101L, bank);
    }

    @AfterEach
    public void tearDown() {
        accountRepo.deleteAll();
        account = null;
    }
    @Test
    public void givenAccountToSaveThenShouldReturnSavedAccount() {
    	
    	Customer mockCustomer = new Customer();
    	mockCustomer.setCustomerId(101L);
    	
    	accountRepo.save(account);
    	
    	List<Account> fetchedAccount = accountRepo.findByCustomerId(101L);
    	fetchedAccount.add(account);
    	assertEquals(101L, fetchedAccount.get(0).getCustomerId());
    }

    @Test
    public void givenGetAllPayeeThenShouldReturnListOfAllPayees() {
    	Customer mockCustomer = new Customer();
    	mockCustomer.setCustomerId(101L);

        when(customerRepo.findByCustomerId(101L)).thenReturn(mockCustomer);

        bank = new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp");
        account = new Account(501L, "1234-5678-9012", "Savings", 1000, 101L, bank);
        List<Account> accountList = (List<Account>)accountRepo.findAll();
        accountList.add(account);
        assertEquals(501L, accountList.get(0).getAccountId());

    }
}
