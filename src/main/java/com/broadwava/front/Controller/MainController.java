package com.broadwava.front.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class MainController {

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    // 새로운페이지 작업할수있는 공간?
    @RequestMapping("newpage")
    public String newpage1(){
        return "page/newpage";
    }

}
