package com.smartlearn.auth;

import com.smartlearn.model.User;
import com.smartlearn.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRoleDTO userDto) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(userDto.getUsername())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(error);
        }

        // 验证密码
        if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Password is required");
            return ResponseEntity.badRequest().body(error);
        }

        // 创建新用户
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(userDto.getRole());

        User savedUser = userRepository.save(user);

        // 返回用户信息（不包含密码）
        UserRoleDTO responseDto = new UserRoleDTO();
        responseDto.setId(savedUser.getId());
        responseDto.setUsername(savedUser.getUsername());
        responseDto.setRole(savedUser.getRole());

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // 验证输入
        if (username == null || username.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Username is required");
            return ResponseEntity.badRequest().body(error);
        }

        if (password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Password is required");
            return ResponseEntity.badRequest().body(error);
        }

        // 查找用户
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid username or password");
            return ResponseEntity.status(401).body(error);
        }

        User user = userOptional.get();

        // 验证密码
        if (!passwordEncoder.matches(password, user.getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid username or password");
            return ResponseEntity.status(401).body(error);
        }

        // 创建响应（不包含密码）
        UserRoleDTO userDto = new UserRoleDTO();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setRole(user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt-token-for-" + user.getUsername());
        response.put("user", userDto);

        return ResponseEntity.ok(response);
    }
}
