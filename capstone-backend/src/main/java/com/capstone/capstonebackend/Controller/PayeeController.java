package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.Payee;
import com.capstone.capstonebackend.Service.PayeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PayeeController {

    @Autowired
    PayeeService payeeService;

    @PostMapping("/payees/{customerId}")
    public ResponseEntity<?>savePayee(@PathVariable Long customerId, @RequestBody Payee payee){
        return payeeService.savePayee(payee,customerId);
    }

    @GetMapping("/payees/{customerId}")
    public List<Payee> getAllTransferPayees(@PathVariable Long customerId){
        return payeeService.getAllTransferPayees(customerId);
    }

    @DeleteMapping("/payees/{payeeId}")
    public String deletePayee(@PathVariable Long payeeId){
        return payeeService.deletePayee(payeeId);
    }
}
