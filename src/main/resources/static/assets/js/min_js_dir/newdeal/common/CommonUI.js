/*
* 자주 쓰이는 UI용 함수를 모듈화
* CommonUI.기능 으로 호출하여 사용
*
* 제작 : 성낙원
* 도입 : 2022-04-06
* */
class CommonUIClass {
    name = {};

    constructor() {
        /* 숫자만 남긴 후 인트형으로 전환 */
        String.prototype.toInt = function () {
            return this.toString() ? parseInt(this.replace(/[^0-9-]/g, "")) : 0;
        }

        /* 0~9까지만 남긴 문자를 반환, 앞자리가 0으로 시작할 수 있음. */
        String.prototype.numString = function () {
            return this.toString() ? this.replace(/[^0-9]/g, "") : "";
        }

        String.prototype.toDecimal = function () {
            return !isNaN(parseFloat(this)) ? parseFloat(this) : 0;
        }

        $('.pop__close').on('click', function(e) {
            $('.pop').removeClass('open');
        })

        this.auiGridFunc();
        this.nameList();
    }

    nameList() {
        this.name.sfForm = {
            "01": "RC 슬래브교",
            "02": "RC 라멘교",
            "03": "PSC I 거더교",
            "04": "강박스교c",
        };

        this.name.sfRank = {
            "01": "DB-24",
            "02": "DB-18",
            "03": "DB-13.5",
        };
    };

    /* AUIGrid 용 주요 기능의 공통 사용을 위함 */
    auiGridFunc() {
        window.gridFunc = {
            create() { // 그리드 동작 처음 빈 그리드를 생성
                for (const i in grids.s.columnLayout) {
                    AUIGrid.create(grids.s.id[i], grids.s.columnLayout[i], grids.s.prop[i]);
                }
            },

            get(gridNo) { // 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다.
                return AUIGrid.getGridData(grids.s.id[gridNo]);
            },

            set(gridNo, data) { // 해당 배열 번호 그리드의 url.read 를 참조하여 데이터를 그리드에 뿌린다.
                AUIGrid.setGridData(grids.s.id[gridNo], data);
            },

            clear(gridNo) { // 해당 배열 번호 그리드의 데이터 비우기
                AUIGrid.clearGridData(grids.s.id[gridNo]);
            },

            resize(gridNo) { // 해당 배열 번호 그리드의 크기를 현제 그리드를 감싼 엘리먼트에 맞춰 조절
                AUIGrid.resize(grids.s.id[gridNo]);
            },

            getSelectedItem(gridNo) {
                const selected = AUIGrid.getSelectedItems(grids.s.id[gridNo]);
                if(selected.length) {
                    return selected[0].item;
                }
                return "";
            },

            addRow(gridNo, data = {}) {
                AUIGrid.addRow(grids.s.id[gridNo], data, "last");
            },

            removeRow(gridNo, rowIndex = "selectedIndex") {
                AUIGrid.removeRow(grids.s.id[gridNo], rowIndex);
            },

            getChangedItems(gridNo) {
                const changedItems = {
                    add: AUIGrid.getAddedRowItems(grids.s.id[gridNo]),
                    update: AUIGrid.getEditedRowItems(grids.s.id[gridNo]),
                    delete: AUIGrid.getRemovedItems(grids.s.id[gridNo]),
                };
                return changedItems;
            },
        }
    };

    /*
    * 배열에 담긴 DOM ID들에 JqueryUI의 datepicker 를 적용한다.
    * 기본 데이터 포맷 = yy-mm-dd
    * */
    setDatePicker(targetIdArray, dateFormat = "yy-mm-dd") {
        for (const targetId of targetIdArray) {
            const $target = $("#"+targetId);
            $target.datepicker({
                dateFormat: dateFormat,
            });

            $target.on("keyup", function () {
                const numValue = $target.val().numString().substring(0, 8);
                let formattedValue = "";
                if(numValue.length > 6) {
                    formattedValue = numValue.substring(0, 4) + "-" + numValue.substring(4, 6)
                        + "-" + numValue.substring(6, 8);
                } else if(numValue.length > 4) {
                    formattedValue = numValue.substring(0, 4) + "-" + numValue.substring(4, 6);
                } else {
                    formattedValue = numValue;
                }
                $target.val(formattedValue);
            });
        }
    }

    /*
    * datepicker A에서 B까지의 기간을 설정할 때 서로간의 입력 날자를 제한한다.
    * targetIdArray = [ ['from대상id1', 'to대상id2'], ['from대상id1', 'to대상id2'], .... ]
    * */
    restrictDateAToB(targetIdArray) {
        for(let i = 0; i < targetIdArray.length; i++) {
            for(let j = 0; j < targetIdArray[i].length; j++) {
                $("#"+targetIdArray[i][j]).on("change", function() {
                    CommonUI.restrictDate(targetIdArray[i][0], targetIdArray[i][1], j);
                });
                this.restrictDate(targetIdArray[i][0], targetIdArray[i][1], j);
            }
        }
    }

    /*
    * restrictDateAToB 와 연동되거나 단독 사용되는 함수.
    * ~부터의 Id, ~까지의  Id, 함수를 부르는 객체가 ~까지의 객체인지를 판단하여 지정해 준다.
    * Element에 걸린 datepicker 속성을 수정하여 날짜 최소범위, 최대범위를 지정한다.
    * */
    restrictDate(fromId, toId, isCallerTo) {
        if(isCallerTo) {
            $("#"+fromId).datepicker("option", "maxDate", $("#"+toId).val());
            $("#ui-datepicker-div").hide();
        }else{
            $("#"+toId).datepicker("option", "minDate", $("#"+fromId).val());
            $("#ui-datepicker-div").hide();
        }
    }

