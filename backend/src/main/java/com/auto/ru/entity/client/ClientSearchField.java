package com.auto.ru.entity.client;

public enum ClientSearchField {

    MODEL,
    LICENCE_PLATE,
    DESCRIPTION,
    BODY_NUMBER;

    public String getName(){
        return name().toLowerCase();
    }
}
