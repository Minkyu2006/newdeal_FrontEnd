/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    grids.f.create();

    trigs.basic();
}

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {

    },
}

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    /* 그리드 세팅 */
    s: {
        id: [
            'grid_searchList',
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
                    dataField: "cpNum",
                    headerText: "교량번호",
                }, {
                    dataField: "cpName",
                    headerText: "교량명",
                }, {
                    dataField: "cpType",
                    headerText: "도로종류",
                }, {
                    dataField: "cpManager",
                    headerText: "관리기관",
                },{
                    dataField: "cpTopForm",
                    headerText: "상부형식",
                },{
                    dataField: "cpKind",
                    headerText: "종별구분",
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

const costPredictionList = function() {
    const params = {
        cpName: $("#cpName").val(),
    }
    comms.costPredictionList(params);
}

const comms = {
    costPredictionList(params) {
        CommonUI.ajax('/api/costprediction/list', 'GET', params, function (res) {
            $('#grid__box').css("display","block");
            $("#searchType").val("1");
            logreg(2,"데이터기반 가상모델 구축 시스템","유지관리 기술 선정 및 비용예측", $("#cpName").val());

            const data = res.sendData.gridListData;
            // console.log(data);
            grids.f.set(0, data);

        });
    },
};