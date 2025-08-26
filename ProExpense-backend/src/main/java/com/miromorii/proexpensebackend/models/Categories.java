package com.miromorii.proexpensebackend.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Categories {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private UUID userID;

    //------------------------------------------------------------------------------------------------------
    public Categories(UUID id, String name, UUID user) {
        this.id = id;
        this.name = name;
        this.userID = user;
    }

    public Categories() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }
}
