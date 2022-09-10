package com.techelevator.model.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hours {

    private Day[] open;
    @JsonProperty("hours_type")
    private String hoursType;
    @JsonProperty("is_open_now")
    private boolean isOpenNow;

    public Day[] getOpen() {
        return open;
    }

    public void setOpen(Day[] open) {
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

    public Hours(Day[] open, String hoursType, boolean isOpenNow) {
        this.open = open;
        this.hoursType = hoursType;
        this.isOpenNow = isOpenNow;
    }

    public Hours() {
    }
}
