package com.codestates.coco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class CocoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CocoApplication.class, args);
    }

}
