package com.techelevator.dao.event;

import com.techelevator.model.event.Event;

import java.util.List;

public interface EventDao {

    Event getEventById(long eventId);

    List<Event> getEventByUserId(long userId);

    List<Event> getEventByHostId(long hostId);

    int addEvent(Event event);
}
