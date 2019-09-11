package com.lambdaschool.javaorders.models;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Order
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ordnum;

    private double ordamount;
    private double advanceamount;
    private String orddescription;

    @Column(nullable = false)
    private long custcode;
}