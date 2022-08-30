// 이전페이지로 이동
function predictBeforePage(){
    location.href = "/resistance/predictinput";
}

// 파이썬 센서 다음스탭 데이터 호출
function pythonSensorStep(){
    const sensorData = JSON.parse(getCookie("sensorData"));

    if(sensorData != null){
        JWT_Get();

        // $("#actionLoadingBar1").show();
        $("#actionLoadingBar2").show();

        if (accessToken == null || refreshToken == null || insert_id == null) {
            // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else {

            let url;
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/predict/sensorStepDataGet"; // 호출할 백엔드 API
            console.log("url : "+url);

            const param = {
                "sensor" : sensorData.sensor,
                "time1" : sensorData.time1,
                "time2" : sensorData.time2,
                "channelNumber" : sensorData.channelNumber,
            }

            $.ajax({
                url: url,
                type: 'get',
                data : param,
                cache: false,
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
                        // 조회 로그추가
                        console.log("호출성공");

                        // console.log(request.sendData.line_x);
                        // console.log(request.sendData.line_y);
                        // console.log(request.sendData.bar);
                        // console.log(request.sendData.CI_Lv1);
                        // console.log(request.sendData.CI_Lv2);
                        // console.log(request.sendData.best_dist_name);
                        // console.log(request.sendData.dataset_x);
                        // console.log(request.sendData.dataset_y);
                        // console.log(request.sendData.state);

                        const cI_Lv1 = JSON.parse(request.sendData.CI_Lv1);
                        const cI_Lv2 = JSON.parse(request.sendData.CI_Lv2);
                        $("#CI_Lv1_1").text(cI_Lv1[1].toFixed(3));
                        $("#CI_Lv1_2").text(cI_Lv1[0].toFixed(3));
                        $("#CI_Lv2_1").text(cI_Lv2[1].toFixed(3));
                        $("#CI_Lv2_2").text(cI_Lv2[0].toFixed(3));

                        const best_dist_name = JSON.parse(request.sendData.best_dist_name);
                        $("#best_dist_name").text(best_dist_name[0]);

                        const state = request.sendData.state;
                        const $speedStyle1 = $("#speedStyle1");
                        const $state2 = $("#state2");
                        if(state === "안전"){
                            $speedStyle1.css('color','#0fc727')
                            $state2.css('color','#0fc727')
                        }else if(state === "주의"){
                            $speedStyle1.css('color','#e9a52e')
                            $state2.css('color','#e9a52e')
                        }else{
                            $speedStyle1.css('color','#f63232')
                            $state2.css('color','#f63232')
                        }
                        $("#state").text(state);
                        $state2.text(state);

                        const daysData = JSON.parse(request.sendData.dataset_x);
                        const sensorData = JSON.parse(request.sendData.dataset_y);

                        const line_x = JSON.parse(request.sendData.line_x);
                        const line_y = JSON.parse(request.sendData.line_y);
                        const bar = JSON.parse(request.sendData.bar);
                        console.log(line_x);
                        console.log(line_y);
                        // 노후화속도 판정 그래프생성
                        // stepChartStart(line_x, line_y, bar, "stepChartdiv1");

                        // 정제데이터 그래프생성
                        stepChartStart2(sensorData, daysData, cI_Lv1, cI_Lv2, "stepChartdiv2");

                        // $("#actionLoadingBar1").hide(); // 액션바 기능완료시 주석해제
                        $("#actionLoadingBar2").hide(); // 액션바 기능완료시 주석해제
                    }
                    else {
                        if (request.err_msg2 === null) {
                            alertCaution(request.err_msg, 1);
                        } else {
                            alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                        }
                    }
                }
            });
        }
    }else{
        location.href = "/resistance/predictinput";
    }
}

