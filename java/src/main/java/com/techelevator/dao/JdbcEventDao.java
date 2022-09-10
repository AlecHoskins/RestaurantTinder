package com.techelevator.dao;

import com.techelevator.model.Event;
import com.techelevator.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class JdbcEventDao implements EventDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcEventDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Event getEventById(long eventId) {

        String sql = "SELECT * FROM event WHERE event_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, eventId);

        if(results.next()) {
            return mapRowToEvent(results);
        } else {
            throw new RuntimeException("eventID " + eventId + " was not found.");
        }
    }

    @Override
    public Event getEventByUserId(long userId) {
        String sql = "SELECT * FROM event WHERE host_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);

        if(results.next()) {
            return mapRowToEvent(results);
        } else {
            throw new RuntimeException("eventID " + userId + " was not found.");
        }
    }

    @Override
    public void addEvent(Event event) {

        String sql = "INSERT INTO event (Long.class, host_id, day, time, decision" +
            "VALUES(?,?,?,?,?);";

        try {
        jdbcTemplate.queryForObject(sql, Long.class, event.getHostId(), event.getDay(), event.getTime(), event.getDecision());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private Event mapRowToEvent(SqlRowSet rs) {
        Event event = new Event();
        event.setId(rs.getLong("event_id"));
        event.setHostId(rs.getLong("host_id"));
        event.setDay(rs.getInt("day"));
        event.setTime(rs.getString("time"));
        event.setDecision(rs.getInt("decision"));
        return event;
    }
}
