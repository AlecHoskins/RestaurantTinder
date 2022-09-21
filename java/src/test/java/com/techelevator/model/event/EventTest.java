package com.techelevator.model.event;

import com.techelevator.dto.VoteTallyDTO;
import com.techelevator.model.restaurant.Restaurant;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class EventTest {
    @Test
    public void eventModelTest() {

        List<Restaurant> restaurantList = new ArrayList<>();
        List<Guest> guestList = new ArrayList<>();
        List<VoteTallyDTO> voteDTOList = new ArrayList<>();
        List<Vote> voteList = new ArrayList<>();

        Restaurant restaurant = new Restaurant();
        restaurant.setId("test");
        restaurantList.add(restaurant);

        Vote vote = new Vote();
        vote.setUpVote(true);
        vote.setRestaurantId("test");
        voteList.add(vote);

        Guest guest = new Guest(3, 0, "Mo", "test", (long)3, voteList);
        guestList.add(guest);

        VoteTallyDTO voteDTO = new VoteTallyDTO();
        voteDTOList.add(voteDTO);

        Event event = new Event(0, 3, "2022-09-09T21:52",
                "2022-09-09T21:52", restaurantList, guestList, "TestEvent", voteDTOList);

        Assert.assertEquals(0, event.getId());
        Assert.assertEquals(3, event.getHostId());
        Assert.assertEquals("2022-09-09T21:52", event.getEventDayTime());
        Assert.assertEquals("2022-09-09T21:52", event.getDecisionDeadline());
        Assert.assertEquals(restaurantList, event.getEventRestaurants());
        Assert.assertEquals(guestList, event.getGuestList());
        Assert.assertEquals("TestEvent", event.getEventTitle());
        Assert.assertEquals(voteDTOList, event.getVotes());
    }
}
