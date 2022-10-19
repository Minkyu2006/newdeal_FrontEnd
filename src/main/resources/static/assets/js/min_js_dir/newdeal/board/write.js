/* 서버 API와 주고 받게 될 데이터 정의
* 's' 문자형, 'n' 숫자형, 'a' 배열형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
* 조합하여 'sr', 'nr' 같은 형식도 가능
* 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
* */
const dtos = {
    send: {
        getPost: {
        },
        save: { // 이번만은 예외적으로 게시판의 id 요소가 숨어있다. 또한 삭제할 파일의 아이디리스트를 다루는 항목 추가 예정,
            ntId: '', // 존재할 경우 수정작업, 빈 문자일 경우 새 글 작성이 된다.
            ntTitle: 's', // 제목
            ntContents: 's', // 내용
            multipartFileList: '', // 업로드할 파일들이 input type='file' multiple 과 같은 형태로 올라간다.
            deleteFileList: '', // 지울 파일들의 id 리스트
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
    noticeget: '/api/notice/view',
    noticesave: '/api/notice/save',
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    getData(condition) {
        dtos.send.getPost[wares[wares.boardType].idKeyName] = 'n'; // 게시판마다 id가 다르므로 dtos의 항목도 동적 추가
        dv.chk(condition, dtos.send.getPost, '읽어올 게시물의 아이디 보내기');
        CommonUI.ajax(urls[wares.boardType + 'get'], 'GET', condition, function (res) {
            dtos.receive.getPost[wares[wares.boardType].idKeyName] = 'n'; // 받는 dtos도 위와 마찬가지
            const data = res.sendData[wares[wares.boardType].dataKeyName];
            console.log(data);
            dv.chk(data, dtos.receive.getPost, '받아온 게시물');
            setFields(data);
        });
    },

    save(formData) {
        const jsonFormData = Object.fromEntries(formData);
        dv.chk(jsonFormData, dtos.send.save, '글쓰기 데이터 보내기');
        CommonUI.ajax(urls[wares.boardType + 'save'], 'POST', formData, function (res) {
            alertSuccess('저장이 완료되었습니다.');
            $('#successBtn').on('click', function () {
                if(wares.id) {
                    location.href = $('#previousLink').attr('href');
                } else {
                    location.href = `../${wares.boardType}view?prevPage=`
                        + wares.page + '&id=' + res.sendData.id;
                }
            });
        });
    },
};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {
        $('#fileSelector').on('change', function () {
            addFile();
        });

        $('#saveBtn').on('click', function () {
            saveProgress();
        });

        $('#fileListBtn').on('click', function () {
            $('#fileListPanel').toggleClass('active');
        });
    },
};

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    url: window.location.href,
    dataTransfer: new DataTransfer(),
    existFileList: [],
    boardType: '',
    id: 0,
    params: '',
    page: '',
    ntTitle: '',
    filterFromDt: '',
    filterToDt: '',
    totCnt: 0,
    existTotCnt: 0,
    notice: {
        idKeyName: 'ntId',
        dataKeyName: 'noticeViewDto',
        masterKeyName: 'ntId',
        commentKeyName: '',
    },
    deleteFileList: [], // 서버에 올라가 있는 지울 파일들의 id 리스트
};

