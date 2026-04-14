package com.project.bank_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.bank_backend.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t WHERE t.senderAccountID.user.id = :userId "
            + "OR t.receiverAccountID.user.id = :userId ORDER BY t.timestamp DESC")
    List<Transaction> findAllByUserId(@Param("userId") Long userId);

    List<Transaction> findBySenderAccountID(Long senderAccountID);

    List<Transaction> findByReceiverAccountID(Long receiverAccountID);
}
