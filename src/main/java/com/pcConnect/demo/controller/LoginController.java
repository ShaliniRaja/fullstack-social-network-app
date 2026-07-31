package com.pcConnect.demo.controller;

import com.pcConnect.demo.document.Login;
import com.pcConnect.demo.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/version1")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public Login login(@RequestBody Login login) throws Exception {
        System.out.println("login "+login);
        return loginService.verifyLogin(login);
    }

    @PutMapping("/forgetPassword")
    public Login forgetPassword(@RequestBody Login login) throws Exception {
        System.out.println("login "+login);
        return loginService.saveForgotPassword(login);
    }


}
