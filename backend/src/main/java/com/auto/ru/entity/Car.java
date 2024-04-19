package com.auto.ru.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "autoservice_manager_cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 6, max = 9)
    @Column(name = "licence_plate", nullable = false)
    private String licencePlate;

    @Column(name = "stamp")
    private String stamp;

    @Column(name = "model")
    private String model;

    @Size(min = 4, max = 4)
    @Column(name = "year")
    private String year;

    @Column(name = "body_number")
    private String bodyNumber;

    @Column(name = "oil")
    private String oil;

    @Column(name = "odometer")
    private Long odometer;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<CarVisit> visits = new ArrayList<>();

    public Car(String licencePlate) {
        this.licencePlate = licencePlate;
    }

    public Car() {

    }

    public void setVisits(CarVisit carVisit) {
        this.visits.add(carVisit);
    }
}
