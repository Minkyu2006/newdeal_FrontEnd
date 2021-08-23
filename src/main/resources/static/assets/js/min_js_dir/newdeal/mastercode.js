function save(){
    if ($("#codeType").val().trim() == '') {
        alertCaution("대분류를 선택하세요");
        return false;
    }

    if ($("#code").val().trim() == '') {
        alertCaution("코드를입력하세요");
        return false;
    }

    if ($("#name").val().trim() == '') {
        alertCaution("코드명을 입력하세요");
        return false;
    }

    var $form = $('form[name="frmreg"]');
    var params = $form.serialize();

    $.ajax({
        url:'/api/mastercode/reg',
        type : 'post',
        data : params,
        cache:false,
        error:function(request,status,error){
            ajaxErrorMsg(request);
        },
        success: function(res){
            if (!Ajax.checkResult(res)) {
                return;
            }
            alertSuccess('저장되었습니다.');
            init();
            callList(1);
        }
    });
}

function init(){
    //화면 초기화
    $("#code").val('');
    $("#name").val('');
    $("#remark").val('');
    $("#bcRef1").val('');
    $("#bcRef2").val('');
    $("#bcRef3").val('');
    $("#bcRef4").val('');
    $("#code").removeAttr("readonly");
    $("#codeType").removeAttr("readonly");
}

function callList(page) {
    page = page - 1;
    if (page < 0) page = 0

    var perPage = 10;
    var perArea = 5;
    var totCnt = 0;

    var $schList = $('#schList');
    var $totalCnt = $('#totalCnt');
    var params = {
        codetype:$('#s_codeType').val(),
        code:$('#s_code').val(),
        name:$('#s_name').val()
    };

    $schList.empty().append('<tr ><td colspan="5" align = "center">조회 중</td></tr>');
    $totalCnt.text('0');

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });

    $.ajax({
        url:'/api/mastercode/list?size='+ perPage + '&page=' + page,
        type : 'post',
        data : params,
        cache:false,
        error:function(request,status,error){
            ajaxErrorMsg(request);
        },
        success: function(res){
            //화면 출력
            totCnt = res.data.total_rows;
            $("#paging1").jqueryPager({pageSize: perPage,
                pageBlock: perArea,
                currentPage: page + 1,
                pageTotal: totCnt,
                clickEvent: 'callList'});

            if (totCnt == 0) {
                $schList.empty().append('<tr class="t-c"><td colspan="5" align="center">조회된 데이터가 없습니다.</td></tr>');
                return;
            }

            $totalCnt.text(totCnt);


            var html = '';
            $.each(res.data.datalist, function(key, value){
                html += '<tr >';
                html += '<td >'+ echoNull2Blank(value.codeType) +'</td>';
                html += '<td >'+ echoNull2Blank(value.code) +'</td>';
                html += '<td >'+ echoNull2Blank(value.name) +'</td>';
                html += '<td >'+ echoNull2Blank(value.remark) +'</td>';
                html += '<td ><button class="c-button" onclick="javascript:callinfo(\''+ echoNull2Blank(value.id) +'\');">수정</button></td>';
                html += '</tr>';
            });
            $schList.html(html);
        }
    });
}

function callinfo(id) {

    var params = {
        id:id
    };

    init();

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });

    $.ajax({
        url:'/api/mastercode/mastercode',
        type : 'post',
        data : params,
        cache:false,
        error:function(request,status,error){
            ajaxErrorMsg(request);
        },
        success: function(res){
            $("#codeType").val(res.data.datarow.codeType);
            $("#code").val(res.data.datarow.code);
            $("#name").val(res.data.datarow.name);
            $("#remark").val(res.data.datarow.remark);
            $("#bcRef1").val(res.data.datarow.bcRef1);
            $("#bcRef2").val(res.data.datarow.bcRef2);
            $("#bcRef3").val(res.data.datarow.bcRef3);
            $("#bcRef4").val(res.data.datarow.bcRef4);
            $("#codeType").attr("readonly",true);
            $("#code").attr("readonly",true);
        }
    });
}

function masterDelCheck() {
    if ($("#codeType").attr("readonly") !== "readonly"){
        alertCaution("삭제하고자하는 코드를 하단에서 <BR> 선택 후 삭제하세요.");
        return false;
    }
    alertCheck("마스터코드를 삭제하겠습니까?",null);
}
// 삭제실행여부확인
function startDel(id,booleanValue) {
    $('#popupId').remove();
    if(booleanValue===true){
        del()
    }else{
        return false;
    }
}
function del(){
    var params = {
        codetype:$("#codeType").val(),
        code:$("#code").val()
    };

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });

    $.ajax({
        url:'/api/mastercode/del',
        type : 'post',
        data : params,
        cache:false,
        error:function(request){
            ajaxErrorMsg(request);
        },
        success: function(res){
            if (!Ajax.checkResult(res)) {
                return;
            }
            alertSuccess('삭제되었습니다.');
            init();
            callList(1);
        }
    });
}