package com.broadwava.front.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * @author JK
 * Date : 2021-07-30
 * Remark : NEWDEAL 생애주기 의사결정 지원 서비스 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/lifetime")
public class LifetimeController{

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    // Iuput index 
    // 전체, 상세 선택 
    @RequestMapping("input")
    public String input(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "lifetime/input";
    }

    // 상태평가 전체부분 input
    @RequestMapping("stateinput/{absence}")
    public String state_input(Model model,@PathVariable String absence){
        model.addAttribute("absence", absence);
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "lifetime/stateinput";
    }
    
    // 상태평가 전체부분 output
    @RequestMapping("stateoutput/{id}")
    public String state_output(Model model,@PathVariable Long id){
        model.addAttribute("getid", id);
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "lifetime/stateoutput";
    }

    // 상태평가 세부부분 input
    @RequestMapping("detailinput/{absence}")
    public String detail_input(Model model,@PathVariable String absence){
        model.addAttribute("absence", absence);
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "lifetime/detailinput";
    }

//    // 상태평가 전체부분 output
//    @RequestMapping("stateoutput/{id}")
//    public String detail_output(Model model,@PathVariable Long id){
//        model.addAttribute("getid", id);
//        model.addAttribute("backend_url", backend_url);
//        model.addAttribute("backend_protocol", backend_protocol);
//        return "lifetime/stateoutput";
//    }

}
