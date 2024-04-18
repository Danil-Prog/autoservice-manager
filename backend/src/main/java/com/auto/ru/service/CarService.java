package com.auto.ru.service;

import com.auto.ru.entity.Car;
import com.auto.ru.entity.CarVisit;
import com.auto.ru.exception.BadRequestException;
import com.auto.ru.repository.CarRepository;
import com.auto.ru.repository.CarVisitRepository;
import com.auto.ru.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final CarVisitRepository carVisitRepository;
    private final JobRepository jobRepository;

    @Autowired
    public CarService(CarRepository carRepository,
                      CarVisitRepository carVisitRepository,
                      JobRepository jobRepository) {
        this.carRepository = carRepository;
        this.carVisitRepository = carVisitRepository;
        this.jobRepository = jobRepository;
    }

    public Optional<Car> addCar(Car car) {
        Car saveCar = carRepository.save(car);
        return Optional.of(saveCar);
    }

    public Page<Car> findAllCars(String licencePlate, Pageable pageable) {
        return carRepository.findAllByLicencePlateContaining(licencePlate, pageable);
    }

    public void deleteCarById(Long id) {
        carRepository.findById(id).orElseThrow(() -> new BadRequestException("Car not found with id: " + id));
        carRepository.deleteById(id);
    }

    public Optional<List<CarVisit>> addVisit(CarVisit visit) {
        Car existsCar = carRepository.findById(visit.getCarId()).orElseThrow(
                () -> new BadRequestException("Car not found with id: " + visit.getCarId())
        );

        if (visit.getJobs().isEmpty()) {
            throw new BadRequestException("Jobs not found");
        }

        jobRepository.saveAll(visit.getJobs());
        carVisitRepository.save(visit);

        existsCar.setVisits(visit);

        Car savedCar = carRepository.save(existsCar);
        return Optional.of(savedCar.getVisits());
    }
}
