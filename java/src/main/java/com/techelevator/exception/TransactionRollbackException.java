package com.techelevator.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_MODIFIED, reason = "Database error, transaction rolled back.")
public class TransactionRollbackException extends RuntimeException {
    public TransactionRollbackException(String message) {
        super(message);
    }

    public TransactionRollbackException() {
    }
}
