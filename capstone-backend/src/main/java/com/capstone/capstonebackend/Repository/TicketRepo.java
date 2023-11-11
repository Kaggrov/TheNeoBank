package com.capstone.capstonebackend.Repository;

import com.capstone.capstonebackend.Model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepo extends MongoRepository<Ticket,String> {
    Optional<Ticket> findByTicketId(String ticketId);

    void deleteByTicketId(int ticketId);

    List<Ticket> findAllByCustomerId(Long customerId);
}
