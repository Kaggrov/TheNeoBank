package com.capstone.capstonebackend.Model;

public class BalanceResponseEntity {

    int balance;

    public BalanceResponseEntity() {
    }

    public BalanceResponseEntity(int balance) {
        this.balance = balance;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}
