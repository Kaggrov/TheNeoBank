package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.CreditCard;
import com.capstone.capstonebackend.Model.CreditCardPreferences;
import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Repository.CreditCardPreferencesRepo;
import com.capstone.capstonebackend.Repository.CreditCardRepo;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditCardService {

    @Autowired
    CreditCardRepo creditCardRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    CreditCardPreferencesRepo creditCardPreferencesRepo;

    public ResponseEntity<?>saveCreditCard(CreditCard creditCard,Long customerId){
        creditCardPreferencesRepo.save(creditCard.getPreferences());
        creditCard.setPreferences(creditCard.getPreferences());

        Customer customer =  customerRepo.findById(customerId).orElse(null);
        if(customer==null){
            return  new ResponseEntity<>("Customer doesn't exist", HttpStatus.BAD_REQUEST);
        }
        creditCard.setCustomer(customer);

        return new ResponseEntity<CreditCard>(creditCardRepo.save(creditCard), HttpStatus.CREATED);
    }

    public List<CreditCard> getAllCreditCards(){
        return creditCardRepo.findAll();
    }

    public String updatePreferences(CreditCard creditCard){
        Optional<CreditCard> exitingCardOptional = creditCardRepo.findByCardId(creditCard.getCardId());

        if (exitingCardOptional.isPresent()) {
            CreditCard existingCard = exitingCardOptional.get();
            existingCard.setCardNumber(creditCard.getCardNumber());
            existingCard.setExpiry(creditCard.getExpiry());
            existingCard.setCvc(creditCard.getCvc());
            existingCard.setHolderName(creditCard.getHolderName());
            existingCard.setAvailableLimit(creditCard.getAvailableLimit());
            creditCardPreferencesRepo.save(creditCard.getPreferences());

            existingCard.setPreferences(creditCard.getPreferences());
            existingCard.setPaymentCycle(creditCard.getPaymentCycle());
            existingCard.setPaymentDue(creditCard.getPaymentDue());
            existingCard.setTransactionalLimit(creditCard.getTransactionalLimit());

            creditCardRepo.save(existingCard);

            return "Card Details Updated Successfully";
        } else {
            return "Ticket Not Found";
        }
    }
    
    public List<CreditCard> getCreditCardsByCustomerId(Long customerId) {
        return creditCardRepo.findByCustomerId(customerId);
    }
    public void updateAvailableLimit(Long cardId, String newAvailableLimit) {
        // Retrieve the card by ID
        CreditCard card = creditCardRepo.findById(cardId).orElse(null);

        // Update the available limit
        card.setAvailableLimit(newAvailableLimit);

        // Save the updated card
        creditCardRepo.save(card);
    }
}
