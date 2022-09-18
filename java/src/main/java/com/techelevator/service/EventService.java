package com.techelevator.service;

import com.techelevator.dao.event.EventDao;
import com.techelevator.dao.event.EventRestaurantDao;
import com.techelevator.dao.event.GuestDao;
import com.techelevator.dao.event.GuestVoteDao;
import com.techelevator.dao.restaurant.CategoryDao;
import com.techelevator.dao.restaurant.RestaurantCategoryDao;
import com.techelevator.dao.restaurant.RestaurantDao;
import com.techelevator.dao.restaurant.RestaurantHoursDao;
import com.techelevator.dto.VoteTallyDTO;
import com.techelevator.exception.TransactionRollbackException;
import com.techelevator.model.event.Event;
import com.techelevator.model.event.Guest;
import com.techelevator.model.event.Vote;
import com.techelevator.model.restaurant.Category;
import com.techelevator.model.restaurant.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class EventService {

    @Autowired private YelpBusinessService yelpBusinessService;

    @Autowired private EventDao eventDao;
    @Autowired private EventRestaurantDao eventRestaurantDao;

    @Autowired private GuestDao guestDao;
    @Autowired private GuestVoteDao guestVoteDao;

    @Autowired private RestaurantDao restaurantDao;
    @Autowired private CategoryDao categoryDao;
    @Autowired private RestaurantCategoryDao restaurantCategoryDao;
    @Autowired private RestaurantHoursDao restaurantHoursDao;

    public Event getEvent(long id) {
        Event event = eventDao.getEventById(id);

        List<Guest> guests = guestDao.getEventGuests(id);
        for(Guest guest : guests) {
            guest.setVote(guestVoteDao.getVotesByGuest(guest.getId()));
        }
        event.setGuestList(guests);

        event.setVotes(getVotes(id));
        // TODO : check decision deadline, filter accordingly
        List<Restaurant> restaurants = restaurantDao.getEventRestaurants(id);
        for(Restaurant restaurant : restaurants) {
            restaurant.setCategories(restaurantCategoryDao.getCategoriesByRestaurant(restaurant.getId()));
            restaurant.setHours(restaurantHoursDao.getHoursByRestaurant(restaurant.getId()));
        }
        event.setEventRestaurants(restaurants);

        return event;
    }

    public List<Event> getEventsByHost(long id) {
        return getProcessedEventList(eventDao.getEventsByHostId(id));
    }

    public List<Event> getEventsByUser(long id) {
        return getProcessedEventList(eventDao.getEventsByUserId(id));
    }

    private List<Event> getProcessedEventList(List<Event> oldEvents) {
        List<Event> bigEvents = new ArrayList<>();

        Collections.sort(oldEvents);

        for(Event event : oldEvents) {
            bigEvents.add(getEvent(event.getId()));
        }

        return bigEvents;
    }

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public Event addEvent(Event newEvent) throws TransactionRollbackException {
        long eventId = eventDao.addEvent(newEvent);

        for (Restaurant restaurant: newEvent.getEventRestaurants()) {
            // TODO : check if restaurant hours already exists
            boolean isAdded = addRestaurant(yelpBusinessService.getBusinessById(restaurant.getId()));
            if(isAdded) {
                isAdded = eventRestaurantDao.addEventRestaurant(eventId, restaurant.getId());
            }
            if(!isAdded) {
                throw new TransactionRollbackException("addEvent failed, rollback.");
            }
        }

        // TODO : Add host as guest - check with frontend

        for (Guest guest : newEvent.getGuestList()) {
            long id = addGuest(guest, eventId);
            if(id < 0) {
                throw new TransactionRollbackException("addEvent failed, rollback.");
            }
        }

        return getEvent(eventId);
    }

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public boolean addRestaurant(Restaurant restaurant) throws TransactionRollbackException {
        if(restaurantDao.findRestaurantById(restaurant.getId()) != null) {
            return true;
        }

        if(restaurantDao.save(restaurant)) {
            for (Category category : restaurant.getCategories()) {
                long categoryId = categoryDao.getCategoryId(category.getAlias(), category.getTitle());

                if (categoryId == -1) {
                    categoryId = categoryDao.addCategory(category);
                }

                if (categoryId == -1) {
                    throw new TransactionRollbackException("addRestaurant failed, rollback.");
                }

                restaurantCategoryDao.addRestaurantCategory(restaurant.getId(), categoryId);
            }
            if(restaurant.getHours() != null) {
                restaurantHoursDao.addAllHours(restaurant.getHours(), restaurant.getId());
            }
            return true;
        } else {
            throw new TransactionRollbackException("addRestaurant failed, rollback.");
        }
    }

    @Transactional(rollbackFor = TransactionRollbackException.class)
    public long addGuest(Guest guest, long eventId) throws TransactionRollbackException {
        long guestId = guestDao.addGuest(guest, eventId);

        if(guestId == -1) {
            throw new TransactionRollbackException("addGuest failed, rollback.");
        }

        if(guestId > 0) {
            guest.setId(guestId);

            String url_hash = new BCryptPasswordEncoder().encode(guestId + "");

            url_hash = url_hash.replaceAll("/", "0");

            guest.setInviteUrl(url_hash);

            boolean isUpdated = guestDao.updateGuest(guest);
            if(!isUpdated) {
                throw new TransactionRollbackException("addGuest failed, rollback.");
            }

            Event event = getEvent(eventId);
            List<Restaurant> restaurants = event.getEventRestaurants();

            for(Restaurant restaurant : restaurants) {
                boolean isAdded = guestVoteDao.addGuestVote(guestId, restaurant.getId());
                if(!isAdded) {
                    throw new TransactionRollbackException("addGuest failed, rollback.");
                }
            }
        }

        return guestId;
    }

    public List<VoteTallyDTO> getVotes(long eventId) {
        List<VoteTallyDTO> votes = new ArrayList<>();
        Map<String, Integer> voteMap = new HashMap<>();
        List<Vote> upVotes = guestVoteDao.getUpVotesOnly(eventId);

        for (Vote vote : upVotes) {
            if(!voteMap.containsKey(vote.getRestaurantId())) {
                voteMap.put(vote.getRestaurantId(), 0);
            }

            int count = voteMap.get(vote.getRestaurantId());

            if(vote.getUpVote() != null && vote.getUpVote()) {
                voteMap.put(vote.getRestaurantId(), count + 1);
            }
        }

        for (Map.Entry<String, Integer> entry : voteMap.entrySet()) {
            votes.add(new VoteTallyDTO(entry.getKey(), entry.getValue()));
        }

        Collections.sort(votes);

        return votes;
    }
}
