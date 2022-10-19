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
    getBridgeList(searchCondition) {
        CommonUI.ajax('/api/earth/list', 'GET', searchCondition, function (res) {
            const data = res.sendData.gridListData;
            if (data.length === 1) {
                estimateSeismicPerformance(data[0]);
            } else if (data.length > 1) {
                grids.f.set(0, data);
                gridFunc.resize(0);
                $("#bridgeListPop").addClass("open");
            } else {

            }
        });
    },

    getEstimatedSeismicPerformanceData(targetBridge) {
        CommonUI.ajax('/api/earth/earthQuekePerformance', 'GET', targetBridge, function (res) {
            const data = res.sendData;
            console.log(data);
            wares.currentBridge = data;
            setElementsByBridgeInfo(data);
            $("#bridgeName").text("교량명");
            alertSuccess('내진성능을 추정 완료 하였습니다.');
            logreg(2,"데이터기반 가상모델 구축 시스템","내진성능 추정 서비스",null); // 데이터조회 API에 조회성공시 추가할 것 to. 성낙원
        });
    },

    modifyBridge(modifyData) {
        CommonUI.ajax('/api/earth/update', 'PARAM', modifyData, function (res) {
            comms.getEstimatedSeismicPerformanceData({eqBridge: modifyData.eqBridge});
        });
    },
};

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    /* 그리드 세팅 */
    s: {
        id: [
            'grid_bridgeList',
        ],
        columnLayout: [],
        prop: [],
    },

    /* 그리드 펑션 */
    f: {
        /* 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다. */
        initialization() {
            grids.s.columnLayout[0] = [
                {
                    dataField: "eqBridge",
                    headerText: "교량명",
                }, {
                    dataField: "eqLocation",
                    headerText: "대상 지역",
                }, {
                    dataField: "eqRank",
                    headerText: "내진등급",
                }, {
                    dataField: "eqLength",
                    headerText: "주 경간장",
                },
            ];

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
            };
        },

        /* 그리드 동작 처음 빈 그리드를 생성 */
        create() {
            for (const i in grids.s.columnLayout) {
                AUIGrid.create(grids.s.id[i], grids.s.columnLayout[i], grids.s.prop[i]);
            }
        },

        /* 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다. */
        get(numOfGrid) {
            return AUIGrid.getGridData(grids.s.id[numOfGrid]);
        },

        /* 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다. */
        set(numOfGrid, data) {
            AUIGrid.setGridData(grids.s.id[numOfGrid], data);
        },

        /* 해당 배열 번호 그리드의 데이터 비우기 */
        clear(numOfGrid) {
            AUIGrid.clearGridData(grids.s.id[numOfGrid]);
        },

        /* 해당 배열 번호 그리드의 크기를 현제 그리드를 감싼 엘리먼트에 맞춰 조절 */
        resize(num) {
            AUIGrid.resize(grids.s.id[num]);
        },
    },
};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        /* 0번그리드 내의 셀 클릭시 이벤트 */
        AUIGrid.bind(grids.s.id[0], "cellDoubleClick", function () {
            const item = gridFunc.getSelectedItem(0);
            if (item) {
                $('.pop').removeClass('open');
                estimateSeismicPerformance(item);
            }
        });

        $("#eqBridge").on("keypress", function (e) {
            if(e.originalEvent.code === "Enter" || e.originalEvent.code === "NumpadEnter") {
                getBridgeList();
            }
        });

        // 아코디언
        $(".c-accordion__head").on("click", function() {
            $(this).toggleClass("active");
            $(this).next(".c-accordion__body").toggleClass("active");
        });

        // 업로드할 파일명 불러오기
        $('#excelfile').change(function() {
            const file = $(this).val().split('\\').pop();
            $('.c-file__input').val(file);
        });

        $('#searchBridgeBtn').on('click', function () {
            getBridgeList();
        });

        $("#bridgeSelect").on("click", function () {
            const item = gridFunc.getSelectedItem(0);
            if (item) {
                $('.pop').removeClass('open');
                estimateSeismicPerformance(item);
            } else {
                alertCaution("검색된 교량을 선택해 주세요", 1);
            }
        });

        $('.pop__close').on('click', function() {
            $('.pop').removeClass('open');
        });

        $('#modifyBridge').on('click', function () {
            modifyBridge();
        });
    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    currentBridge: {
        earthQuakeDto: {}
    },
}

