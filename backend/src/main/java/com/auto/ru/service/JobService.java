package com.auto.ru.service;

import com.auto.ru.entity.client.JobTemplate;
import com.auto.ru.exception.BadRequestException;
import com.auto.ru.repository.JobTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobService {

    private final JobTemplateRepository jobTemplateRepository;

    @Autowired
    public JobService(JobTemplateRepository jobTemplateRepository) {
        this.jobTemplateRepository = jobTemplateRepository;
    }

    public Page<JobTemplate> getJobTemplates(String search, PageRequest pageRequest) {
        return jobTemplateRepository.findAllByNameContains(search, pageRequest);
    }

    public Optional<JobTemplate> addJobTemplate(JobTemplate jobTemplate) {
        return Optional.of(jobTemplateRepository.save(jobTemplate));
    }

    public JobTemplate deleteJobTemplateById(Long id) {
        JobTemplate job = jobTemplateRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Job with id " + id + " not found"));
        jobTemplateRepository.delete(job);
        return job;
    }
}
