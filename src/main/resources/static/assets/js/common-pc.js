function nvl(str, defaultStr){

    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;

    return str ;
}

//20180328최인석 myoffice 에있는 js 추가함

//JSON KEY to lowercase
function echoNull2Blank(str) {
    if (str == null) return '';
    return str;
}


(function($) {
    $.fn.jqueryPager = function(options) {
        var defaults = {
            pageSize: 10,
            currentPage: 1,
            pageTotal: 0,
            pageBlock: 10,
            clickEvent: 'callList'
        };

        var subOption = $.extend(true, defaults, options);

        return this.each(function() {
            var currentPage = subOption.currentPage*1;
            var pageSize = subOption.pageSize*1;
            var pageBlock = subOption.pageBlock*1;
            var pageTotal = subOption.pageTotal*1;
            var clickEvent = subOption.clickEvent;

            if (!pageSize) pageSize = 10;
            if (!pageBlock) pageBlock = 10;

            var pageTotalCnt = Math.ceil(pageTotal/pageSize);
            var pageBlockCnt = Math.ceil(currentPage/pageBlock);
            var sPage, ePage;
            var html = '';

            if (pageBlockCnt > 1) {
                sPage = (pageBlockCnt-1)*pageBlock+1;
            } else {
                sPage = 1;
            }

            if ((pageBlockCnt*pageBlock) >= pageTotalCnt) {
                ePage = pageTotalCnt;
            } else {
                ePage = pageBlockCnt*pageBlock;
            }

            html += '<div class="c-paging__wrapper">';

            html += '<div class="c-paging__arrow">';
            html += '<a href="javascript:'+ clickEvent +'(1);" class="c-paging__item c-paging__control"><img src="/assets/images/icon__first-page.png" alt="첫 페이지"></a>';
            html += '</div>';

            if (sPage > 1) {
                html += '<div class="c-paging__arrow">';
                html += '<a href="javascript:'+ clickEvent +'(' + (sPage-pageBlock) + ');" class="c-paging__item c-paging__control"><img src="/assets/images/button__page-left--hover.png" alt="이전"></a>';
                html += '</div>';
            }

            for (var i=sPage; i<=ePage; i++) {

                html += '<div class="c-paging__group">';
                if (currentPage == i) {
                    html+= '<a href="javascript:'+ clickEvent +'(' + i + ');" class="c-paging__item check" >' + i + '</a>';
                } else {
                    html+= '<a href="javascript:'+ clickEvent +'(' + i + ');" class="c-paging__item" >' + i + '</a>';
                }
                html += '</div>';
            }


            if (ePage < pageTotalCnt) {
               html += '<div class="c-paging__arrow">';
               html+= '<a href="javascript:'+ clickEvent +'(' + (ePage+1) + ');" class="c-paging__item c-paging__control"><img src="/assets/images/button__page-right--hover.png" alt="다음"></a>';
               html += '</div>';
            }

            html += '<div class="c-paging__arrow">';
            html+= '<a href="javascript:'+ clickEvent +'(' + (pageTotalCnt) + ');" class="c-paging__item c-paging__control"><img src="/assets/images/icon__last-page.png" alt="마지막 페이지"></a>';
            html += '</div>';

            html += '</div>';

            $(this).empty().html(html);
      });
    };
})(jQuery);

// header menu icon
$(document).ready(function(){

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });


    // nav accordion
    $('.toggle').click(function(e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .nav__list-depth').removeClass('show');
            $this.parent().parent().find('li .nav__list-depth').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

    // datepicker
    /*$.datepicker.regional['en'] = {
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        // monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
        // '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
        // monthNamesShort: ['1월','2월','3월','4월','5월','6월',
        // '7월','8월','9월','10월','11월','12월'],
        // dayNames: ['일','월','화','수','목','금','토'],
        // dayNamesShort: ['일','월','화','수','목','금','토'],
        // dayNamesMin: ['일','월','화','수','목','금','토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        // isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '',
        showOn: 'both',
        buttonImage: "/images/icon__calendar.svg",
        buttonText: "달력",
        yearRange: 'c-99:c+99',
    };
    $.datepicker.setDefaults($.datepicker.regional['en']);

    $('#sdate').datepicker();
    $('#sdate').datepicker("option", "maxDate", $("#edate").val());
    $('#sdate').datepicker("option", "onClose", function ( selectedDate ) {
        $("#edate").datepicker( "option", "minDate", selectedDate );
    });

    $('#edate').datepicker();
    $('#edate').datepicker("option", "minDate", $("#sdate").val());
    $('#edate').datepicker("option", "onClose", function ( selectedDate ) {
        $("#sdate").datepicker( "option", "maxDate", selectedDate );
    });

    // $.datepicker.setDefaults($.datepicker.regional['en']);
    //
    // $('#startdate').datepicker();
    // $('#startdate').datepicker("option", "maxDate", $("#enddate").val());
    // $('#startdate').datepicker("option", "onClose", function ( selectedDate ) {
    //     $("#enddate").datepicker( "option", "minDate", selectedDate );
    // });
    //
    // $('#enddate').datepicker();
    // $('#enddate').datepicker("option", "minDate", $("#startdate").val());
    // $('#enddate').datepicker("option", "onClose", function ( selectedDate ) {
    //     $("#startdate").datepicker( "option", "maxDate", selectedDate );
    // });
    */
    // text field
    $('.c-field__input').on('focus', function() {
    	$(this).parent().find('.c-field__label').addClass('filled focused');
    });
    
    $('.c-field__input').on('blur', function() {
    	$(this).parent().find('.c-field__label').removeClass('focused');
    	
    	if (this.value === '') {
    		$(this).parent().find('.c-field__label').removeClass('filled');
    	}
    });
});
