package com.project.bank_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String message;

    @Column(nullable = false)
    private String type; // перевод денег / напоминание / информирование

    @Column(nullable = false)
    private Boolean isRead;

    @Column
    private BigDecimal amount;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @org.hibernate.annotations.CreationTimestamp
    private Timestamp timestamp;
}
