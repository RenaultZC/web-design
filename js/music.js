window.onload=function(){
    var play=document.getElementById('play');
    var bgm = document.getElementById('music');
    var oBarrage = document.getElementById('barrage');
    play.style.animation="play 1s linear infinite";
    play.onclick = function () {
        if (bgm.paused) {
            bgm.play();
            play.style.animation="play 1s linear infinite";
            oBarrage.style.display = "block";

        }else{
            bgm.pause();
            play.style.animation="";
            oBarrage.style.display = "none";
        }
    }
};