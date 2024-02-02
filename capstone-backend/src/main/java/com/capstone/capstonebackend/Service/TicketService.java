package com.capstone.capstonebackend.Service;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Repository.CustomerRepo;
import com.capstone.capstonebackend.Repository.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    TicketRepo ticketRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    public List<Ticket> getAllTickets(){
        return ticketRepo.findAll();
    }

    public String saveTicket(Ticket ticket,Long customerId) {
        Customer customer = customerRepo.findByCustomerId(customerId);
        if(customer==null){
            return "Customer doesn't exist";
        }
        ticket.setCustomer(customerId);

         ticketRepo.save(ticket);
         return "Ticket Saved Successfully";
    }

    public String updateTicket(Ticket updatedTicket,Long customerId){
        Customer customer = customerRepo.findByCustomerId(customerId);
        if(customer==null){
            return "Customer doesn't exist";
        }

        Optional<Ticket> existingTicketOptional = ticketRepo.findByTicketId(updatedTicket.getTicketId());

        if (existingTicketOptional.isPresent()) {
            Ticket existingTicket = existingTicketOptional.get();
            existingTicket.setDescription(updatedTicket.getDescription());
            existingTicket.setStatus(updatedTicket.getStatus());
            existingTicket.setSubject(updatedTicket.getSubject());
            existingTicket.setCategory(updatedTicket.getCategory());
            existingTicket.setMessages(updatedTicket.getMessages());
            existingTicket.setCustomer(customerId);

            ticketRepo.save(existingTicket);

            return "Ticket Updated Successfully";
        } else {
            return "Ticket Not Found";
        }
    }

    public List<Ticket> getAllCustomerTickets(Long customerId) {

        return ticketRepo.findAllByCustomerId(customerId);
    }
}
