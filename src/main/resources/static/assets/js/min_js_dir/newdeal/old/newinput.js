/* 서버 API와 주고 받게 될 데이터 정의
* 's' 문자형, 'n' 숫자형, 'a' 배열형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
* 조합하여 'sr', 'nr' 같은 형식도 가능
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
        CommonUI.ajax('/api/evaluation/bridgeDataList', 'GET', condition, function (res) {
            const data = res.sendData.gridListData;
            console.log(data);
            gridFunc.set(0, data);
        });
    },


    savedBridgeSearch(condition) {
        CommonUI.ajax('/api/evaluation/inputlist', 'GET', condition, function (res) {
            const data = res.sendData.gridListData;
            console.log(data);
            gridFunc.set(1, data);
        });
    },

    bridgeSave(saveData) {
        console.log(saveData);
        CommonUI.ajax('/api/evaluation/save', 'POST', saveData, function (res) {
            console.log(res);
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
            'grid_bridgeList', 'grid_savedBridgeList',
        ],
        columnLayout: [],
        prop: [],
    },

    f: { // 그리드 펑션
        initialization() { // 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다.
            /* 0번 그리드의 레이아웃 */
            grids.s.columnLayout[0] = [
                {
                    dataField: 'evName',
                    headerText: '교량명',
                    width: 150,
                }, {
                    dataField: 'evSuperstructure',
                    headerText: '구조형식',
                    width: 150,
                }, {
                    dataField: '',
                    headerText: '소재지',
                    labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
                        return item.evAddr1 + ' ' + item.evAddr2 + ' ' + item.evAddr3;
                    },
                }, {
                    dataField: 'evYearComplete',
                    headerText: '준공년도',
                    width: 80,
                },
            ];

            /* 0번 그리드의 프로퍼티(옵션) 아래의 링크를 참조
            * https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html
            * */
            grids.s.prop[0] = {
                editable : false,
                selectionMode : 'singleRow',
                noDataMessage : '출력할 데이터가 없습니다.',
                showAutoNoDataMessage: false,
                enableColumnResize : false,
                showRowAllCheckBox: false,
                showRowCheckColumn: false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
            };

            grids.s.columnLayout[1] = [
                {
                    dataField: 'niName',
                    headerText: '교량명',
                    width: 120,
                }, {
                    dataField: 'niBr1',
                    headerText: '구조형식',
                    width: 150,
                }, {
                    dataField: '',
                    headerText: '소재지',
                    labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
                        return item.niAddr1 + ' ' + item.niAddr2 + ' ' + item.niAddr3;
                    },
                }, {
                    dataField: 'niBrYyyy',
                    headerText: '준공년도',
                    width: 70,
                }, {
                    dataField: 'modifyDt',
                    headerText: '수정일',
                    labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
                        return value.replace('T', ' ');
                    },

                }
            ];

            grids.s.prop[1] = {
                editable : false,
                selectionMode : 'singleRow',
                noDataMessage : '출력할 데이터가 없습니다.',
                showAutoNoDataMessage: false,
                enableColumnResize : false,
                showRowAllCheckBox: false,
                showRowCheckColumn: false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
            };
        },
    },

};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        /* 0번그리드 내의 셀 클릭시 이벤트 */
        AUIGrid.bind(grids.s.id[0], 'cellDoubleClick', function () {
            const item = gridFunc.getSelectedItem(0);
            if (item) {
                item.evId = item.id;
                item.id = 0;
                bridgeSelect(item);
            }
        });


        AUIGrid.bind(grids.s.id[1], 'cellDoubleClick', function () {
            const item = gridFunc.getSelectedItem(1);
            if (item) {
                bridgeSelect(item);
            }
        });

        $('#close').on('click', function() {
            $('.l-popup').removeClass('open');
        });

        $('.pop__close').on('click', function(e) {
            $('.pop').removeClass('open');
        });

        $('#s_evName').on('keypress', function (e) {
            if(e.originalEvent.code === 'Enter' || e.originalEvent.code === 'NumpadEnter') {
                bridgeSearch();
            }
        });

        $('#s_niName').on('keypress', function (e) {
            if(e.originalEvent.code === 'Enter' || e.originalEvent.code === 'NumpadEnter') {
                savedBridgeSearch();
            }
        });

        $('#niYyyy').on('keyup', function (e) {
            if (wares.currentBridge) {
                calculateNiBrAging();
            }
        });

        $('#openBridgeSearch').on('click', function () {
            gridFunc.clear(0);
            gridFunc.resize(0);
            $('#s_evName').val('');
            $('#bridgeListPop').addClass('open');
        });

        $('#btn-load').on('click', function () {
            gridFunc.clear(1);
            gridFunc.resize(1);
            $('#s_niName').val('');
            $('#savedBridgeListPop').addClass('open');
        });

        $('#bridgeSearch').on('click', function () {
            bridgeSearch();
        });

        $('#savedBridgeSearch').on('click', function () {
            savedBridgeSearch();
        });

        $('#bridgeSelect').on('click', function () {
            const item = gridFunc.getSelectedItem(0);
            if (item) {
                item.evId = item.id;
                item.id = 0;
                bridgeSelect(item);
            } else {
                alertCaution('교량을 선택해 주세요', 0);
            }
        });

        $('#savedBridgeSelect').on('click', function () {
            const item = gridFunc.getSelectedItem(1);
            if (item) {
                bridgeSelect(item);
            } else {
                alertCaution('교량을 선택해 주세요', 0);
            }
        });

        $('#btn-reset').on('click', function () {
            inputMode('search');
        });

        $('#submitMainForm').on('click', function () {
            submitMainForm();
        });

        $('.numAndPoint').on('change', function (e) {
            const refinedNumber = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
            e.target.value = refinedNumber >= 0 ? refinedNumber : '';
        });

        $('.numOnly').on('keyup', function (e) {
            e.target.value = e.target.value.numString();
        });
    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    currentYear: new Date().getFullYear(),
}

