/**
 * Created by kniaza on 3/29/16.
 */


$(function(){

    function Gunman(){

        //Dom Elements
        this.domElem = {
            charNode : $('#character'),
            scoreYou : $('#score .you').find('.you_score'),
            scoreGunman : $('#score .gunman').find('.gunman_score'),
            money : $('#reward .money'),
            alertBlock : $('#alert')
        };


        this.audio = {
            start : new Audio('sfx/intro.m4a'),
            fire : new Audio('sfx/fire.m4a'),
            shotExe : new Audio('sfx/shot.m4a'),
            win : new Audio('sfx/win.m4a'),
            shotFail : new Audio('sfx/shot-fall.m4a'),
            death : new Audio('sfx/death.m4a')
        };

        this.ls = localStorage;

        //TODO: localstorgeshi shevinaxot angarishebi da tanxa

        // Character parametrs
        this.character = {
            1: {
                charUrl : 'images/char1.png',
                charSize: 1370, // percentage
                posX : [0,68,135,205,275,343,415,483,553,624,695,763],
                width : 0,
                height : 0
            },
            2: {
                charUrl : 'images/char2.png',
                charSize: 1370, // percentage
                posX : [],
                width : 0,
                height : 0
            },
            3: {
                charUrl : 'images/char3.png',
                charSize: 1370, // percentage
                posX : [],
                width : 55,
                height : 0
            },
            4: {
                charUrl : 'images/char4.png',
                charSize: 1370, // percentage
                posX : [],
                width : 0,
                height : 0
            },
            5: {
                charUrl : 'images/char5.png',
                charSize: 1370, // percentage
                posX : [],
                width : 0,
                height : 0
            }
        };

        $('.reload').click(function(){
            location.reload();
        });


        this.init();


    }

    Gunman.prototype.init = function() {
        // console.log(this.domElem.scoreGunman.find('.gunman_score'));
        this.charMove(1);
        this.render();
    };

    Gunman.prototype.charMove = function(charN){
        this.audio.start.play();
        var __self = this,
            position = -70,
            step = 0,
            clickAllow = false;
        this.move = setInterval(move,200);
        function move(){
            if(step % 2 === 0) {
               __self.getCharPos(charN,0);
            } else {
                __self.getCharPos(charN,1);
            }
            if(position === 350) {
                __self.getCharPos(charN,3);
                clickAllow = true;

                clearInterval(__self.move);
            }
            __self.domElem.charNode[0].style.right = position  + 'px';
            position += 20;
            step++;
        }
        this.charClick(clickAllow);
        setTimeout(function(){
            // console.log('Fire!');
            __self.audio.start.pause();
            __self.audio.fire.play();
            __self.domElem.charNode.unbind('click');
            __self.alertBlock('Fire !!!');
            __self.charClick(clickAllow,charN);
            __self.getCharPos(charN,6);
            __self.timeOut(1000,charN);


        },6000);

    };

    Gunman.prototype.charClick = function (bool,charN){
        var __self = this;

        this.domElem.charNode.click(function(){
            __self.audio.fire.pause();
            __self.audio.shotExe.play();
            if(bool === true){
                var charLossPos = 10;
                // console.log('Win');
                __self.alertBlock('You Win !');
                __self.setYouScore(true);
                __self.setMoney('win');
                clearTimeout(__self.lossTime);

                setTimeout(function(){
                    __self.audio.shotExe.pause();
                    __self.audio.win.play();
                },800);
                var shot = setInterval(function(){
                    __self.getCharPos(charN,charLossPos);
                    charLossPos++;
                    if(charLossPos === 12) clearInterval(shot);
                },200);



            } else {
                // console.log("You Loss");
                __self.alertBlock('You Loss !');
                __self.setGunmanScore(true);
                __self.setMoney('loss');
                __self.audio.death.play();
                clearInterval(__self.move);
                setTimeout(function(){
                    location.reload();
                },4000);
            }

        });

    };

    Gunman.prototype.timeOut = function (time,charN){
        var __self = this;
        var charLossPos = 7;
        this.lossTime = setTimeout(function(){
            // console.log('You Loss');
            __self.alertBlock('You Loss !!');
            __self.setGunmanScore(true);
            __self.setMoney('loss');
            __self.domElem.charNode.unbind('click');
            __self.audio.death.play();
            var shot = setInterval(function(){
                __self.getCharPos(charN,charLossPos);
                charLossPos++;
                if(charLossPos === 10) {
                    __self.getCharPos(charN,3);
                    $('body').addClass('game_space');
                    clearInterval(shot);
                }
            },500);


        },time);
    };

    Gunman.prototype.getCharPos = function (charN,charPos){
        return this.domElem.charNode[0].style.backgroundPositionX = -(this.character[charN].posX[charPos]) + 'px';
    };

    Gunman.prototype.alertBlock = function (text){
        this.domElem.alertBlock[0].style.display = 'inline-block';
        this.domElem.alertBlock.text(text);
    };

    Gunman.prototype.setYouScore = function (bool){
        var youScore = +this.ls.getItem('YouScore');
        // console.log(youScore);
        if(youScore === 0){
            this.ls.setItem('YouScore',1);
        } else if(bool){
            youScore++;
            this.ls.setItem('YouScore',youScore);
            this.domElem.scoreYou.text(this.ls.getItem('YouScore'));
        } else if(bool === false){
            this.domElem.scoreYou.text(this.ls.getItem('YouScore'));
        }

    };

    Gunman.prototype.setGunmanScore = function (bool){
        var gunmanScore = +this.ls.getItem('GunmanScore');

        if(gunmanScore === 0){
            this.ls.setItem('GunmanScore',1);
        } else if(bool){
            gunmanScore++;
            this.ls.setItem('GunmanScore',gunmanScore);
            this.domElem.scoreGunman.text(this.ls.getItem('GunmanScore'));
        } else if(bool === false){
            this.domElem.scoreGunman.text(this.ls.getItem('GunmanScore'));
        }
    };

    Gunman.prototype.setMoney = function (status){
        var money = +this.ls.getItem('Money');
        if(money === 0){
            this.ls.setItem('Money',0);
        }
        if(status === 'win'){
            money += 100;
            this.ls.setItem('Money',money);
            this.domElem.money.text(this.ls.getItem('Money'));
        } else if(status === 'loss'){
            money -= 100;
            this.ls.setItem('Money',money);
            this.domElem.money.text(this.ls.getItem('Money'));
        } else if(status === false){
            this.domElem.money.text(this.ls.getItem('Money'));
        }

    };

    Gunman.prototype.render = function(){
        this.setGunmanScore(false);
        this.setYouScore(false);
        this.setMoney(false);
    };


    window.gunman = new Gunman();



});
































// var start = new Audio('sfx/intro.m4a');
// var wait = new Audio('sfx/wait.m4a');
// var shot = new Audio('sfx/fire.m4a');
//
// // tu moxvda
// var shotExe = new Audio('sfx/shot.m4a');
// var win = new Audio('sfx/win.m4a');
// // tu ar moxvda
// var shotFail = new Audio('sfx/shot-fall.m4a');
// var death = new Audio('sfx/death.m4a');
//
//
// var end = new Audio('sfx/death.m4a');


//setInterval(function(){wait.play()},Math.round(wait.duration * 1000))
////////
///////shot.play();setTimeout(function(){wait.play()},Math.round(shot.duration * 1000));
///////

//        Loop music
//        shot.loop = true; shot.play()