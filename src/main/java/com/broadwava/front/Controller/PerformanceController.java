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
 * @author Minkyu
 * Date : 2021-07-09
 * Remark : NEWDEAL 성능개선사업평가 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/performance")
public class PerformanceController{

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    // 성능개선사업평가 Iutput-1
    @RequestMapping("input")
    public String input(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "performance/input";
    }

    // 성능개선사업평가 Iutput-2
    @RequestMapping("performance1")
    public String performance1(){
        return "performance/performance1";
    }

    // 성능개선사업평가 Iutput-3
    @RequestMapping("performance2")
    public String performance2(){
        return "performance/performance2";
    }

    // 성능개선사업평가 Iutput-4
    @RequestMapping("performance3")
    public String performance3(){
        return "performance/performance3";
    }

    // 성능개선사업평가 Iutput-5
    @RequestMapping("performance4")
    public String performance4(){
        return "performance/performance4";
    }

    // 성능개선사업평가 Iutput-6
    @RequestMapping("performance5")
    public String performance5(){
        return "performance/performance5";
    }

    // 성능개선사업평가 비교대안
    @RequestMapping("performance-business")
    public String performanceBusiness(){
        return "performance/performance-business";
    }

    // 성능개선사업평가 Output
    @RequestMapping("output/{autoNum}")
    public String output(Model model,@PathVariable String autoNum){
        model.addAttribute("autoNum", autoNum);
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "performance/output";
    }


    // 엑셀파일 다운로드
    @Autowired
    ResourceLoader resourceLoader;
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> resouceFileDownload(@PathVariable String fileName) {
        log.info("fileName : "+fileName);
        try {
            Resource resource = resourceLoader.getResource("classpath:static/assets/files/"+ fileName);
            log.info("resource : "+resource.getURI());
            File file = resource.getFile();	//파일이 없는 경우 fileNotFoundException error가 난다.
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,file.getName())	//다운 받아지는 파일 명 설정
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length()))	//파일 사이즈 설정
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString())	//바이너리 데이터로 받아오기 설정
                    .body(resource);	//파일 넘기기
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(null);
        } catch (Exception e ) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


//    @Value("${base.securityfiles.directory}")
//    private String securityfile;
//    private static final String APPLICATION_PDF = "application/xls";
//    //엑셀파일 양식 다운로드
//    @RequestMapping(value ="/GuideLine", method = RequestMethod.GET, produces = APPLICATION_PDF)
//    public @ResponseBody void guideLine(HttpServletResponse response) throws IOException {
//        File file = getFile();
//        InputStream in = new FileInputStream(file);
//        response.setContentType(APPLICATION_PDF);
//        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
//        response.setHeader("Content-Length", String.valueOf(file.length()));
//        FileCopyUtils.copy(in, response.getOutputStream());
//    }

}
