// * 생애주기 의사결정 지원 서비스 자바스크립트 세부부분 *

// 탄산화속도계수 계산 메소드
function aSpeedCalculate(num1, num2){
    if(num1 === ""){
        num1 = 0;
    }
    if(num2 === ""){
        num2 = 1;
    }
    const result = num2/Math.sqrt(num1);
    $("#ltAAverage").val(result.toFixed(2));
}

// 세부부분 뒤로가기 버튼
function lifeDetailInputBack(){
    location.href = "/lifetime/input"
}

// 표준편차 계산 메소드
function lifeStandardCalculate(average, variance, resultId){
    const $ltDetailType = $("#ltDetailType").val();

    if($ltDetailType === "2"){
        // 탄산화깊이
        let num1 = $("#"+average).val();
        let num2 =    $("#"+variance).val();

        if(num1 === ""){
            num1 = 1;
        }
        if(num2 === ""){
            num2 = 1;
        }

        const result = (num1 * num2)/100;
        $("#"+resultId).val(result.toFixed(2));

    }else if($ltDetailType === "5"){
        // 탄산화깊이 바닥판 3개
        let num1 = $("#"+average).val();
        let num2 =  variance

        if(num1 === ""){
            num1 = 1;
        }

        let result;
        if(variance === "0.1"){
            const $ltPublicYear = $("#ltPublicYear").val();
            // console.log("$ltPublicYear : "+$ltPublicYear);
            if($ltPublicYear !== "" || $ltPublicYear > 0) {
                result = num1 * num2;
                const standardResult = (num1/Math.sqrt($ltPublicYear)).toFixed(2);
                const averagerResult = (standardResult*variance).toFixed(2)

                if (average === "ltCStandardPlate1") {
                    $("#ltCAveragePlate1").val(result.toFixed(2));
                    $("#ltAStandardPlate1").val(standardResult);
                    $("#ltAAveragePlate1").val(averagerResult);
                } else if (average === "ltCStandardPlate2") {
                    $("#ltCAveragePlate2").val(result.toFixed(2));
                    $("#ltAStandardPlate2").val(standardResult);
                    $("#ltAAveragePlate2").val(averagerResult);
                } else {
                    $("#ltCAveragePlate3").val(result.toFixed(2));
                    $("#ltAStandardPlate3").val(standardResult);
                    $("#ltAAveragePlate3").val(averagerResult);
                }
            }else{
                alertCaution("공용연수를 입력해주세요.", 1)
            }
        }else{
            result = num1 * num2;
            $("#"+resultId).val(result.toFixed(2));
        }

    }

}