// 양식 다운로드
function formDownload(){
    location.href = "https://newdealexcel.s3.ap-northeast-2.amazonaws.com/%EB%82%B4%EC%A7%84%EC%84%B1%EB%8A%A5_%EC%B6%94%EC%A0%95%EC%84%9C%EB%B9%84%EC%8A%A4_%EC%96%91%EC%8B%9D.xlsx";
}

// 엑셀 파일 올렸는지 확인
function bridgeFilesend() {
    const excelfile = $("#excelfile").val();
    if (excelfile === "" || excelfile == null) {
        // 파일이 선택되지 않은 경우
        alertCaution("파일을 선택해주세요.",1);
        return false;
    } else if (!checkFileType(excelfile)) {
        // checkFileType 에서 Excel 확장자가 아닌경우
        alertCaution("엑셀파일이 아닙니다.",1);
        return false;
    }else{
        bridgeExcelSend();
    }
}


// 교량 엑셀파일 업로드
function bridgeExcelSend() {
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }
    else {

        const formData = new FormData(document.getElementById('bridgeFileSendForm'));

        url = $("#backend_protocol").val()+"://" + $("#backend_url").val() + "/api/earth/filesave"; // 호출할 백엔드 API
        console.log("url : " + url);
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
                xhr.setRequestHeader("insert_id",insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    console.log("request.status : " + request.status + " => 400에러");
                    // alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    $('.c-file__input, #excelfile').val(null);
                    alertSuccess("교량 저장을 완료했습니다.");
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

const getBridgeList = function() {
    const searchCondition = {
        eqBridge: $('#eqBridge').val(),
    }
    comms.getBridgeList(searchCondition);
}

/* 교량 정보에 맞추어 내진성능 추정 */
const estimateSeismicPerformance = function (data) {
    const targetBridge = {
        eqBridge: data.eqBridge,
    }
    comms.getEstimatedSeismicPerformanceData(targetBridge);
}

/* 선택된 교량에 맞추어 인풋과 결과내용을 채우고 활성화한다. */
const setElementsByBridgeInfo = function(data) {
    $('#eqBridge').val(data.earthQuakeDto.eqBridge);
    $('#eqLocation').val(data.earthQuakeDto.eqLocation).prop('disabled', false);
    $('#eqRank').val(data.earthQuakeDto.eqRank).prop('disabled', false);
    $('#eqLength').val(data.earthQuakeDto.eqLength).prop('disabled', false);
    $('#eqConfiguration').val(data.earthQuakeDto.eqConfiguration).prop('disabled', false);
    $('#eqPillar').val(data.earthQuakeDto.eqPillar).prop('disabled', false);
    $('#eqDivision').val(data.earthQuakeDto.eqDivision).prop('disabled', false);
    $('#eqGirder').val(data.earthQuakeDto.eqGirder).prop('disabled', false);

    let resultText;
    if (data.result === '1') {
        resultText = `해당교량은 리히터 규모 <span>${data.earthScale}(${data.earthDesign})</span> 의 지진에도 저항할 수 있도록 내진설계가 적용되어 있다고 추정된다.`;
    } else {
        resultText = `해당교량은 지진에 취약할 수 있는 교량으로 내진성능평가를 수행하도록 권장한다.`;
    }
    $('#resultText').html(resultText);
}

const modifyBridge = function () {
    if (wares.currentBridge.earthQuakeDto.id) {
        const modifyData = {
            id: wares.currentBridge.earthQuakeDto.id,
            eqBridge: $('#eqBridge').val(),
            eqLocation: $('#eqLocation').val(),
            eqRank: $('#eqRank').val(),
            eqLength: $('#eqLength').val(),
            eqConfiguration: $('#eqConfiguration').val(),
            eqPillar: $('#eqPillar').val(),
            eqDivision:$('#eqDivision').val(),
            eqGirder: $('#eqGirder').val(),
        }
        comms.modifyBridge(modifyData);
    } else {
        alertCaution('먼저, 정보를 수정할 교량을 선택해 주세요.', 1);
    }
}

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    grids.f.create();

    trigs.basic();
}