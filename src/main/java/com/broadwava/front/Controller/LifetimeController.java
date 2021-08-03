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
        return "lifetime/input";
    }
    
    // 상태평가 input
    @RequestMapping("stateinput")
    public String stateinput(Model model){
        return "lifetime/stateinput";
    }
    
    // 상태평가 output
    @RequestMapping("stateoutput")
    public String stateoutput(Model model){
        return "lifetime/stateoutput";
    }


}
