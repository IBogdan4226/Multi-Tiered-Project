package com.multitiered.multitiered;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MultitieredApplication {
    public static void main(String[] args) {
        SpringApplication.run(MultitieredApplication.class, args);
    }
}
