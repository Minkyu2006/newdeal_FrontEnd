package com.broadwava.front.Controller;

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

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    // 새로운페이지 작업할수있는 공간?
    @RequestMapping("newpage")
    public String newpage1(){
        return "page/newpage";
    }

    @RequestMapping("/mypage")
    public String mypage(Model model){
       model.addAttribute("backend_url", backend_url);
        return "mypage";
    }

    @RequestMapping("performance1")
    public String performance1(){
        return "page/performance1";
    }
}
