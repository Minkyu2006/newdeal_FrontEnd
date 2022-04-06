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
    bridgeSearch(condition) {
        CommonUI.ajax("/api/safety/bridgeDataList", "GET", condition, function (res) {
            console.log(res);
        });
    },

    bridgeSave(information) {
        CommonUI.ajax("/api/safety/save", "POST", information, function (res) {
            alertSuccess("교량 저장을 성공하였습니다.");
        });
    }
};

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    s: { // 그리드 세팅
        id: [
            "grid_input", "grid_bridgeList"
        ],
        columnLayout: [],
        prop: [],
    },

    f: { // 그리드 펑션
        initialization() { // 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다.

            /* 0번 그리드의 레이아웃 */
            grids.s.columnLayout[0] = [
                {
                    dataField: "calYyyymmdd",
                    headerText: "계측일시",
                }, {
                    dataField: "calTemperature",
                    headerText: "온도",
                }, {
                    dataField: "calCapacity",
                    headerText: "공용 내하율",
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
                rowHeight : 48,
                headerHeight : 48,
            };

            grids.s.columnLayout[1] = [
                {
                    dataField: "",
                    headerText: "",
                }, {
                    dataField: "",
                    headerText: "",
                },
            ];

            grids.s.prop[1] = {
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
                rowHeight : 48,
                headerHeight : 48,
            };
        },

    },
};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        /* 0번그리드 내의 셀 클릭시 이벤트 */
        // AUIGrid.bind(grids.s.id[0], "cellClick", function (e) {
        //     console.log(e.item);
        // });

        $("#sfName").on("keypress", function (e) {
            if(e.originalEvent.code === "Enter" || e.originalEvent.code === "NumpadEnter") {
                bridgeSearch();
            }
        });

        $("#bridgeSearch").on("click", function () {
            bridgeSearch();
        });

        $("#bridgeSave").on("click", function () {
            bridgeSave();
        });

        $("#bridgeNew").on("click", function () {
            resetInput("insert");
        });

        $("#bridgeCancel").on("click", function () {
            resetInput("search");
        });

        $('.pop__close').on('click', function(e) {
            $('.pop').removeClass('open');
        });
    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    currentBridge: {},
}

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    gridFunc.create();

    trigs.basic();
}

function bridgeSearch() {
    const condition = {
        s_sfName: $("#sfName").val(),
        s_sfForm: $("#sfForm").val(),
        s_sfRank: $("#sfRank").val(),
    }
    comms.bridgeSearch(condition);
}

// 계측 기반 안전성 추정 데이터 제공 - 교량등록
function bridgeSave(){
    if($("#sfName").val()==="") {
        alertCaution("교량명을 입력해주세요.", 1)
        return false;
    }

    if($("#sfLength").val()==="") {
        alertCaution("총 길이를 입력해주세요.", 1)
        return false;
    }

    if($("#sfWidth").val()==="") {
        alertCaution("총 폭을 입력해주세요.", 1)
        return false;
    }

    if($("#sfNum").val()==="") {
        alertCaution("경간수를 입력해주세요.", 1)
        return false;
    }

    if($("#sfCompletionYear").val()==="") {
        alertCaution("준공년도를 입력해주세요.", 1)
        return false;
    }

    if($("#sfFactor").val()==="") {
        alertCaution("안전율를 입력해주세요.", 1)
        return false;
    }

    const information = new FormData();
    if(wares.currentBridge.sfId) {
        information.set("sfId", wares.currentBridge.sfId);
    }
    information.set("sfName", $("#sfName").val());
    information.set("sfForm", $("#sfForm").val());
    information.set("sfRank", $("#sfRank").val());
    information.set("sfLength", $("#sfLength").val());
    information.set("sfWidth", $("#sfWidth").val());
    information.set("sfNum", $("#sfNum").val());
    information.set("sfCompletionYear", $("#sfCompletionYear").val());
    information.set("sfFactor", $("#sfFactor").val());

    comms.bridgeSave(information);
}

/* 교량 기본정보창의 동작에 따른 상태변경하며 리셋 */
function resetInput(mode) {
    const $name = $("#sfName");
    const $form = $("#sfForm");
    const $rank = $("#sfRank");
    const $length = $("#sfLength");
    const $width = $("#sfWidth");
    const $num = $("#sfNum");
    const $completionYear = $("#sfCompletionYear");
    const $factor = $("#sfFactor");

    $name.val("");
    $form.val("00");
    $rank.val("00");
    $length.val("");
    $width.val("");
    $num.val("");
    $completionYear.val("");
    $factor.val("");

    switch (mode) {
        case "search" :
            $length.prop("readonly", true);
            $width.prop("readonly", true);
            $num.prop("readonly", true);
            $completionYear.prop("readonly", true);
            $factor.prop("readonly", true);
            $("#bridgeSearch").show();
            $("#bridgeNew").parents("li").show();
            $("#bridgeSave").parents("li").hide();
            $("#bridgeCancel").parents("li").hide();
            $("#sfFormTot").prop("disabled", false);
            $("#sfRankTot").prop("disabled", false);
            wares.currentBridge = {};
            gridFunc.clear(0);
            break;
        case "modify" :
            $length.prop("readonly", false);
            $width.prop("readonly", false);
            $num.prop("readonly", false);
            $completionYear.prop("readonly", false);
            $factor.prop("readonly", false);
            $("#bridgeSearch").show();
            $("#bridgeNew").parents("li").show();
            $("#bridgeSave").parents("li").show();
            $("#bridgeCancel").parents("li").show();
            $("#sfFormTot").prop("disabled", false);
            $("#sfRankTot").prop("disabled", false);
            break;
        case "insert" :
            $length.prop("readonly", false);
            $width.prop("readonly", false);
            $num.prop("readonly", false);
            $completionYear.prop("readonly", false);
            $factor.prop("readonly", false);
            $("#bridgeSearch").hide();
            $("#bridgeNew").parents("li").hide();
            $("#bridgeSave").parents("li").show();
            $("#bridgeCancel").parents("li").show();
            $("#sfFormTot").prop("disabled", true);
            $("#sfRankTot").prop("disabled", true);
            $form.val("01");
            $rank.val("01");
            wares.currentBridge = {};
            gridFunc.clear(0);
            break;
    }
}