// step 노후화속도 판정 그래프생성
let chartDiv = {};
function stepChartStart(line_x, line_y, bar, divId){
    console.log("곡선 그래프 x 데이터 : "+line_x);
    console.log("곡선 그래프 y 데이터 : "+line_y);
    console.log("막대 그래프 데이터 : "+bar);

    if(chartDiv[divId]) {
        chartDiv[divId].root.dispose();
    }
    chartDiv[divId] = {};

    chartDiv[divId].root = am5.Root.new(divId);

    let chartRoot = chartDiv[divId].root;

    chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

    const chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {

    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // // json 데이터 날짜와 수치데이터 가공
    // const sensor = am5.Color.fromString("#6771dc"); // 센서 데이터
    const redColor = am5.Color.fromString("#fc5151"); // cI_Lv1[0] 선
    // const cI_Lv1_Line2= am5.Color.fromString("#fc5151"); // cI_Lv1[1] 선
    // const cI_Lv2_Line1 = am5.Color.fromString("#e9a52e"); // cI_Lv2[0] 선
    // const cI_Lv2_Line2= am5.Color.fromString("#e9a52e"); // cI_Lv2[1] 선

    let color;

    let previousColor;
    let previousDataObj;

    let previousColorLine1;
    let previousDataObjLine1;
    let previousColorLine2;
    let previousDataObjLine2;
    let previousColorLine3;
    let previousDataObjLine3;
    let previousColorLine4;
    let previousDataObjLine4;

    function generateData(line_x, line_y) {

        color = redColor;

        let dataObj;
        dataObj = {
            name : "분포도 추세선",
            date: line_x,
            value: line_y,
            color: color
        };

        // if(lineType=== "1") {
            if (color !== previousColor) {
                if (!previousDataObj) {
                    previousDataObj = dataObj;
                }
                previousDataObj.strokeSettings = {stroke: color};
            }
            previousDataObj = dataObj;
            previousColor = color;
        // }
        // else if(lineType=== "2"){
        //     if (color !== previousColorLine1) {
        //         if (!previousDataObjLine1) {
        //             previousDataObjLine1 = dataObj;
        //         }
        //         previousDataObjLine1.strokeSettings = {stroke: color};
        //     }
        //     previousDataObjLine1 = dataObj;
        //     previousColorLine1 = color;
        // }

        return dataObj;
    }

    // json 데이터 가공
    function generateDatas(line_x, line_y) {
        const data = [];

        for (let i = 0; i < line_x.length; ++i) {
            data.push(generateData(line_x[i], line_y[i]));
        }

        return data;
    }

    // lineData 데이터 가공
    // function generateLineDatas(jsonData, daysData, cI_Lv, lineType) {
    //     const data = [];
    //
    //     for (let i = 0; i < jsonData.length; ++i) {
    //         data.push(generateData(cI_Lv, daysData[i], lineType));
    //     }
    //
    //     return data;
    // }

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererX.new(chartRoot, {
            minGridDistance: 50
        }),
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererY.new(chartRoot, {}),
    }));

    // const cI_Lv1_lineseries1 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
    //     name: "name",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "valueY",
    //     valueXField: "valueX",
    // }));
    // cI_Lv1_lineseries1.strokes.template.set("templateField", "strokeSettings");
    // cI_Lv1_lineseries1.strokes.template.setAll({
    //     strokeWidth: 3
    // });

    // const cI_Lv1_lineseries2 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
    //     name: "name",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "valueY",
    //     valueXField: "valueX",
    // }));
    // cI_Lv1_lineseries2.strokes.template.set("templateField", "strokeSettings");
    // cI_Lv1_lineseries2.strokes.template.setAll({
    //     strokeWidth: 3
    // });

    // const lineData1 = generateLineDatas(sensorData, daysData,  cI_Lv1[1], "2");
    // const lineData2 = generateLineDatas(sensorData, daysData,  cI_Lv1[0], "3");
    // cI_Lv1_lineseries1.data.setAll(lineData1);
    // cI_Lv1_lineseries2.data.setAll(lineData2);

    // 곡선 lineSeries
    const lineSeries = chart.series.push(am5xy.LineSeries.new(chartRoot, {
        name: "name",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
    }));
    lineSeries.strokes.template.set("templateField", "strokeSettings");
    lineSeries.strokes.template.setAll({
        strokeWidth: 3
    });

    const tooltip = lineSeries.set("tooltip", am5.Tooltip.new(chartRoot, {
        labelText : "\[bold]{name}[/]\n추세선 : {valueX}\n수치 : {valueY}",
    }));
    tooltip.on("pointTo", function() {
        const background = tooltip.get("background");
        background.set("fill", background.get("fill"));
    });
    tooltip.get("background").adapters.add("fill", function(fill) {
        if (tooltip.dataItem) {
            return tooltip.dataItem.dataContext.color;
        }
        return fill;
    });
    lineSeries.set("tooltip", tooltip);

    // 곡선데이터 Set data
    const data = generateDatas(line_x, line_y);
    lineSeries.data.setAll(data);

    // 스크롤 X축만 설정
    chart.set("scrollbarX", am5.Scrollbar.new(chartRoot, {
        orientation: "horizontal"
    }));

    chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "zoomX",
        xAxis: xAxis
    }));

    chart.appear(1000, 100);
    lineSeries.appear(1000);

}

