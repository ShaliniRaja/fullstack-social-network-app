package com.pcConnect.demo.service;


import com.pcConnect.demo.document.Login;
import com.pcConnect.demo.document.Profile;
import com.pcConnect.demo.repo.LoginMongoRepo;
import com.pcConnect.demo.repo.ProfileMongoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginMongoRepo loginMongoRepo;
    private final ProfileMongoRepo profileMongoRepo;


    public Login saveLogin(Login login) {
        return loginMongoRepo.save(login);
    }

    public Login saveForgotPassword(Login login) throws Exception {
        if(loginMongoRepo.findByEmail(login.getEmail()).isPresent()) {
            Login newLogin = loginMongoRepo.findByEmail(login.getEmail()).get();
            newLogin.setPassword(login.getPassword());
            return loginMongoRepo.save(newLogin);
        }
        else{
            throw new Exception("This User not registered to change the password, please create the user");
        }
    }

    public Login verifyLogin(Login login) throws Exception {
        Optional<Profile> loginOpt = profileMongoRepo.findByEmail(login.getEmail());
        if(loginOpt.isPresent()){
            if(login.getPassword().toLowerCase().equals(loginOpt.get().getPassword()))
            {
                return login;
            }
        }
        throw new Exception("invalid password");
    }
}