function bridgeSearch() {
    const condition = {
        s_evName: $('#s_evName').val(),
    }

    if (condition.s_evName) {
        comms.bridgeSearch(condition);
    } else {
        alertCaution('검색어를 입력해 주세요.', 1);
    }
}

function savedBridgeSearch() {
    const condition = {
        s_niName: $('#s_niName').val(),
    }

    if (condition.s_niName) {
        comms.savedBridgeSearch(condition);
    } else {
        alertCaution('검색어를 입력해 주세요.', 1);
    }
}

function bridgeSelect(item) {
    wares.currentBridge = item;
    const checkYnList = ['niA33', 'niA34', 'niB33', 'niB34', 'niC33', 'niC34', 'niD33', 'niD34'];
    for (const checkYnId of checkYnList) {
        wares.currentBridge[checkYnId] = wares.currentBridge[checkYnId] === 'Y';
    }
    inputMode('selected');
    broput(wares.currentBridge);
    closeBridgeListPops();
}

function calculateNiBrAging() {
    const niYyyy = parseInt($('#niYyyy').val());
    const evYearComplete = parseInt(wares.currentBridge.evYearComplete);
    let calculatedAge = niYyyy - evYearComplete;
    calculatedAge = (calculatedAge >= 0 && calculatedAge <= 200) ? calculatedAge : '올바른 점검년도를 입력해 주세요';
    $('#niBrAging').val(calculatedAge);
}

function closeBridgeListPops() {
    $('#bridgeListPop, #savedBridgeListPop').removeClass('open');
    gridFunc.clear(0);
    gridFunc.clear(1);
}

/* 교량 선택창의 동작에 따른 상태변경하며 리셋 */
function inputMode(mode) {
    wares.currentInputMode = mode;


    $('#submitMainForm').html('저장 및 평가');

    switch (mode) {
        case 'selected' :
            if (wares.currentBridge.id) {
                $('#submitMainForm').html('수정 및 평가');
            } else {
                resetInputs();
            }
            break;
        case 'search' :
            wares.currentBridge = undefined;
            resetInputs();
            break;

    }

    function resetInputs() {
        const numberInputs = $('#evName, #evAddr1, #evAddr2, #evAddr3, #evLength, #evSpanCnt, #evWidth, #evHeight, #niYyyy'
            + ', #evYearComplete, #evOrg3, #evSuperstructure, #niBrAging, #id, .numAndPoint');
        const targetCheckInputs = $('input[type="checkbox"]');

        numberInputs.val('');
        targetCheckInputs.prop('checked', false);
    }
}

/* 메인 폼 서브밋 하기 */
function submitMainForm() {
    if (!wares.currentBridge) {
        alertCaution('먼저 교량을 검색하여 선택하세요.', 1);
        return;
    }
    const numberInputs = $('.numAndPoint');
    for (const numberEl of numberInputs) {
        const floatValue = parseFloat(numberEl.value);
        numberEl.value = Number.isNaN(floatValue) ? 0 : floatValue;
    }

    const formData = new FormData(document.getElementById('form-main'));
    // formData.set('id', wares.currentBridge.id);
    const checkBoxElements = $('input[type="checkbox"]');
    for (const el of checkBoxElements) {
        formData.set(el.id, el.checked ? 'Y' : 'N');
    }

    const jsonData = Object.fromEntries(formData);

    if (!jsonData.niBrAging.numString().length) {
        alertCaution('올바른 점검년도를 입력해 주세요.', 1);
        return;
    }

    comms.bridgeSave(formData);

    console.log(jsonData);
}

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    gridFunc.create();
    trigs.basic();
    inputMode('search');
}