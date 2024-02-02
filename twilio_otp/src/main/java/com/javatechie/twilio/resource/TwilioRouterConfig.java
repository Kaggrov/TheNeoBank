package com.javatechie.twilio.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
@CrossOrigin
@Configuration
public class TwilioRouterConfig {

    @Autowired
    private TwilioOTPHandler handler;

    @Bean
    @CrossOrigin(origins = "http://localhost:3000")
    public RouterFunction<ServerResponse> handleSMS() {
        return RouterFunctions.route()
                .POST("/otp/router/sendOTP", handler::sendOTP)
                .POST("/otp/router/validateOTP", handler::validateOTP)
                .build();
    }
}
