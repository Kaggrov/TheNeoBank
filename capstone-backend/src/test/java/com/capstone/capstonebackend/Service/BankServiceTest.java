package com.capstone.capstonebackend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Repository.BankRepo;

@ExtendWith(MockitoExtension.class)
public class BankServiceTest {

	@InjectMocks
    private BankService bankService;

    private List<Bank> banksInfo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        banksInfo = List.of(
            new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp"),
            new Bank(2L, "HDFC", "https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370"),
            new Bank(3L, "ICICI", "https://i.pinimg.com/originals/ff/d5/31/ffd531a6a78464512a97848e14506738.png"),
            new Bank(4L, "AXIS", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7pwMZWUkmI10EsCBFuk_Xl6RJ30vfOhJlQ&usqp=CAU")
        );
    }

    @Test
    public void getAllBanksShouldReturnListOfBanks() {
        List<Bank> result = bankService.getAllBanks();

        // Assert that the result contains the same number of banks as the static data.
        assertEquals(banksInfo.size(), result.size());

        // Assert that each bank in the result matches the corresponding bank in the static data.
        for (int i = 0; i < banksInfo.size(); i++) {
            assertEquals(banksInfo.get(i).getBankId(), result.get(i).getBankId());
            assertEquals(banksInfo.get(i).getBankName(), result.get(i).getBankName());
        }
    }
}
