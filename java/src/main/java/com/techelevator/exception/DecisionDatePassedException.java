package com.techelevator.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_MODIFIED, reason = "Decision date has passed.")
public class DecisionDatePassedException extends RuntimeException{
    public DecisionDatePassedException(String message) {
        super(message);
    }

    public DecisionDatePassedException() {
    }
}
