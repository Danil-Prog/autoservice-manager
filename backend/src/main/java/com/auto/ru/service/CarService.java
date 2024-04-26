package com.auto.ru.service;

import com.auto.ru.entity.car.Car;
import com.auto.ru.entity.car.CarSearchField;
import com.auto.ru.entity.car.CarVisit;
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

    public Page<Car> findAllCars(CarSearchField field, String value, Pageable pageable) {
        if (field == null) {
            return carRepository.findAll(pageable);
        }

        return switch (field) {
            case LICENCE_PLATE -> carRepository.findAllByLicencePlateContaining(value, pageable);

            case MODEL -> carRepository.findAllByModelContaining(value, pageable);

            case BODY_NUMBER -> carRepository.findAllByBodyNumberContaining(value, pageable);

            case DESCRIPTION -> carRepository.findAllByDescriptionContaining(value, pageable);

        };
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

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Car not found with id: " + id));
    }

    public void deleteVisitById(Long id) {
        CarVisit carVisit = carVisitRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("CarVisit not found with id: " + id));

        Long carId = carVisit.getCarId();
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new BadRequestException("Car not found with id: " + carId));
        car.getVisits().remove(carVisit);

        carVisitRepository.save(carVisit);
    }
}
