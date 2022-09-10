package com.techelevator.dao;

import com.techelevator.model.event.Event;

import java.util.List;

public interface EventDao {

    Event getEventById(long eventId);

    List<Event> getEventByUserId(long userId);

    List<Event> getEventByHostId(long hostId);

    int addEvent(Event event);
}