// 세부부분 저장버튼
function lifeDetailTimeSave(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {
        const $ltDetailType = $("#ltDetailType").val();
        let controllerUrl;

        // console.log($ltDetailType)

        // 탄산화깊이 저장
        if($ltDetailType === "2"){
            if($("#ltTdAverage").val()==="") {
                alertCaution("실측피복두께 평균값을 입력해주세요.", 1)
                return false;
            }

            if($("#ltTdVariance").val()==="") {
                alertCaution("실측피복두께 변동계수를 입력해주세요.", 1)
                return false;
            }

            if($("#ltYAverage").val()==="") {
                alertCaution("공용연수 평균값을 입력해주세요.", 1)
                return false;
            }

            if($("#ltYVariance").val()==="") {
                alertCaution("공용연수 변동계수를 입력해주세요.", 1)
                return false;
            }

            if($("#ltAVariance").val()==="") {
                alertCaution("탄산화속도계수 변동계수를 입력해주세요.", 1)
                return false;
            }

            if($("#ltCAverage").val()==="") {
                alertCaution("탄산화깊이 평균값를 입력해주세요.", 1)
                return false;
            }

            if($("#ltCVariance").val()==="") {
                alertCaution("탄산화깊이 변동계수를 입력해주세요.", 1)
                return false;
            }

            const $ltAAverage = $("#ltAAverage");
            if($ltAAverage.val()==="Infinity" || $ltAAverage.val() ===0.0) {
                aSpeedCalculate($("#ltYAverage").val(),$("#ltCAverage").val());
            }

            const $ltTdStandard = $("#ltTdStandard").val();
            if($ltTdStandard==="Infinity" || $ltTdStandard ===0.0) {
                lifeStandardCalculate('ltTdAverage', 'ltTdVariance', 'ltTdStandard')
            }

            const $ltYStandard = $("#ltYStandard").val();
            if($ltYStandard==="Infinity" || $ltYStandard ===0.0) {
                lifeStandardCalculate('ltYAverage', 'ltYVariance', 'ltYStandard')
            }

            const $ltAStandard = $("#ltAStandard").val();
            if($ltAStandard==="Infinity" || $ltAStandard ===0.0) {
                lifeStandardCalculate('ltAAverage', 'ltAVariance', 'ltAStandard')
            }

            const $ltCStandard = $("#ltCStandard").val();
            if($ltCStandard==="Infinity" || $ltCStandard ===0.0) {
                lifeStandardCalculate('ltCAverage', 'ltCVariance', 'ltCStandard')
            }

            controllerUrl = "/api/lifedetail/cabonation/save"
        }
        // 탄산화깊이 바닥판 3개 저장
        else if($ltDetailType === "5"){

            if($("#ltTdStandardPlate1").val()==="") {
                alertCaution("바닥판1의 실측피복두께의<br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltAStandardPlate1").val()==="") {
                alertCaution("바닥판1의 탄산화속도계수를 <br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltCStandardPlate1").val()==="") {
                alertCaution("바닥판1의 탄산화깊이를 <br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltTdStandardPlate2").val()==="") {
                alertCaution("바닥판2의 실측피복두께<br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltAStandardPlate2").val()==="") {
                alertCaution("바닥판2의 탄산화속도계수 <br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltCStandardPlate2").val()==="") {
                alertCaution("바닥판2의 탄산화깊이 <br>표준편차를 입력해주세요.", 1)
                return false;
            }

            if($("#ltTdStandardPlate3").val()==="") {
                alertCaution("바닥판3의 실측피복두께<br>평균값을 입력해주세요.", 1)
                return false;
            }

            if($("#ltAStandardPlate3").val()==="") {
                alertCaution("바닥판3의 탄산화속도계수를 <br>입력해주세요.", 1)
                return false;
            }

            if($("#ltCStandardPlate3").val()==="") {
                alertCaution("바닥판3의 탄산화깊이를 <br>입력해주세요.", 1)
                return false;
            }

            if($("#ltPublicYear").val()==="") {
                alertCaution("공용연수를 입력해주세요.", 1)
                return false;
            }

            if($("#ltYStandard").val()==="") {
                alertCaution("공용연수 조정계수의<br>표준편차를 입력해주세요.", 1)
                return false;
            }

            controllerUrl = "/api/lifedetail/cabonationThreePlate/save"
        }

        const formData = new FormData(document.getElementById('lifeDetailForm'));

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + controllerUrl; // 호출할 백엔드 API
        console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id", insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("저장성공");
                    alertLink($("#absence").val(), request.sendData.autoNum);
                    alertSuccess("등록을 완료했습니다.");
                } else {
                    if (request.err_msg2 === null) {
                        alertCaution(request.err_msg, 1);
                    } else {
                        alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                    }
                }
            }
        });
    }
}

// 성공알림창 버튼 누르면 화면이동하는 함수
function alertLink(type, autoNum) {
    $(document).on("click","#successBtn",function(){
        location.href = "/lifetime/detail/" +type +"/"+ autoNum;
        $('#popupId').remove();
    });
}

