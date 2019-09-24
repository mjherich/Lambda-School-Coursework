package com.lambdaschool.starthere.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ticketid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String description;

    private String response;

    private boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid",
            nullable = false)
    @JsonIgnoreProperties({"tickets", "hibernateLazyInitializer"})
    private User student;

    public Ticket()
    {
    }

    public Ticket(String name, String category, String description)
    {
        this.name = name;
        this.category = category;
        this.description = description;
    }

    public Ticket(String name, String category, String description, User student)
    {
        this.name = name;
        this.category = category;
        this.description = description;
        this.student = student;
    }

    public long getTicketid()
    {
        return ticketid;
    }

    public void setTicketid(long ticketid)
    {
        this.ticketid = ticketid;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getCategory()
    {
        return category;
    }

    public void setCategory(String category)
    {
        this.category = category;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getResponse()
    {
        return response;
    }

    public void setResponse(String response)
    {
        this.response = response;
    }

    public boolean isActive()
    {
        return active;
    }

    public void setActive(boolean active)
    {
        this.active = active;
    }

    public User getStudent()
    {
        return student;
    }

    public void setStudent(User student)
    {
        this.student = student;
    }
}
