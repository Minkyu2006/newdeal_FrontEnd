package com.broadwava.front.Controller;

import com.broadwava.front.Enum.AccountRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    @RequestMapping("accountreg")
    public String accountreg(Model model){
        model.addAttribute("roles", AccountRole.values());
        return "admin/accountreg";
    }

    @RequestMapping("teamreg")
    public String teamreg(){
        return "admin/teamreg";
    }

}