// 세부부분 아웃풋데이터 표출 -> API호출
function lifeDetailTimeOutput(autoNum){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        console.log("호출성공 autoNum : "+autoNum);

        const params = {
            autoNum : autoNum,
        }

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifedetail/output"; // 호출할 백엔드 API
        console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("아웃풋 호출성공");

                    // 테스트때문에 임시로 해둔 것
                    if(request.sendData.chartName === "test"){
                        console.log();
                        console.log(request.sendData.deviceData);
                        console.log();
                    }else{
                        $('#ltRecoveryOne').text(request.sendData.ltRecoveryList[0]);
                        $('#ltRecoveryTwo').text(request.sendData.ltRecoveryList[1]);
                        $('#ltRecoveryThree').text(request.sendData.ltRecoveryList[2]);
                        $('#ltRecoveryFour').text(request.sendData.ltRecoveryList[3]);
                        $('#ltRecoveryFive').text(request.sendData.ltRecoveryList[4]);
                        $('#ltRecoverySix').text(request.sendData.ltRecoveryList[5]);

                        $('#ltCostOne').text(request.sendData.ltCostList[0]);
                        $('#ltCostTwo').text(request.sendData.ltCostList[1]);
                        $('#ltCostThree').text(request.sendData.ltCostList[2]);
                        $('#ltCostFour').text(request.sendData.ltCostList[3]);
                        $('#ltCostFive').text(request.sendData.ltCostList[4]);
                        $('#ltCostSix').text(request.sendData.ltCostList[5]);

                        $('#ltRepairLength').text(request.sendData.ltRepairLength);
                        $('#repairNum').text(request.sendData.repairNum);
                        $('#repairCost').text(request.sendData.repairCost);


                        $('#pf_max').text(request.sendData.pf_max);
                        $('#pf_min').text(request.sendData.pf_min);

                        $('#bmax').text(request.sendData.bmax);
                        $('#ltTargetValue').text(request.sendData.ltTargetValue);

                        $('#ltRecoveryPercent').text(request.sendData.ltRecoveryPercent+"%");
                        $('#maxYear').text(request.sendData.maxYear);

                        const publicYear = request.sendData.publicYear;
                        const $noActionHeaderTable = $('#noActionHeaderTable');
                        let html4= "";
                        html4 += '<tr>';
                        html4 += '<th style="width: 57px;text-align: center">'+'Time(Years)'+'</th>';
                        for(let i=publicYear; i<publicYear+21; i++){
                            html4 += '<th style="text-align: center;">'+i+'</th>';
                        }
                        html4 += '</tr>';
                        $noActionHeaderTable.html(html4);

                        const $actionHeaderTable = $('#actionHeaderTable');
                        let html3 = "";
                        html3 += '<tr>';
                        html3 += '<th style="width: 57px;text-align: center">'+'Time(Years)'+'</th>';
                        for(let i=publicYear; i<publicYear+21; i++){
                            html3 += '<th style="text-align: center;">'+i+'</th>';
                        }
                        html3 += '</tr>';
                        $actionHeaderTable.html(html3);

                        const $noActionTable = $('#noActionTable');
                        let html = "";
                        html += '<tr>';
                        html += '<td style="text-align: center;">'+'PF='+'</td>';
                        for(let i=0; i<request.sendData.pfList.length; i++){
                            html += '<td style="text-align: right;">'+request.sendData.pfList[i].toFixed(3)+'</td>';
                        }
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td style="text-align: center;">'+'B='+'</td>';
                        for(let i=0; i<request.sendData.bList.length; i++){
                            if(Math.floor(request.sendData.bList[i]*10)/10<request.sendData.ltTargetValue){
                                html += '<td style="text-align: right;color: red">'+request.sendData.bList[i].toFixed(3)+'</td>';
                            }else{
                                html += '<td style="text-align: right;">'+request.sendData.bList[i].toFixed(3)+'</td>';
                            }
                        }
                        html += '</tr>';
                        $noActionTable.html(html);

                        const $actionTable = $('#actionTable');
                        let html2 = "";
                        html2 += '<tr>';
                        html2 += '<td style="text-align: center;">'+'B1='+'</td>';
                        for(let i=0; i<request.sendData.bOneList.length; i++){
                            html2 += '<td style="text-align: right;">'+request.sendData.bOneList[i].toFixed(3)+'</td>';
                        }
                        html2 += '</tr>';
                        html2 += '<tr>';
                        html2 += '<td style="text-align: center;">'+'B2='+'</td>';
                        for(let i=0; i<request.sendData.bTwoList.length; i++){
                            html2 += '<td style="text-align: right;">'+request.sendData.bTwoList[i].toFixed(3)+'</td>';
                        }
                        html2 += '</tr>';
                        $actionTable.html(html2);

                        let chartName;
                        if(request.sendData.chartName === "carbonation"){
                            chartName = "탄산화에 따른 철근부식 내구성";
                        }

                        console.log("무조치 시 차트데이터 : "+request.sendData.noactionChartDataList);
                        console.log("유지보수 시 차트데이터 : "+request.sendData.actionChartDataList);

                        // amChart
                        chartResult(1);
                        chartResult(2);
                        function chartResult(num) {
                            am4core.ready(function () { // am4core 시작

                                // 테마설정
                                am4core.useTheme(am4themes_animated);

                                let chart;

                                // 차트 제목
                                let title;

                                // X축 차트 생성
                                let xAxis

                                // Y축 차트 생성
                                let yAxis

                                if (num === 1) {
                                    chart = am4core.create("amChart1", am4charts.XYChart);
                                    chart.data = request.sendData.noactionChartDataList;

                                    title = chart.titles.create();
                                    title.text = chartName+" - 유지보수 무조치 시";

                                    xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                                    yAxis = chart.yAxes.push(new am4charts.ValueAxis());

                                    createSeries("noaction", "무조치 시 성능지수", am4core.color("#2b2b8d"), am4core.color("#ffffff")); // 무조치 시
                                } else {
                                    chart = am4core.create("amChart2", am4charts.XYChart);
                                    chart.data = request.sendData.actionChartDataList;

                                    title = chart.titles.create();
                                    title.text = chartName+" - 유지보수 유지보수 개입 시";

                                    xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                                    yAxis = chart.yAxes.push(new am4charts.ValueAxis());

                                    createSeries("action", "유지보수 개입 시 성능지수", am4core.color("#309830"), am4core.color("#ffffff")); // 유지보수 개입시
                                }

                                // 차트 제목
                                title.fontSize = 20;
                                title.paddingBottom = 8;

                                // X축 차트 옵션
                                xAxis.dataFields.category = "publicYear";
                                xAxis.title.text = "공용연수(Years)";

                                // Y축 차트 온셥
                                yAxis.title.text = "성능(신뢰성) 지수";
                                yAxis.min = 1.0;
                                yAxis.max = Number(request.sendData.bmax.toFixed(0)) + Number(1.0);

                                // 차트옵션 설정 + 차트설명박스(완)
                                function createSeries(field, name, lineColor, textColor) {
                                    const series = chart.series.push(new am4charts.LineSeries())
                                    series.dataFields.categoryX = "publicYear";
                                    series.dataFields.valueY = field;
                                    series.name = name;
                                    // series.tooltipText = "[bold]{name}[/] \n 공용연수 : [b]{categoryX}년[/] \n 상태지수 : [b]{valueY}[/]";
                                    series.strokeWidth = 2;
                                    series.smoothing = "monotoneX";
                                    series.tooltip.getFillFromObject = false;
                                    series.tooltip.background.fill = lineColor;
                                    series.tooltip.label.fill = textColor;

                                    series.strokeDasharray = 3;
                                    series.strokeWidth = 2
                                    series.strokeOpacity = 0.3;
                                    series.strokeDasharray = "3,3"

                                    const bullet = series.bullets.push(new am4charts.CircleBullet());
                                    bullet.strokeWidth = 2;
                                    bullet.stroke = lineColor;
                                    bullet.setStateOnChildren = true;
                                    bullet.propertyFields.fillOpacity = "opacity";
                                    bullet.propertyFields.strokeOpacity = "opacity";

                                    const hoverState = bullet.states.create("hover");
                                    hoverState.properties.scale = 1.7;

                                    return series;
                                }

                                // 점선차트
                                function dashSeries(field, color, dashed) {
                                    const series = chart.series.push(new am4charts.LineSeries());
                                    series.dataFields.categoryX = "publicYear";
                                    series.dataFields.valueY = field;
                                    series.strokeWidth = 2;
                                    series.smoothing = "monotoneX";
                                    series.stroke = color;
                                    series.hiddenInLegend = true; // legend 숨기기
                                    // 점선 옵션
                                    if (dashed) {
                                        series.strokeDasharray = "5 3";
                                    }
                                    return series;
                                }

                                dashSeries("redline", am4core.color("#ef4141"), true);

                                chart.legend = new am4charts.Legend(); // 항목 상단 오른쪽으로 배치(완)
                                chart.legend.position = "top";
                                chart.legend.contentAlign = "right";

                                chart.cursor = new am4charts.XYCursor(); // x축y축 생성(완)
                                chart.exporting.menu = new am4core.ExportMenu(); // 오른쪽상단 이미지, 데이터 가져올수있는 형식의 메뉴(완)
                                chart.exporting.menu.items = [{
                                    "label": "...",
                                    "menu": [
                                        {
                                            "label": "Image",
                                            "menu": [
                                                {"type": "png", "label": "PNG"},
                                                {"type": "jpg", "label": "JPG"},
                                                {"type": "svg", "label": "SVG"},
                                            ]
                                        }, {
                                            "label": "Data",
                                            "menu": [
                                                {"type": "json", "label": "JSON"},
                                                {"type": "csv", "label": "CSV"},
                                                {"type": "html", "label": "HTML"},
                                            ]
                                        },
                                    ]
                                }];
                            });
                        }
                        $("#noactionLoadingBar").hide();
                        $("#actionLoadingBar").hide();
                    }

                } else {
                    if (request.err_msg2 === null) {
                        alertCaution(request.err_msg, 1);
                    } else {
                        alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                    }

                }
            }
        });
    }
}

