/*
 * 서버 API와 주고 받게 될 데이터 정의
 * 's' 문자형, 'n' 숫자형, 'a' 배열형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
 * 조합하여 'sr', 'nr' 같은 형식도 가능
 * 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
 */
const dtos = {
    send: {
        list: {
            stBridge: 's',
        },
    },
    receive: {
        list: {
            stId: 'n',
            stBridge: 's',
            stCoordinateX: 'n',
            stCoordinateY: 'n',
            stLocation1: 's',
            stLocation2: 's',
            stFreeze: 'n',
            stSnow: 'n',
        },
    },
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    // 교량 정보 가져오기
    getBrideData(bridgeName) {
        CommonUI.ajax('/api/salt/list', 'GET', bridgeName, function(res) {
            const data = res.sendData.gridListData;
            const bridgeNumber = data.length;
            if (bridgeNumber == 0) {
                // 검색어와 일치하는 교량이 없을 때, '교량이 없습니다' 메세지 출력
                alertCaution('찾으시는 교량이 없습니다.', 1);
                return false;
            } else if(bridgeNumber == 1) {
                // 검색어와 일치하는 교량이 1개 일 때, 해당 교량 정보 출력
                setEnvData(data[0]);
            } else {
                // 검색어와 일치하는 교량이 2개 이상일 때, 교량 선택 팝업 열기
                openPopSelectBridge(data);
            };
        })
    }
};

/*
*  .s : AUI 그리드 관련 설정들, 같은 번호의 배열에 있는 요소들 끼리 철저하게 연동한다는 원칙을 따른다.
*  .f : 그리드 관련 함수들 배치
* */
const grids = {
    /* 그리드 세팅 */
    s: {
        id: [
            'grid_main',
        ],
        columnLayout: [],
        prop: [],
    },

    /* 그리드 펑션 */
    f: {
        /* 가시성을 위해 grids.s 의 일부 요소를 여기서 선언한다. */
        initialization() {

            /* 0번 그리드의 레이아웃 */
            grids.s.columnLayout[0] = [
                {
                    dataField: 'stBridge',
                    headerText: '교량명',
                }, {
                    dataField: 'stLocation1',
                    headerText: '소재지1',
                }, {
                    dataField: 'stLocation2',
                    headerText: '소재지2',
                }, {
                    dataField: 'stFreeze',
                    headerText: '동결융해',
                }, {
                    dataField: 'stSnow',
                    headerText: '제설제',
                }, {
                    dataField: 'stSalt',
                    headerText: '비래염분',
                }, {
                    dataField: 'selectBridge',
                    headerText: '교량선택',
                    renderer: {
                        type: 'TemplateRenderer',
                    },
                    labelFunction(rowIndex, columnIndex, value, headerText, item) {
                        return `
							<button class='c-button c-button--solid  c-button--supersmall'>선택</button>
						`;
                    },
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
                enableColumnResize : true,
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
        AUIGrid.bind(grids.s.id[0], 'cellClick', function (e) {
            if(e.dataField === 'selectBridge') {
                $('#popSelectBridge').removeClass('open');
                setEnvData(e.item);
            }
        });

        // 교량명 검색 엔터 동작
        $('#bridgeName').on('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                $('#searchBridge').click();
            }
        });

        // 교량명 검색 버튼 동작
        $('#searchBridge').on('click', function() {
            sendBridge();
        });

        //  팝업 닫기
        $('.popclose').on('click', function(e) {
            $(this).parents('.l-popup').removeClass('open');
        });
    },
};

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    bridgeInfo: {

    },
};

// 교량 검색어 보내기
function sendBridge() {
    const $searchKeyword = $('#bridgeName').val()
    if ($searchKeyword.length == 0) {
        // 교량이 없습니다 메세지 출력
        alertCaution('검색어가 입력되지 않았습니다.', 1)
        return false;
    };
    const bridgeName = {
        stBridge: $searchKeyword,
    }
    comms.getBrideData(bridgeName);
}

// 교량 선택 팝업 열기
function openPopSelectBridge(data) {
    $('#popSelectBridge').addClass('open');
    grids.f.set(0, data);
    grids.f.resize(0);
}

