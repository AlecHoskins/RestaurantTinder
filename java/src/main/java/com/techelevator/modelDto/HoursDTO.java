package com.techelevator.modelDto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HoursDTO {

    private DayDTO[] open;
    @JsonProperty("hours_type")
    private String hoursType;
    @JsonProperty("is_open_now")
    private boolean isOpenNow;

    public DayDTO[] getOpen() {
        return open;
    }

    public void setOpen(DayDTO[] open) {
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

    public HoursDTO(DayDTO[] open, String hoursType, boolean isOpenNow) {
        this.open = open;
        this.hoursType = hoursType;
        this.isOpenNow = isOpenNow;
    }

    public HoursDTO() {
    }
}
