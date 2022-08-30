/* 서버 API와 주고 받게 될 데이터 정의
* "s" 문자형, "n" 숫자형, "a" 배열형, "r" 필수값, "d" 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
* 조합하여 "sr", "nr" 같은 형식도 가능
* 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
* */
const dtos = {
    send: {

    },
    receive: {

    }
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    getBridgeList() {
        CommonUI.ajax('/api/predict/bridge', 'GET', false, function (res) {
            const data = refineBridgeListData(JSON.parse(res.sendData.jsonObject));

            gridFunc.set(0, data);
        });
    },

    getSensorList(targetCondition) {
        CommonUI.ajax('/api/predict/bridgeSensor', 'GET', targetCondition, function (res) {
            const data = res.sendData.gridListData;

            gridFunc.set(1, data);
        });
    },
};

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    s: { // 그리드 세팅
        id: [
            "grid_bridge_list", "grid_sensor_list"
        ],
        columnLayout: [],
        prop: [],
    },

    f: { // 그리드 펑션
        initialization() { // 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다.
            /* 0번 그리드의 레이아웃 */
            grids.s.columnLayout[0] = [
                {
                    dataField: "bridgeName",
                    headerText: "교량명",
                }, {
                    dataField: "bridgeType",
                    headerText: "형식",
                },
            ];

            /* 0번 그리드의 프로퍼티(옵션) 아래의 링크를 참조
            * https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html
            * */
            grids.s.prop[0] = {
                editable : false,
                selectionMode : "singleRow",
                noDataMessage : "출력할 데이터가 없습니다.",
                showAutoNoDataMessage: false,
                enableColumnResize : false,
                showRowAllCheckBox: false,
                showRowCheckColumn: false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
                rowHeight : 30,
                headerHeight : 30,
            };

            grids.s.columnLayout[1] = [
                {
                    dataField: "",
                    headerText: "",
                    labelFunction(_rowIndex, _columnIndex, _value, _headerText, item) {
                        const result = item.channelName ? item.channelName : item.sensorTypeName;
                        return result;
                    },
                },
            ];

            grids.s.prop[1] = {
                showHeader: false,
                displayTreeOpen : false,
                rowCheckDependingTree : true,
                editable : false,
                selectionMode : 'singleRow',
                noDataMessage : '출력할 데이터가 없습니다.',
                showAutoNoDataMessage: false,
                enableColumnResize : true,
                showRowAllCheckBox: false,
                showRowCheckColumn: false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
                showEditedCellMarker: false,
                rowHeight : 30,
                headerHeight : 30,
            };
        },
    },

};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        /* 0번그리드 내의 셀 클릭시 이벤트 */
        AUIGrid.bind(grids.s.id[0], "cellClick", function (e) {
            $("#bridgeType").val(e.item.bridgeType);
            getSensorListById(e.item.bridgeId);
        });


        AUIGrid.bind(grids.s.id[1], "cellClick", function (e) {
            if (e.item.deviceId) {
                sensorDataGet(e.item.deviceId, e.item.channelNumber);
                // console.log(e.item)
                $("#sensor").val(e.item.deviceId);
                $("#sensorType").val(e.item.sensorType);
                $("#channelNumber").val(e.item.channelNumber);
            }
        });
    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {

}


// 다음단계로 페이지이동
function predictNextPage(){
    const $time1 = $("#time1");
    const $time2 = $("#time2");
    const $bridgeType = $("#bridgeType");
    const $days = $("#days");
    const $channelNumber = $("#channelNumber");
    const $sensorType = $("#sensorType");
    const $sensor = $("#sensor");
    // const $sensorList = $("#sensorList");

    if($sensor.val()=== ""){
        alertCaution("센서를 선택해주세요.",1);
        return false;
    }

    if($days.val()=== ""){
        alertCaution("예측 할 일수를 입력해주세요.",1);
        return false;
    }

    const date1 = new Date($time1.val());
    const date2 = new Date($time2.val());
    const diffDate = date1.getTime() - date2.getTime();
    const result = Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24 * 30)));
    if(result <= 3){
        alertCaution('시작날짜와 종료날짜의 간격이 너무 좁습니다.<br/>최소 4개월 단위로 검색해주세요.',1);
        return false;
    }

    const sensorData = {
        "sensor" : $sensor.val(),
        "time1" : $time1.val(),
        "time2" : $time2.val(),
        "days" : $days.val(),
        "bridgeType" : $bridgeType.val(),
        "channelNumber" : $channelNumber.val(),
        "sensorType" : $sensorType.val(),
        "warningVal" : $("#warningVal").val(),
        "dangerVal" : $("#dangerVal").val(),
    }

    setCookie("sensorData",JSON.stringify(sensorData), 20); // 계산할 센서 쿠키에 저장 1시간으로설정

    location.href = "/resistance/predictnext";
}

