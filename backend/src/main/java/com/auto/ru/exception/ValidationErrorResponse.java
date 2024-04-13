package com.auto.ru.exception;

import java.util.List;

public record ValidationErrorResponse(List<Violation> violations) {}
