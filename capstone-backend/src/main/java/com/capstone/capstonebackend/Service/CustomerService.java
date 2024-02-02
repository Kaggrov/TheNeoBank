package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    public ResponseEntity<Customer>saveCustomer(Customer customer){
//            customer.setCustomerId(customer.getCustomerId());
            return new ResponseEntity<Customer>(customerRepo.save(customer), HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAll()
    {
        return new ResponseEntity<List<Customer>>(customerRepo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> getById(Long id)
    {
        return new ResponseEntity<Optional<Customer>>(customerRepo.findById(id), HttpStatus.OK);
    }

    public String deleteCustomer(Long customerId){
        if(getById(customerId)!=null){
        customerRepo.deleteById(customerId);
        return "Cusomter deleted successfully";
        }
        else {
            return "cusomter not found";
        }
    }

    public String putCustomer(Long customerId, Customer updateCustomer) {
        if (getById(customerId) != null) {
            deleteCustomer(customerId);
            saveCustomer(updateCustomer);
            return "customer updated with customer id: " + customerId;
        } else {
            return "No customer found with customer id: " + customerId;
        }
    }
}
