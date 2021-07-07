package com.broadwava.front.Controller;

import com.broadwava.front.Enum.AccountRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    // 호스트링크주입
    //@Value("${newdeal.api.backend_url}")
    //private String backend_url;
    // 호스트링크주입
    //@Value("${newdeal.api.security_url}")
    //private String security_url;

    @RequestMapping("accountreg")
    public String accountreg(Model model){
       // model.addAttribute("backend_url", backend_url);
       // model.addAttribute("security_url", security_url);
        return "admin/accountreg";
    }

    @RequestMapping("teamreg")
    public String teamreg(Model model){
      //  model.addAttribute("backend_url", backend_url);
      //  model.addAttribute("security_url", security_url);
        return "admin/teamreg";
    }

}
