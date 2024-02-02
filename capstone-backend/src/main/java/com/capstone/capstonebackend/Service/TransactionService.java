package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Transaction;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.PayeeRepo;
import com.capstone.capstonebackend.Repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TransactionService {

    @Autowired
    TransactionRepo transactionRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    PayeeRepo payeeRepo;

    public ResponseEntity<?>addTransaction(Transaction transaction,Long customerId,Long payeeId){
        Customer sender = customerRepo.findById(customerId).orElse(null);
        Payee receiver = payeeRepo.findById(payeeId).orElse(null);
        if(sender==null){
            return new ResponseEntity<>("Customer Not Found",HttpStatus.BAD_REQUEST);
        }
        else if(receiver==null && Objects.equals(transaction.getTransactionType(), "transfer")){
            return new ResponseEntity<>("Add Payee First",HttpStatus.BAD_REQUEST);
        }
        else if(receiver==null){
            receiver =  transaction.getReceiver();
            receiver.setCustomer(sender);
            payeeRepo.save(receiver);
        }
        transaction.setSender(sender);
        transaction.setReceiver(receiver);

        return new ResponseEntity<Transaction>(transactionRepo.save(transaction), HttpStatus.CREATED);
    }

    public List<Transaction> getAllTransactions(){
        return transactionRepo.findAll();
    }

    public List<Transaction>getTransactionByType(String transactionType){
        return transactionRepo.findByTransactionType(transactionType);
    }
    
    public String deletetransaction(Long transactionId) {
    	transactionRepo.deleteById(transactionId);
    	return "Deleted Successfully";
    }

    public List<Transaction>getTransactionByTypeAndAccount(String transactionType,String account){
        return transactionRepo.findByTransactionTypeAndAccount(transactionType,account);

    }
    
    public List<Transaction> getTransactionsBySenderId(Long customerId) {
        return transactionRepo.findBySender_CustomerId(customerId);
    }

    public List<Transaction> getTransactionByTypeAndSenderId(String type, Long customerId) {
        return transactionRepo.findByTransactionTypeAndSender_CustomerId(type,customerId);
    }
}
