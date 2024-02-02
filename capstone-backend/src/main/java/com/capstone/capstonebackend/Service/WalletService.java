package com.capstone.capstonebackend.Service;

import java.math.BigDecimal;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Wallet;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.WalletRepository;

@Service
public class WalletService {
    

    @Autowired
    WalletRepository walletRepository;
    
    @Autowired
    CustomerRepo customerrepo;

    public String getBalanceByCustomerId(Long customerId) {
        return walletRepository.findBalanceByCustomerId(customerId); // Return zero if the wallet doesn't exist
    }
    
    //public List<Wallet> getcus(){
    	//return walletRepository.findAll();
    //}
   //public String saverec(Wallet w) {
    	//walletRepository.save(w);
    	//return "saved successfully";
    //}
    //public String updatebalance(Long id, BigDecimal b) {
    	//Wallet wallet = walletRepository.findByCustomerId(id).get();
    	//wallet.setBalance(b);
    	//walletRepository.save(wallet);
    	//return "updated successfully";
    //}
    
    public Wallet getAllPayees(Long customerId) {

        return walletRepository.findAllByCustomerId(customerId);
    }
    
    public ResponseEntity<?>savePayee(Wallet w,Long customerId){
        Customer customer = customerrepo.findById(customerId).orElse(null);
        if (customer == null) {
            // Handle the case where the customer with the given ID is not found
            return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
        }

        w.setCustomer(customer);
        return new ResponseEntity<Wallet>(walletRepository.save(w), HttpStatus.CREATED);
    }
    public boolean walletExistsForCustomer(Customer customer) {
        return walletRepository.existsByCustomer(customer);
    }
    }