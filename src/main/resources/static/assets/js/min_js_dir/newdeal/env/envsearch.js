/*
 * 서버 API와 주고 받게 될 데이터 정의
 * 's' 문자형, 'n' 숫자형, 'a' 배열형, 'r' 필수값, 'd' 불필요한 데이터 삭제(receive에 있을 경우 앞으로도 불필요할 경우에는 API에서 삭제요청할것)
 * 조합하여 'sr', 'nr' 같은 형식도 가능
 * 추가로 필요한 검사항목이 생긴다면 문의 바랍니다.
 */
const dtos = {
    send: {

    },
    receive: {

    },
};

/* 서버 API를 AJAX 통신으로 호출하며 커뮤니케이션 하는 함수들 (communications) */
const comms = {
    // get tunnel list
    getTunnelList(callback) {
        CommonUI.ajax('/api/env/tunnel/list', 'POST', {},function(res) {
            const tunnelArray = res.sendData.datalist;
            callback (tunnelArray);
        })
    },
    // get weather list
    getWeatherList(callback) {
        CommonUI.ajax('/api/env/weather/list', 'POST', {}, function(res) {
            const weatherArray = res.sendData.datalist;
            callback (weatherArray);
        })
    },
    // get bridge list
    getBridgeList(callback) {
        CommonUI.ajax('/api/facility/common/mapList', 'POST', {}, function(res) {
            const bridgeArray = res.sendData.datalist;
            callback (bridgeArray);
        });
    },
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
                    dataField: '',
                    headerText: '',
                }, {
                    dataField: '',
                    headerText: '',
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
            return false
        });

        //  팝업 닫기
        $('.popclose').on('click', function(e) {
            $(this).parents('.l-popup').removeClass('open');
        });

        // 구조물 체크박스 체크시 해당 레이어 노출
        $('.map__markers .c-toggle__input').on('click', function (e) {
            wares.toggleLayer[e.target.value].setVisible(e.target.checked);
        });

        // 레이어 라디오 체크시 해당 wms 레이어 노출
        $('.map__tree .c-radio__input').on('click', function (e) {
            const value = $(this).attr('value');
            const envValue = $(this).attr('data-env');
            if ($(this).is(':checked')) {
                setWmsSource(value);
                showLegend(envValue);
                showInfo(envValue);
            }
        });

        // 메인 맵 클릭시 서브 맵 이동
        map1.on('click', function(event) {
            view2.set('center', event.coordinate);
            view2.mi = event.coordinate;
        });
        map2.on('moveend', onMoveEnd);

        // 서브 맵 구조물 클릭 시 하단 시설정보 노출
        map2.on('click', function(event) {
            let feature = map2.forEachFeatureAtPixel(event.pixel, function(feature) {
                return feature;
            });
            if (feature) {
                const type = feature.get('type');
                viewTable(type)
                setStructureInfo(feature);
            }
        });

        // tree script
        let toggler = document.getElementsByClassName('c-tree__toggle');
        for (let i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener('click', function() {
                this.parentElement.nextElementSibling.classList.toggle('active');
                this.classList.toggle('c-tree__toggle--minus');
            })
        }
    },
};


/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {
    wmsLayer1: {}, // 좌측 지도에 배치될 레이어들
    wmsLayer2: {}, // 우측 지도에 배치될 레이어들
    currentWmsLayer: '', // 현재 선택된 레이어명
    toggleLayer: {}, // 토글 기능으로 되어있는 레이어들
};

// 구조물 테이블
function viewTable(type) {
    const $facility = $('.l-map__facility-item');
    const id = $('#' + type + 'Table');
    $facility.removeClass('active');
    id.addClass('active');
}

// 구조물 데이터 표출
function setStructureInfo(data) {
    const structureInfo = data.A
    const keys = Object.keys(structureInfo)
    for(let i = 0; i < keys.length; i++) {
        $('#' + keys[i]).html(structureInfo[keys[i]]);
    }
}

// wms source
function setWmsSource(name) {
    wares.wmsLayer1[wares.currentWmsLayer].setVisible(false);
    wares.wmsLayer2[wares.currentWmsLayer].setVisible(false);
    wares.currentWmsLayer = name;
    wares.wmsLayer1[name].setVisible(true);
    wares.wmsLayer2[name].setVisible(true);
}

// 범례 보여주기
function showLegend(value) {
    $('.map__legend-item').removeClass('open');
    $('.map__legend-' + value).addClass('open');
}

// 열화환경 설명
function showInfo(value) {
    $('.l-map__info-item').removeClass('active');
    $('.l-map__info-item--' + value).addClass('active');
}


