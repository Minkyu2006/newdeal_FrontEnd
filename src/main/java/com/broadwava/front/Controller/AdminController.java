package com.broadwava.front.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    @RequestMapping("accountreg")
    public String accountreg(){
        return "admin/accountreg";
    }

    @RequestMapping("teamreg")
    public String teamreg(){
        return "admin/teamreg";
    }

}
