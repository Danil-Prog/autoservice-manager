package com.auto.ru.mapper;

import com.auto.ru.dto.CarDto;
import com.auto.ru.entity.car.Car;

public class CarMapper {

    public static CarDto toDto(Car car) {
        return new CarDto(
                car.getId(),
                car.getLicencePlate(),
                car.getModel(),
                car.getYear(),
                car.getBodyNumber(),
                car.getOil(),
                car.getOdometer()
        );
    }
}
