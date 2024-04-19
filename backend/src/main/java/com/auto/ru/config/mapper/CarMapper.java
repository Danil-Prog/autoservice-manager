package com.auto.ru.config.mapper;

import com.auto.ru.config.dto.CarDto;
import com.auto.ru.entity.Car;

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
