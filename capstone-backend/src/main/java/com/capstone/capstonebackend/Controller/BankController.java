package com.capstone.capstonebackend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.capstonebackend.Model.Bank;
import com.capstone.capstonebackend.Service.BankService;

@RestController
@CrossOrigin
public class BankController {

	@Autowired
	BankService bankService;
	
	@GetMapping("/banks")
    public ResponseEntity<List<Bank>> getAllBanks() {
        List<Bank> banks = bankService.getAllBanks();
        return ResponseEntity.ok(banks);
    }
	
	@GetMapping("/{bankId}")
    public ResponseEntity<Bank> getBankById(@PathVariable Long bankId) {
        Bank bank = bankService.getBankById(bankId);
        if (bank != null) {
            return ResponseEntity.ok(bank);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}