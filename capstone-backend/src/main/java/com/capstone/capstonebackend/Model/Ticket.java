package com.capstone.capstonebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@Document(collection = "ticket")
public class Ticket {

    @Id
    private String ticketId;
    private String description;
    private String status;

    private String subject;

    private String Category;
    private List<String> messages;

    private String fileId;

    private Long customerId;


    public Ticket() {
    }

    public Ticket(String ticketId, String description, String status, String subject, String category, List<String> messages, String fileId, Long customerId) {
        this.ticketId = ticketId;
        this.description = description;
        this.status = status;
        this.subject = subject;
        Category = category;
        this.messages = messages;
        this.fileId = fileId;
        this.customerId = customerId;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public Long getCustomer() {
        return customerId;
    }

    public void setCustomer(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId='" + ticketId + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", subject='" + subject + '\'' +
                ", Category='" + Category + '\'' +
                ", messages=" + messages +
                ", fileId='" + fileId + '\'' +
                ", customerId=" + customerId +
                '}';
    }
}
