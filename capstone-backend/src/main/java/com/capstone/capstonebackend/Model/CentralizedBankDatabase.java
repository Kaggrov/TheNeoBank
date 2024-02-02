package com.capstone.capstonebackend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "centralizedBank")
public class CentralizedBankDatabase {

	@Id
	@Column(name = "centralized_bank_id")
	private Long centralizedBankId;

	@Column(name = "customer_id")
	private Long customerId;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "customer_phone")
	private String phoneNumber;

	@Column(name = "bank_id")
	private Long bankId;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "account_no")
	private String accountNo;

	@Column(name = "account_type")
	private String accountType;

	@Column(name = "balance")
	private Integer balance;

	
	public CentralizedBankDatabase() {
		super();
	}


	public CentralizedBankDatabase(Long centralizedBankId, Long customerId, String customerName, String phoneNumber,
			Long bankId, String bankName, String accountNo, String accountType, Integer balance) {
		super();
		this.centralizedBankId = centralizedBankId;
		this.customerId = customerId;
		this.customerName = customerName;
		this.phoneNumber = phoneNumber;
		this.bankId = bankId;
		this.bankName = bankName;
		this.accountNo = accountNo;
		this.accountType = accountType;
		this.balance = balance;
	}


	public Long getCentralizedBankId() {
		return centralizedBankId;
	}


	public void setCentralizedBankId(Long centralizedBankId) {
		this.centralizedBankId = centralizedBankId;
	}


	public Long getCustomerId() {
		return customerId;
	}


	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}


	public String getCustomerName() {
		return customerName;
	}


	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}


	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public Long getBankId() {
		return bankId;
	}


	public void setBankId(Long bankId) {
		this.bankId = bankId;
	}


	public String getBankName() {
		return bankName;
	}


	public void setBankName(String bankName) {
		this.bankName = bankName;
	}


	public String getAccountNo() {
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
	
}
