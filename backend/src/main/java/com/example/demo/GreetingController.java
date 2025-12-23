package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GreetingController {

    @GetMapping("/api/greeting")
    public Map<String, String> greeting() {
        return Map.of("message", "Hello from the microservice");
    }
}


