package com.auto.ru.mapper;

import com.auto.ru.dto.ClientDto;
import com.auto.ru.entity.client.Client;

public class ClientMapper {

    public static ClientDto toDto(Client client) {
        return new ClientDto(
                client.getId(),
                client.getLicencePlate(),
                client.getModel(),
                client.getYear(),
                client.getBodyNumber(),
                client.getOil(),
                client.getOdometer()
        );
    }
}