    /* 국내 전화 번호 양식화, 적절한 위치에 - 추가, 최종 형태 잡을 때도, 입력할 때 마다 쓸 수도 있음 */
    formatTel(telNumber, privacyMode = false) {
        let formatNum = "";
        if(telNumber) {
            telNumber = telNumber.numString();
        } else {
            telNumber = "";
        }
        const telLength = telNumber.length;
        
        let foreNumType;
        const testForeCode = telNumber.substring(0, 3);
        if(testForeCode.substring(0, 2) === "02") {
            foreNumType = 2;
        } else if(parseInt(testForeCode) > 129 && parseInt(testForeCode) < 200) {
            foreNumType = 4;
        } else if(testForeCode === "014") {
            foreNumType = 5;
        } else {
            foreNumType = 3;
        }

        let midNum;
        let backNum;

        const foreNum = telNumber.substring(0, foreNumType);
        if(telLength < 8 + foreNumType && foreNumType !== 4) {
            if(privacyMode) {
                midNum = "***";
            } else {
                midNum = telNumber.substring(foreNumType, foreNumType + 3);
            }
            backNum = telNumber.substring(foreNumType + 3, telLength);
        } else {
            if(privacyMode) {
                midNum = "****";
            } else {
                midNum = telNumber.substring(foreNumType, foreNumType + 4);
            }
            backNum = telNumber.substring(foreNumType + 4, telLength);
        }

        if(backNum) {
            formatNum = foreNum + "-" + midNum + "-" + backNum;
        } else if (midNum) {
            formatNum = foreNum + "-" + midNum;
        } else if (foreNum) {
            formatNum = foreNum;
        } else {
            formatNum = telNumber;
        }

        return formatNum;
    }

    /* 사업자 번호 양식화, 숫자 10자리, 적절한 위치에 - 추가, 최종 형태 잡을 때도, 입력할 때 마다 쓸 수도 있음 */
    formatBusinessNo(businessNum) {
        let formatNum = "";
        businessNum = businessNum.numString();

        const foreNum = businessNum.substring(0, 3);
        const midNum = businessNum.substring(3, 5);
        const backNum = businessNum.substring(5, 10);

        if (backNum) {
            formatNum = foreNum + "-" + midNum + "-" + backNum;
        } else if (midNum) {
            formatNum = foreNum + "-" + midNum;
        } else if (foreNum) {
            formatNum = foreNum;
        }

        return formatNum;
    }

    /* ajax 통신의 자주 쓰는 패턴을 간단하게 쓰기 위함
    * (apiUrl, 통신방식(혹은 컨트롤러에서 받는 방식), 보낼데이터, 성공시 콜백, 실패시 콜백)
    * */
    ajax(url, method, data, successFn = function () {}, errorFn = function () {}) {
        /* 토근 관련 인증 부분 */
        JWT_Get();
        if (accessToken == null && refreshToken == null && insert_id == null) {
            alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
        }

        $(document).ajaxSend(function (e, xhr) {
            xhr.setRequestHeader("JWT_AccessToken", accessToken);
            xhr.setRequestHeader("insert_id",insert_id);
        });

        /* 나머지 ajax 상호작용 */
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + url; // 호출할 백엔드 API
        if(data) {
            switch (method) {
                case "GET" :
                    $.ajax({
                        url: url,
                        type: 'GET',
                        cache: false,
                        traditional: true,
                        data: data,
                        error: errorResponse,
                        success: successResponse,
                    });
                    break;

                case "POST" :
                case "PUT" :
                case "DELETE" :
                    $.ajax({
                        url: url,
                        type: method,
                        cache: false,
                        data: data,
                        processData: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        error: errorResponse,
                        success: successResponse,
                    });
                    break;

                case "MAPPER" :
                    $.ajax({
                        url: url,
                        type: "POST",
                        cache: false,
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        error: errorResponse,
                        success: successResponse,
                    });
                    break;

                case "PARAM" :
                    $.ajax({
                        url: url,
                        data : data,
                        type : 'post',
                        cache:false,
                        traditional: true,
                        error: errorResponse,
                        success: successResponse,
                    });
                    break;
            }
        }else{
            switch (method) {
                case "GET" :
                    $.ajax({
                        url: url,
                        type: method,
                        cache: false,
                        error: errorResponse,
                        success: successResponse,
                    });
                    break;
            }
        }

        function successResponse(res) {
            if (res.status === 200) {
                return successFn(res);
            } else {
                if (res.err_msg2 === null && res.err_msg) {
                    alertCancel(res.err_msg);
                } else {
                    alertCancel(res.err_msg + "<br>" + res.err_msg2);
                }
                console.log(res);
                return errorFn(res);
            }
        }

        function errorResponse(res) {
            if (res.status === 500) {
                // console.log("request.status : " + request.status + " => 500에러");
                alertCaution("500에러 다시 로그인 해주세요.", 2);
            } else if (res.status === 404) {
                // console.log("request.status : " + request.status + " => 404에러");
                alertCaution("404에러 다시 로그인 해주세요.", 2);
            }
            console.log(res);
        }
    }
}

let CommonUI = new CommonUIClass();