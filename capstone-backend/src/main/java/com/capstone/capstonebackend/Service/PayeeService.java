package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.PayeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayeeService {

    @Autowired
    PayeeRepo payeeRepo;

    @Autowired
    CustomerRepo customerRepo;

    public ResponseEntity<?>savePayee(Payee payee,Long customerId){
        Customer customer = customerRepo.findById(customerId).orElse(null);
        if (customer == null) {
            // Handle the case where the customer with the given ID is not found
            return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
        }

        payee.setCustomer(customer);
        return new ResponseEntity<Payee>(payeeRepo.save(payee), HttpStatus.CREATED);
    }

    public List<Payee> getAllPayees(Long customerId) {

        return payeeRepo.findAllByCustomerId(customerId);
    }
    public List<Payee> getAllTransferPayees(Long customerId) {

        return payeeRepo.findAllTransferPayee(customerId);
    }

    public String deletePayee(Long payeeId){
         payeeRepo.deleteById(payeeId);
         return "Payee Deleted Successfully";
    }
}
