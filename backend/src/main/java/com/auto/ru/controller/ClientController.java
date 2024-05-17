package com.auto.ru.controller;

import com.auto.ru.dto.ClientDto;
import com.auto.ru.mapper.ClientMapper;
import com.auto.ru.entity.client.Client;
import com.auto.ru.entity.client.ClientSearchField;
import com.auto.ru.entity.client.ClientVisit;
import com.auto.ru.service.ClientService;
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
@RequestMapping("/api/v1/client")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        return ResponseEntity.of(clientService.addClient(client));
    }

    @GetMapping
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Page<ClientDto>> getAllClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") ClientSearchField field,
            @RequestParam(defaultValue = "") String value
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ClientDto> clients = clientService.findAllClients(field, value, pageRequest).map(ClientMapper::toDto);

        return ResponseEntity.ok(clients);
    }

    @DeleteMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Client> deleteClient(@PathVariable Long id) {
        clientService.deleteClientById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/visit")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<List<ClientVisit>> addVisitToClient(@RequestBody ClientVisit visit) {
        return ResponseEntity.of(clientService.addVisit(visit));
    }

    @DeleteMapping("/visit/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public void deleteVisit(@PathVariable Long id) {
        clientService.deleteVisitById(id);
    }

    @GetMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = clientService.findByIdOrThrow(id);
        return ResponseEntity.ok(client);
    }
}
