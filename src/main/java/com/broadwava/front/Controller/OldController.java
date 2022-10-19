package com.broadwava.front.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Minkyu
 * Date : 2021-11-04
 * Time :
 * Remark : 노후화 컨트롤러
 */
@Controller
@RequestMapping("/old")
public class OldController {
    //호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    //호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    @RequestMapping("old")
    public String old(){
        return null;
    }
    
    @RequestMapping("input")
    public String input(){
        return "old/input";
    }

    @RequestMapping("output")
    public String output(){
        return "old/output";
    }

    // 노후도평가 새 버젼
    @RequestMapping("newinput")
    public String newinput(Model model) {
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "old/newinput";
    }

    // 노후도평가 새 버젼
    @RequestMapping("newoutput")
    public String newoutput(Model model) {
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "old/newoutput";
    }

}
