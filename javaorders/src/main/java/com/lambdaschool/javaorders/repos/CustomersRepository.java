package com.lambdaschool.javaorders.repos;

import org.springframework.data.repository.CrudRepository;

public interface CustomersRepository extends CrudRepository<Customer, Long>
{
}
