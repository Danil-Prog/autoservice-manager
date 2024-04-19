package com.auto.ru.controller;

import com.auto.ru.config.dto.CarDto;
import com.auto.ru.config.mapper.CarMapper;
import com.auto.ru.entity.Car;
import com.auto.ru.entity.CarVisit;
import com.auto.ru.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.auto.ru.config.SwaggerConfiguration.BEARER_AUTH_SCHEME;

@RestController
@RequestMapping("/api/v1/car")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        return ResponseEntity.of(carService.addCar(car));
    }

    @GetMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Page<CarDto>> getAllCars(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<CarDto> cars = carService.findAllCars(search, pageRequest).map(CarMapper::toDto);
        return ResponseEntity.ok(cars);
    }

    @DeleteMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Car> deleteCar(@RequestParam Long id) {
        carService.deleteCarById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/visit")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<List<CarVisit>> addVisit(@RequestBody CarVisit visit) {
        return ResponseEntity.of(carService.addVisit(visit));
    }

    @GetMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        return ResponseEntity.ok(car);
    }
}
