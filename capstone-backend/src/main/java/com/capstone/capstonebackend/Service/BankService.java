package com.capstone.capstonebackend.Service;

import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Repository.BankRepo;

@Service
public class BankService {

	@Autowired
	BankRepo bankRepo;
	
	List<Bank> banksInfo = List.of(
			new Bank(1L, "SBI", "https://logowik.com/content/uploads/images/sbi-state-bank-of-india9251.logowik.com.webp"), 
			new Bank(2L, "HDFC", "https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370"), 
			new Bank(3L, "ICICI", "https://i.pinimg.com/originals/ff/d5/31/ffd531a6a78464512a97848e14506738.png"),
			new Bank(4L, "AXIS", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7pwMZWUkmI10EsCBFuk_Xl6RJ30vfOhJlQ&usqp=CAU")
			);
	
	@PostConstruct
    public void saveBanksToRepoOnStartup() {
        for (Bank bank : banksInfo) {
            bankRepo.save(bank);
        }
    }
	
	public List<Bank> getAllBanks() {
        return banksInfo;
    }
	
	public Bank getBankById(Long bankId) {
        return banksInfo.stream()
                .filter(bank -> bank.getBankId().equals(bankId))
                .findFirst()
                .orElse(null);
    }
}
