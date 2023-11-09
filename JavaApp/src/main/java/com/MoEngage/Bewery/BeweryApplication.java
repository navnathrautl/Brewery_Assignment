package com.MoEngage.Bewery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.MoEngage.Bewery")
public class BeweryApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeweryApplication.class, args);
	}

}
