/**
 * Created by Gurami on 16/04/2016.
 */





    var videoElem = {
        video : document.getElementById('my_video'),
        videoTitle : document.getElementById('video_title'),
        playList : document.getElementById('playlist'),
        playListItem : document.getElementsByClassName('video_list_name'),
        controlsBar : document.getElementById('controls_bar'),
        playPause : document.getElementById('play_pause_btn'),
        stop : document.getElementById('stop_btn'),
        forward : document.getElementById('forward_btn'),
        backward : document.getElementById('backward_btn')
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
            title : 'Big Buck Bunny',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            title : 'Damian Marley - Road To Zion (EFIX & XKAEM Cover)',
            link : 'video/music.mp4'
        },
        {
            title : 'Test 1',
            link : 'http://techslides.com/demos/sample-videos/small.mp4'
        },
        {
            title : 'Test 2',
            link : 'http://download.wavetlan.com/SVV/Media/HTTP/H264/Talkinghead_Media/H264_test2_Talkinghead_mp4_480x320.mp4'
        },
        {
            title : 'Test 3',
            link : 'http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test5_voice_mp4_480x360.mp4'
        },
        {
            title : 'Test 4',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            title : 'Test 5',
            link : 'http://techslides.com/demos/sample-videos/small.mp4'
        },
        {
            title : 'Test 6',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            title : 'Test 7',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            title : 'Test 8',
            link : 'video/big_buck_bunny.mp4'
        },
        {
            title : 'Test 9',
            link : 'video/big_buck_bunny.mp4'
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

        var progress = parseFloat((controls.buffered.offsetWidth / videoElem.video.duration ) * videoElem.video.currentTime);
        

        controls.progress.style.width = progress + 'px';

    }

    function titleShow (){
        videoElem.videoTitle.style.display = 'block';
    }

    function titleHidd (){
        videoElem.videoTitle.style.display = 'none';
    }

    function stopVideo (){
        videoElem.video.pause();

        if(videoElem.video.paused){
            videoElem.playPause.children[0].classList.remove('fa-pause');
            videoElem.playPause.children[0].classList.add('fa-play');
        }

        videoElem.video.currentTime = 0;
    }

    function nextVideo (){
        for (var i = 0; i < videoBase.length; i++){
            if(videoElem.playList.children[i].children[0].classList[1] === 'active') {

                if(i === videoBase.length - 2) {
                    videoElem.forward.style.display = 'none';
                } else if (i === 0) {
                    videoElem.backward.style.display = '';
                }

                videoElem.video.src = videoElem.playList.children[i+1].children[0].href;
                videoElem.playList.children[i].children[0].classList.remove('active');
                videoElem.playList.children[++i].children[0].classList.add('active');
            }
        }
        if(videoElem.video.paused){
            videoElem.playPause.children[0].classList.remove('fa-pause');
            videoElem.playPause.children[0].classList.add('fa-play');
            controls.currentTime.innerHTML = formatTime(0);
            controls.progress.style.width = 0;
        }

    }

    function previousVideo (){
        for (var i = 0; i < videoBase.length; i++){
            if(videoElem.playList.children[i].children[0].classList[1] === 'active') {

                if (i === 1) {
                    videoElem.backward.style.display = 'none';
                } else if  (i === videoBase.length - 1) {
                    videoElem.forward.style.display = '';
                }

                videoElem.video.src = videoElem.playList.children[i-1].children[0].href;
                videoElem.playList.children[i].children[0].classList.remove('active');
                videoElem.playList.children[--i].children[0].classList.add('active');
            }
        }
        if(videoElem.video.paused){
            videoElem.playPause.children[0].classList.remove('fa-pause');
            videoElem.playPause.children[0].classList.add('fa-play');
            controls.currentTime.innerHTML = formatTime(0);
            controls.progress.style.width = 0;
        }
    }


    function playListControl (e){
        e.preventDefault();
        videoElem.video.src = e.target.href;
        videoElem.videoTitle.children[0].innerHTML = e.target.innerHTML;
        controls.progress.style.width = 0;

        for (var i = 0; i < videoBase.length; i++){

            if(videoElem.playList.children[i].children[0].classList[1] === 'active'){

                videoElem.playList.children[i].children[0].classList.remove('active');
                e.target.classList.add('active');
                controls.currentTime.innerHTML = formatTime(0);


                for(var j = 0; j < videoElem.playListItem.length; j++){
                    if(e.target.innerHTML === videoElem.playListItem[0].innerHTML) {
                        videoElem.backward.style.display = 'none';
                        videoElem.forward.style.display = '';
                    } else if(e.target.innerHTML === videoElem.playListItem[videoElem.playListItem.length - 1].innerHTML) {
                        videoElem.forward.style.display = 'none';
                        videoElem.backward.style.display = '';
                    } else {
                        videoElem.forward.style.display = '';
                        videoElem.backward.style.display = '';
                    }
                }



            }
        }


        if(videoElem.video.paused){
            videoElem.playPause.children[0].classList.remove('fa-pause');
            videoElem.playPause.children[0].classList.add('fa-play');
        } else {
            videoElem.playPause.children[0].classList.remove('fa-play');
            videoElem.playPause.children[0].classList.add('fa-pause');
        }


    }


    //
    //// Events
    //

    videoElem.playPause.addEventListener('click', playPauseVideo);
    videoElem.stop.addEventListener('click', stopVideo);
    videoElem.forward.addEventListener('click', nextVideo);
    videoElem.backward.addEventListener('click', previousVideo);

    videoElem.video.addEventListener('mouseover', titleShow);
    videoElem.video.addEventListener('mouseout', titleHidd);

    videoElem.video.oncanplay = time;
    videoElem.video.addEventListener('timeupdate', timeUpdate);

    videoElem.playList.onclick = playListControl;
    

    window.onload = function (){
        
        var playListHtml = '';
        for (var i = 0; i < videoBase.length; i++){
            if(i === 0){
                playListHtml += '<div class="video_list"><a class="video_list_name active" href="' + videoBase[i].link + '">' + videoBase[i].title + '</a></div>';
                videoElem.backward.style.display = 'none';
            } else {
                playListHtml += '<div class="video_list"><a class="video_list_name" href="' + videoBase[i].link + '">' + videoBase[i].title + '</a></div>';
            }
        }
        videoElem.playList.innerHTML = playListHtml;

    };



