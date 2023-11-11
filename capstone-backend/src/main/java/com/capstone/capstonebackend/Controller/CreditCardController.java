package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.CreditCard;
import com.capstone.capstonebackend.Service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;

@RestController
@CrossOrigin
public class CreditCardController {

    @Autowired
    CreditCardService creditCardService;


    @PostMapping("/creditCards/{customerId}")
    public ResponseEntity<?>saveCreditCard(@RequestBody CreditCard creditCard,@PathVariable Long customerId){
        return creditCardService.saveCreditCard(creditCard,customerId);
    }

    @GetMapping("/creditCards")
    public List<CreditCard>getAllCreditCards(){
        return creditCardService.getAllCreditCards();
    }

    @PutMapping("/creditCards")
    public  String updateCardDetails(@RequestBody CreditCard creditCard){
        return creditCardService.updatePreferences(creditCard);
    }
    
    @GetMapping("/creditCards/{customerId}")
    public ResponseEntity<List<CreditCard>> getCreditCardsByCustomerId(@PathVariable Long customerId) {
        List<CreditCard> creditCards = creditCardService.getCreditCardsByCustomerId(customerId);
        
        //mask the credit card no.
        creditCards.forEach(creditCard -> {
            creditCard.setCardNumber(creditCard.getMaskedCardNumber());
        });
        
        return new ResponseEntity<>(creditCards, HttpStatus.OK);
    }
    @PutMapping("/creditCards/{cardId}")
    public ResponseEntity<?> updateAvailableLimit(@PathVariable Long cardId, @RequestBody CreditCard request ) {
    	creditCardService.updateAvailableLimit(cardId, request.getAvailableLimit());

        return ResponseEntity.ok("Available limit updated successfully.");
    }
}
