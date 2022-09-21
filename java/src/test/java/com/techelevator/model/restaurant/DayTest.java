package com.techelevator.model.restaurant;

import org.testng.Assert;
import org.testng.annotations.Test;

public class DayTest {
    @Test
    public void dayModelTest() {
        Day day = new Day(true, "start", "end", 1, "restId", 0);

        Assert.assertTrue(day.isOvernight());
        Assert.assertEquals("start", day.getStart());
        Assert.assertEquals("end", day.getEnd());
        Assert.assertEquals(1, day.getDay());
        Assert.assertEquals("restId", day.getRestaurantId());
        Assert.assertEquals(0, day.getId());
    }
}
