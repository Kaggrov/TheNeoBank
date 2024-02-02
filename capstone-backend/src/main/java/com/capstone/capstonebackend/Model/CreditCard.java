package com.capstone.capstonebackend.Model;

import org.springframework.context.annotation.EnableMBeanExport;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "creditCard")
public class CreditCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "credit_card_id")
	private Long cardId;

	@Column(name = "holder_name")
	private String holderName;

	@Column(name = "card_number")
	private String cardNumber;

	@Column(name = "expiry")
	private String expiry;

	@Column(name = "cvc")
	private String cvc;

	@Column(name = "available_limit")
	private String availableLimit;

	@Column(name = "transactional_limit")
	private String transactionalLimit;

	@Column(name = "payment_due")
	private String paymentDue;

	@Column(name = "payment_cycle")
	private String paymentCycle;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@OneToOne
	@JoinColumn(name = "card_preferences")
	private CreditCardPreferences preferences;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

	public CreditCard() {
	}

	public CreditCard(Long cardId, String holderName, String cardNumber, String expiry, String cvc,
			String availableLimit, String transactionalLimit, String paymentDue, String paymentCycle, Customer customer,
			CreditCardPreferences preferences, Account account) {
		super();
		this.cardId = cardId;
		this.holderName = holderName;
		this.cardNumber = cardNumber;
		this.expiry = expiry;
		this.cvc = cvc;
		this.availableLimit = availableLimit;
		this.transactionalLimit = transactionalLimit;
		this.paymentDue = paymentDue;
		this.paymentCycle = paymentCycle;
		this.customer = customer;
		this.preferences = preferences;
		this.account = account;
	}

	public Long getCardId() {
		return cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}

	public String getHolderName() {
		return holderName;
	}

	public void setHolderName(String holderName) {
		this.holderName = holderName;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	//masking credit card no.
	public String getMaskedCardNumber() {
 
        String last4Digits = cardNumber.substring(cardNumber.length() - 4);
        String maskedDigits = "xxxx-xxxx-xxxx-";
        return maskedDigits + last4Digits;
    }
	public String getExpiry() {
		return expiry;
	}

	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}

	public String getCvc() {
		return cvc;
	}

	public void setCvc(String cvc) {
		this.cvc = cvc;
	}

	public String getAvailableLimit() {
		return availableLimit;
	}

	public void setAvailableLimit(String availableLimit) {
		this.availableLimit = availableLimit;
	}

	public String getTransactionalLimit() {
		return transactionalLimit;
	}

	public void setTransactionalLimit(String transactionalLimit) {
		this.transactionalLimit = transactionalLimit;
	}

	public String getPaymentDue() {
		return paymentDue;
	}

	public void setPaymentDue(String paymentDue) {
		this.paymentDue = paymentDue;
	}

	public String getPaymentCycle() {
		return paymentCycle;
	}

	public void setPaymentCycle(String paymentCycle) {
		this.paymentCycle = paymentCycle;
	}

	public CreditCardPreferences getPreferences() {
		return preferences;
	}

	public void setPreferences(CreditCardPreferences preferences) {
		this.preferences = preferences;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

}
