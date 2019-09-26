package com.lambdaschool.devdeskqueue;

import com.lambdaschool.devdeskqueue.models.*;
import com.lambdaschool.devdeskqueue.services.RoleService;
import com.lambdaschool.devdeskqueue.services.TicketService;
import com.lambdaschool.devdeskqueue.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Transactional
@Component
public class SeedData implements CommandLineRunner
{
    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    TicketService ticketService;


    @Override
    public void run(String[] args) throws Exception
    {
        Role adminRole = new Role("admin");
        Role studentRole = new Role("student");
        Role helperRole = new Role("helper");

        roleService.save(adminRole);
        roleService.save(studentRole);
        roleService.save(helperRole);

        // admin
        ArrayList<UserRoles> admins = new ArrayList<>();
        admins.add(new UserRoles(new User(), adminRole));
        User u1 = new User("admin", "password", admins);
        u1.getUseremails()
          .add(new Useremail(u1, "admin@email.local"));
        userService.save(u1);

        // student
        ArrayList<UserRoles> students = new ArrayList<>();
        students.add(new UserRoles(new User(), studentRole));
        User stud1 = new User("Matt", "password", students);
        stud1.getUseremails()
                .add(new Useremail(stud1, "mjherich@gmail.com"));
        userService.save(stud1);

        // student
        User stud2 = new User("alice", "bob", students);
        stud1.getUseremails()
                .add(new Useremail(stud1, "alice@bob.com"));
        userService.save(stud2);

        // helper
        ArrayList<UserRoles> helpers = new ArrayList<>();
        helpers.add(new UserRoles(new User(), helperRole));
        User helper1 = new User("John", "password", helpers);
        helper1.getUseremails()
                .add(new Useremail(helper1, "john@gmail.com"));
        userService.save(helper1);

        // Create tickets
        User student = userService.findByName("Matt");
        Ticket ticket1 = new Ticket("Help with deployment", "back-end", "This is the description of the problem.", student);
        ticketService.save(ticket1);
        Ticket ticket2 = new Ticket("Can't set up useContext", "React.js", "This is the description of the problem.", student);
        ticketService.save(ticket2);
//        Ticket ticket3 = new Ticket("Need help with environment variables", "DevOps", "This is the description of the problem.", stud2);
//        ticketService.save(ticket3);
    }
}