package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.LoginDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpStatus;

public interface LoginDetailsRepo extends MongoRepository<LoginDetails,String> {
    LoginDetails findByPhoneNumber(String phoneNumber);
    LoginDetails findByCustomerId(Long customerId);
    
}
