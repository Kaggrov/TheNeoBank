package com.capstone.capstonebackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transactionId")
    private Long transactionId;

    @Column(name = "timeStamp")
    private String timeStamp;

    @Column(name = "transactionType")
    private String transactionType;

    @Column(name = "account")
    private String account;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private String amount;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Customer sender;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "receiver_id")
    private Payee receiver;

    public Transaction() {
    }

    public Transaction(Long transactionId, String timeStamp, String transactionType, String account, String description, String amount, Customer sender, Payee receiver) {
        this.transactionId = transactionId;
        this.timeStamp = timeStamp;
        this.transactionType = transactionType;
        this.account = account;
        this.description = description;
        this.amount = amount;
        this.sender = sender;
        this.receiver = receiver;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Customer getSender() {
        return sender;
    }

    public void setSender(Customer sender) {
        this.sender = sender;
    }

    public Payee getReceiver() {
        return receiver;
    }

    public void setReceiver(Payee receiver) {
        this.receiver = receiver;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }
}