function recoverySelectBox(){
    let $ltRecoveryPercent = $("#ltRecoveryPercent");
    let html = "";

    const $ltRecoveryOne = $("#ltRecoveryOne");
    const $ltRecoveryTwo = $("#ltRecoveryTwo");
    const $ltRecoveryThree = $("#ltRecoveryThree");
    const $ltRecoveryFour = $("#ltRecoveryFour");
    const $ltRecoveryFive = $("#ltRecoveryFive");
    const $ltRecoverySix = $("#ltRecoverySix");

    if($ltRecoveryOne.val()!=="") {
        html += '<option value='+$ltRecoveryOne.val()+'>'+Number($ltRecoveryOne.val()*100)+'%'+'</option>'
    }
    if($ltRecoveryTwo.val()!=="") {
        html += '<option value='+$ltRecoveryTwo.val()+'>'+Number($ltRecoveryTwo.val()*100)+'%'+'</option>'
    }
    if($ltRecoveryThree.val()!=="") {
        html += '<option value='+$ltRecoveryThree.val()+'>'+Number($ltRecoveryThree.val()*100)+'%'+'</option>'
    }
    if($ltRecoveryFour.val()!=="") {
        html += '<option value='+$ltRecoveryFour.val()+'>'+Number($ltRecoveryFour.val()*100)+'%'+'</option>'
    }
    if($ltRecoveryFive.val()!=="") {
        html += '<option value='+$ltRecoveryFive.val()+'>'+Number($ltRecoveryFive.val()*100)+'%'+'</option>'
    }
    if($ltRecoverySix.val()!=="") {
        html += '<option value='+$ltRecoverySix.val()+'>'+Number($ltRecoverySix.val()*100)+'%'+'</option>'
    }

    $ltRecoveryPercent.html(html);

}




