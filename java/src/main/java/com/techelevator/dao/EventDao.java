package com.techelevator.dao;

import com.techelevator.model.Event;

import java.util.List;

public interface EventDao {

    Event getEventById(long eventId);

    List<Event> getEventByUserId(long userId);

    List<Event> getEventByHostId(long hostId);

    void addEvent(Event event);
}
