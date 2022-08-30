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

        // view1.on('change:resolution', function(event){
        //     updateView(event, view2);
        //     console.log(event);
        // });

        // view1.on('change:center', function(event){
        //     updateView(event, view2);
        // });

        map1.on('click', function(event) {
            view2.set('center', event.coordinate);
            view2.mi = event.coordinate;
        });
        map2.on('moveend', onMoveEnd);
    },
};

/* 통신 객체로 쓰이지 않는 일반적인 데이터들 정의 (warehouse) */
const wares = {

};

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
    window.view1 = new View({
        center: [128.01270, 36],
        zoom: 7.6,
        projection: 'EPSG:4326'
    });

    window.view2 = new View({
        center: [128.01270, 36],
        zoom: 12,
        projection: 'EPSG:4326'
    });

    window.squareSource = new VectorSource();
    window.squareLayer = new VectorLayer({
        source: squareSource,
        style: new Style({
            stroke: new Stroke({
                width: 2,
                color: [0, 0, 255, 1]
            })
        })
    });

    // map 그리기
    window.map1 = new Map({
        target: 'map1',
        layers: [
            new Tile({
                source: new OSM()
            }),
            squareLayer
        ],
        view: view1,
    });

    window.map2 = new Map({
        target: 'map2',
        layers: [
            new Tile({
                source: new OSM()
            }),
        ],
        view: view2,
    });
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

    trigs.basic();
};