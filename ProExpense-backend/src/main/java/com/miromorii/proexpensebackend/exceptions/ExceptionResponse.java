package com.miromorii.proexpensebackend.exceptions;

import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

public record ExceptionResponse(Date timestamp, String message, String details) {
}
