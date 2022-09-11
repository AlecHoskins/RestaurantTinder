package com.techelevator.model.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Hours {

    private List<Day> open;
    @JsonProperty("hours_type")
    private String hoursType;
    @JsonProperty("is_open_now")
    private boolean isOpenNow;

    @Override
    public String toString() {
        return open.toString();
    }

    public List<Day> getOpen() {
        return open;
    }

    public void setOpen(List<Day> open) {
        this.open = open;
    }

    public String getHoursType() {
        return hoursType;
    }

    public void setHoursType(String hoursType) {
        this.hoursType = hoursType;
    }

    public boolean isOpenNow() {
        return isOpenNow;
    }

    public void setOpenNow(boolean openNow) {
        isOpenNow = openNow;
    }

    public Hours(List<Day> open, String hoursType, boolean isOpenNow) {
        this.open = open;
        this.hoursType = hoursType;
        this.isOpenNow = isOpenNow;
    }

    public Hours() {
    }
}
