package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.Customer;
import com.capstone.capstonebackend.Model.Transaction;
import com.capstone.capstonebackend.Repository.TransactionRepo;
import com.capstone.capstonebackend.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;

import java.util.List;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    TransactionService transactionService;
    
    @Autowired
    private TransactionRepo transactionRepository;

    @PostMapping("/transactions/{customerId}/{payeeId}")
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction,@PathVariable Long customerId,@PathVariable Long payeeId){
        return transactionService.addTransaction(transaction,customerId,payeeId);
    }

    @GetMapping("/transactions")
    public List<Transaction>getAllTransactions(){
        return transactionService.getAllTransactions();
    }
    @GetMapping("/transactions/{type}")
    public List<Transaction>getTransactionByType(@PathVariable String type){
        return transactionService.getTransactionByType(type);
    }
    @DeleteMapping("/transactions/{transactionId}")
    public String removeTransaction(@PathVariable Long transactionId) {
    	return transactionService.deletetransaction(transactionId);
    }

    @GetMapping("/transactions/{type}/{account}")
    public List<Transaction>getTransactionByTypeAndAccount(@PathVariable String type,@PathVariable String account){
        return transactionService.getTransactionByTypeAndAccount(type,account);
    }

    @GetMapping("/transactions/sender/{type}/{customerId}")
    public List<Transaction>getTransactionByTypeAndSenderId(@PathVariable String type,@PathVariable Long customerId){
        return transactionService.getTransactionByTypeAndSenderId(type,customerId);
    }

    @GetMapping("/transactions/sender/{customerId}")
    public List<Transaction> getTransactionsBySenderId(@PathVariable Long customerId) {
        return transactionService.getTransactionsBySenderId(customerId);
    }
    @GetMapping("/transactions/generate-pdf/{customerId}")
    public ResponseEntity<byte[]> downloadTransactionsPDF(@PathVariable Long customerId) {
        List<Transaction> transactions = transactionRepository.findBySender_CustomerId(customerId); // Fetch transactions from your repository
        
        try (PDDocument document = new PDDocument()) {
            int transactionsPerPage = 15; // Number of transactions per page
            int currentPage = 0;

            for (int i = 0; i < transactions.size(); i += transactionsPerPage) {
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);
                currentPage++;
                

                // Create a new content stream for this page
                PDPageContentStream contentStream = new PDPageContentStream(document, page);
                
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                float yPosition = page.getMediaBox().getHeight() - 50;
                
                Transaction transactionn = transactions.get(i);
                Customer sender = transactionn.getSender();
                //Payee receiver = transaction.getReceiver();
                String customerText = "Customer ID: "+ sender.getCustomerId()+
                		"       Sender: " + sender.getCustomerName()+
                        "       Contact: " + sender.getPhoneNumber();
                        
                yPosition -= 20;
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText(customerText);
                contentStream.endText();
                yPosition -= 40;

                // Set the font and position for transaction text
                

                // Add transactions to the page
                for (int j = i; j < Math.min(i + transactionsPerPage, transactions.size()); j++) {
                	
                	Transaction transaction = transactions.get(j);
                	
                    
                    String transactionText = "Transaction Id: " + transaction.getTransactionId()+ 
                    		",  Date: " + transaction.getTimeStamp() +
                    		",  Type :" + transaction.getTransactionType()+
                    		",  Account :" + transaction.getAccount()+
                    		",  Amount: " + transaction.getAmount();
                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, yPosition);
                    contentStream.showText(transactionText);
                    contentStream.endText();
                    yPosition -= 40; // Adjust vertical position for the next transaction
                }

                contentStream.close();
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "transactions.pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(byteArrayOutputStream.size())
                    .body(byteArrayOutputStream.toByteArray());

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

}
