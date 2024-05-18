package com.auto.ru.repository;

import com.auto.ru.entity.client.ClientVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface ClientVisitRepository extends JpaRepository<ClientVisit, Long> {

    @Query("SELECT cv FROM ClientVisit as cv WHERE cv.visitDate >= :startDate AND cv.visitDate <= :endDate")
    List<ClientVisit> findByDateRange(Instant startDate, Instant endDate);
}
