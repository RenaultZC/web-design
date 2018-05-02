jQuery(document).ready(function($) {

	'use strict';
    window.index = 0;
        $(window).load(function() { // makes sure the whole site is loaded
            $(".seq-preloader").fadeOut(); // will first fade out the loading animation
            $(".sequence").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
        })
      
        
        $(function() {
  
        function showSlide(n) {
            // n is relative position from current slide
          
            // unbind event listener to prevent retriggering
            $body.unbind("mousewheel");
          
            // increment slide number by n and keep within boundaries
            currSlide = Math.min(Math.max(0, currSlide + n), $slide.length-1);
            
            var displacment = window.innerWidth*currSlide;
            // translate slides div across to appropriate slide
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
            // delay before rebinding event to prevent retriggering
            setTimeout(bind, 700);
            
            // change active class on link
            $('nav a.active').removeClass('active');
            $($('a')[currSlide]).addClass('active');
            
        }
      
        function bind() {
             $body.bind('false', mouseEvent);
          }
      
        function mouseEvent(e, delta) {
            // On down scroll, show next slide otherwise show prev slide
            showSlide(delta >= 0 ? -1 : 1);
            e.preventDefault();
        }
        
        $('nav a, .main-btn a').click(function(e) {
            // When link clicked, find slide it points to
            var newslide = parseInt($(this).attr('href')[1]);
            // find how far it is from current slide
            var diff = newslide - currSlide - 1;
            showSlide(diff); // show that slide
            e.preventDefault();
        });
      
        $(window).resize(function(){
          // Keep current slide to left of window on resize
          var displacment = window.innerWidth*currSlide;
          $slides.css('transform', 'translateX(-'+displacment+'px)');
        });
        
        // cache
        var $body = $('body');
        var currSlide = 0;
        var $slides = $('.slides');
        var $slide = $('.slide');
      
        // give active class to first link
        $($('nav a')[0]).addClass('active');
        
        // add event listener for mousescroll
        $body.bind('false', mouseEvent);
    })        

        $('#form-submit .date').datepicker({
        });

        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".header").addClass("active");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
               $(".header").removeClass("active");
            }
        });

        $('#form-submit').on('click', function() {
            console.log('coming');
            var name = $('#name')[0].value,
                email = $('#email')[0].value,
                subject = $('#subject')[0].value,
                message = $('#message')[0].value;
            if(isMail(email)){
                if(isRight(name)) {
                    // if(isRight(subject)) {
                        if(isRight(message)) {
                            ;
                        } else {
                            console.log('留言为空或不合法！');
                            return ;
                        }
                    // } else {
                        // alert('留言为空或不合法！');
                    // }
                } else {
                    console.log('昵称为空或不合法！');
                    return ;
                }
            } else {
                console.log('邮箱为空或不合法');
                return ;
            }
            $.ajax({
                url : 'http://changan.zhangchaoweb.xin/api/mysql/add',
                data : {
                        'name' : $('#name')[0].value,
                        'email' : $('#email')[0].value,
                        'subject' : $('#subject')[0].value,
                        'message' : $('#message')[0].value
                    },
                type : 'GET',
                dataType : 'json' ,
                success : function(res) {
                    if( res.error ) {
                        // alert('留言失败');
                    }else {
                        // alert('留言成功！');
                        $('#name')[0].value = '';
                        $('#email')[0].value = '';
                        $('#subject')[0].value = '';
                        $('#message')[0].value = '';
                        getInfor();
                    }
                },
                error : function(res) {
                    // alert(res.result);
                    console.log(res);
                }
            })
        })

        function getInfor() {
            $.ajax({
                url : 'http://changan.zhangchaoweb.xin/api/mysql/search',
                type : 'GET',
                dataType : 'json',
                success : function(res) { 
                    if(res.error) {
                        console.log(res);
                    } else {
                        window.infor = res.result;
                        // console.log(window.infor);
                        danMu(0,0);
                    }
                },
                error : function(res) {
                    console.log(res);
                }
            })
        }

        getInfor();
        var oBarrage = document.getElementById('barrage');

        var timer = null;
        function danMu(i ,time ) {
            var st = 4 + parseInt(window.infor[i].message.length/10);
                setTimeout(function () {
                    oBarrage.style.animation = "";
                    setTimeout(function () {
                        var top = parseInt(100 * (Math.random()));
                        console.log(st,time,i);
                        oBarrage.style.top = top +'px';
                        oBarrage.style.animation = "letort "+ st +"s  linear";
                        oBarrage.innerHTML = window.infor[i].message;
                        if(i+1 < window.infor.length){
                            i++;
                        }else{
                            i = 0;
                        }
                        danMu(i,st);
                    },0)
                },time*1000);
        }

        function isMail(mail){
            var mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if(!mailreg.test(mail)){
                return false;
            }else{
                return true;
            }
        }
    //检查留言
        function isRight(message){
            if( filterSqlStr(message)){
            // alert("留言字符中包含了敏感字符！");
                return false;
            }
            return true;
        }

        function filterSqlStr(value){
            var sqlStr=sql_str().split(',');
            var flag=false;
            for(var i=0;i<sqlStr.length;i++){
                if(value.toLowerCase().indexOf(sqlStr[i])!=-1){
                    flag=true;
                    break;
                }
            }
            return flag;
        }
        function sql_str(){
            var str="and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
            return str;
        }
        $("#page5").click(function () {
            var mode = $(".yongxing .mode");
            var i;
            for(i = 0;i<mode.length;i++){
                if(i%2){
                    mode[i].className = " mode mode-right";
                }else{
                    mode[i].className = "mode mode-left";
                }
            }
            setTimeout(function () {
                for(i = 0;i<mode.length;i++){
                    mode[i].className = "mode";
                }
            },1500);
        });
});
