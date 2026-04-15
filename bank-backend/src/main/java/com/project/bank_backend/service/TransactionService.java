package com.project.bank_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.bank_backend.model.BankAccount;
import com.project.bank_backend.model.Transaction;
import com.project.bank_backend.repository.BankAccountRepository;
import com.project.bank_backend.repository.TransactionRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Transactional
    public Transaction transferMoney(Long senderId, Long receiverId, BigDecimal amount, String currency) {
        BankAccount sender = bankAccountRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender account not found"));
        BankAccount receiver = bankAccountRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (sender.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }
        if (!sender.getCurrency().equals(receiver.getCurrency())) {
            throw new RuntimeException("Currencies do not match");
        }
        sender.setBalance(sender.getBalance().subtract(amount));
        receiver.setBalance(receiver.getBalance().add(amount));

        bankAccountRepository.save(sender);
        bankAccountRepository.save(receiver);

        Transaction transaction = new Transaction();
        transaction.setSenderAccountID(sender);
        transaction.setReceiverAccountID(receiver);
        transaction.setAmount(amount);
        transaction.setCurrency(currency);
        transaction.setStatus("COMPLETED");

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findAllByUserId(userId);
    }
}
