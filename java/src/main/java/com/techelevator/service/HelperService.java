package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.model.event.Event;

import java.time.LocalDateTime;

public class HelperService extends AutowireService {

    public static boolean isPastDeadline(long eventId, EventDao eventDao) {
        Event event = eventDao.getEventById(eventId);

        return LocalDateTime.now().isEqual(LocalDateTime.parse(event.getDecisionDeadline()))
                || LocalDateTime.now().isAfter(LocalDateTime.parse(event.getDecisionDeadline()));
    }

}
