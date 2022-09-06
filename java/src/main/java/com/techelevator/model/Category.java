package com.techelevator.model;

public class Category {

    private String alias;
    private String title;

    @Override
    public String toString() {
        return "title: " + title;
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

    public Category(String alias, String title) {
        this.alias = alias;
        this.title = title;
    }

    public Category() {
    }
}
