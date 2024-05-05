package com.auto.ru.repository;

import com.auto.ru.entity.client.ClientVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientVisitRepository extends JpaRepository<ClientVisit, Long> {
}
