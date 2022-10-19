import {OldnessCalculation} from './oldnessCalculation.js';

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
    /**
     * 교량과 노후도 평가를 위해 입력했던 데이터를 불러온다.
     * @param targetCondition : object - 대상 교량과 입력데이터 조건
     * @param successCall : function - 성공시 콜백
     */
    getOldnessBaseData(targetCondition, successCall) {
        CommonUI.ajax('/api/evaluation/input', 'GET', targetCondition, successCall);
    },

    /**
     * 노후도 곡선식 계수를 가져온다.
     * @param targetCondition : object - 대상조건
     * @param successCall : function - 성공시 콜백
     */
    getOldnessCurveFactor(targetCondition, successCall) {
        CommonUI.ajax('/api/evaluation/numericDataList', 'GET', targetCondition, successCall);
    },

    /**
     * 부재별 가중치를 가져온다.
     * @param targetCondition : object - 대상조건
     * @param successCall : function - 성공시 콜백
     */
    getMemberWeightValue(targetCondition, successCall) {
        CommonUI.ajax('/api/evaluation/weightDataList', 'GET', targetCondition, successCall)
    },

    /**
     * 곡선식을 가져온다.
     * @param successCall : function - 성공시 콜백
     */
    getCurveModifier(successCall) {
        CommonUI.ajax('/api/evaluation/functionDataList', 'GET', false, successCall);
    },
};

/* 이벤트를 설정하거나 해지하는 함수들을 담는다. */
const trigs = {
    basic() {

    },
}

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {

}

/**
 * 교량단위 노후도 평가 결과 게이지 화살표 위치 조정
 * @param elimentId : string - html내 게이지 컴포넌트의 id
 * @param year : number - 표시할 년도
 * @param value : number - 백분율단위 화살표의 위치
 */
const setGaugeArrowPosition = (elimentId, year, value) => {
    const $id = $('#' + elimentId);
    const $arrow = $id.children('.old-progress__bar-area').children('.old-progress__bar').children('.old-progress__arrow');
    const $resultContext = $id.children('.old-progress__head').children('.old-progress__result');

    $arrow.css('left', value + '%');
    $resultContext.children('.progress-year').html(year);
    $resultContext.children('.progress-percent-string').html(value);
}

/**
 * 부재별 노후도 평가 결과의 막대그래프의 막대높이를 설정한다.
 * @param barNum : int - 몇번째 막대인지 (1 ~ 5)
 * @param value : int - 막대의 값 (-100 ~ 100)
 */
const setBarChartHeight = (barNum, value) => {
    if (!Number.isInteger(barNum) || !Number.isInteger(value) || barNum === 0 || barNum > 5 || value < -100 || value > 100) {
        alert('setBarChartHeight 인자값에 문제가 있습니다.');
        return;
    }

    const plusElement = $(`#bar${barNum}Plus`);
    const minusElement = $(`#bar${barNum}Minus`);

    minusElement.css('top', '0px');
    minusElement.css('height', '0px');
    plusElement.css('height', '0px');

    if (value > 0) {
        plusElement.css('top', value * (-1) - 2 + 'px' );
        plusElement.css('height', value + 'px');
    } else if (value < 0) {
        minusElement.css('height', value * (-1) + 'px');
    }
}

/* 브라우저의 get 파라미터들을 가져오고 그에 따른 작업을 반영하기 위해 */
const getParamsAndAction = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if(params.has("niId")) {
        const niId = parseInt(params.get("niId"));
        if (niId) {
            const targetCondition = {
                niId: niId,
            }
            comms.getOldnessBaseData(targetCondition, (res) => {
                const data = res.sendData.data;
                console.log(res);
                wares.calculator.setBridgeAndInputData(data);
                getOldnessCurveFactor(data.niBr1, data.niAddr1);
            });
        }
    }
}

/**
 * 노후화 곡선식 계수를 가져온다.
 * @param niBr1 : string - 구조형식
 * @param niAddr1 : string - 지역1 (시도)
 */
const getOldnessCurveFactor = (niBr1, niAddr1) => {
    const targetCondition = {
        s_bridgeType: niBr1,
        s_location: niAddr1,
    }
    comms.getOldnessCurveFactor(targetCondition, (res) => {
        const data = res.sendData.gridListData;
        wares.calculator.setOldnessCurveFactor(data);
        getMemberWeightValue(niBr1);
    });
}

/**
 * 부재별 가중치를 가져온다.
 * @param niBr1 : string - 구조형식
 */
const getMemberWeightValue = (niBr1) => {
    const targetCondition = {
        s_bridgeType: niBr1,
    }
    comms.getMemberWeightValue(targetCondition, (res) => {
        const data = res.sendData.gridListData;
        wares.calculator.setmembersWeightValue(data);
        getCurveModifier();
    });
}

const getCurveModifier = () => {
    comms.getCurveModifier((res) => {
        const data = res.sendData.gridListData;
        wares.calculator.setCurveModifier(data);
        wares.calculator.goMath((result) => {
            console.log(result);
        });
        console.log('계산클래스', wares.calculator);
    });
}

$(() => { // 페이지가 로드되고 나서 실행
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
const onPageLoad = () => {
    trigs.basic();
    wares.calculator = new OldnessCalculation;
    getParamsAndAction();

    // 임시 코드
    setGaugeArrowPosition('progress01', 20.1, 50);
    setGaugeArrowPosition('progress02', 20.1, 60);
    setBarChartHeight(1, -78);
    setBarChartHeight(2, 60);
    setBarChartHeight(3, 30);
    setBarChartHeight(4, -12)
    setBarChartHeight(5, 0);
}