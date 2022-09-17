package com.techelevator.model.event;

import com.techelevator.model.restaurant.Restaurant;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class Event implements Comparable {
    @NotEmpty
    private long id;
    @NotEmpty
    private long hostId;
    private String eventTitle;
    private String eventDayTime;
    private String decisionDeadline;
    private List<Restaurant> eventRestaurants;
    private List<Guest> guestList;

    @Override
    public int compareTo(Object o) {
        Event e = ((Event)o); // type cast
        return this.getEventDayTime().compareTo(e.getEventDayTime());
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
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

    public String getEventDayTime() {
        return eventDayTime;
    }

    public void setEventDayTime(String eventDayTime) {
        this.eventDayTime = eventDayTime;
    }

    public String getDecisionDeadline() {
        return decisionDeadline;
    }

    public void setDecisionDeadline(String decisionDeadline) {
        this.decisionDeadline = decisionDeadline;
    }

    public List<Restaurant> getEventRestaurants() {
        return eventRestaurants;
    }

    public void setEventRestaurants(List<Restaurant> eventRestaurants) {
        this.eventRestaurants = eventRestaurants;
    }

    public List<Guest> getGuestList() {
        return guestList;
    }

    public void setGuestList(List<Guest> guestList) {
        this.guestList = guestList;
    }

    public Event(long id, long hostId, String event_daytime, String decision_deadline, List<Restaurant> eventRestaurants, List<Guest> guestList, String eventTitle) {
        this.id = id;
        this.hostId = hostId;
        this.eventDayTime = event_daytime;
        this.decisionDeadline = decision_deadline;
        this.eventRestaurants = eventRestaurants;
        this.guestList = guestList;
        this.eventTitle = eventTitle;
    }

    public Event() {
    }


}




