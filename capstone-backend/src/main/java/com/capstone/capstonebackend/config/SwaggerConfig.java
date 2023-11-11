package com.capstone.capstonebackend.config;


import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket apiDocket() {
        Docket docket =  new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .paths(PathSelectors.any())
                .build();
        return docket;
    }
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Book Service")
                .description("Sample Books Generateed Using SWAGGER2 for our Book Rest API")
                .termsOfServiceUrl("https://www.youtube.com/channel/UCORuRdpN2QTCKnsuEaeK-kQ")
                .license("Java_Gyan_Mantra License")
                .licenseUrl("https://www.youtube.com/channel/UCORuRdpN2QTCKnsuEaeK-kQ")
                .version("1.0")
                .build();
    }
}

