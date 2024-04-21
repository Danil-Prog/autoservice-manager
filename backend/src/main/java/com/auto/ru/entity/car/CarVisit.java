package com.auto.ru.entity.car;

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
public class CarVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_visit")
    private Instant visitDate = Instant.now();

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Job> jobs;

    @Column(name = "comment")
    private String comment;

    @Column(name = "car_id")
    private Long carId;
}
