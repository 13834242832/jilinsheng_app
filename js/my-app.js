// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
});

// Export selectors engine
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    sortable:false
});
var current_url=(location.href).split("=")[1];
if(current_url){
    mainView.router.load({
        url:"museum_details.html?ID="+current_url
    })
};
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
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getMuseumList",
        dataType:"text",
        async:false,
        data:{"meth":"getAllOptions"},
        success:function(json){
            var datas=eval("("+json+")");
            console.log(datas);
            var listm=new Vue({
                el:"#museum_details",
                data:{
                    data:datas["museumOption"],
                },
            })
        },
    })
    $(".jb,.dq,.lb").css("top","0.6927rem")
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
        // $$('.virtual-list').html(" ")
        var result={
        "FCity":localStorage.getItem("museum_index_dq"),
        "FMLevel":localStorage.getItem("museum_index_jb"),
        "FMType":localStorage.getItem("museum_index_lb"),
        "meth":"getMuseumList"
        }
        $.ajax({
            type:'POST',
            url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getMuseumList?meth=getMuseumList",
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
                var myList=myApp.virtualList($$(page.container).find('.virtual-list'),{
                    items:datas,
                    template:'<li class="col-100 sql">'+
                        '<a href="museum_details.html?ID={{MID}}">'+
                            '<h4 class="col-100">{{FMuseumName}}</h4>'+
                            '<p style="margin:0;font-size:0.08rem;color:#a6a6a6;">开放时间:<span>{{KFSJ}}</span></p>'+
                            '<div style="position: relative">'+
                            '<img src="{{PicPhoto1}}" width="100%" style="height:1.0977rem">'+
                            '<span class="museum-msg museum-dq"><i></i><u>{{FProvince}}</u></span>'+
                            '<span class="museum-msg museum-lb"><i></i><u>{{FMType}}</u></span>'+
                            '<span class="museum-msg museum-jb"><i></i><u>{{FMLevel}}</u></span>'+
                            '</div>'+
                        '</a>'+
                '</li>',
                    height:parseFloat($("html").css("font-size"))
                });
            },
            complete:function(){
                layer.closeAll('loading');
            }
        })
    }


});
myApp.onPageInit('museum_details', function (page) {
    var result={"MID":page.query.ID,"meth":"getMuseumDetail"};
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getMuseumList?meth=getMuseumDetail",
        dataType:"text",
        async:false,
        data:result,
        cache:true,
        success:function(json){
            var datas=eval("("+json+")");
            var listm=new Vue({
                el:"#museum_details",
                data:{
                    data:datas[0],
                    url1:"museum_collection.html?ID=",
                    url2:"museum_useful.html?ID="
                },
            })
        },
    })
});
myApp.onPageInit('digitization', function (page) {
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getDigitalMuseum",
        dataType:"text",
        data:{"meth":"DigitalMuseum"},
        async:false,
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var list=new Vue({
                el:"#digitization",
                data:{
                    data:datas
                }
            })
        },
        complete:function(){
            var mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
            layer.closeAll('loading');
        }
    });

});
myApp.onPageInit('digization_details', function (page) {
    var result={
        "MID":page.query.ID,
        "meth":"DigitalMuseumDetail"
    }
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getDigitalMuseum",
        dataType:"text",
        data:result,
        async:false,
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var list=new Vue({
                el:"#digization_details",
                data:{
                    data:datas
                }
            })
        },
        // complete:function(){
        //     layer.closeAll('loading');
        // }
    });
    var a={
        "MID":page.query.ID,
    }
    // $.ajax({
    //     type:'post',
    //     url:"http://123.56.50.236:8080/x5/TJBWG/Content/process/processor/getComment.j",
    //     dataType:'JSONP',
    //     jsonp: "jsoncallback",
    //     jsonpCallback:"success",
    //     data:{"params":a},
    //     success:function(json){
    //         success(json);
    //         function success(data){
    //             data=data["sql1"];
    //             var list=new Vue({
    //                 el:"#pl_msg",
    //                 data:{
    //                     pl:data
    //                 }
    //             })
    //         }
    //     }
    // });
})
myApp.onPageInit('museum_brief', function (page) {
    var result={"MID":page.query.ID,"meth":"getMuseumDetail"};
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getMuseumList?meth=getMuseumDetail",
        dataType:"text",
        data:result,
        cache:true,
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            var listm=new Vue({
                el:"#museum_brief",
                data:{
                    data:datas[0],
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
        }
    })
})
myApp.onPageInit('museum_collection', function (page) {
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getCollectionAppreciation",
        dataType:"text",
        data:{"meth":"CollectionAppreciation"},
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var a=new Vue({
                el:"#museum_collection",
                data:{
                    data:datas
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
            var mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        }
    });
})
myApp.onPageInit('digitization_more', function (page) {
    // $(".jb,.dq").css("top","0.6927rem")
    // localStorage.setItem("museum_index_jb",$(".jb-active").html());
    // localStorage.setItem("museum_index_dq",$(".dq-active").html());
    // localStorage.setItem("museum_index_lb",$(".lb-active").html());
    // $$(".key1").on("click",function(){
    //     $$(".jb").toggleClass("museum-active");
    //     $$(".dq").removeClass("museum-active");
    //     $$(".lb").removeClass("museum-active");
    //     showData();
    // })
    // $$(".jb li").on("click",function(e){
    //     $(this).find(".item-title").addClass("jb-active").siblings().removeClass("jb-active");
    //     localStorage.setItem("museum_index_jb",$(this).find(".item-title").html());
    //     $(this).find("i").html("done");
    //     $(this).siblings().find("i").html(" ");
    //     $(".jb").removeClass("museum-active");
    //     showData();
    // });
    // $$(".key2").on("click",function(){
    //     $$(".dq").toggleClass("museum-active");
    //     $$(".lb").removeClass("museum-active");
    //     $$(".jb").removeClass("museum-active");
    //     showData();
    // })
    // $$(".dq li").on("click",function(e){
    //     $(this).find(".item-title").addClass("dq-active").siblings().removeClass("dq-active");
    //     localStorage.setItem("museum_index_dq",$(this).find(".item-title").html());
    //     $(this).find("i").html("done");
    //     $(this).siblings().find("i").html(" ");
    //     $(".dq").removeClass("museum-active");
    //     showData();
    // });
    showData()
    function showData(){
        // $$('.virtual-list').html(" ")
        var result={
            // "FCity":localStorage.getItem("museum_index_dq"),
            // "FMLevel":localStorage.getItem("museum_index_jb"),
            // "FMType":localStorage.getItem("museum_index_lb"),
            "meth":"DigitalMuseum"
        }
        $.ajax({
            type:'POST',
            url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getDigitalMuseum",
            dataType:"text",
            data:result,
            cache:true,
            async:false,
            beforeSend:function(){
                layer.load(2,{shade: [0.3,'#000']});
            },
            success:function(json){
                var datas=eval("("+json+")");
                console.log(datas);
                var a=new Vue({
                    el:"#digitization_more",
                    data:{
                        data:datas[0]
                    },
                })
            },
            complete:function(){
                layer.closeAll('loading');
            }
        })
    }

})
myApp.onPageInit('digization_details',function (page){
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getDigitalMuseum",
        dataType:"text",
        data:{"meth":"DigitalMuseumDetail","MID":page.query.ID},
        async:false,
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var a=new Vue({
                el:"#digization_details",
                data:{
                    data:datas
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
            var mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        }
    });
})
myApp.onPageInit('appreciate',function (page) {
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getCollectionAppreciation",
        dataType:"text",
        async:false,
        data:{"meth":"CollectionAppreciation"},
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var a=new Vue({
                el:"#appreciate",
                data:{
                    data:datas
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
            var mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        }
    });
})
myApp.onPageInit('collection_details',function (page) {
    $.ajax({
        type:'POST',
        url:"http://192.168.0.117:8089/X5.2.7_TJBWG/getCollectionAppreciation",
        dataType:"text",
        async:false,
        data:{"meth":"CollectionDetail","MID":page.query.ID},
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            var a=new Vue({
                el:"#collection_details",
                data:{
                    data:datas
                },
            })
        },
    });
    var result={
        "MID":page.query.ID
    }
    result=JSON.stringify(result);
    $.ajax({
        type:'post',
        url:"http://123.56.50.236:8089/x5/TJBWG/Content/process/processor/getComment.j",
        dataType:'JSONP',
        jsonp: "jsoncallback",
        async:false,
        jsonpCallback:"success",
        data:{"params":result},
        success:function(json){
            success(json);
            function success(data){
                var data1=data["sql1"];
                var data2=data["sql2"][0];
                // var list=new Vue({
                //     el:"#list",
                //     data:{
                //         content:data1
                //     }
                // })
                console.log(data2);
                for(var k=0;k<3;k++){
                    $("#pl").append("<div class='col-100' style='margin:0.045rem 0 0.045rem 0.33rem'><p style='font-size:0.089rem;color:#404040;'>"+data1[k].FUSERNAME+"</p><p style='font-size:0.08rem'>"+data1[k].FCOMMENTCONTENT+"</p></div>")
                }
                $("#count_msg").html(data2.COUNT)
            }
        }
    });
})
myApp.onPageInit('more_collection',function (page) {
    $.ajax({
        type:'POST',
        url:"http://123.56.50.236:8089/X5.2.7_TJBWG/getCollectionAppreciation",
        dataType:"text",
        async:false,
        data:{"meth":"CollectionAppreciation"},
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var a=new Vue({
                el:"#more_collection",
                data:{
                    data:datas
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
            var mySwiper = myApp.swiper('.swiper-container', {
                pagination:'.swiper-pagination'
            });
        }
    });
    // Dependent values
    var carVendors = {
        全部 : ['全部'],
        藏品分类 : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
        藏品年代 : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
    };
    var pickerDependent = myApp.picker({
        input: '#collection_key1',
        rotateEffect: true,
        formatValue: function (picker, values) {
            return values[1];
        },
        cols: [
            {
                textAlign: 'left',
                values: ['全部', '藏品分类', '藏品年代'],
                onChange: function (picker, country) {
                    if(picker.cols[1].replaceValues){
                        picker.cols[1].replaceValues(carVendors[country]);
                        console.log(picker.value[0],picker.value[1])
                    }
                }
            },
            {
                values: carVendors["全部"],
                width: 160,
            },
        ]
    });
})
myApp.onPageInit('collection_day', function (page) {
    $.ajax({
        type:'POST',
        url:"http://192.168.0.117:8083/X5.2.7_TJBWG/getCollectionAppreciation",
        dataType:"text",
        async:false,
        data:{"meth":"OnePerMonth","MID":page.query.ID},
        beforeSend:function(){
            layer.load(2,{shade: [0.3,'#000']});
        },
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas[0];
            console.log(datas);
            var a=new Vue({
                el:"#collection_day",
                data:{
                    data:datas
                },
            })
        },
        complete:function(){
            layer.closeAll('loading');
        }
    });
})
myApp.onPageInit('information',function (page) {
    $.ajax({
        type:'POST',
        url:"http://192.168.0.117:8083/X5.2.7_TJBWG/getInformation",
        dataType:"text",
        async:false,
        data:{"meth":"getInformation"},
        success:function(json){
            var datas=eval("("+json+")");
            console.log(datas);
            var a=new Vue({
                el:"#information",
                data:{
                    data:datas
                },
            })
        }
    });
})
myApp.onPageInit('information_show_details',function (page) {
    $.ajax({
        type:'POST',
        url:"http://192.168.0.117:8083/X5.2.7_TJBWG/getInformation",
        dataType:"text",
        async:false,
        data:{"meth":"getInformation","MID":page.query.ID},
        success:function(json){
            var datas=eval("("+json+")");
            datas=datas['textAcademicShow'][0];
            var a=new Vue({
                el:"#information_show_details",
                data:{
                    data:datas
                },
            })
        }
    });
})

