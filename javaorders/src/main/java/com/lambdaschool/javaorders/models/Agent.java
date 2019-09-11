package com.lambdaschool.javaorders.models;

import javax.persistence.*;

@Entity
@Table(name = "agents")
public class Agent
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long agentcode;

    @Column(nullable = false)
    private String agentname;

    private String workingarea;
    private double commission;
    private String phone;
    private String country;


}
