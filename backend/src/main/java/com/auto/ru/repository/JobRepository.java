package com.auto.ru.repository;

import com.auto.ru.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
