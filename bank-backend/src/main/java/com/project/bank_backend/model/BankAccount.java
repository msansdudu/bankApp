package com.project.bank_backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "bank_accounts")
@Data
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account number cannot be empty")
    @Size(min = 19, max = 19, message = "Account number must be 19 symbols")
    @Column(unique = true, nullable = false)
    private String accountNumber;

    @NotNull(message = "Expire date cannot be empty")
    @Future(message = "Expire date must be in the future")
    @Column(nullable = false)
    private LocalDate expireDate;

    @NotBlank(message = "CVC code cannot be empty")
    @Size(min = 3, max = 3, message = "CVC code must be 3 digits")
    @Column(nullable = false)
    private String cvcCode;

    @NotBlank(message = "Account type cannot be empty")
    @Column(nullable = false)
    private String accountType;

    @Column(nullable = false)
    @PositiveOrZero(message = "Balance cannot be negative")
    private BigDecimal balance;

    @NotBlank(message = "Currency cannot be empty")
    @Size(min = 3, max = 3, message = "Currency must be 3 characters")
    @Column(nullable = false)
    private String currency;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonManagedReference("sender-transactions")
    @OneToMany(mappedBy = "senderAccountID")
    private List<Transaction> sentTransactions;

    @JsonManagedReference("receiver-transactions")
    @OneToMany(mappedBy = "receiverAccountID")
    private List<Transaction> receivedTransactions;
}
