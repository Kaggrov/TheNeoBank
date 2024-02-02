package com.capstone.capstonebackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capstone.capstonebackend.Model.CentralizedBankDatabase;

public interface CentralizedBankDatabaseRepo extends JpaRepository<CentralizedBankDatabase,Long>{

	List<CentralizedBankDatabase> findByAccountNoAndCustomerId(String accountNo, Long customerId);
}
