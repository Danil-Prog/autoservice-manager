package com.auto.ru.controller;

import com.auto.ru.controller.request.UpdateUserRequest;
import com.auto.ru.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import static com.auto.ru.config.SwaggerConfiguration.BEARER_AUTH_SCHEME;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_AUTH_SCHEME)})
    public void updateUser(@RequestBody UpdateUserRequest updateUserRequest, Principal principal) {
        userService.validateAndUpdateUser(principal, updateUserRequest);
    }
}
