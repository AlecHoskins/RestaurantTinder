package com.techelevator.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Event {
    private long id;
    private LocalDateTime timeAndDate;
    private int zip;
    private int hostId;
}



