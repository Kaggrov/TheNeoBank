package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepo extends JpaRepository<CreditCard,Long> {

    Optional<CreditCard> findByCardId(Long cardId);
    
    @Query("SELECT c FROM CreditCard c WHERE c.customer.customerId = :customerId")
    List<CreditCard> findByCustomerId(Long customerId);
}
