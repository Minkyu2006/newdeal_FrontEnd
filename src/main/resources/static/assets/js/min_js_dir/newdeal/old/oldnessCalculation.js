/**
 * 노후도 평가 및 예측
 */
class OldnessCalculation {
    bridgeInputData; // 선택된 교량 및 입력 정보
    oldnessCurveFactor; // 선택된 교량의 노후도 곡선식 계수
    membersWeightValue; // 선택된 교량의 부재별 가중치
    curveModifier; // 곡선식

    calculatedOldnessSheet;

    constructor() {
        this.calculatedOldnessSheet = {};
    }

    /**
     * 선택된 교량 정보와 입력 정보를 가공, 설정한다.
     * @param bridgeInputData : object
     */
    setBridgeAndInputData(bridgeInputData) {
        this.bridgeInputData = bridgeInputData;
    }

    /**
     * 선택된 교량의 노후화 곡선식 계수를 가공, 설정한다.
     * @param oldnessCurveFactor : object
     */
    setOldnessCurveFactor(oldnessCurveFactor) {

        const refinedData = {};
        for (const part of oldnessCurveFactor) {
            refinedData[part.nnEvaluationType] = {};
            refinedData[part.nnEvaluationType].a = part.nnE1;
            refinedData[part.nnEvaluationType].b = part.nnE2;
            refinedData[part.nnEvaluationType].c = part.nnE3;
            refinedData[part.nnEvaluationType].marginalFactor = part.nnE4;
            refinedData[part.nnEvaluationType].weightFactor = part.nnE5;
            refinedData[part.nnEvaluationType].weightFactor2 = part.nnE6;
        }

        this.oldnessCurveFactor = refinedData;
    }

    /**
     * 선택 교량의 부재별 가중치를 가공, 설정한다.
     * @param membersWeightValue : object
     */
    setmembersWeightValue(membersWeightValue) {
        this.membersWeightValue = membersWeightValue;
    }

    /**
     * 곡선식을 가공, 설정한다.
     * @param curveModifier : object
     */
    setCurveModifier(curveModifier) {
        this.curveModifier = curveModifier;
    }

    /**
     * 노후도 평가를 계산하고, 페이지에 표현이 필요한 요소들을 담아 콜백을 실행한다.
     * @param callBack : function
     */
    goMath(callBack) {
        // 예외사항시 경고 및 중단 로직 추가
        const result = {};
        console.log('계산결과', this.calculateCurrentState());

        callBack(result);
    }

    calculateCurrentState() {

        /**
         * 바닥판 1-1 부터 3-2 까지의 표준화값을 구하기 위한 함수
         * @param inputValue : number
         * @param damagingIndex : int - 곡선식 시트 데이터의 몇 번째 열화 항목인지를 표시
         * @returns number
         */
        const plateStandardization = (inputValue, damagingIndex) => {
            return inputValue / this.bridgeInputData.niBrLength
                + this.curveModifier[this.bridgeInputData.niBrAging - 1]['a' + damagingIndex + 'de'];
        }

        const abutmentStandardization = (inputValue, damagingIndex) => {
            return inputValue / (2 * this.bridgeInputData.niBrHeight)
                + this.curveModifier[this.bridgeInputData.niBrAging - 1]['d' + damagingIndex + 'de'];
        }

        const pierStandardization = (inputValue, damagingIndex) => {
            return inputValue / ((this.bridgeInputData.niBrPCnt - 1) * this.bridgeInputData.niBrHeight)
                + this.curveModifier[this.bridgeInputData.niBrAging - 1]['c' + damagingIndex + 'de'];
        }

        const oldness = () => {
            const memberAlphabet = ['A', 'C', 'D'];
            const targetList = ['1-1', '1-2', '1-3', '2-1', '3-1', '3-2', '4-1', '4-2', '4-3'];

        }

        const chalkBoard = {
            year: 0,
            oldness: 0,
            plate: { // 바닥판
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA12, 2),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA13, 3),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA21, 4),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA31, 5),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: plateStandardization(this.bridgeInputData.niA32, 7),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: this.bridgeInputData.niA41,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: this.bridgeInputData.niA42,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: this.bridgeInputData.niA43,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
            abutment: { // 교대
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD12, 2),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD13, 3),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD21, 4),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD31, 5),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: abutmentStandardization(this.bridgeInputData.niD32, 7),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: this.bridgeInputData.niD41,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: this.bridgeInputData.niD42,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: this.bridgeInputData.niD43,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
            pier: { // 교각
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC11, 1),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC31, 5),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: pierStandardization(this.bridgeInputData.niC32, 7),
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: this.bridgeInputData.niC41,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: this.bridgeInputData.niC42,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: this.bridgeInputData.niC43,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
        };



        return chalkBoard;
    }

    calculateFutureState(yearsLater) {
        const chalkBoard = {
            year: 0,
            oldness: 0,
            plate: { // 바닥판
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
            abutment: { // 교대
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
            pier: { // 교각
                memberOldness: 0,
                memberModifier: 0,
                1: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                2: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                },
                3: {
                    oldnessAge2: 0,
                    moduleModifier2: 0,
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        moduleModifier: 0,
                    },
                    4: {
                        moduleModifier: 0,
                    },
                },
                4: {
                    1: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    2: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                    3: {
                        standardizationValue: 0,
                        oldnessValue: 0,
                        oldnessAge: 0,
                        moduleModifier: 0,
                    },
                }
            },
        };
        return chalkBoard;
    }
}

export {OldnessCalculation};