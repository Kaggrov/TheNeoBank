package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.Payee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PayeeRepo extends JpaRepository<Payee,Long> {
    @Query("SELECT p FROM Payee p WHERE p.customer.customerId = :customerId")
    List<Payee> findAllByCustomerId(Long customerId);

    @Query("SELECT p FROM Payee p WHERE p.customer.customerId = :customerId AND (p.bankId IS NOT NULL OR p.upiId IS NOT NULL)")
    List<Payee> findAllTransferPayee(Long customerId);
}
