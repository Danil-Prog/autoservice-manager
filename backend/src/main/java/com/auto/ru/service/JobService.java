package com.auto.ru.service;

import com.auto.ru.entity.car.Job;
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

    public Page<Job> findAllJobs(String search, PageRequest pageRequest) {
        return jobRepository.findAllByTypeContaining(search, pageRequest);
    }

    public Optional<Job> addJob(Job job) {
        return Optional.of(jobRepository.save(job));
    }
}
