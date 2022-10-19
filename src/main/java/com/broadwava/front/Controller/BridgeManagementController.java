package com.broadwava.front.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bridgemanagement")
public class BridgeManagementController {

    //호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    //호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    @RequestMapping("information")
    public String information(Model model){
//        model.addAttribute("backend_url", backend_url);
//        model.addAttribute("backend_protocol", backend_protocol);
        return "bridgemanagement/information";
    }

}
