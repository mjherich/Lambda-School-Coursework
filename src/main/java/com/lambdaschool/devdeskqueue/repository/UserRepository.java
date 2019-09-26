package com.lambdaschool.devdeskqueue.repository;

import com.lambdaschool.devdeskqueue.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>
{
    User findByUsername(String username);
}
