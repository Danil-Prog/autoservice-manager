package com.auto.ru.controller;

import com.auto.ru.entity.client.JobTemplate;
import com.auto.ru.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.auto.ru.config.SwaggerConfiguration.BEARER_AUTH_SCHEME;

@RestController
@RequestMapping("/api/v1/job")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/templates")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Page<JobTemplate>> getJobTemplates(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<JobTemplate> jobs = jobService.getJobTemplates(search, pageRequest);

        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/templates")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<JobTemplate> addJobTemplate(@RequestBody JobTemplate jobTemplate) {
        return ResponseEntity.of(jobService.addJobTemplate(jobTemplate));
    }

    @DeleteMapping("/templates/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<JobTemplate> deleteJobTemplate(@PathVariable("id") Long id) {
        JobTemplate deletedJobTemplate = jobService.deleteJobTemplateById(id);
        return ResponseEntity.ok(deletedJobTemplate);
    }
}
