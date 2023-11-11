package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping("/customers")
    public ResponseEntity<Customer>saveCustomer(@RequestBody Customer customer){
        return customerService.saveCustomer(customer);
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getCustomer()
    {
        return (ResponseEntity<?>) customerService.getAll();
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<?> getCustomerByid(@PathVariable Long customerId)
    {
        return (ResponseEntity<?>) customerService.getById(customerId);
    }

    @DeleteMapping("/customers/{customerId}")
    public String deleteCustomerByid(@PathVariable Long customerId)
    {
        return customerService.deleteCustomer(customerId);
    }

    @PutMapping("/customers/{customerId}")
    public String deleteCustomerByid(@PathVariable Long customerId, @RequestBody Customer updateCust)
    {
        return customerService.putCustomer(customerId,updateCust);
    }
}
