package com.capstone.capstonebackend.Controller;

import java.util.List;
import java.util.Map;

import com.capstone.capstonebackend.Model.BalanceResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstone.capstonebackend.Model.Account;
import com.capstone.capstonebackend.Service.AccountService;
import com.capstone.capstonebackend.Service.BankService;

@RestController
@CrossOrigin
public class AccountController {

	@Autowired
	AccountService accountService;

	@Autowired
	BankService bankService;

	@GetMapping("/accounts")
	public List<Account> getAllAccountDetails() {
		List<Account> accounts = accountService.getAllAccounts();
		// mask the account no.
		accounts.forEach(account -> account.setAccountNo(account.getMaskedAccountNo()));
		return accounts;
	}

	@GetMapping("/accounts/{customerId}")
	public List<Account> getAccountsByCustomerId(@PathVariable Long customerId) {
		List<Account> accounts = accountService.getAccountsByCustomerId(customerId);
		// mask the account no.
		accounts.forEach(account -> account.setAccountNo(account.getMaskedAccountNo()));
		return accounts;
	}

//	@PostMapping("/accounts")
//	public ResponseEntity<Account> saveAccount(@RequestBody Map<String, Object> accountData) {
//
//		// extract form data
//		String accountNo = (String) accountData.get("accountNo");
//		String accountType = (String) accountData.get("accountType");
//		Integer balance = Integer.parseInt(accountData.get("balance").toString());
//		Long customerId = Long.parseLong(accountData.get("customerId").toString());
//		Long bankId = Long.parseLong(accountData.get("bankId").toString());
//
//
//		Account account = new Account();
//		account.setAccountNo(accountNo);
//		account.setAccountType(accountType);
//		account.setBalance(balance);
//		account.setCustomerId(customerId);
//		account.setBank(bankService.getBankById(bankId));
//
//		Account savedAccount = accountService.saveAccount(account);
//
//		// mask the account number before returning
//		savedAccount.setAccountNo(savedAccount.getMaskedAccountNo());
//
//		return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
//
//	}

	@PostMapping("/accounts")
	public ResponseEntity<Object> saveAccount(@RequestBody Map<String, Object> accountData) {

		// extract form data
		String accountNo = (String) accountData.get("accountNo");
		String accountType = (String) accountData.get("accountType");
		Integer balance = Integer.parseInt(accountData.get("balance").toString());
		Long customerId = Long.parseLong(accountData.get("customerId").toString());
		Long bankId = Long.parseLong(accountData.get("bankId").toString());

		// check if the account exists in CentralizedBankDatabase
	    boolean accountExists = accountService.checkAccountExistsInCentralizedBank(accountNo, customerId);
	    
	    if (!accountExists) {
	    	Account account = new Account();
			account.setAccountNo(accountNo);
			account.setAccountType(accountType);
			account.setBalance(balance);
			account.setCustomerId(customerId);
			account.setBank(bankService.getBankById(bankId));

			Account savedAccount = accountService.saveAccount(account);

			// mask the account number before returning
			savedAccount.setAccountNo(savedAccount.getMaskedAccountNo());

			return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
	    }
	    else
	    {
	    	return  new ResponseEntity<>("Account details doesn't exist with bank", HttpStatus.BAD_REQUEST);
	    }
	}
	
	@PutMapping("/accounts")
	public String updateAccountDetails(@RequestBody Account account){
		return accountService.updateAccountDetails(account);
	}
	
	@GetMapping("/accounts/check/{accountNo}")
	public ResponseEntity<Boolean> checkAccountExists(@PathVariable String accountNo) {
	    boolean accountExists = accountService.checkAccountExists(accountNo);
	    return ResponseEntity.ok(accountExists);
	}
	@PutMapping("/accounts/{accId}")
	public String updateBalance(@PathVariable Long accId,@RequestBody Account account) {
		return accountService.updateAccountBalance(accId,account);
	}
}