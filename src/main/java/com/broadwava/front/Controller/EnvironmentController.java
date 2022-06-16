package com.broadwava.front.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Minkyu
 * Date : 2021-10-01
 * Time :
 * Remark :
 */
@Controller
@RequestMapping("/env")
public class EnvironmentController {

    //호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    //호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    //환경정보조회
    @RequestMapping("envsearch")
    public String envsearch(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "env/envsearch";
    }
    
    // 대기중 염분량 추정 서비스
    @RequestMapping("salt")
    public String salt(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "env/salt";
    }

    // 열화환경 데이터 서비스
    @RequestMapping("envdata")
    public String envdata(){
        return "env/envdata";
    }
    
    // 열화환경별 염화물 침투
    @RequestMapping("saltpermeate")
    public String saltpermeate(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "env/saltpermeate";
    }

}
