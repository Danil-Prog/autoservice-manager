package com.auto.ru.repository;

import com.auto.ru.entity.car.CarVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarVisitRepository extends JpaRepository<CarVisit, Long> {
}
