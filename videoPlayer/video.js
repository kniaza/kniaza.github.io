/**
 * Created by Gurami on 16/04/2016.
 */





    var videoElem = {
        video : document.getElementById('my_video'),
        videoTitle : document.getElementById('video_title'),
        playList : document.getElementById('playlist'),
        controlsBar : document.getElementById('controls_bar'),
        playPause : document.getElementById('play_pause_btn')
    };
    var controls = {
        total : document.getElementById("total"),
        buffered : document.getElementById("buffered"),
        progress : document.getElementById("current"),
        duration : document.getElementById("duration"),
        currentTime : document.getElementById("currentTime"),
        hasHours : false
    };

    var videoBase = [
        {
            id : 1,
            title : 'Big Buck Bunny',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            id : 2,
            title : 'Damian Marley - Road To Zion (EFIX & XKAEM Cover)',
            link : 'video/music.mp4'
        }
    ];

    //
    //// Functions
    //

    function playPauseVideo (){

        if(videoElem.video.paused){
            videoElem.video.play();
            videoElem.playPause.children[0].classList.remove('fa-play');
            videoElem.playPause.children[0].classList.add('fa-pause');
        } else {
            videoElem.video.pause();
            videoElem.playPause.children[0].classList.remove('fa-pause');
            videoElem.playPause.children[0].classList.add('fa-play');
        }

    }

    function time (){
        if(videoElem.video.duration / 3600 >= 1.0) controls.hasHours = true;

        controls.duration.innerHTML = formatTime(videoElem.video.duration, controls.hasHours);
    }

    function timeUpdate (){

        controls.currentTime.innerHTML = formatTime(videoElem.video.currentTime);

        var progress = Math.floor((videoElem.video.currentTime * 100)  / videoElem.video.duration);
        controls.progress.style.width = progress + '%';

    }

    function titleShow (){
        videoElem.videoTitle.style.display = 'block';
    }

    function titleHidd (){
        videoElem.videoTitle.style.display = 'none';
    }


    //
    //// Events
    //

    videoElem.playPause.addEventListener('click',playPauseVideo);
    videoElem.video.oncanplay = time;
    videoElem.video.addEventListener('timeupdate',timeUpdate);
    videoElem.video.addEventListener('mouseover',titleShow);
    videoElem.video.addEventListener('mouseout',titleHidd);


    videoElem.playList.onclick = function(e){
        e.preventDefault();
        console.log(e.target.href);
        videoElem.video.children[0].src = e.target.href;
        videoElem.videoTitle.children[0].innerHTML = e.target.innerHTML;
    };
    

    window.onload = function (){
        
        var playListHtml = '';
        for (var i = 0; i < videoBase.length; i++){
            playListHtml += '<div class="video_list"><a class="video_list_name" href="' + videoBase[i].link + '">' + videoBase[i].title + '</a></div>';
        }
        videoElem.playList.innerHTML = playListHtml;

    };






