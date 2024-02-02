package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
    List<Transaction> findByTransactionType(String transactionType);

    List<Transaction> findByTransactionTypeAndAccount(String transactionType, String account);
    
    List<Transaction> findBySender_CustomerId(Long customerId);

    List<Transaction> findByTransactionTypeAndSender_CustomerId(String type, Long customerId);
}
