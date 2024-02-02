package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.LoginDetails;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.LoginDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginDetailsService implements UserDetailsService {

    @Autowired
    LoginDetailsRepo loginDetailsRepo;
    @Autowired
    CustomerRepo customerRepo;

    public String saveUserDetails(LoginDetails loginDetails){
        loginDetailsRepo.save(loginDetails);

        return "User Details saved successfully";
    }

    public List<LoginDetails> getAllUser(){
        return loginDetailsRepo.findAll();
    }

    public ResponseEntity<?>getRegisteredUsers(String phoneNumber){
        LoginDetails userDetails = loginDetailsRepo.findByPhoneNumber(phoneNumber);

        if(userDetails==null){
            return new ResponseEntity<>("User Not Registered", HttpStatus.BAD_REQUEST);
        }
        Customer customerDetails = customerRepo.findByCustomerId(userDetails.getCustomerId());

        Map<String, Object> response = new HashMap<>();
        response.put("userDetails", userDetails);
        response.put("customerDetails", customerDetails);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        LoginDetails userDetails = loginDetailsRepo.findByPhoneNumber(phoneNumber);
        return new org.springframework.security.core.userdetails.User(userDetails.getPhoneNumber(), userDetails.getPassword(), new ArrayList<>());
    }


}
