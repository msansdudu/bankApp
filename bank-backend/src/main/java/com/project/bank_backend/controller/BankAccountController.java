package com.project.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.bank_backend.model.BankAccount;
import com.project.bank_backend.service.BankAccountService;

import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class BankAccountController {

    @Autowired
    private BankAccountService accountService;

    @PostMapping("/create")
    public BankAccount createAccount(@Valid @RequestBody BankAccount account) {
        return accountService.createAccount(account);
    }

    @PostMapping("/create-random")
    public BankAccount createRandomAccount(@RequestBody CreateAccountRequest request) {
        return accountService.createRandomAccount(request.getUserId(), request.getCurrency(), request.getBalance(), request.getAccountType());
    }

    @lombok.Data
    public static class CreateAccountRequest {
        private Long userId;
        private String currency;
        private BigDecimal balance;
        private String accountType;
    }

    @GetMapping("/user/{userId}")
    public List<BankAccount> getAccountsByUserId(@PathVariable Long userId) {
        return accountService.getAccountsByUserId(userId);
    }

    @GetMapping("/{accountNumber}")
    public BankAccount getAccountByNumber(@PathVariable String accountNumber) {
        return accountService.getAccountByAccountNumber(accountNumber);
    }
}
