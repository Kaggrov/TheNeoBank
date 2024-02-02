package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.LoadFile;
import com.capstone.capstonebackend.Model.Ticket;
import com.capstone.capstonebackend.Service.FileService;
import com.capstone.capstonebackend.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class TicketController {

    @Autowired
    TicketService ticketService;

    @Autowired
    FileService fileService;

    @GetMapping("/tickets")
    public List<Ticket> getAllTickets(){
        return ticketService.getAllTickets();
    }

    @GetMapping("/tickets/{customerId}")
    public List<Ticket>getAllCustomerTickets(@PathVariable Long customerId){
        return ticketService.getAllCustomerTickets(customerId);
    }

    @PostMapping("/tickets/{customerId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> saveTicket(@RequestParam("file") MultipartFile file, @ModelAttribute Ticket ticket,@PathVariable Long customerId) throws IOException {

        String fileId = fileService.addFile(file);

        ticket.setFileId(fileId);

        String savedTicket = ticketService.saveTicket(ticket,customerId);

        Map<String, Object> response = new HashMap<>();
        response.put("ticket", savedTicket);
        response.put("fileId", fileId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/tickets/{customerId}")
    public String updateTicket(@RequestBody Ticket ticket,@PathVariable Long customerId){
        return ticketService.updateTicket(ticket,customerId);
    }

}
