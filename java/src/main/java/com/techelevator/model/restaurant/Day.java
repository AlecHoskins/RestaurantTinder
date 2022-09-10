package com.techelevator.model.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Day {

    private long id;
    @JsonProperty("is_overnight")
    private boolean isOvernight;
    private String start;
    private String end;
    private int day;
    private String restaurantId;

    public long getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public Day(boolean isOvernight, String start, String end, int day, String restaurantId, long id) {
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
