package com.javatechie.twilio.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin
@Configuration
@ConfigurationProperties(prefix = "twilio")
@Data
public class TwilioConfig {
    private String accountSid;
    private String authToken;
    private String trialNumber;

}