// 교량 정보
function setEnvData(data) {
    const bridge = data.stBridge;
    const x = data.stCoordinateX;
    const y = data.stCoordinateY;
    const freeze = data.stFreeze;
    const snow = data.stSnow;
    let freezeLevel;
    let snowLevel;

    // 교량의 위치정보가 없을 때
    if (x === "" && y === "" || freeze === "0" && snow === "0" && salt === "0") {
        alertCaution('해당 교량의 환경조건 정보와 위치정보가 없습니다.', 1);
        return false;
    }

    // 동결융해 등급 산정
    if (3 > freeze) {
        freezeLevel = 'a';
    } else if (50 > freeze && freeze >= 3) {
        freezeLevel = 'b';
    } else {
        freezeLevel = 'c';
    }

    // 제설제 등급 산정
    if (7 > snow) {
        snowLevel = 'a';
    } else if (14 > snow && snow >= 7) {
        snowLevel = 'b';
    } else {
        snowLevel = 'c';
    }


    // 교량정보 임시저장
    wares.bridgeInfo = data;

    // 열화환경 정보 넣기
    inputEnvData(bridge, freezeLevel, snowLevel);

    // 좌표 변환
    transformCoordinate(x, y);
};

// 교량 열화환경 정보 넣기
function inputEnvData(bridge, freeze, snow) {
    $('#bridgeName').val(bridge);
    $('#stFreeze').val(freeze);
    $('#stSnow').val(snow);
}

// proj4js
// proj4js 좌표계 변환 인자
Proj4js.defs['EPSG:5181'] = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';
Proj4js.defs['EPSG:4326'] = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

let s_srs = new Proj4js.Proj('EPSG:5181');
let t_srs = new Proj4js.Proj('EPSG:4326');

// 좌표계 변환 5181 => 4326
function transformCoordinate(x, y) {
    // 포인트 생성
    let pt = new Proj4js.Point(x, y);
    // 좌표계 변경
    let result = Proj4js.transform(s_srs, t_srs, pt);
    // 지도 이동
    moveMap(result.x, result.y);
    // 마커 추가
    addMarker(result.x, result.y);
}


// openlayers initial
function initialOL() {
    window.GeoJSON = ol.format.GeoJSON;
    window.VectorSource =ol.source.Vector;
    window.VectorLayer = ol.layer.Vector;
    window.Tile = ol.layer.Tile;
    window.View = ol.View;
    window.Style = ol.style.Style;
    window.Fill = ol.style.Fill;
    window.Stroke = ol.style.Stroke;
    window.Polygon = ol.geom.Polygon;
    window.Feature = ol.Feature;
    window.OSM = ol.source.OSM;
    window.Map = ol.Map;
}
initialOL();

const initializeMap = function () {
    // 중앙 이동, 줌 변환을 위해 view를 map 밖으로 이동
    window.view = new View({
        center: [128.01270, 36],
        zoom: 6.8,
        projection: 'EPSG:4326'
    })
    // map 그리기
    window.map = new Map({
        target: 'map',
        layers: [
            new Tile({
                source: new OSM()
            }),
        ],
        view: view,
    });
}

// 마커 추가
function addMarker(lon, lat) {
    removeMarker();

    let feature = new Feature({
        geometry: new ol.geom.Point([lon,lat])
    });

    // 마커 스타일
    let style = new Style({
        image: new ol.style.Icon({
            anchor: [0.5, 20],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'http://map.vworld.kr/images/ol3/marker_blue.png'
        })
    });

    feature.setStyle(style);

    let source = new VectorSource({
        features: [feature]
    });

    let markerLayer = new VectorLayer({
        source: source,
        name: 'Marker'
    });

    markerLayer.setZIndex(6);

    map.addLayer(markerLayer);
}

// 마커 삭제
function removeMarker() {
    map.getLayers().getArray()
        .filter(layer => layer.get('name') === 'Marker')
        // .filter(function(layer) {
        //     return layer.get('name') === 'Marker';
        // })
        .forEach(layer => map.removeLayer(layer));
}

// 지도 이동
function moveMap(lon, lat) {
    view.animate({
        center: [lon, lat],
        duration: 1000,
        zoom: 11,
    });
}

/* 페이지가 로드되고 나서 실행 */
$(function() {
    onPageLoad();
});

/* 페이지가 로드되고 나서 실행 될 코드들을 담는다. */
const onPageLoad = function() {
    //OL 이니셜
    initializeMap();

    grids.f.initialization();
    grids.f.create();

    trigs.basic();
};