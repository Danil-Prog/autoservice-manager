package com.auto.ru.service;

import com.auto.ru.dto.ClientVisitDateRangeDto;
import com.auto.ru.entity.client.Client;
import com.auto.ru.entity.client.ClientSearchField;
import com.auto.ru.entity.client.ClientVisit;
import com.auto.ru.exception.BadRequestException;
import com.auto.ru.repository.ClientRepository;
import com.auto.ru.repository.ClientVisitRepository;
import com.auto.ru.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientVisitRepository clientVisitRepository;
    private final JobRepository jobRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         ClientVisitRepository clientVisitRepository,
                         JobRepository jobRepository) {
        this.clientRepository = clientRepository;
        this.clientVisitRepository = clientVisitRepository;
        this.jobRepository = jobRepository;
    }

    public Optional<Client> addClient(Client client) {
        Client saveClient = clientRepository.save(client);
        return Optional.of(saveClient);
    }

    public Page<Client> findAllClients(ClientSearchField field, String value, Pageable pageable) {
        if (field == null) {
            return clientRepository.findAll(pageable);
        }

        return switch (field) {
            case LICENCE_PLATE -> clientRepository.findAllByLicencePlateContains(value, pageable);

            case MODEL -> clientRepository.findAllByModelContains(value, pageable);

            case BODY_NUMBER -> clientRepository.findAllByBodyNumberContains(value, pageable);

            case DESCRIPTION -> clientRepository.findAllByDescriptionContains(value, pageable);

        };
    }

    public Client findByIdOrThrow(Long clientId) {
        return clientRepository.findById(clientId).orElseThrow(
                () -> new BadRequestException("Client not found with id: " + clientId)
        );
    }

    public void deleteClientById(Long id) {
        Client client = this.findByIdOrThrow(id);
        clientRepository.delete(client);
    }

    public Optional<List<ClientVisit>> addVisit(ClientVisit visit) {
        Client client = this.findByIdOrThrow(visit.getClientId());

        if (visit.getJobs().isEmpty()) {
            throw new BadRequestException("Jobs not found");
        }

        jobRepository.saveAll(visit.getJobs());
        clientVisitRepository.save(visit);

        client.setVisits(visit);

        Client savedClient = clientRepository.save(client);
        return Optional.of(savedClient.getVisits());
    }

    public void deleteVisitById(Long id) {
        ClientVisit clientVisit = clientVisitRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Visit not found with id: " + id));

        Long clientId = clientVisit.getClientId();

        Client client = findByIdOrThrow(clientId);
        client.getVisits().remove(clientVisit);

        clientVisitRepository.save(clientVisit);
    }

    public List<ClientVisitDateRangeDto> getClientVisitsByDateRange(Instant stateDate, Instant endDate) {
        if (endDate.isBefore(stateDate)) {
            throw new BadRequestException("End date cannot be before start date");
        }
        List<ClientVisit> clientVisits = clientVisitRepository.findByDateRange(stateDate, endDate);

        return clientVisits.stream().map(clientVisit -> {
            Client client = findByIdOrThrow(clientVisit.getClientId());
            return new ClientVisitDateRangeDto(
                    client.getId(),
                    clientVisit.getId(),
                    client.getLicencePlate(),
                    client.getStamp(),
                    client.getModel(),
                    clientVisit.getVisitDate()
            );
        }).toList();
    }
}
