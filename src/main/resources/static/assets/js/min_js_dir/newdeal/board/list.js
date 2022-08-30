/* 서버 API와 주고 받게 될 데이터 정의
* 's' 문자형, 'n' 숫자형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
* 조합하여 'sr', 'nr' 같은 형식도 가능
* 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
* */
const dtos = {
    send: {
        getPostList: {
            ntTitle: 's', // 빈 문자일 경우 일반적인 조회
            filterFromDt: 's', // 검색조건 from 오지 않을경우 시작기간은 전체기간
            filterToDt: 's', // 검색조건 to 오지 않을 경우 끝기간은 전체기간
        },
    },
    receive: {
        getPostList: {
            id: 'n',
            ntTitle: 's',
            ntYyyymmdd: 's',
            username: 's'
        },
    }
};

/* 통신에 사용되는 url들 기입 */
const urls = {
    notice: '/api/notice/list',
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    getList() {
        const condition = {
            ntTitle: wares.ntTitle,
            filterFromDt: wares.filterFromDt.numString(),
            filterToDt: wares.filterToDt.numString(),
        };
        dv.chk(condition, dtos.send.getPostList, '게시판 조회 속성과, 검색값 보내기');

        CommonUI.ajax(urls[wares.boardType], 'GET', condition, function (res) {
            const data = res.sendData.gridListData;
            dv.chk(data, dtos.receive.getPostList, '게시글들 받아오기');
            grids.f.setData(0, data);

            grids.f.movePageTo(wares.page);
        });
    }
};

/* .s : AUI 그리드 관련 설정들
*  같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  어쩔 수 없이 한 그리드에 여러개의 요소가 필요할 경우 다차원 배열을 통해 구현한다.
*  .f : 그리드 관련 함수들 배치
*  .e : 그리드 객체에 걸리는 이벤트들 배치
* */
const grids = {
    s: { // 그리드 세팅
        targetDiv: [
            'grid_list'
        ],
        columnLayout: [],
        prop: [],
        id: [],
        data: [],
    },

    f: { // 그리드 펑션
        initialization() { // 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다.

            /* 0번 그리드의 레이아웃 */
            grids.s.columnLayout[0] = [
                {
                    dataField: 'ntTitle',
                    headerText: '제목',
                    style: "grid_textalign_left",
                    renderer: {
                        type : 'TemplateRenderer',
                    },
                    labelFunction(_rowIndex, _columnIndex, value, _headerText, _item) {
                        let result = '<div class="list_subject"><span>' + value + '</span>' + '</div>';
                        return result;
                    }
                }, {
                    dataField: 'ntYyyymmdd',
                    headerText: '작성일',
                    width: 150,
                    dataType: "date",
                    formatString: "yyyy-mm-dd",
                },
            ];

            /* 0번 그리드의 프로퍼티(옵션) 아래의 링크를 참조
            * https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html
            * */
            grids.s.prop[0] = {
                usePaging : true,
                pageRowCount : 15,
                pagingInfoLabelFunction : function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
                    return "현재 : " + currentPage + " / 전체 : " + totalPageCount + "( " + currentTopNumber + "~" + currentBottomNumber + " )";
                },
                autoGridHeight: true,
                enableSorting: false,
                editable : false,
                selectionMode : 'none',
                noDataMessage : '출력할 데이터가 없습니다.',
                showAutoNoDataMessage: false,
                enableColumnResize : false,
                showRowNumColumn : false,
                showStateColumn : false,
                enableFilter : false,
                rowHeight : 35,
                headerHeight : 40,
            };

        },

        create() { // 그리드 동작 처음 빈 그리드를 생성
            for (const i in grids.s.columnLayout) {
                grids.s.id[i] = AUIGrid.create(grids.s.targetDiv[i], grids.s.columnLayout[i], grids.s.prop[i]);
            }
        },

        getData(numOfGrid) { // 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다.
            return AUIGrid.getGridData(grids.s.id[numOfGrid]);
        },

        setData(numOfGrid, data) { // 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다.
            AUIGrid.setGridData(grids.s.id[numOfGrid], data);
        },

        clearData(numOfGrid) { // 해당 배열 번호 그리드의 데이터 비우기
            AUIGrid.clearGridData(grids.s.id[numOfGrid]);
        },

        resize(num) { // 해당 배열 번호 그리드의 크기를 현제 그리드를 감싼 엘리먼트에 맞춰 조절
            AUIGrid.resize(grids.s.id[num]);
        },

        getCheckedItems(numOfGrid) { // 해당 배열 번호 그리드의 엑스트라 체크박스 선택된 (아이템 + 행번호) 객체 반환
            return AUIGrid.getCheckedRowItems(grids.s.id[numOfGrid]);
        },

        movePageTo(pageNum) {
            AUIGrid.movePageTo(grids.s.id[0], Number(pageNum));
        },
    },

    t: {
        basicTrigger() {
            /* 0번그리드 내의 셀 클릭시 이벤트 */
            AUIGrid.bind(grids.s.id[0], 'cellClick', function (e) {
                location.href = `./${wares.boardType}view?id=` + e.item.id + '&prevPage=' + wares.page
                    + '&prevNtTitle=' + wares.ntTitle + '&prevFilterFromDt=' + wares.filterFromDt
                    + '&prevFilterToDt=' + wares.filterToDt;
            });

            AUIGrid.bind(grids.s.id[0], "pageChange", function(e) {
                wares.page = e.currentPage;
            });
        }
    }
};

