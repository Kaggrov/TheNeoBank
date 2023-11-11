package com.capstone.capstonebackend.Repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.capstonebackend.Model.Account;

public interface AccountRepo extends JpaRepository<Account, Long> {
	
	List<Account> findByCustomerId(Long customerId);
	
	List<Account> findByAccountNo(String accountNo);
}
