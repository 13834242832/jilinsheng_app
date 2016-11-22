// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
});

// Export selectors engine
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        return;
    }
    myApp.hideIndicator();
});
myApp.onPageInit('museum', function (page) {
    // $.ajax({
    //     type:'GET',
    //     url:"http://192.168.0.104:8080/X5.2.7_TJBWG/test",
    //     dataType:"text",
    //     async:false,
    //     data:{"params":"list"},
    //     success:function(json){
    //         var datas=eval("("+json+")");
    //
    //     }
    // });
    $(".jb,.dq,.lb").css("top","84px")
    localStorage.setItem("museum_index_jb",$(".jb-active").html());
    localStorage.setItem("museum_index_dq",$(".dq-active").html());
    localStorage.setItem("museum_index_lb",$(".lb-active").html());
    $$(".key1").on("click",function(){
        $$(".jb").toggleClass("museum-active");
        $$(".dq").removeClass("museum-active");
        $$(".lb").removeClass("museum-active");
    })
    $$(".jb li").on("click",function(e){
        $(this).find(".item-title").addClass("jb-active").siblings().removeClass("jb-active");
        localStorage.setItem("museum_index_jb",$(this).find(".item-title").html());
        $(this).find("i").html("done");
        $(this).siblings().find("i").html(" ");
        $(".jb").removeClass("museum-active");
        showData();
    });
    $$(".key2").on("click",function(){
        $$(".dq").toggleClass("museum-active");
        $$(".lb").removeClass("museum-active");
        $$(".jb").removeClass("museum-active");
    })
    $$(".dq li").on("click",function(e){
        $(this).find(".item-title").addClass("dq-active").siblings().removeClass("dq-active");
        localStorage.setItem("museum_index_dq",$(this).find(".item-title").html());
        $(this).find("i").html("done");
        $(this).siblings().find("i").html(" ");
        $(".dq").removeClass("museum-active");
        showData();
    });
    $$(".key3").on("click",function(){
        $$(".lb").toggleClass("museum-active");
        $$(".dq").removeClass("museum-active");
        $$(".jb").removeClass("museum-active");
    })
    $$(".lb li").on("click",function(e){
        $(this).find(".item-title").addClass("lb-active").siblings().removeClass("lb-active");
        localStorage.setItem("museum_index_lb",$(this).find(".item-title").html());
        $(this).find("i").html("done");
        $(this).siblings().find("i").html(" ");
        $(".lb").removeClass("museum-active");
        showData();
    });
    showData();
    function showData(){
        $$('.virtual-list').html(" ")
        var result={
        "FCity":localStorage.getItem("museum_index_dq"),
        "FMLevel":localStorage.getItem("museum_index_jb"),
        "FMType":localStorage.getItem("museum_index_lb"),
        "meth":"getMuseumList"
        }
        $.ajax({
            type:'GET',
            url:"http://123.56.50.236:8088/X5.2.7_TJBWG/getMuseumList?meth=getMuseumList",
            dataType:"text",
            data:result,
            cache:true,
            beforeSend:function(){
                layer.load(2,{shade: [0.3,'#000']});
            },
            success:function(json){
                var datas=eval("("+json+")");
                var myList=myApp.virtualList($$('.virtual-list'),{
                    items:datas,
                    template:'<li class="col-100">'+
                        '<a href="museum_details.html?ID={{MID}}">'+
                            '<h4 class="col-100">{{FMuseumName}}</h4>'+
                            '<p style="margin:0">开放时间:<span>{{KFSJ}}</span></p>'+
                            '<div style="position: relative">'+
                            '<img src="{{PicPhoto1}}" width="100%" height="247px">'+
                            '<span class="museum-msg museum-dq"><i></i><u>{{FProvince}}</u></span>'+
                            '<span class="museum-msg museum-lb"><i></i><u>{{FMType}}</u></span>'+
                            '<span class="museum-msg museum-jb"><i></i><u>{{FMLevel}}</u></span>'+
                            '</div>'+
                        '</a>'+
                '</li>',
                    height:340
                });
            },
            complete:function(){
                layer.closeAll('loading');
            }
        })
    }


});
myApp.onPageInit('museum_details', function (page) {
    var mySwiper = myApp.swiper('.swiper-container', {
        pagination:'.swiper-pagination'
    });
    console.log(page.query.ID);
    var result={"MID":page.query.ID,"meth":"getMuseumDetail"};
    $.ajax({
        type:'POST',
        url:"http://192.168.0.117:8083/X5.2.7_TJBWG/getMuseumList?meth=getMuseumDetail",
        dataType:"text",
        data:result,
        async:false,
        cache:true,
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            console.log(datas);
            // var myList=myApp.virtualList($$('.virtual-list'),{
            //     items:datas,
            //     template:'<li class="col-100">'+
            //     '<a href="museum_details.html?ID={{MID}}">'+
            //     '<h4 class="col-100">{{FMuseumName}}</h4>'+
            //     '<p style="margin:0">开放时间:<span>{{KFSJ}}</span></p>'+
            //     '<div style="position: relative">'+
            //     '<img src="{{PicPhoto1}}" width="100%" height="247px">'+
            //     '<span class="museum-msg museum-dq"><i></i><u>{{FProvince}}</u></span>'+
            //     '<span class="museum-msg museum-lb"><i></i><u>{{FMType}}</u></span>'+
            //     '<span class="museum-msg museum-jb"><i></i><u>{{FMLevel}}</u></span>'+
            //     '</div>'+
            //     '</a>'+
            //     '</li>',
            //     height:340
            // });
        },
        complete:function(){
            layer.closeAll('loading');
        }
    })
});
myApp.onPageInit('digitization', function (page) {
    var mySwiper = myApp.swiper('.swiper-container', {
        pagination:'.swiper-pagination'
    });
    var result={"MID":page.query.ID,"meth":"getMuseumDetail"};
    // $.ajax({
    //     type:'GET',
    //     url:"http://192.168.0.117:8083/X5.2.7_TJBWG/getMuseumList?meth=getMuseumDetail",
    //     dataType:"text",
    //     data:result,
    //     cache:true,
    //     beforeSend:function(){
    //         layer.load(2,{shade: [0.3,'#000']});
    //     },
    //     success:function(json){
    //         var datas=eval("("+json+")");
    //         console.log(datas);
    //         // var myList=myApp.virtualList($$('.virtual-list'),{
    //         //     items:datas,
    //         //     template:'<li class="col-100">'+
    //         //     '<a href="museum_details.html?ID={{MID}}">'+
    //         //     '<h4 class="col-100">{{FMuseumName}}</h4>'+
    //         //     '<p style="margin:0">开放时间:<span>{{KFSJ}}</span></p>'+
    //         //     '<div style="position: relative">'+
    //         //     '<img src="{{PicPhoto1}}" width="100%" height="247px">'+
    //         //     '<span class="museum-msg museum-dq"><i></i><u>{{FProvince}}</u></span>'+
    //         //     '<span class="museum-msg museum-lb"><i></i><u>{{FMType}}</u></span>'+
    //         //     '<span class="museum-msg museum-jb"><i></i><u>{{FMLevel}}</u></span>'+
    //         //     '</div>'+
    //         //     '</a>'+
    //         //     '</li>',
    //         //     height:340
    //         // });
    //     },
    //     complete:function(){
    //         layer.closeAll('loading');
    //     }
    // })
});
myApp.onPageInit('museum_useful', function (page) {
    console.log(123)
})