package com.capstone.capstonebackend.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Model.Wallet;


@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
   // Optional<Wallet> findByCustomerId(Long customerId);
	@Query("SELECT w.balance FROM Wallet w WHERE w.customer.customerId = :customerId")
   	String findBalanceByCustomerId(@Param("customerId") Long customerId);
	
	@Query("SELECT w FROM Wallet w WHERE w.customer.customerId = :customerId")
	Wallet findByCustomerId(Long customerId);
	
	@Query("SELECT p FROM Wallet p WHERE p.customer.customerId = :customerId")
    Wallet findAllByCustomerId(Long customerId);
	
	 boolean existsByCustomer(Customer customer);
}
