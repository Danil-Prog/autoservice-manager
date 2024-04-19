package com.auto.ru.controller;

import com.auto.ru.entity.car.Job;
import com.auto.ru.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import static com.auto.ru.config.SwaggerConfiguration.BEARER_AUTH_SCHEME;

@RestController
@RequestMapping("/api/v1/job")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Page<Job>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Job> jobs = jobService.findAllJobs(search, pageRequest);

        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        return ResponseEntity.of(jobService.addJob(job));
    }

    @PostMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Job> deleteJob(@PathVariable("id") Long id) {
        Job deletedJob = jobService.deleteJobById(id);
        return ResponseEntity.ok(deletedJob);
    }
}
