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

};

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    s: { // 그리드 세팅
        id: [
            "grid_detail"
        ],
        columnLayout: [],
        prop: [],
    },

    f: { // 그리드 펑션
        initialization() { // 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다.

            grids.s.columnLayout[0] = [
                {
                    dataField: "calYyyymmdd",
                    headerText: "계측일",
                    dataType: "date",
                    defaultFormat : "yyyymmdd",
                    formatString: "yyyy-mm-dd",
                    editRenderer : {
                        type : "CalendarRenderer",
                        defaultFormat : "yyyymmdd",
                        showEditorBtn : false,
                        showEditorBtnOver : false,
                        onlyCalendar : false,
                        showExtraDays : true,
                        validator : function(oldValue, newValue, item, dataField, fromClipboard) {
                            let isValid = false;
                            let formDate = newValue.numString().substring(0, 8);
                            if (formDate.length === 8) {
                                formDate = formDate.substring(0, 4) + "-" + formDate.substring(4, 6) + "-"
                                    + formDate.substring(6,8);
                                newValue = formDate;
                                isValid = !isNaN(Date.parse(newValue));
                            }
                            // 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
                            return { "validate" : isValid, "message"  : "올바른 숫자 8자리를 입력해 주세요" };
                        },
                    },
                }, {
                    dataField: "calCapacity",
                    headerText: "공용 내하율",
                    dataType: "numeric",
                    autoThousandSeparator: "true",
                    labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
                        if(value) item.calCapacity = value.toString().toDecimal();
                        return item.calCapacity;
                    },
                }, {
                    dataField: "calTemperature",
                    headerText: "온도 (℃)",
                    dataType: "numeric",
                    autoThousandSeparator: "true",
                    labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
                        if(value) item.calTemperature = value.toString().toDecimal();
                        return item.calTemperature;
                    },
                },
            ];

            /* 0번 그리드의 프로퍼티(옵션) 아래의 링크를 참조
            * https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html
            * */
            grids.s.prop[0] = {
                editable : false,
                selectionMode : "singleCell",
                noDataMessage : "출력할 데이터가 없습니다.",
                showAutoNoDataMessage: false,
                enableColumnResize : false,
                showRowAllCheckBox: false,
                showRowCheckColumn: false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
            };

        },

        exportToXlsx() {
            //FileSaver.js 로 로컬 다운로드가능 여부 확인
            if(!AUIGrid.isAvailableLocalDownload(grids.s.id[0])) {
                alertCaution("파일 다운로드가 불가능한 브라우저 입니다.", 1);
                return;
            }

            AUIGrid.exportToXlsx(grids.s.id[0], {
                fileName : `안전성추정데이터_${wares.currentBridge.safetyInfo.sfName}_${new Date().format("yyyy-MM-dd")}`,
                progressBar : true,
            });
        },
    },

};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        /* 0번그리드 내의 셀 클릭시 이벤트 */
        AUIGrid.bind(grids.s.id[0], "cellClick", function (e) {
            console.log(e.item);
        });

        $("#excelDownload").on("click", function () {
            if (wares.currentBridge.safetyInfo) {
                grids.f.exportToXlsx();
            } else {
                alertCaution("다운로드 하실 교량을 선택해 주세요", 1);
            }
        });
    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    currentBridge: {},
    formName: {
        "01": "RC 슬래브교",
        "02": "RC 라멘교",
        "03": "PSC I 거더교",
        "04": "강박스교",
    },
    rankName: {
        "01": "DB-24",
        "02": "DB-18",
        "03": "DB-13.5",
    },
}

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    gridFunc.create();

    trigs.basic();
    bridgeList();
}

// 계측 기반 안전성 추정 데이터 - 교량 리스트 호출
function bridgeList(){
    JWT_Get();
    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/safety/bridgeList"; // 호출할 백엔드 API
        $.ajax({
            url: url,
            type: 'get',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id",insert_id);
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
                if (request.status === 200) {
                    console.log(request);

                    const safetyList = request.sendData.safetyList;
                    let html = '';
                    html += '<option value="">교량을 선택해주세요</option>'
                    for(let i=0; i<safetyList.length; i++){
                        html += '<option value='+safetyList[i]["id"]+'>'+safetyList[i]["sfName"]+'</option>'
                    }

                    $('#sfName').html(html);
                } else{
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

// 계측 기반 안전성 추정 데이터 가져오기
function getBridgeInfo(num){
    if(num !== ""){
        JWT_Get();
        if (accessToken == null && refreshToken == null && insert_id == null) {
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        } else {

            let url;
            url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/safety/safetyCalculationOutputInfo"; // 호출할 백엔드 API

            const param = {
                "id" : num
            }
            $.ajax({
                url: url,
                type: 'get',
                data: param,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("JWT_AccessToken", accessToken);
                    xhr.setRequestHeader("insert_id",insert_id);
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
                    if (request.status === 200) {
                        console.log(request);
                        wares.currentBridge = request.sendData;

                        const  safetyInfo = request.sendData.safetyInfo;
                        const  gridListData = request.sendData.gridListData;
                        const  temperatureData = request.sendData.temperatureData;
                        const  capacityData = request.sendData.capacityData;

                        $("#sfForm").val(wares.formName[safetyInfo.sfForm]);
                        $("#sfRank").val(wares.rankName[safetyInfo.sfRank]);
                        $("#sfLength").val(safetyInfo.sfLength);
                        $("#sfWidth").val(safetyInfo.sfWidth);
                        $("#sfNum").val(safetyInfo.sfNum);
                        $("#sfCompletionYear").val(safetyInfo.sfCompletionYear);
                        $("#sfFactor").val(safetyInfo.sfFactor);

                        gridFunc.set(0, gridListData);

                        for(let i = 0; i < capacityData.length; i++) {
                            capacityData[i].calYyyymmdd = new Date(formDate(capacityData[i].calYyyymmdd)).getTime();
                        }
                        for(let i = 0; i < temperatureData.length; i++) {
                            temperatureData[i].calYyyymmdd = new Date(formDate(temperatureData[i].calYyyymmdd)).getTime();
                        }

                        console.log(capacityData);
                        console.log(temperatureData);
                        chartDemo("calCapacity", capacityData);
                        chartDemo("calTemperature", temperatureData);

                    } else{
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
}


function chartDemo(type, data) {
    if(wares[type]) {
        wares[type].root.dispose();
    }
    wares[type] = {};
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    wares[type].root = am5.Root.new(type);

    let root = wares[type].root;

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true,
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation:1,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: type,
        valueXField: "calYyyymmdd",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
        })
    }));

    series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2
    });

    series.bullets.push(function() {
        return am5.Bullet.new(root, {
            locationY: 0,
            sprite: am5.Circle.new(root, {
                radius: 4,
                stroke: root.interfaceColors.get("background"),
                strokeWidth: 2,
                fill: series.get("fill")
            })
        });
    });

    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
}

function formDate(date) {
    date = date.numString();
    date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-"
        + date.substring(6,8);
    return date;
}