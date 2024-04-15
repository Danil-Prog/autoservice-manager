package com.auto.ru.repository;

import com.auto.ru.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    Page<Car> findAllByLicencePlateContaining(String licencePlate, Pageable pageable);
}
