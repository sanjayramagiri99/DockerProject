package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class GreetingController {

    @GetMapping("/")
    public Map<String, String> root() {
        return Map.of(
            "message", "Backend is running!",
            "status", "OK",
            "endpoints", "/api/greeting, /api/users, /api/products, /api/tasks"
        );
    }

    @GetMapping("/api/greeting")
    public Map<String, String> greeting() {
        return Map.of("message", "Hello from the microservice");
    }
}


