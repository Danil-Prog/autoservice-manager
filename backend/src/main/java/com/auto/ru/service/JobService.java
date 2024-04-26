package com.auto.ru.service;

import com.auto.ru.entity.car.CarVisit;
import com.auto.ru.entity.car.Job;
import com.auto.ru.exception.BadRequestException;
import com.auto.ru.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    /**
     *  Поиск шаблонов {@link Job} которые не привязаны к {@link CarVisit}
     */
    public Page<Job> findAllJobs(String search, PageRequest pageRequest) {
        return jobRepository.findAllByNameContainingAndIsTemplateTrue(search, pageRequest);
    }

    public Optional<Job> addJob(Job job) {
        job.setIsTemplate(true);
        return Optional.of(jobRepository.save(job));
    }

    public Job deleteJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Job with id " + id + " not found"));
        jobRepository.delete(job);
        return job;
    }
}
