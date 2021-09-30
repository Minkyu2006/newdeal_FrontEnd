package com.broadwava.front.Controller;

import com.broadwava.front.Enum.AccountRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class MainController {

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    // 새로운페이지 작업할수있는 공간?
    @RequestMapping("newpage")
    public String newpage(){
        return "page/newpage";
    }


    @RequestMapping("index")
    public String index(){
        return "index";
    }
    
    // login main
    @RequestMapping("loginindex")
    public String loginindex(){
        return "loginindex";
    }

    @RequestMapping("/register")
    public String register(Model model){
        model.addAttribute("roles", AccountRole.values());
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "register";
    }

    @RequestMapping("/mypage")
    public String mypage(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "mypage";
    }    
    
    @RequestMapping("env/envsearch")
    public String envsearch(Model model){
        return "env/envsearch";
    }
    
    @RequestMapping("env/maptest")
    public String maptest(Model model){
        return "env/maptest";
    }
}