// 이전단계로 페이지이동
function predictBeforePage(){
    location.href = "/resistance/predictintro";
}

// 센서리스트 API 호출
// function pythonSensorList(){
//     JWT_Get();
//
//     if (accessToken == null || refreshToken == null || insert_id == null) {
//         // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
//         alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
//     } else {
//
//         let url;
//         url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/predict/sensorList"; // 호출할 백엔드 API
//
//         console.log("url : "+url);
//
//         $.ajax({
//             url: url,
//             type: 'get',
//             cache: false,
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader("JWT_AccessToken", accessToken);
//                 xhr.setRequestHeader("insert_id", insert_id);
//             },
//             error: function (request) {
//                 if (request.status === 500) {
//                     // console.log("request.status : " + request.status + " => 500에러");
//                     alertCaution("500에러 재로그인 해주세요.", 2);
//                 } else {
//                     // console.log("request.status : " + request.status + " => 404에러");
//                     alertCaution("404에러 재로그인 해주세요.", 2);
//                 }
//             },
//             success: function (request) {
//                 let status = request.status;
//                 console.log("status : " + status);
//                 if (status === 200) {
//                     console.log("호출성공");
//
//                     const $sensorList = $("#sensorList");
//                     let html = '';
//                     if(request.sendData.jsonObject !== null){
//                         const jsonData = JSON.parse(request.sendData.jsonObject);
//                         // console.log(jsonData);
//
//                         html += '<option value="">'+'센서를 선택해주세요.'+'</option>'
//                         html += '<option value="Ssmartcs:2:DNAGW2111">'+'테스트용'+'</option>'
//                         for(let i=0; i<jsonData.length; i++){
//                             if(jsonData[i][1] === ""){
//                                 html += '<option value='+jsonData[i][0]+'>'+'교량명 : 교량명없음'+' 센서명 : '+jsonData[i][0]+'</option>';
//                             }else{
//                                 html += '<option value='+jsonData[i][0]+'>'+'교량명 : '+jsonData[i][1]+' 센서명 : '+jsonData[i][0]+'</option>';
//                             }
//                         }
//                     }else{
//                         html += '<option value="">'+'센서리스트 데이터를 불러오는데 실패했습니다.'+'</option>'
//                     }
//                     $sensorList.html(html);
//
//                 } else {
//                     if (request.err_msg2 === null) {
//                         alertCaution(request.err_msg, 1);
//                     } else {
//                         alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
//                     }
//                 }
//             }
//         });
//     }
// }

