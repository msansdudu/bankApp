package com.project.bank_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.bank_backend.model.Transaction;
import com.project.bank_backend.service.TransactionService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    public static class TransferRequest {
        public Long senderAccountId;
        public Long receiverAccountId;
        public BigDecimal amount;
        public String currency;
    }

    @PostMapping
    public Transaction transferMoney(@RequestBody TransferRequest request) {
        return transactionService.transferMoney(
                request.senderAccountId,
                request.receiverAccountId,
                request.amount,
                request.currency);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable Long userId) {
        return transactionService.getTransactionsByUserId(userId);
    }
}
