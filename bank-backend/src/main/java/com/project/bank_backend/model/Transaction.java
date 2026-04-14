package com.project.bank_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference("sender-transactions")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_account_id", nullable = false)
    private BankAccount senderAccountID;

    @JsonBackReference("receiver-transactions")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_account_id", nullable = false)
    private BankAccount receiverAccountID;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency; // валюта

    @Column(nullable = false)
    private String status; // "pending", "completed", "failed"

    @Column(nullable = false)
    @org.hibernate.annotations.CreationTimestamp
    private Timestamp timestamp;

    @JsonProperty("senderName")
    public String getSenderName() {
        return senderAccountID != null && senderAccountID.getUser() != null
                ? senderAccountID.getUser().getName() : "Unknown";
    }

    @JsonProperty("receiverName")
    public String getReceiverName() {
        return receiverAccountID != null && receiverAccountID.getUser() != null
                ? receiverAccountID.getUser().getName() : "Unknown";
    }

    @JsonProperty("senderUserId")
    public Long getSenderUserId() {
        return senderAccountID != null && senderAccountID.getUser() != null
                ? senderAccountID.getUser().getId() : null;
    }

    @JsonProperty("receiverUserId")
    public Long getReceiverUserId() {
        return receiverAccountID != null && receiverAccountID.getUser() != null
                ? receiverAccountID.getUser().getId() : null;
    }
}
