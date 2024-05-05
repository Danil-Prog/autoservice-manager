package com.auto.ru.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @Size(min = 10, max = 255)
    @NotBlank
    private String username;

    @Size(min = 10, max = 255)
    @NotBlank
    private String password;
}
