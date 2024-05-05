package com.auto.ru.repository;

import com.auto.ru.entity.client.JobTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTemplateRepository extends JpaRepository<JobTemplate, Long> {

    @Query("SELECT templates FROM JobTemplate as templates WHERE templates.name LIKE CONCAT('%', LOWER(:type), '%')")
    Page<JobTemplate> findAllByNameContains(String type, Pageable pageable);

}
