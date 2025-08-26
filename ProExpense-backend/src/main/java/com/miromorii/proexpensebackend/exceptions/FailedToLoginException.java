package com.miromorii.proexpensebackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class FailedToLoginException extends RuntimeException {

    public FailedToLoginException() {
        super("Failed to login");
    }
}
