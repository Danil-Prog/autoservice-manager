package com.auto.ru.entity.client;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "autoservice_manager_job_templates")
public class JobTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotBlank
    @Column(name = "type")
    private String name;

    @Size(max = 999)
    @Column(name = "description", length = 999)
    private String description;

    @Column(name = "price")
    private Long price;
}
