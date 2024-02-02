package com.capstone.capstonebackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "payee")
public class Payee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payee_id")
    private Long payeeId;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "upi_id")
    private String upiId;

    @Column(name = "payee_name")
    private String payeeName;

    @Column(name = "bank_id")
    private String bankId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public Payee() {
    }

    public Payee(Long payeeId, String accountNumber, String upiId, String payeeName, String bankId, Customer customer) {
        this.payeeId = payeeId;
        this.accountNumber = accountNumber;
        this.upiId = upiId;
        this.payeeName = payeeName;
        this.bankId = bankId;
        this.customer = customer;
    }

    public Long getPayeeId() {
        return payeeId;
    }

    public void setPayeeId(Long payeeId) {
        this.payeeId = payeeId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public String getPayeeName() {
        return payeeName;
    }

    public void setPayeeName(String payeeName) {
        this.payeeName = payeeName;
    }

    public String getBankId() {
        return bankId;
    }

    public void setBankId(String bankId) {
        this.bankId = bankId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
