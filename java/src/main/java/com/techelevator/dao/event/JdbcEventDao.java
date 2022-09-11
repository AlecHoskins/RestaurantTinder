package com.techelevator.dao.event;

import com.techelevator.model.event.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
//            return mapRowToEvent(results);
        } else {
            throw new RuntimeException("eventID " + eventId + " was not found.");
        }
        return null;
    }

     // WIP
    @Override
    public List<Event> getEventByUserId(long userId) {
        return null;
    }

    @Override
    public List<Event> getEventByHostId(long hostId) {
        String sql = "SELECT * FROM event WHERE host_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, hostId);

        if(results.next()) { // needs to loop through results
            return null;
//            return mapRowToEvent(results);
        } else {
            throw new RuntimeException("eventID " + hostId + " was not found.");
        }
    }

    @Override
    public int addEvent(Event event) {

        String sql = "INSERT INTO event (Long.class, host_id, day, time, decision" +
            "VALUES(?,?,?,?,?);";

//        try {
//            jdbcTemplate.queryForObject(sql, Long.class, event.getHostId(), event.getDay(), event.getTime(), event.getDecision());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        return -1;
    }

//    private Event mapRowToEvent(SqlRowSet rs) {
//        Event event = new Event();
//        event.setId(rs.getLong("event_id"));
//        event.setHostId(rs.getLong("host_id"));
//        event.setDay(rs.getInt("day"));
//        event.setTime(rs.getString("time"));
//        event.setDecision(rs.getInt("decision"));
//        return event;
//    }
}
