package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.Login;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LoginMongoRepo extends MongoRepository<Login,String> {
    Optional<Login> findByEmail(String email);
}
