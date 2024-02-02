package com.capstone.capstonebackend.Controller;

import com.capstone.capstonebackend.Model.LoginDetails;
import com.capstone.capstonebackend.Repository.LoginDetailsRepo;
import com.capstone.capstonebackend.ResponseType.AuthRequest;
import com.capstone.capstonebackend.Service.LoginDetailsService;

import com.capstone.capstonebackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
public class LoginDetailsController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    LoginDetailsService loginDetailsService;
    @Autowired
    private LoginDetailsRepo loginDetailsRepository;


    @PostMapping("/loginUser")
    @ResponseStatus(HttpStatus.CREATED)
    String saveUser(@RequestBody LoginDetails loginDetails){
        return loginDetailsService.saveUserDetails(loginDetails);
    }

    @GetMapping("/loginUser")
    @ResponseStatus(HttpStatus.OK)
    List<LoginDetails>getAllUsers(){
        return loginDetailsService.getAllUser();
    }

    @GetMapping("/loginUser/{phoneNumber}")
    ResponseEntity<?>getRegisteredUsers(@PathVariable String phoneNumber){
        return loginDetailsService.getRegisteredUsers(phoneNumber);
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getPhoneNumber(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("invalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getPhoneNumber());
    }
    
    @PutMapping("/change-password/{customerId}")
    public ResponseEntity<String> changePassword(@PathVariable Long customerId, @RequestBody LoginDetails newpassword) {
        LoginDetails loginDetails = loginDetailsRepository.findByCustomerId(customerId);

        if(loginDetails!=null && !Objects.equals(loginDetails.getPassword(), newpassword.getOldPassword())){
            return ResponseEntity.status(404).body("Wrong Old Password");
        }
        else if (loginDetails != null) {
            loginDetails.setPassword(newpassword.getPassword());
            loginDetailsRepository.save(loginDetails);
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
