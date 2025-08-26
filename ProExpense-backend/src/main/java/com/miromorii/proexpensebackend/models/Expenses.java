package com.miromorii.proexpensebackend.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double amount;  

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Date expenseDate;

    @Column(nullable = true)
    private String receiptUrl;

    @Column(nullable = false)
    private UUID userID;

    @Column(nullable = false)
    private UUID categoryID;
    //------------------------------------------------------------------------------------------------------


    public Expenses(UUID id, String name, double amount, String description, Date expenseDate, String receiptUrl, UUID userID, UUID categoryID) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.expenseDate = expenseDate;
        this.receiptUrl = receiptUrl;
        this.userID = userID;
        this.categoryID = categoryID;
    }

    public Expenses(UUID id, String name, double amount, String description, Date expenseDate, UUID userID, UUID categoryID) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.expenseDate = expenseDate;
        this.userID = userID;
        this.categoryID = categoryID;
    }

    public Expenses() {
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(Date expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getReceiptUrl() {
        return receiptUrl;
    }

    public void setReceiptUrl(String receiptUrl) {
        this.receiptUrl = receiptUrl;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public UUID getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(UUID categoryID) {
        this.categoryID = categoryID;
    }
}
