package com.auto.ru.repository;

import com.auto.ru.entity.car.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    Page<Job> findAllByNameContainingAndIsTemplateTrue(String type, Pageable pageable);
}
