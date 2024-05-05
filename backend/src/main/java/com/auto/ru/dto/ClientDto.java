package com.auto.ru.dto;

public record ClientDto(Long id,
                        String licencePlate,
                        String model,
                        String year,
                        String bodyNumber,
                        String oil,
                        Long odometer) {
}
