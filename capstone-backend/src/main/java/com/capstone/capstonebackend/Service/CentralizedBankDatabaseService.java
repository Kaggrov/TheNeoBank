package com.capstone.capstonebackend.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.capstonebackend.Model.CentralizedBankDatabase;
import com.capstone.capstonebackend.Repository.CentralizedBankDatabaseRepo;

@Service
public class CentralizedBankDatabaseService {

	@Autowired
	CentralizedBankDatabaseRepo cbdRepository;
	
	List<CentralizedBankDatabase> allBanksInfo = List.of(
			new CentralizedBankDatabase(1L, 1L, "Alex Williams", "123-456-7890", 100L, "SBI", "1234-5678-9012", "Savings", 50000),
			new CentralizedBankDatabase(2L, 1L, "Alex Williams", "123-456-7890", 100L, "SBI", "4566-3355-3453", "Current", 35000),
			new CentralizedBankDatabase(3L, 1L, "Alex Williams", "123-456-7890", 200L, "HDFC", "3555-3355-3542", "Fixed Deposit",9000),
			new CentralizedBankDatabase(4L, 2L, "Bob Smith", "234-435-6577", 200L, "HDFC", "5676-5778-3646", "Savings", 50000),
			new CentralizedBankDatabase(5L, 2L, "Bob Smith", "234-435-6577", 300L, "ICICI", "3463-7755-8888", "Current", 10700),
			new CentralizedBankDatabase(6L, 3L, "Henry Johnson", "678-455-4690", 100L, "SBI", "3222-5778-5677", "Savings", 50000),
			new CentralizedBankDatabase(7L, 3L, "Henry Johnson", "678-455-4690", 100L, "SBI", "2344-7755-5654", "Current", 3500),
			new CentralizedBankDatabase(8L, 3L, "Henry Johnson", "678-455-4690", 300L, "ICICI", "3435-6565-6466", "Savings", 12000),
			new CentralizedBankDatabase(9L, 3L, "Henry Johnson", "678-455-4690", 400L, "AXIS", "8090-3123-9998", "Current", 50000),
			new CentralizedBankDatabase(10L, 63868L, "Karttekay Grover", "987-987-9876", 1L, "SBI", "4567-4567-4567", "Current", 10000),
			new CentralizedBankDatabase(11L, 61506L, "Manogna Hiremath", "987-987-9876", 2L, "HDFC", "1234-1234-1234", "Savings", 5000)
			);
	
	@PostConstruct
    public void saveBanksToRepoOnStartup() {
        for (CentralizedBankDatabase bank : allBanksInfo) {
        	cbdRepository.save(bank);
        }
    }
	
	public List<CentralizedBankDatabase> findEntriesByAccountNoAndCustomerId(String accountNo, Long customerId) {
        return cbdRepository.findByAccountNoAndCustomerId(accountNo, customerId);
    }
	
	public List<CentralizedBankDatabase> getAllBanksData() {
        return allBanksInfo;
    }
	
}