// proj4js
// proj4js 좌표계 변환 인자
Proj4js.defs['EPSG:5181'] = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs';
Proj4js.defs['EPSG:4326'] = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
Proj4js.defs['EPSG:3857'] = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';

let s_srs = new Proj4js.Proj('EPSG:4326');
let t_srs = new Proj4js.Proj('EPSG:3857');

// 좌표계 변환 4326 => 3857
function transformCoordinate(x, y) {
    // 포인트 생성
    let pt = new Proj4js.Point(x, y);
    // 좌표계 변경
    let result = Proj4js.transform(s_srs, t_srs, pt);
    return result;
}


// openlayers initial
function initialOL() {
    window.GeoJSON = ol.format.GeoJSON;
    window.VectorSource =ol.source.Vector;
    window.VectorLayer = ol.layer.Vector;
    window.Tile = ol.layer.Tile;
    window._Image = ol.layer.Image;
    window.View = ol.View;
    window.Style = ol.style.Style;
    window.Icon = ol.style.Icon;
    window.Fill = ol.style.Fill;
    window.Stroke = ol.style.Stroke;
    window.Polygon = ol.geom.Polygon;
    window.Feature = ol.Feature;
    window.Point = ol.geom.Point;
    window.OSM = ol.source.OSM;
    window.ImageWMS = ol.source.ImageWMS;
    window.Map = ol.Map;
}
initialOL();

const initializeMap = function () {
    // 중앙 이동, 줌 변환을 위해 view를 map 밖으로 이동
    // main map
    window.view1 = new View({
        center: [14200771.20690722, 4270167.650913847],
        zoom: 7,
        projection: 'EPSG:3857'
    });
    // sub map
    window.view2 = new View({
        center: [14417939.702513587, 4308429.832694663],
        zoom: 10.5,
        projection: 'EPSG:3857'
    });
    // 네모 영역
    window.squareSource = new VectorSource();
    window.squareLayer = new VectorLayer({
        source: squareSource,
        style: new Style({
            stroke: new Stroke({
                width: 2,
                color: [0, 0, 255, 1]
            }),
            zIndex: 100,
        }),
        zIndex: 1000,
    });

    // map 그리기
    // main map, map1
    window.map1 = new Map({
        target: 'map1',
        layers: [
            new Tile({
                source: new OSM()
            }),
            squareLayer,
        ],
        view: view1,
    });
    // sub map, ma2
    window.map2 = new Map({
        target: 'map2',
        layers: [
            new Tile({
                source: new OSM()
            }),
        ],
        view: view2,
    });

    initializeToggleLayers();
    initializeRadioLayers();
};

// 2번 지도 변경 시 위치 가져오기
function onMoveEnd(event) {
    const map = event.map;
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);
    const topLeft = ol.extent.getTopLeft(extent);
    const topRight = ol.extent.getTopRight(extent);
    const bottomRight = ol.extent.getBottomRight(extent);
    const bottomLeft = ol.extent.getBottomLeft(extent);
    const box = new Feature(new ol.geom.LineString(
        [
            [topLeft[0], topLeft[1]],
            [topRight[0], topRight[1]],
            [bottomRight[0], bottomRight[1]],
            [bottomLeft[0], bottomLeft[1]],
            [topLeft[0], topLeft[1]]
        ]
    ));
    squareSource.clear();
    squareSource.addFeatures([box]);
    // console.log(map.getView().getCenter());
    // console.log(map.getView());
}

