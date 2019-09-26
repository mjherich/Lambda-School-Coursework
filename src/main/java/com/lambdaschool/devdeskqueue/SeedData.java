package com.lambdaschool.devdeskqueue;

import com.lambdaschool.devdeskqueue.models.Role;
import com.lambdaschool.devdeskqueue.models.User;
import com.lambdaschool.devdeskqueue.models.UserRoles;
import com.lambdaschool.devdeskqueue.models.Useremail;
import com.lambdaschool.devdeskqueue.services.RoleService;
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

        // helper
        ArrayList<UserRoles> helpers = new ArrayList<>();
        helpers.add(new UserRoles(new User(), helperRole));
        User helper1 = new User("John", "password", helpers);
        helper1.getUseremails()
                .add(new Useremail(helper1, "john@gmail.com"));
        userService.save(helper1);
    }
}