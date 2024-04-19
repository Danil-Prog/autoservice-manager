package com.auto.ru.repository;

import com.auto.ru.entity.car.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    Page<Car> findAllByLicencePlateContaining(String licencePlate, Pageable pageable);

    Page<Car> findAllByBodyNumberContaining(String bodyNumber, Pageable pageable);

    Page<Car> findAllByModelContaining(String model, Pageable pageable);

    Page<Car> findAllByDescriptionContaining(String description, Pageable pageable);
}
