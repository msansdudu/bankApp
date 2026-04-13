package com.project.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.bank_backend.model.BankAccount;
import com.project.bank_backend.service.BankAccountService;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class BankAccountController {

    @Autowired
    private BankAccountService accountService;

    @PostMapping
    public BankAccount createAccount(@RequestBody BankAccount account) {
        return accountService.createAccount(account);
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
