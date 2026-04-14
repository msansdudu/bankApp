package com.project.bank_backend.repository;

import com.project.bank_backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId ORDER BY n.timestamp DESC")
    List<Notification> findAllByUserId(@Param("userId") Long userId);
}