// step 정제데이터 차트 그리기
let chartDiv2 = {};
function stepChartStart2(sensorData, daysData, cI_Lv1, cI_Lv2, divId){
    // console.log("센서데이터 : "+sensorData);
    // console.log("날짜데이터 : "+daysData);

    if(chartDiv2[divId]) {
        chartDiv2[divId].root.dispose();
    }
    chartDiv2[divId] = {};

    chartDiv2[divId].root = am5.Root.new(divId);

    let chartRoot = chartDiv2[divId].root;

    chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

    const chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {

    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // json 데이터 날짜와 수치데이터 가공
    const sensor = am5.Color.fromString("#6771dc"); // 센서 데이터
    const cI_Lv1_Line1 = am5.Color.fromString("#fc5151"); // cI_Lv1[0] 선
    const cI_Lv1_Line2= am5.Color.fromString("#fc5151"); // cI_Lv1[1] 선
    const cI_Lv2_Line1 = am5.Color.fromString("#e9a52e"); // cI_Lv2[0] 선
    const cI_Lv2_Line2= am5.Color.fromString("#e9a52e"); // cI_Lv2[1] 선

    let color;

    let previousColor;
    let previousDataObj;

    let previousColorLine1;
    let previousDataObjLine1;
    let previousColorLine2;
    let previousDataObjLine2;
    let previousColorLine3;
    let previousDataObjLine3;
    let previousColorLine4;
    let previousDataObjLine4;

    function generateData(sensorData, daysData, lineType) {

        if(lineType=== "1"){
            color = sensor
        }
        else if(lineType=== "2"){
            color = cI_Lv1_Line1
        }
        else if(lineType=== "3"){
            color = cI_Lv1_Line2
        }
        else if(lineType=== "4"){
            color = cI_Lv2_Line1
        }
        else if(lineType=== "5"){
            color = cI_Lv2_Line2
        }

        let dataObj;
        dataObj = {
            name : "최적분포 센서데이터",
            date: Date.parse(daysData),
            value: sensorData,
            color: color
        };

        if(lineType=== "1") {
            if (color !== previousColor) {
                if (!previousDataObj) {
                    previousDataObj = dataObj;
                }
                previousDataObj.strokeSettings = {stroke: color};
            }
            previousDataObj = dataObj;
            previousColor = color;
        }
        else if(lineType=== "2"){
            if (color !== previousColorLine1) {
                if (!previousDataObjLine1) {
                    previousDataObjLine1 = dataObj;
                }
                previousDataObjLine1.strokeSettings = {stroke: color};
            }
            previousDataObjLine1 = dataObj;
            previousColorLine1 = color;
        }
        else if(lineType=== "3"){
            if (color !== previousColorLine2) {
                if (!previousDataObjLine2) {
                    previousDataObjLine2 = dataObj;
                }
                previousDataObjLine2.strokeSettings = {stroke: color};
            }
            previousDataObjLine2 = dataObj;
            previousColorLine2 = color;
        }
        else if(lineType=== "4"){
            if (color !== previousColorLine3) {
                if (!previousDataObjLine3) {
                    previousDataObjLine3 = dataObj;
                }
                previousDataObjLine3.strokeSettings = {stroke: color};
            }
            previousDataObjLine3 = dataObj;
            previousColorLine3 = color;
        }
        else if(lineType=== "5"){
            if (color !== previousColorLine4) {
                if (!previousDataObjLine4) {
                    previousDataObjLine4 = dataObj;
                }
                previousDataObjLine4.strokeSettings = {stroke: color};
            }
            previousDataObjLine4 = dataObj;
            previousColorLine4 = color;
        }

        return dataObj;
    }

    // json 데이터 가공
    function generateDatas(jsonData, daysData, lineType) {
        const data = [];

        for (let i = 0; i < jsonData.length; ++i) {
            data.push(generateData(jsonData[i], daysData[i], lineType));
        }

        return data;
    }

    // lineData 데이터 가공
    function generateLineDatas(jsonData, daysData, cI_Lv, lineType) {
        const data = [];

        for (let i = 0; i < jsonData.length; ++i) {
            data.push(generateData(cI_Lv, daysData[i], lineType));
        }

        return data;
    }

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(chartRoot, {
        maxDeviation: 0.2,
        baseInterval: {
            timeUnit: "hour",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(chartRoot, {}),
        tooltip: am5.Tooltip.new(chartRoot, {}),
        dateFormats: {
            "millisecond": "mm:ss SSS",
            "second": "HH:mm:ss",
            "minute": "HH시 mm분",
            "hour": "HH시 mm분",
            "day": "M월 dd일",
            "week": "M월 dd일",
            "month": "yyyy년 M월",
            "year": "yyyy년"
        },
        tooltipDateFormat: "yyyy-MM-dd", // 밑단 데이터
        periodChangeDateFormats: {
            "millisecond": "mm:ss SSS",
            "second": "HH:mm:ss",
            "minute": "HH시 mm분",
            "hour": "HH시 mm분",
            "day": "M월 dd일",
            "week": "M월 dd일",
            "month": "yyyy년 M월",
            "year": "yyyy년"
        },
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererY.new(chartRoot, {}),
    }));

    const cI_Lv1_lineseries1 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
            name: "name",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
    }));
    cI_Lv1_lineseries1.strokes.template.set("templateField", "strokeSettings");
    cI_Lv1_lineseries1.strokes.template.setAll({
        strokeWidth: 3
    });

    const cI_Lv1_lineseries2 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
            name: "name",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
    }));
    cI_Lv1_lineseries2.strokes.template.set("templateField", "strokeSettings");
    cI_Lv1_lineseries2.strokes.template.setAll({
        strokeWidth: 3
    });

    const cI_Lv1_lineseries3 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
        name: "name",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
    }));
    cI_Lv1_lineseries3.strokes.template.set("templateField", "strokeSettings");
    cI_Lv1_lineseries3.strokes.template.setAll({
        strokeWidth: 3
    });

    const cI_Lv1_lineseries4 = chart.series.push(am5xy.LineSeries.new(chartRoot, {
        name: "name",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
    }));
    cI_Lv1_lineseries4.strokes.template.set("templateField", "strokeSettings");
    cI_Lv1_lineseries4.strokes.template.setAll({
        strokeWidth: 3
    });

    const lineData1 = generateLineDatas(sensorData, daysData,  cI_Lv1[1], "2");
    const lineData2 = generateLineDatas(sensorData, daysData,  cI_Lv1[0], "3");
    const lineData3 = generateLineDatas(sensorData, daysData,  cI_Lv2[1], "4");
    const lineData4 = generateLineDatas(sensorData, daysData,  cI_Lv2[0], "5");
    cI_Lv1_lineseries1.data.setAll(lineData1);
    cI_Lv1_lineseries2.data.setAll(lineData2);
    cI_Lv1_lineseries3.data.setAll(lineData3);
    cI_Lv1_lineseries4.data.setAll(lineData4);

    const series = chart.series.push(am5xy.LineSeries.new(chartRoot, {
        name: "name",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
    }));
    series.strokes.template.set("templateField", "strokeSettings");
    series.strokes.template.setAll({
        strokeWidth: 3
    });

    const tooltip = series.set("tooltip", am5.Tooltip.new(chartRoot, {
        labelText : "\[bold]{name}[/]\n날짜 : {valueX.formatDate('yyyy년 MM월 dd일 HH시')}\n수치 : {valueY}",
    }));
    tooltip.on("pointTo", function() {
        const background = tooltip.get("background");
        background.set("fill", background.get("fill"));
    });
    tooltip.get("background").adapters.add("fill", function(fill) {
        if (tooltip.dataItem) {
            return tooltip.dataItem.dataContext.color;
        }
        return fill;
    });
    series.set("tooltip", tooltip);

    // 센서데이터 Set data
    const data = generateDatas(sensorData, daysData, "1");
    series.data.setAll(data);

    // 스크롤 X축만 설정
    chart.set("scrollbarX", am5.Scrollbar.new(chartRoot, {
        orientation: "horizontal"
    }));

    chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "zoomX",
        xAxis: xAxis
    }));

    chart.appear(1000, 100);
    series.appear(1000);

}
