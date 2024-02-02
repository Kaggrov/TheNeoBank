package com.capstone.capstonebackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "loginDetails")
public class LoginDetails {

    @Id
    private String loginId;
    private String phoneNumber;
    private String password;

    private Long customerId;

    private String oldPassword;



    public LoginDetails() {
    }

    public LoginDetails(String loginId, String phoneNumber, String password, Long customerId) {
        this.loginId = loginId;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.customerId = customerId;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
