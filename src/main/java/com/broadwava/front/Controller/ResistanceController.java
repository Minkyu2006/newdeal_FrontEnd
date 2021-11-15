package com.broadwava.front.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Minkyu
 * Date : 2021-11-04
 * Time :
 * Remark : 열화환경 컨트롤러
 */
@Controller
@RequestMapping("/resistance")
public class ResistanceController {

    //호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    //호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    @RequestMapping("pageselect")
    public String pageselect(){
        return "resistance/pageselect";
    }
    
    @RequestMapping("input")
    public String input(){
        return "resistance/input";
    }
    
    @RequestMapping("select")
    public String select(){
        return "resistance/select";
    }
    
    @RequestMapping("output")
    public String output(){
        return "resistance/output";
    }

}
