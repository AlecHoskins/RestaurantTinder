package com.techelevator.dao.event;

import com.techelevator.dao.JdbcForAll;
import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Category;
import com.techelevator.model.restaurant.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcEventDao extends JdbcForAll implements EventDao {

    public JdbcEventDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public Event getEventById(long eventId) {

        String sql = "SELECT * FROM event WHERE event_id = ?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, eventId);

        if(result.next()) {
            return mapRowToEvent(result);
        }

        return null;
    }

     // WIP
    @Override
    public List<Event> getEventsByUserId(long userId) {
        String sql =
                "SELECT event_id, event_title, event_time, decision_time, host_id, user_id FROM event " +
                "JOIN guest USING(event_id) JOIN users USING(user_id) " +
                "WHERE user_id = ? AND host_id = ?;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, userId);

        List<Event> events = new ArrayList<>();

        while(results.next()) {
            events.add(mapRowToEvent(results));
        }

        return events;
    }

    @Override
    public List<Event> getEventsByHostId(long hostId) {
        String sql =
                "SELECT event_id, event_title, event_time, decision_time, host_id FROM event " +
                "WHERE host_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, hostId);

        List<Event> events = new ArrayList<>();

        while(results.next()) {
            events.add(mapRowToEvent(results));
        }

        return events;
    }

    @Override
    public boolean update(Event updatedEvent) {
        String sql =
                "UPDATE event " +
                "SET event_time = ?, event_title = ?, host_id = ?, decision_time = ? " +
                "WHERE event_id = ?";

        int numberOfRowsUpdated = jdbcTemplate.update(sql,
                updatedEvent.getEventDayTime(), updatedEvent.getEventTitle(), updatedEvent.getHostId(), updatedEvent.getDecisionDeadline(),
                updatedEvent.getId());

        return numberOfRowsUpdated == 1;
    }

    @Override // TODO - is it worth it?
    public boolean delete(long id) {
        return false;
    }

    @Override
    public long addEvent(Event event) {
        String sql =
                "INSERT INTO event (event_time, event_title, host_id, decision_time) " +
                "VALUES(?, ?, ?, ?) " +
                "RETURNING event_id;";

        Long eventId = jdbcTemplate.queryForObject(sql, Long.class,
                event.getEventDayTime(), event.getEventTitle(), event.getHostId(), event.getDecisionDeadline());

        return eventId != null ? eventId : -1;
    }


}
