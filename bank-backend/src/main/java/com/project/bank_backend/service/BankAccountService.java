package com.project.bank_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.bank_backend.model.BankAccount;
import com.project.bank_backend.model.User;
import com.project.bank_backend.repository.BankAccountRepository;
import com.project.bank_backend.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class BankAccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private UserRepository userRepository;

    private final Random random = new Random();

    public BankAccount createAccount(BankAccount account) {
        return bankAccountRepository.save(account);
    }

    public BankAccount createRandomAccount(Long userId, String currency, BigDecimal balance, String accountType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BankAccount account = new BankAccount();
        account.setUser(user);
        account.setCurrency(currency);
        account.setBalance(balance);
        account.setAccountType(accountType != null ? accountType : "DEBIT");
        account.setExpireDate(LocalDate.now().plusYears(5));
        account.setCvcCode(String.format("%03d", random.nextInt(1000)));
        account.setAccountNumber(generateUniqueAccountNumber());

        return bankAccountRepository.save(account);
    }

    private String generateUniqueAccountNumber() {
        String accountNumber;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 16; i++) {
                sb.append(random.nextInt(10));
            }
            accountNumber = sb.toString();
        } while (bankAccountRepository.findByAccountNumber(accountNumber).isPresent());
        
        return accountNumber;
    }

    public List<BankAccount> getAccountsByUserId(Long userId) {
        return bankAccountRepository.findByUserId(userId);
    }

    public BankAccount getAccountByAccountNumber(String accountNumber) {
        return bankAccountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }
}
