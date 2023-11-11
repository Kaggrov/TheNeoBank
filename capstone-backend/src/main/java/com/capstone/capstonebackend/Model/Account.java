package com.capstone.capstonebackend.Model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "account")
public class Account {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "account_no")
    private String accountNo;

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "balance")
    private Integer balance;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "bank_id")
    private Bank bank;

	public Account() {
		
	}

	public Account(Long accountId, String accountNo, String accountType, Integer balance, Long customerId, Bank bank) {
		this.accountId = accountId;
		this.accountNo = accountNo;
		this.accountType = accountType;
		this.balance = balance;
		this.customerId = customerId;
		this.bank = bank;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountNo() {
		return accountNo;
	}
	
	public String getMaskedAccountNo() {
        if (accountNo != null && accountNo.length() > 4) {
            String maskedPortion = "xxxx-xxxx-" + accountNo.substring(accountNo.length() - 4);
            return maskedPortion;
        }
        return accountNo;
    }

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public Integer getBalance() {
		return balance;
	}

	public void setBalance(Integer balance) {
		this.balance = balance;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Bank getBank() {
		return bank;
	}

	public void setBank(Bank bank) {
		this.bank = bank;
	}
    
}









