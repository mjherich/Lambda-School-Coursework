package com.lambdaschool.devdeskqueue.services;

import com.lambdaschool.devdeskqueue.models.User;
import com.lambdaschool.devdeskqueue.models.UserMinimum;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService
{
    UserDetails loadUserByUsername(String username);

    List<User> findAll();

    User findUserById(long id);

    User findByName(String name);

    void delete(long id);

    User save(User user);

    User saveStudent(UserMinimum user);

    User saveHelper(UserMinimum user);

    User update(User user, long id, boolean isAdmin);

    void deleteUserRole(long userid, long roleid);

    void addUserRole(long userid, long roleid);
}