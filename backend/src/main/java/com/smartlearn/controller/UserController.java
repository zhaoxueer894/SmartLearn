package com.smartlearn.controller;

import com.smartlearn.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final List<User> users = new ArrayList<>();

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        users.add(user);
        return Map.of("message", "User registered successfully!", "username", user.getUsername());
    }

    @GetMapping
    public List<User> all() {
        return users;
    }
}
