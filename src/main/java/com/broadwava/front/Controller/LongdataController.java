package com.broadwava.front.Controller;

import com.broadwava.front.bscodes.ltd.MeasurementItemCode;
import com.broadwava.front.bscodes.ltd.PeriodType;
import com.broadwava.front.bscodes.ltd.SeriesCode;
import com.broadwava.front.bscodes.ltd.TreatmentCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * @author InSeok
 * Date : 2019-04-01
 * Time : 16:20
 * Remark : 장기조사데이터 컨트롤러
 */

@Controller
@Slf4j
@RequestMapping("/ltd")
public class LongdataController {

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    //장기조사데이터 조회화면
    @RequestMapping("datasearch")
    public String datasearch(Model model){

        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);

        model.addAttribute("serioscode",
                Arrays.stream(SeriesCode.values())
                .filter(v -> !v.getCode().equals("S999"))
                .collect(Collectors.toList())
        );
        model.addAttribute("measurementitemcode", MeasurementItemCode.values());
        model.addAttribute("periodtype", PeriodType.values());
        model.addAttribute("treatmentcondition",
            Arrays.stream(TreatmentCondition.values())
                    .filter(v -> v.getMeasurementItemCode().equals("M001"))
                    .filter(v -> v.getPeriodType().equals("P01")).collect(Collectors.toList())
        );
        return "ltd/datasearch";
    }

//    //엑셀다운
//    @RequestMapping(value="/graphrowdata.xls" , params = {"seriescode","measurementitemcode"})
//    public String getExcelCompressiveStrength(Model model, HttpServletRequest request
//                                              ,@RequestParam(value = "seriescode") SeriesCode seriescode
//                                            ,@RequestParam(value = "measurementitemcode") MeasurementItemCode measurementitemcode
//
//    ){
//
//        //압축강도 측정데이터 다운로드
//        if (measurementitemcode.equals(MeasurementItemCode.M001)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2", "주기", "초기염분함유량(%)"
//                    , measurementitemcode.getDesc() + "(" + measurementitemcode.getUnit() + ")");
//
//
//            List<CompressiveStrengthDto> downloadData = compressiveStrengthService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "CompressiveStrength_ExcelDown");
//
//            log.info("압축강도(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//        //탄산화깊이 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M002)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2", "주기", "초기염분함유량(%)"
//                    , measurementitemcode.getDesc() + "(" + measurementitemcode.getUnit() + ")");
//
//
//            List<CarbonationDepthDto> downloadData = carbonationDepthService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "CarconationDepth_ExcelDown");
//
//            log.info("탄산화갚이(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//
//        //길이변형률 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M003)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2","주기", "초기염분함유량(%)"
//                    ,"1cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"2cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"3cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"4cm" + "(" + measurementitemcode.getUnit() + ")"
//                    );
//
//
//            List<DeformationRateDto> downloadData = deformationRateService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "DeformationTest_ExcelDown");
//
//            log.info("길이변형률(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//        //초음파속도 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M004)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2","주기", "초기염분함유량(%)"
//                    ,"1cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"2cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"3cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"4cm" + "(" + measurementitemcode.getUnit() + ")"
//            );
//
//
//            List<UltrasonicSpeedDto> downloadData = ultrasonicSpeedService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "UltrasonicSpeed_ExcelDown");
//
//            log.info("초음파속도(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//        //철근부식량 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M005)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2","주기", "초기염분함유량(%)"
//                    ,"1cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"2cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"3cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"4cm" + "(" + measurementitemcode.getUnit() + ")"
//            );
//
//
//            List<RebarCorrosionDto> downloadData = rebarCorrosionService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "RebarCorrosionWeight_ExcelDown");
//
//            log.info("철근부식량(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//        //철근부식면적률 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M006)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2","주기", "초기염분함유량(%)"
//                    ,"1cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"2cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"3cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"4cm" + "(" + measurementitemcode.getUnit() + ")"
//            );
//
//
//            List<CorrosionAreaDto> downloadData = corrosionAreaService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "RebarCorrosionArea_ExcelDown");
//
//            log.info("철근부식면적률(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//        //염분함유량 측정데이터 다운로드
//        else if (measurementitemcode.equals(MeasurementItemCode.M007)) {
//            List<String> header = Arrays.asList("환경", "항목1", "항목2","주기", "초기염분함유량(%)"
//                    ,"0-0.15cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"0.15-1.5cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"1.5-3cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"3-4.5cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"4.5-6cm" + "(" + measurementitemcode.getUnit() + ")"
//                    ,"10cm" + "(" + measurementitemcode.getUnit() + ")"
//            );
//
//
//            List<PenetratedChlorideDto> downloadData = penetratedChlorideService.findBySeriesCode(seriescode);
//            CommonUtils.exceldataModel(model, header, downloadData, "PenetratedChloride_ExcelDown");
//
//            log.info("염분함유량(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//            return  "excelDownXls";
//        }
//
//
//        else{
//
//            List<String> header = Arrays.asList("엑셀다운 에러메세지");
//
//            ErrorExcelDto errorExcelDto = ErrorExcelDto.builder().msssage("해당 옵션으로 엑셀다운로드중 에러가 발생하였습니다.").build();
//            List<ErrorExcelDto> downloadData = Arrays.asList(errorExcelDto);
//            CommonUtils.exceldataModel(model, header, downloadData, "Error_ExcelDown");
//
//            log.info("압축강도(" + seriescode.getDesc() + ") 측정 데이터 엑셀 다운로드 ( loginID : '" + CommonUtils.getCurrentuser(request) + "', IP : '" + CommonUtils.getIp(request) + "' )");
//
//            return "excelDownXls";
//        }
//    }

}
