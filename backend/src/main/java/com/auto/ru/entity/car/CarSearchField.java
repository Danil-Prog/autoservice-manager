package com.auto.ru.entity.car;

public enum CarSearchField {

    MODEL,
    LICENCE_PLATE,
    DESCRIPTION,
    BODY_NUMBER;

    public String getName(){
        return name().toLowerCase();
    }
}
