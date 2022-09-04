package com.techelevator.model;

public class Event {

    private long id;
    private LocalDateTime timeAndDate;
    private int zip;

    public Event(long id, LocalDateTime timeAndDate, int zip) {
        this.id = id;
        this.timeAndDate = timeAndDate;
        this.zip = zip;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getTimeAndDate() {
        return timeAndDate;
    }

    public void setTimeAndDate(LocalDateTime timeAndDate) {
        this.timeAndDate = timeAndDate;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }
}