/* 서버 API와 주고 받게 될 데이터 정의
* 's' 문자형, 'n' 숫자형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
* 조합하여 'sr', 'nr' 같은 형식도 가능
* 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
* */
const dtos = {
    send: {
        getPost: {
        },
        lostNoticeDelete: {
            htId: 'n',
        },
    },
    receive: {
        getPost: {
            fileList: {
                id: 'n',
                ntFilePath: 's',
                ntFileName: 's',
                ntFileRealname: 's',
            },
            ntContents: 's',
            ntTitle: 's',
            ntYyyymmdd: 's',
            username: 's',
        },
    },
};

/* 통신에 사용되는 url들 기입 */
const urls = {
    notice: '/api/notice/view',
    noticeDeletePost: '/api/notice/delete',
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    getData(condition) {
        dtos.send.getPost[wares[wares.boardType].idKeyName] = 'n'; // 게시판마다 id가 다르므로 dtos의 항목도 동적 추가
        dv.chk(condition, dtos.send.getPost, '읽어올 게시물의 아이디 보내기');
        dtos.receive.getPost[wares[wares.boardType].idKeyName] = 'n'; // 받는 dtos도 위와 마찬가지
        CommonUI.ajax(urls[wares.boardType], 'GET', condition, function (res) {
            const data = res.sendData[wares[wares.boardType].dataKeyName];
            if (!data.ntYyyymmdd) {
                alertCancel('없거나 사라진 게시물 입니다.');
                $("#successBtn").on('click', function () {
                    location.href = $('.listLink').first().attr('href');
                });
                return;
            }
            dv.chk(data, dtos.receive.getPost, '받아온 게시물');
            setFields(data);
        });
    },

    deletePost(target) {
        dv.chk(target, dtos.send.lostNoticeDelete, '삭제할 글 아이디 보내기');
        CommonUI.ajax(urls[wares.boardType + 'DeletePost'], 'PARAM', target, function () {
            alertSuccess('글을 삭제 하였습니다.');
            $('#successBtn').on('click', function () {
                location.href = $('.listLink').first().attr('href');
            });
        });
    },
};

/* 이벤트를 s : 설정하거나 r : 해지하는 함수들을 담는다. 그리드 관련 이벤트는 grids.e에 위치 (trigger) */
const trigs = {
    basic() {
        $('.deleteBtn').on('click', function () {
            alertCheck('정말 삭제하시겠습니까?');
            $('#checkDelSuccessBtn').on('click', function () {
                const target = {
                };
                target[wares[wares.boardType].idKeyName] = parseInt(wares.id, 10);
                comms.deletePost(target);
                $('#popupId').remove();
            });
            $('#checkDelCancelBtn').on('click', function () {
                $('#popupId').remove();
            });
        });
    },
};

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    url: window.location.href,
    id: '', // 글의 아이디
    params: '',
    page: '',
    ntTitle: '',
    filterFromDt: '',
    filterToDt: '',

    boardType: '', // 아래 게시판 종류의 이름이 담길 곳
    /* 게시판 종류에 따른 데이터들 */
    notice: {
        idKeyName: 'ntId',
        dataKeyName: 'noticeViewDto',
    },
};

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
    $("#header_one").addClass(' show');
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    getParams();
    setInputs();

    let condition = {};
    condition[wares[wares.boardType].idKeyName] = parseInt(wares.id, 10);
    comms.getData(condition);

    trigs.basic();
}

function getParams() {
    let fromday = new Date();
    fromday.setDate(fromday.getDate() - 365);
    fromday = fromday.format('yyyy-MM-dd');
    const today = new Date().format('yyyy-MM-dd');

    const url = new URL(wares.url);
    const tokenedPath = url.pathname.split('/');
    const lastUrl = tokenedPath[tokenedPath.length - 1];
    wares.boardType = lastUrl.substring(0, lastUrl.length - 4);
    wares.params = url.searchParams;

    if(wares.params.has('id')) {
        wares.id = parseInt(wares.params.get('id'), 10);
    } else {
        wares.id = 0;
    }

    if(wares.params.has('prevPage')) {
        wares.page = wares.params.get('prevPage');
    } else {
        wares.page = '1';
    }

    if(wares.params.has('prevNtTitle')) {
        wares.ntTitle = wares.params.get('prevNtTitle');
    } else {
        wares.ntTitle = '';
    }

    if(wares.params.has('prevFilterFromDt')) {
        wares.filterFromDt = wares.params.get('prevFilterFromDt');
    } else {
        wares.filterFromDt = fromday;
    }

    if(wares.params.has('prevFilterToDt')) {
        wares.filterToDt = wares.params.get('prevFilterToDt');
    } else {
        wares.filterToDt = today;
    }
}

function setInputs() {
    $('.listLink').attr('href', `./${wares.boardType}list?page=` + wares.page
        + '&ntTitle=' + wares.ntTitle + '&filterFromDt=' + wares.filterFromDt + '&filterToDt='
        + wares.filterToDt);

    $('.modifyLink').attr('href', `./admin/${wares.boardType}write?prevPage=` + wares.page
        + '&id=' + wares.id + '&prevNtTitle=' + wares.ntTitle + '&prevFilterFromDt=' + wares.filterFromDt
        + '&prevFilterToDt=' + wares.filterToDt);
}

function setFields(data) {
    $('#ntTitle').html(data.ntTitle);
    $('#userName').html(data.username);
    $('#ntYyyymmdd').html(data.ntYyyymmdd.substring(0, 4) + '-' + data.ntYyyymmdd.substring(4, 6) + '-'
        + data.ntYyyymmdd.substring(6, 8));
    $('#ntContents').html(data.ntContents);

    if (isAdmin()) {
        $('.modifyLink').show();
        $('.deleteBtn').show();
    }

    for(const file of data.fileList) {
        const element = `
            <li>
                <a href='${file.ntFilePath + file.ntFileName}' class='board-view__file' download>
                    <span class='board-view__filename'>${file.ntFileRealname}</span>
                </a>
            </li>
        `;

        $('#fileList').append(element);
    }
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