$(function() { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
function onPageLoad() {
    trigs.basic();
    getParams();
    setInputs();

    summernoteInit();
    if(wares.id) { // 글의 id가 왔다는 것은 글이 새글쓰기가 아닌 수정모드임을 의미한다.
        const condition = {};
        condition[wares[wares.boardType].idKeyName] = parseInt(wares.id, 10);
        comms.getData(condition);
    }
}

function getParams() {
    const url = new URL(wares.url);
    const tokenedPath = url.pathname.split('/');
    const lastUrl = tokenedPath[tokenedPath.length - 1];
    wares.boardType = lastUrl.substring(0, lastUrl.length - 5);
    wares.params = url.searchParams;

    if(wares.params.has('id')) {
        wares.id = wares.params.get('id');
    }

    if(wares.params.has('prevPage')) {
        wares.page = wares.params.get('prevPage');
    } else {
        wares.page = '1';
    }

    if(wares.params.has('prevFilterFromDt')) {
        wares.filterFromDt = wares.params.get('prevFilterFromDt');
    }

    if(wares.params.has('prevFilterToDt')) {
        wares.filterToDt = wares.params.get('prevFilterToDt');
    }

    if(wares.params.has('prevNtTitle')) {
        wares.ntTitle = wares.params.get('prevNtTitle');
    }
}

function setInputs() {
    if(wares.id) {
        $('#previousLink').attr('href', `../${wares.boardType}view?prevPage=` + wares.page + '&id=' + wares.id
            + '&prevNtTitle=' + wares.ntTitle + '&prevFilterFromDt='
            + wares.filterFromDt + '&prevFilterToDt=' + wares.filterToDt);
    } else {
        $('#previousLink').attr('href', `../${wares.boardType}list?page=` + wares.page
            + '&ntTitle=' + wares.ntTitle + '&filterFromDt=' + wares.filterFromDt
            + '&filterToDt=' + wares.filterToDt);
    }
}

function summernoteInit() {
    $('#summernote').summernote({
        height: 530,
        minHeight: null,
        maxHeight: null,
        focus: true,
        lang: 'ko-KR',
    });
}

function addFile() {
    const files = $('#fileSelector')[0].files;
    for(const file of files) {
        wares.dataTransfer.items.add(file);
    }
    refreshFileList();
    $('#fileListPanel').addClass('active');
}

function saveProgress() {
    const ntTitle = $('#ntTitle').val();
    if(!ntTitle) {
        alertCaution('제목을 입력해 주세요.', 1);
        return;
    }

    const formData = new FormData();
    formData.set('ntTitle', ntTitle);
    formData.set('ntContents', $('#summernote').summernote('code'));

    if(wares.id) {
        formData.set('ntId', wares.id);
    }

    if(wares.dataTransfer.files.length) {
        for(const file of wares.dataTransfer.files) {
            formData.append('multipartFileList', file, file.name);
        }
    }

    if(wares.deleteFileList.length) {
        formData.append('deleteFileList', wares.deleteFileList);
    }

    comms.save(formData);
}

function refreshFileList() {
    $('#fileList').html('');

    /* 이미 서버에 존재하는 첨부 파일들의 리프래시 */
    for(let i = 0; i < wares.existFileList.length; i++) {
        $('#fileList').append(`
            <li>
                <div class='board__upload-file-item'>
                    <span class='board__upload-filename'>${wares.existFileList[i].ntFileRealname}</span>
                    <button type='button' class='board__upload-delete'
                        onclick='removeExistFile(${i})'>삭제</button>
                </div>
            </li>
        `);
    }

    /* 새로 추가되는 첨부 파일들의 리프래시 */
    for(let i = 0; i <wares.dataTransfer.files.length; i++) {
        $('#fileList').append(`
            <li>
                <div class='board__upload-file-item'>
                    <span class='board__upload-filename'>${wares.dataTransfer.files[i].name}</span>
                    <button type='button' class='board__upload-delete' onclick='removeFile(${i})'>삭제</button>
                </div>
            </li>
        `);
    }
    calculateFileStatus();
}

function calculateFileStatus() {
    /* 서버에 존재하는 파일 - 삭제예정인 파일의 카운팅 */
    let existCnt = 0;

    for(const file of wares.existFileList) {
        existCnt++;
    }

    wares.existTotCnt = existCnt;

    /* 새로 추가한 파일의 카운팅 */
    let cnt = 0;

    for(const file of wares.dataTransfer.files) {
        cnt++;
    }

    wares.totCnt = cnt;

    $('#fileCnt').html(wares.totCnt + wares.existTotCnt);
}

function removeFile(index) {
    const dt = new DataTransfer();
    const files = wares.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) {
            dt.items.add(file);
        }
    }

    wares.dataTransfer = dt;
    refreshFileList();
}

function setFields(data) {
    $('#ntTitle').val(data.ntTitle);
    $('#summernote').summernote('code', data.ntContents);

    wares.existFileList = data.fileList;
    refreshFileList();
}

function removeExistFile(index) {
    wares.deleteFileList.push(wares.existFileList[index].id);

    const newFileList = [];
    const files = wares.existFileList;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) {
            newFileList.push(file);
        }
    }

    wares.existFileList = newFileList;
    refreshFileList();
}
