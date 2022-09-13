package com.techelevator.model.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class Day {

    private long id;
    private String restaurantId;
    @JsonProperty("is_overnight")
    private boolean isOvernight;
    private Timestamp start;
    private Timestamp end;
    private int day;

    @Override
    public String toString() {
        return day + ": " + start + " - " + end;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public boolean isOvernight() {
        return isOvernight;
    }

    public void setOvernight(boolean overnight) {
        isOvernight = overnight;
    }

    public Timestamp getStart() {
        return start;
    }

    public void setStart(Timestamp start) {
        this.start = start;
    }

    public Timestamp getEnd() {
        return end;
    }

    public void setEnd(Timestamp end) {
        this.end = end;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public Day(boolean isOvernight, Timestamp start, Timestamp end, int day, String restaurantId, long id) {
        this.isOvernight = isOvernight;
        this.start = start;
        this.end = end;
        this.day = day;
        this.restaurantId = restaurantId;
        this.id = id;
    }

    public Day() {
    }
}
