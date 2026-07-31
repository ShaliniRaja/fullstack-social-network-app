package com.pcConnect.demo.repo;

import com.pcConnect.demo.document.Login;
import com.pcConnect.demo.document.Psconnect;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PsConnectMongoRepo extends MongoRepository<Psconnect,String> {
}