/* 체크박스 레이어들을 wares.wmsLayer1, 2 에 구현하여 보이지 않게 하여 map에 심어둔다. */
const initializeToggleLayers = function () {
    // tunnel
    // tunnel source
    const tunnelSource = new VectorSource();
    comms.getTunnelList(function (tunnelList) {
        setTunnelSource(tunnelList);
    });
    // tunnel style
    const tunnelStyle = new Style({
        image: new Icon({
            imgSize: [8, 8],
            src: '/assets/images/icon__marker.png',
        })
    });
    // tunnel layer
    wares.toggleLayer['tunnel'] = new VectorLayer({
        source: tunnelSource,
        style: tunnelStyle,
        visible: false,
        zIndex: 1000,
    });
    map1.addLayer(wares.toggleLayer['tunnel']);
    map2.addLayer(wares.toggleLayer['tunnel']);

    // weather point
    // point source
    const weatherSource = new VectorSource();
    comms.getWeatherList(function (weatherList) {
        setWeatherSource(weatherList);
    });
    // point style
    const weatherStyle = new Style({
        image: new Icon({
            imgSize: [8, 8],
            src: '/assets/images/icon__marker--blue.png',
        })
    });
    // weather layer
    wares.toggleLayer['point'] = new VectorLayer({
        source: weatherSource,
        style: weatherStyle,
        visible: false,
        zIndex: 1000,
    });
    map1.addLayer(wares.toggleLayer['point']);
    map2.addLayer(wares.toggleLayer['point']);

    // bridge
    // bridge source
    const bridgeSource = new VectorSource();
    comms.getBridgeList(function (bridgeList) {
        setBridgeSource(bridgeList);
    });
    // bridge style
    const bridgeStyle = new Style({
        image: new Icon({
            imgSize: [8, 8],
            src: '/assets/images/icon__marker--red.png',
        })
    });
    // bridge layer
    wares.toggleLayer['bridge'] = new VectorLayer({
        source: bridgeSource,
        style: bridgeStyle,
        visible: false,
        zIndex: 1000,
    });
    map1.addLayer(wares.toggleLayer['bridge']);
    map2.addLayer(wares.toggleLayer['bridge']);


    // 구조물(터널, 기상계측점, 교량) 마커 데이터
    // set tunnel source
    function setTunnelSource(data) {
        let iconFeature;
        for (let i = 0; i < data.length; i++) {
            let transform = transformCoordinate(data[i][16], data[i][17]);
            let coordinates = [transform.x, transform.y];
            iconFeature = new Feature({
                geometry: new Point(coordinates),
                type: data[i][0],
                structureName: data[i][4],
                roadType: data[i][2],
                route: data[i][3],
                address: data[i][5] + data[i][6] + data[i][7] + data[i][8],
                length: data[i][9],
                totalWidth: data[i][10],
                advanceWidth: data[i][11],
                height: data[i][12],
                hands: data[i][13],
                year: data[i][15],
                rating: data[i][19],
                snow: data[i][20],
                environment: data[i][21],
                salty: data[i][22],
                traffic01: data[i][14],
                traffic02: data[i][23],
            });
            tunnelSource.addFeature(iconFeature);
        }
    }

    // set weather source
    function setWeatherSource(data) {
        let iconFeature;
        for (let i = 0; i < data.length; i++) {
            let transform = transformCoordinate(data[i][4], data[i][3]);
            let coordinates = [transform.x, transform.y];
            iconFeature = new Feature({
                geometry: new Point(coordinates),
                type: data[i][0],
                pointName: data[i][2],
                pointNumber: data[i][5],
                pointAlitude: data[i][6],
                pointAddress: data[i][7],
            });
            weatherSource.addFeature(iconFeature);
        }
    }

    // set bridge source
    function setBridgeSource(data) {
        let iconFeature;
        for (var i = 0; i < data.length; i++) {
            let transform = transformCoordinate(data[i][6], data[i][7]);
            let coordinates = [transform.x, transform.y];
            iconFeature = new Feature({
                geometry: new Point(coordinates),
                type: data[i][0],
                bridgeCity: data[i][3],
                bridgeName: data[i][2],
                bridgeAddress: data[i][4],
                bridgeContinuation: data[i][5],
                bridgeCompletion: data[i][8],
                bridgeTotal: data[i][9] + data[i][10] + data[i][11],
                bridgeEast: data[i][9],
                bridgeSnow: data[i][10],
                bridgeSalt: data[i][11],
                bridgeTraffic: data[i][12],
            });
            bridgeSource.addFeature(iconFeature);
        }
    }
}

/* 라디오 버튼들의 레이어들을 wares.wmsLayer1, 2 에 구현하여 보이지 않게 하여 map에 심어둔다. */
const initializeRadioLayers = function () {

    /* 매핑 서버의 레이어 이름에 맞추어 레이어를 생성한다. */
    const createLayer = function (layerName, visiblity) {
        const wmsSource = new ImageWMS({
            url: 'http://geo.bmaps.kr/geoserver/newdeal/wms',
            params: {
                'LAYERS': layerName,
            },
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
        });

        wares.wmsLayer1[layerName] = new _Image({
            source: wmsSource,
            opacity: 0.8,
            visible: visiblity,
        });
        wares.wmsLayer2[layerName] = new _Image({
            source: wmsSource,
            opacity: 0.8,
            visible: visiblity,
        });

        map1.addLayer(wares.wmsLayer1[layerName]);
        map2.addLayer(wares.wmsLayer2[layerName]);
    }

    const layerListElemets = $('.map__tree .c-radio__input');
    for (const {value, checked} of layerListElemets) {
        createLayer(value, checked);
        if (checked) {
            wares.currentWmsLayer = value;
        }
    }
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

    trigs.basic();
};