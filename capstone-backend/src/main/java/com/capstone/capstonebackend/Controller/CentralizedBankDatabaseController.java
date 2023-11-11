package com.capstone.capstonebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.capstonebackend.Model.CentralizedBankDatabase;
import com.capstone.capstonebackend.Service.CentralizedBankDatabaseService;



@RestController
@CrossOrigin
public class CentralizedBankDatabaseController {

	@Autowired
	CentralizedBankDatabaseService databaseService;
	
	@GetMapping("/allbanks")
    public ResponseEntity<List<CentralizedBankDatabase>> getAllBanksData() {
        List<CentralizedBankDatabase> banksData = databaseService.getAllBanksData();
        return ResponseEntity.ok(banksData);
    }
	
}
