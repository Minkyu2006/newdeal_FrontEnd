package com.broadwava.front.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 테스트페이지
    @RequestMapping("testpage")
    public String testpage(Model model) {
        model.addAttribute("backend_url", backend_url);
        return "page/testpage";
    }

    // 최종 Output
    @RequestMapping("exceltest")
    public String execltext(Model model) {
        model.addAttribute("backend_url", backend_url);
        return "page/exceltest";
    }

}
