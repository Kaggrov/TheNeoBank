package com.capstone.capstonebackend.Model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.*;

@Entity
@Table(name = "bank")
public class Bank {

	@Id
	@Column(name = "bank_id")
	private Long bankId;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "bank_logo")
	private String bankLogo;

	public Bank() {

	}

	public Bank(Long bankId, String bankName, String bankLogo) {
		this.bankId = bankId;
		this.bankName = bankName;
		this.bankLogo = bankLogo;
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

	public String getBankLogo() {
		return bankLogo;
	}

	public void setBankLogo(String bankLogo) {
		this.bankLogo = bankLogo;
	}

}