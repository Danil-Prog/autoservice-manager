package com.auto.ru.entity.client;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "autoservice_manager_visits")
public class ClientVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_visit")
    private Instant visitDate = Instant.now();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Job> jobs;

    @Column(name = "comment")
    private String comment;

    @Column(name = "client_id")
    private Long clientId;
}
