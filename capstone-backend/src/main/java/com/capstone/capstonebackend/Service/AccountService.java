package com.capstone.capstonebackend.Service;

import java.util.List;
import java.util.Optional;

import com.capstone.capstonebackend.Model.BalanceResponseEntity;
import com.capstone.capstonebackend.Model.CentralizedBankDatabase;
import com.capstone.capstonebackend.Model.CreditCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Repository.AccountRepo;

@Service
public class AccountService {

	@Autowired
	AccountRepo accountRepo;
	
	@Autowired
    private CentralizedBankDatabaseService centralizedBankDatabaseService;
	
	public List<Account> getAllAccounts(){
        return accountRepo.findAll();
    }
	
	public List<Account> getAccountsByCustomerId(Long customerId) {
        return accountRepo.findByCustomerId(customerId);
    }
	
	public boolean checkAccountExistsInCentralizedBank(String accountNo, Long customerId) {
	    List<CentralizedBankDatabase> centralizedBankEntries = centralizedBankDatabaseService
	            .findEntriesByAccountNoAndCustomerId(accountNo, customerId);

	    return !centralizedBankEntries.isEmpty();
	}
	
	public Account saveAccount(Account account) {
        return accountRepo.save(account);
    }

    public String updateAccountDetails(Account account){
        Optional<Account> existingAccountOptional = accountRepo.findById(account.getAccountId());

        if(existingAccountOptional.isPresent()){
            Account existingAccount = existingAccountOptional.get();

            existingAccount.setAccountId(account.getAccountId());
            existingAccount.setAccountNo(account.getAccountNo());
            existingAccount.setAccountType(account.getAccountType());
            existingAccount.setBank(account.getBank());
            existingAccount.setBalance(account.getBalance());
            existingAccount.setCustomerId(account.getCustomerId());

            accountRepo.save(existingAccount);

            return "Account Details updated Successfully";
        }
        return "Account do not exist";
    }
    
    public boolean checkAccountExists(String accountNo) {
        List<Account> accounts = accountRepo.findByAccountNo(accountNo);
        return !accounts.isEmpty();
    }
    public String updateAccountBalance(Long id, Account account) {
    	Account existingAccountOptional = accountRepo.findById(id).orElse(null);
        if(existingAccountOptional != null){

            existingAccountOptional.setAccountId(account.getAccountId());
            existingAccountOptional.setAccountNo(account.getAccountNo());
            existingAccountOptional.setAccountType(account.getAccountType());
            existingAccountOptional.setBank(account.getBank());
            existingAccountOptional.setBalance(account.getBalance());
            existingAccountOptional.setCustomerId(account.getCustomerId());

            accountRepo.save(existingAccountOptional);

            return "Account Details updated Successfully";
        }
        return "Account do not exist";
    }
    
}
