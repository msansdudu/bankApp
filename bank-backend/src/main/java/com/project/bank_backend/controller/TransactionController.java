package com.project.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.bank_backend.model.Transaction;
import com.project.bank_backend.service.TransactionService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    public static class TransferRequest {
        @NotNull(message = "Sender account ID is required")
        public Long senderAccountID;

        @NotNull(message = "Receiver account ID is required")
        public Long receiverAccountID;

        @Positive(message = "Amount must be greater than zero")
        public BigDecimal amount;

        @NotBlank(message = "Currency cannot be empty")
        public String currency;
    }

    @PostMapping
    public Transaction transferMoney(@Valid @RequestBody TransferRequest request) {
        return transactionService.transferMoney(
                request.senderAccountID,
                request.receiverAccountID,
                request.amount,
                request.currency);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable Long userId) {
        return transactionService.getTransactionsByUserId(userId);
    }
}
