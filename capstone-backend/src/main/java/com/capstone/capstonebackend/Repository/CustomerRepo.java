package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,Long> {
    Customer findByCustomerId(Long customerId);
}
