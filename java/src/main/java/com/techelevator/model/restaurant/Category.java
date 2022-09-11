package com.techelevator.model.restaurant;

public class Category {

    private long id;
    private String alias;
    private String title;

    @Override
    public String toString() {
        return "title: " + title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Category(String alias, String title, long id) {
        this.alias = alias;
        this.title = title;
        this.id = id;
    }

    public Category() {
    }
}
