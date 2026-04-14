package com.project.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.bank_backend.model.User;
import com.project.bank_backend.security.JwtUtils;
import com.project.bank_backend.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    public record LoginRequest(String login, String password) {
    }

    public record AuthResponse(String token, Long userId, String login) {
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest request) {
        User user = userService.login(request.login(), request.password());
        String token = jwtUtils.generateToken(user.getLogin());
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getLogin()));
    }
}