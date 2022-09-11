package com.techelevator.dao.event;

import com.techelevator.model.event.Event;

import java.util.List;

public interface EventDao {

    // Create
    long addEvent(Event event);

    // Read
    Event getEventById(long id);
    List<Event> getEventsByUserId(long userId);
    List<Event> getEventsByHostId(long hostId);

    // Update
    boolean update(Event updatedEvent);

    // Delete
    boolean delete(long id);

}