// 선택한 센서데이터 API 호출
function sensorDataGet(deviceId, channelNumber){
    JWT_Get();

    $("#actionLoadingBar").show();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {
        console.log("선택한 센서 데이터명 : "+deviceId);

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/predict/sensorAllData"; // 호출할 백엔드 API
        console.log("url : "+url);

        const param = {
            "sensor" : deviceId,
            channelNumber,
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
                    logreg(2,"데이터기반 가상모델 구축 시스템","IoT 인공지능기반 미래 예측서비스",deviceId+"-All");

                    console.log("호출성공");

                    const $chartdiv1_font = $("#chartdiv1_font");
                    const $chartdiv2 = $("#chartdiv2");
                    const jsonData = JSON.parse(request.sendData.jsonObject);
                    if(jsonData.length === 0) {
                        if(chartDiv["chartdiv"]) {
                            chartDiv["chartdiv"].root.dispose();
                        }
                        $("#time1").val("조회된 데이터가 없습니다.");
                        $("#time2").val("조회된 데이터가 없습니다.");
                        $("#days").val("").attr("readonly",true);
                        $chartdiv1_font.css("display","block")
                        $("#chartdiv1_ex").html('해당 센서의 대한 조회된 데이터가 없습니다.')
                        $chartdiv2.css("display","none");
                    }else{
                        // console.log(jsonData);
                        // console.log(jsonData.length);

                        // const time = jsonData[0][0];
                        // const value = jsonData[0][1];
                        // console.log(time);
                        // console.log(value);
                        // console.log(new Date(time));
                        // console.log(new Date(time).getTime());

                        // 차트호출
                        $chartdiv1_font.css("display","none")
                        $chartdiv2.css("display","block");
                        chartStart(jsonData, 0, "chartdiv");

                        $("#chartdiv2_font").css("display","block")
                        $("#chartdiv2_ex").html('신뢰 구간과 예측 일수 입력 후 호출 버튼을 눌러주세요.')
                    }

                    $("#actionLoadingBar").hide(); // 액션바 기능완료시 주석해제
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
}

// 예측 데이터 API 호출
let lastDate;
function futureSensorDataGet(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {
        console.log("예측데이터 호출");

        const $time1 = $("#time1");
        const $time2 = $("#time2");
        const val = '조회된 데이터가 없습니다.';
        if($time1.val() === val && $time2.val() === val){
            alertCaution(val,1);
            return false;
        }

        const $days = $("#days");
        if($days.val()=== ""){
            alertCaution("예측 할 일수를 입력해주세요.",1);
            return false;
        }

        $("#actionLoadingBar2").show();

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/predict/futureSensorDataGet"; // 호출할 백엔드 API
        console.log("url : "+url);

        const param = {
            "sensor" : $("#sensorList").val(),
            "time1" : $time1.val(),
            "time2" : $time2.val(),
            "days" : $days.val()
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
                    logreg(2,"데이터기반 가상모델 구축 시스템","IoT 인공지능기반 미래 예측서비스",$("#sensorList").val()+"-Future");

                    console.log("호출성공");

                    const $chartdiv2_font = $("#chartdiv2_font");
                    if(request.sendData.jsonObject1 !== null) {

                        const jsonData = JSON.parse(request.sendData.jsonObject1);
                        const jsonData2 = JSON.parse(request.sendData.jsonObject2);

                        for(let i=0; i<jsonData.length; i++){
                            if (jsonData2[i] !== undefined){
                                jsonData[i][1] = new Date(jsonData2[i]);
                                lastDate= new Date(jsonData2[i]);
                            }else{
                                const tomorrow = new Date(lastDate.setDate(lastDate.getDate() + 1));
                                lastDate = tomorrow;
                                jsonData[i][1] = tomorrow;
                            }
                        }

                        // console.log(jsonData);
                        // console.log(jsonData.length);
                        // console.log();
                        //
                        // console.log(jsonData2);
                        // console.log(jsonData2.length);
                        // console.log();
                        //
                        // console.log(jsonData);
                        // console.log(jsonData.length);
                        // console.log();

                        // 차트호출
                        $chartdiv2_font.css("display","none")
                        chartStart(jsonData, $days.val(), "chartdiv2");
                    }
                    else{
                        $chartdiv2_font.css("display","block")
                        $("#chartdiv2_ex").html('시작날짜와 종료날짜의 간격이 너무 좁습니다.<br/>최소 4개월 단위로 검색해주세요.')
                    }

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
}

// 차트 그리기
let chartDiv = {};
function chartStart(jsonData, days, divId){

    if(chartDiv[divId]) {
        chartDiv[divId].root.dispose();
    }
    chartDiv[divId] = {};

    chartDiv[divId].root = am5.Root.new(divId);

    let chartRoot = chartDiv[divId].root;

    chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

    const chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {
        // 그래프 고정시키기
        // panX: true,
        // panY: true,

        // 마우스 휠 고정시키기
        // wheelX: "panX",
        // wheelY: "zoomX",
        // pinchZoomX:true
    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // json 데이터 날짜와 수치데이터 가공
    const downColor = am5.Color.fromString("#7a86ff"); // 현재센서 데이터
    const upColor = am5.Color.fromString("#FFD336"); // 미래예측 데이터
    const futureDays = jsonData.length-days; // 예측일수
    let color;
    let previousColor;
    let previousDataObj;
    function generateData(getData, num) {

        if(futureDays < num){
            color = upColor;
        }else{
            color = downColor;
        }

        let dataObj;
        if(days === 0){
            dataObj = {
                name : "센서 데이터",
                date: Date.parse(getData[0]),
                value: getData[1],
                color: color
            };
        }else{
            dataObj = {
                name : "",
                date: getData[1].getTime(),
                value: getData[0],
                color: color
            };

            if(color === downColor){
                dataObj.name = "센서 데이터"
            }else{
                dataObj.name = "예측 데이터"
            }
        }

        if (color !== previousColor) {
            if (!previousDataObj) {
                previousDataObj = dataObj;
            }
            previousDataObj.strokeSettings = { stroke: color };
        }
        previousDataObj = dataObj;
        previousColor = color;
        return dataObj;

    }

    // json 데이터 가공
    function generateDatas(jsonData) {
        const data = [];

        for (let i = 0; i < jsonData.length; ++i) {
            data.push(generateData(jsonData[i], i));
        }

        return data;
    }

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(chartRoot, {
        maxDeviation: 0.2,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(chartRoot, {}),
        tooltip: am5.Tooltip.new(chartRoot, {}),
        dateFormats: {
            "millisecond": "mm:ss SSS",
            "second": "HH:mm:ss",
            "minute": "HH:mm",
            "hour": "HH:mm",
            "day": "M월 dd일",
            "week": "M월 dd일",
            "month": "yyyy년 M월",
            "year": "yyyy년"
        },
        tooltipDateFormat: "yyyy-MM-dd",
        periodChangeDateFormats: {
            "millisecond": "mm:ss SSS",
            "second": "HH:mm:ss",
            "minute": "HH:mm",
            "hour": "HH:mm",
            "day": "M월 dd일",
            "week": "M월 dd일",
            "month": "yyyy년 M월",
            "year": "yyyy년"
        },
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
        renderer: am5xy.AxisRendererY.new(chartRoot, {}),
    }));

    const series = chart.series.push(am5xy.LineSeries.new(chartRoot, {
        name: "name",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
    }));

    series.strokes.template.set("templateField", "strokeSettings");

    const tooltip = series.set("tooltip", am5.Tooltip.new(chartRoot, {
        labelText : "\[bold]{name}[/]\n날짜 : {valueX.formatDate()}\n수치 : {valueY}",
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

    series.strokes.template.setAll({
        strokeWidth: 3
    });

    // Set data
    const data = generateDatas(jsonData);

    series.data.setAll(data);

    chart.set("scrollbarX", am5.Scrollbar.new(chartRoot, {
        orientation: "horizontal"
    }));

    chart.set("cursor", am5xy.XYCursor.new(chartRoot, {
        behavior: "zoomX",
        xAxis: xAxis
    }));

    if(days === 0){
        $("#days").val("").attr("readonly",false);
        // 그래프 변화할때마다 날짜 데이터 가져오기
        xAxis.onPrivate("selectionMin", function(value, target) {
            const start = dateFormat(new Date(value));
            $("#time1").val(start);
            // console.log("Start date changed:", start);
        });

        xAxis.onPrivate("selectionMax", function(value, target) {
            const end = dateFormat(new Date(value));
            $("#time2").val(end);
            // console.log("End date changed:", end);
        });
    }

    chart.appear(1000, 100);
    series.appear(1000);

    // $("#actionLoadingBar").hide(); // 액션바 기능완료시 주석해제
}

function refineBridgeListData(bridgeList) {
    let result = [];
    for (const bridge of bridgeList) {
        result.push({
            bridgeName: bridge[0],
            bridgeType: bridge[1],
            bridgeId: bridge[2],
        });
    }
    return result;
}

function getSensorListById(bridgeId) {
    const targetCondition = {
        bridgeId,
    }

    comms.getSensorList(targetCondition);
}

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    gridFunc.create();

    trigs.basic();

    logreg(1,"데이터기반 가상모델 구축 시스템","IoT 인공지능기반 미래 예측서비스",null);

    $("#header_four").addClass(' show');

    // pythonSensorList(); // 그리드로 센서 리스트를 불러오기로 하여 사용 중지됨
    setCookie("sensorData",null, 0);

    comms.getBridgeList();
}