package com.auto.ru.dto;

import java.time.Instant;

public record ClientVisitDateRangeDto(
        Long clientId,
        Long visitId,
        String licencePlate,
        String stamp,
        String model,
        Instant visitDate
) {
}
