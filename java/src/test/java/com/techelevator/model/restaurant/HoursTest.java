package com.techelevator.model.restaurant;

import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class HoursTest {
    @Test
    public void hourModelTest() {
        List<Day> dayList = new ArrayList<>();
        Day day = new Day();
        dayList.add(day);

        Hours hours = new Hours(dayList, "hourType", true);

        Assert.assertEquals(dayList, hours.getOpen());
        Assert.assertEquals("hourType", hours.getHoursType());
        Assert.assertTrue(hours.isOpenNow());
    }
}
