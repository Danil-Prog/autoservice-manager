package com.auto.ru.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
