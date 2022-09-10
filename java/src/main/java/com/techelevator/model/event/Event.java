package com.techelevator.model.event;

import com.techelevator.model.restaurant.Restaurant;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class Event {
    @NotEmpty
    private long id;
    @NotEmpty
    private long hostId;
    private int day;
    private String time;
    private int decision;
    private Restaurant[] eventRestaurants;
    private List<Guest> guestList;

    public Event(long id, long hostId, int day, String time, int decision, Restaurant[] eventRestaurants, List<Guest> guestList) {
        this.id = id;
        this.hostId = hostId;
        this.day = day;
        this.time = time;
        this.decision = decision;
        this.eventRestaurants = eventRestaurants;
        this.guestList = guestList;
    }

    public Event() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getHostId() {
        return hostId;
    }

    public void setHostId(long hostId) {
        this.hostId = hostId;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getDecision() {
        return decision;
    }

    public void setDecision(int decision) {
        this.decision = decision;
    }

    public Restaurant[] getEventRestaurants() {
        return eventRestaurants;
    }

    public void setEventRestaurants(Restaurant[] eventRestaurants) {
        this.eventRestaurants = eventRestaurants;
    }

    public List<Guest> getGuestList() {
        return guestList;
    }

    public void setGuestList(List<Guest> guestList) {
        this.guestList = guestList;
    }
}




