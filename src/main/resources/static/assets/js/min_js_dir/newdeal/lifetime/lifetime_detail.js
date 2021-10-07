// * 생애주기 의사결정 지원 서비스 자바스크립트 세부부분 *

// 세부부분 저장버튼
function lifeDetailTimeSave(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        if($("#ltFyAverage").val()==="") {
            alertCaution("철근 항복강도 평균값을 작성해주세요.", 1)
            return false;
        }
        if($("#ltFyVariance").val()==="") {
            alertCaution("철근 항복강도 변동계수를 작성해주세요.", 1)
            return false;
        }
        if($("#ltFyStandard").val()==="") {
            alertCaution("철근 항복강도 표준편차를 작성해주세요.", 1)
            return false;
        }

        if($("#ltFcAverage").val()==="") {
            alertCaution("콘크리트 압축강도 평균값을 작성해주세요.", 1)
            return false;
        }
        if($("#ltFcVariance").val()==="") {
            alertCaution("콘크리트 압축강도 변동계수를 작성해주세요.", 1)
            return false;
        }
        if($("#ltFcStandard").val()==="") {
            alertCaution("콘크리트 압축강도 표준편차를 작성해주세요.", 1)
            return false;
        }

        if($("#ltSectionAverage").val()==="") {
            alertCaution("철근 단면적 평균값을 작성해주세요.", 1)
            return false;
        }
        if($("#ltSectionVariance").val()==="") {
            alertCaution("철근 단면적 변동계수를 작성해주세요.", 1)
            return false;
        }
        if($("#ltSectionStandard").val()==="") {
            alertCaution("철근 단면적 표준편차를 작성해주세요.", 1)
            return false;
        }

        if($("#ltVehicleAverage").val()==="") {
            alertCaution("차량하중 평균값을 작성해주세요.", 1)
            return false;
        }
        if($("#ltVehicleVariance").val()==="") {
            alertCaution("차량하중 변동계수를 작성해주세요.", 1)
            return false;
        }
        if($("#ltVehicleStandard").val()==="") {
            alertCaution("차량하중 표준편차를 작성해주세요.", 1)
            return false;
        }

        if($("#ltRepairLength").val()==="") {
            alertCaution("보수보강 총길이를 작성해주세요.", 1)
            return false;
        }

        if($("#ltRecoveryOne").val()==="") {
            alertCaution("회복율 보수1을 작성해주세요.", 1)
            return false;
        }
        if($("#ltRecoveryTwo").val()==="") {
            alertCaution("회복율 보수2를 작성해주세요.", 1)
            return false;
        }
        if($("#ltRecoveryThree").val()==="") {
            alertCaution("회복율 보수3을 작성해주세요.", 1)
            return false;
        }
        if($("#ltRecoveryFour").val()==="") {
            alertCaution("회복율 보강1을 작성해주세요.", 1)
            return false;
        }
        if($("#ltRecoveryFive").val()==="") {
            alertCaution("회복율 보강2를 작성해주세요.", 1)
            return false;
        }
        if($("#ltRecoverySix").val()==="") {
            alertCaution("회복율 교체를 작성해주세요.", 1)
            return false;
        }

        if($("#ltCostOne").val()==="") {
            alertCaution("비용 보수1을 작성해주세요.", 1)
            return false;
        }
        if($("#ltCostTwo").val()==="") {
            alertCaution("비용 보수2를 작성해주세요.", 1)
            return false;
        }
        if($("#ltCostThree").val()==="") {
            alertCaution("비용 보수3을 작성해주세요.", 1)
            return false;
        }
        if($("#ltCostFour").val()==="") {
            alertCaution("비용 보강1을 작성해주세요.", 1)
            return false;
        }
        if($("#ltCostFive").val()==="") {
            alertCaution("비용 보강2를 작성해주세요.", 1)
            return false;
        }
        if($("#ltCostSix").val()==="") {
            alertCaution("비용 교체를 작성해주세요.", 1)
            return false;
        }

        const formData = new FormData(document.getElementById('lifeDetailTimeForm'));

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifedetailtime/save"; // 호출할 백엔드 API
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
                    // console.log("저장성공");
                    alertLink(request.sendData.getId);
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
function alertLink(id) {
    $(document).on("click","#successBtn",function(){
        location.href = "/lifetime/detailoutput/" + id;
        $('#popupId').remove();
    });
}

function lifeDetailTimeOutput(id){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        // console.log("호출성공 id : "+id);

        const params = {
            id : id,
        }

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifedetailtime/output"; // 호출할 백엔드 API
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
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("아웃풋 호출성공");

                    $('#ltRecoveryOne').text(request.sendData.lifeDetailTimeDto.ltRecoveryOne);
                    $('#ltRecoveryTwo').text(request.sendData.lifeDetailTimeDto.ltRecoveryTwo);
                    $('#ltRecoveryThree').text(request.sendData.lifeDetailTimeDto.ltRecoveryThree);
                    $('#ltRecoveryFour').text(request.sendData.lifeDetailTimeDto.ltRecoveryFour);
                    $('#ltRecoveryFive').text(request.sendData.lifeDetailTimeDto.ltRecoveryFive);
                    $('#ltRecoverySix').text(request.sendData.lifeDetailTimeDto.ltRecoverySix);

                    $('#ltCostOne').text(request.sendData.lifeDetailTimeDto.ltCostOne);
                    $('#ltCostTwo').text(request.sendData.lifeDetailTimeDto.ltCostTwo);
                    $('#ltCostThree').text(request.sendData.lifeDetailTimeDto.ltCostThree);
                    $('#ltCostFour').text(request.sendData.lifeDetailTimeDto.ltCostFour);
                    $('#ltCostFive').text(request.sendData.lifeDetailTimeDto.ltCostFive);
                    $('#ltCostSix').text(request.sendData.lifeDetailTimeDto.ltCostSix);

                    $('#ltRepairLength').text(request.sendData.ltRepairLength);
                    $('#repairNumber').text(request.sendData.repairNumber);
                    $('#repairCost').text(request.sendData.repairCost);

                    $('#pfmax').text(request.sendData.pfmax);
                    $('#pfmin').text(request.sendData.pfmin);

                    $('#bmax').text(request.sendData.bmax);
                    $('#bmin').text(request.sendData.bmin);

                    $('#ltRecoveryPercent').text(request.sendData.ltRecoveryPercent+"%");
                    $('#maintenanceYear').text(request.sendData.maintenanceYear);

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

                    // console.log("무조치 시 차트데이터 : "+request.sendData.noactionChartDataList);
                    // console.log("유지보수 시 차트데이터 : "+request.sendData.actionChartDataList);
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
                                title.text = "철근부식 바닥판 휨 성능 - 유지보수 무조치 시";

                                xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                                yAxis = chart.yAxes.push(new am4charts.ValueAxis());

                                createSeries("noaction", "무조치 시 성능지수", am4core.color("#4b4dff"), am4core.color("#ffffff")); // 무조치 시
                            } else {
                                chart = am4core.create("amChart2", am4charts.XYChart);
                                chart.data = request.sendData.actionChartDataList;

                                title = chart.titles.create();
                                title.text = "철근부식 바닥판 휨 성능 - 유지보수 유지보수 개입 시";

                                xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                                yAxis = chart.yAxes.push(new am4charts.ValueAxis());

                                createSeries("action", "유지보수 개입 시 성능지수", am4core.color("#338f35"), am4core.color("#ffffff")); // 유지보수 개입시
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
                                series.tooltipText = "[bold]{name}[/] \n 공용연수 : [b]{categoryX}년[/] \n 상태지수 : [b]{valueY}[/]";
                                series.strokeWidth = 2;
                                series.smoothing = "monotoneX";
                                series.stroke = lineColor;
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
        html += '<option value='+$ltRecoveryOne.val()+'>'+$ltRecoveryOne.val()+'</option>'
    }
    if($ltRecoveryTwo.val()!=="") {
        html += '<option value='+$ltRecoveryTwo.val()+'>'+$ltRecoveryTwo.val()+'</option>'
    }
    if($ltRecoveryThree.val()!=="") {
        html += '<option value='+$ltRecoveryThree.val()+'>'+$ltRecoveryThree.val()+'</option>'
    }
    if($ltRecoveryFour.val()!=="") {
        html += '<option value='+$ltRecoveryFour.val()+'>'+$ltRecoveryFour.val()+'</option>'
    }
    if($ltRecoveryFive.val()!=="") {
        html += '<option value='+$ltRecoveryFive.val()+'>'+$ltRecoveryFive.val()+'</option>'
    }
    if($ltRecoverySix.val()!=="") {
        html += '<option value='+$ltRecoverySix.val()+'>'+$ltRecoverySix.val()+'</option>'
    }

    $ltRecoveryPercent.html(html);

}




