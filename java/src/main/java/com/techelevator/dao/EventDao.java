package com.techelevator.dao;

import com.techelevator.model.Event;

public interface EventDao {

    Event getEventById(long eventId);

    Event getEventByUserId(long userId);

    void addEvent(Event event);
}
