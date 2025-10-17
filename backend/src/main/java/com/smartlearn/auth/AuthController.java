package com.smartlearn.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    // Simple in-memory user store for demonstration
    private static final Map<String, UserRoleDTO> USERS = new HashMap<>();
    private static long nextId = 1;

    @PostMapping("/register")
    public ResponseEntity<UserRoleDTO> register(@RequestBody UserRoleDTO user) {
        if (USERS.containsKey(user.getUsername())) {
            return ResponseEntity.badRequest().build();
        }
        user.setId(nextId++);
        USERS.put(user.getUsername(), user);
        // In a real app, you'd save to DB and return a token/session
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        // Password check is skipped for this minimal demo
        if (USERS.containsKey(username)) {
            UserRoleDTO user = USERS.get(username);
            // Simulate a successful login and return user info and a mock token
            Map<String, Object> response = new HashMap<>();
            response.put("token", "mock-jwt-token-for-" + user.getUsername());
            response.put("user", user);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).build(); // Unauthorized
    }
}
