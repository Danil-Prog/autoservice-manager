package com.auto.ru.repository;

import com.auto.ru.entity.client.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT cl FROM Client as cl WHERE cl.licencePlate LIKE CONCAT('%', LOWER(:licencePlate), '%')")
    Page<Client> findAllByLicencePlateContains(String licencePlate, Pageable pageable);

    @Query("SELECT cl FROM Client as cl WHERE cl.bodyNumber LIKE CONCAT('%', LOWER(:bodyNumber), '%')")
    Page<Client> findAllByBodyNumberContains(String bodyNumber, Pageable pageable);

    @Query("SELECT cl FROM Client as cl WHERE cl.model LIKE CONCAT('%', LOWER(:model), '%')")
    Page<Client> findAllByModelContains(String model, Pageable pageable);

    @Query("SELECT cl FROM Client as cl WHERE cl.description LIKE CONCAT('%', LOWER(:description), '%')")
    Page<Client> findAllByDescriptionContains(String description, Pageable pageable);
}
