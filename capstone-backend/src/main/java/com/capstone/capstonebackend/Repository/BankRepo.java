package com.capstone.capstonebackend.Repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.capstonebackend.Model.Bank;

public interface BankRepo extends JpaRepository<Bank,Long>{
	
}