/* 이벤트를 s : 설정하거나 r : 해지하는 함수들을 담는다. 그리드 관련 이벤트는 grids.e에 위치 (trigger) */
const trigs = {
    s: { // 이벤트 설정
        basicTrigger() {
            $('#searchBtn').on('click', function () {
                mainSearch();
            });

            $('#ntTitle').on('keypress', function (e) {
                if(e.originalEvent.code === 'Enter' || e.originalEvent.code === 'NumpadEnter') {
                    mainSearch();
                }
            });
        }
    },
    r: { // 이벤트 해제

    }
};

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    url: window.location.href,
    params: '', // url에 내포한 파라메터들을 담는다.
    page: 1, // 현재 페이지
    ntTitle: '',
    filterFromDt: '',
    filterToDt: '',

    boardType: '',
    notice: {
        title: '공지사항',
        idKeyName: 'ntId',
    },
};

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    grids.f.initialization();
    enableDatepicker();
    getParams();
    setInputs();

    grids.f.create();
    grids.t.basicTrigger();
    trigs.s.basicTrigger();

    comms.getList();
}

function getParams() {
    const url = new URL(wares.url);
    const tokenedPath = url.pathname.split('/');
    const lastUrl = tokenedPath[tokenedPath.length - 1];
    wares.boardType = lastUrl.substring(0, lastUrl.length - 4);
    wares.params = url.searchParams;

    if(wares.params.has('page')) {
        wares.page = wares.params.get('page');
    } else {
        wares.page = '1';
    }

    if(wares.params.has('filterFromDt')) {
        wares.filterFromDt = wares.params.get('filterFromDt');
    } else {
        wares.filterFromDt = $('#filterFromDt').val();
    }

    if(wares.params.has('filterToDt')) {
        wares.filterToDt = wares.params.get('filterToDt');
    } else {
        wares.filterToDt = $('#filterToDt').val();
    }

    if(wares.params.has('ntTitle')) {
        wares.ntTitle = wares.params.get('ntTitle');
    } else {
        wares.ntTitle = '';
    }
}

function setInputs() {
    if(wares.filterFromDt) {
        $('#filterFromDt').val(wares.filterFromDt);
    }
    if(wares.filterToDt) {
        $('#filterToDt').val(wares.filterToDt);
    }
    if(wares.ntTitle) {
        $('#ntTitle').val(wares.ntTitle);
    }
    $('#boardTitle').html(wares[wares.boardType].title);
    $('#boardLink').attr('href', `./${wares.boardType}list`);
    $('#writeLink').attr('href', `./admin/${wares.boardType}write?prevPage=` + wares.page
        + '&prevNtTitle=' + wares.ntTitle + '&prevFilterFromDt=' + wares.filterFromDt + '&prevFilterToDt='
        + wares.filterToDt);

    if (isAdmin()) {
        $('#writeLink').show();
    }
}


function mainSearch() {
    wares.ntTitle = $('#ntTitle').val();
    wares.filterFromDt = $('#filterFromDt').val();
    wares.filterToDt = $('#filterToDt').val();
    wares.page = 1;
    comms.getList();
}

function enableDatepicker() {
    /* datepicker를 적용시킬 대상들의 dom id들 */
    const datePickerTargetIds = [
        'filterFromDt', 'filterToDt'
    ];

    const dateAToBTargetIds = [
        ['filterFromDt', 'filterToDt']
    ];

    CommonUI.setDatePicker(datePickerTargetIds);
    CommonUI.restrictDateAToB(dateAToBTargetIds);
}

function isAdmin() {
    let name = "teamcode=";
    let ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let cookieValue = c.substring(name.length, c.length);
            return cookieValue === 'T00001';
        }
    }
    return false;
}