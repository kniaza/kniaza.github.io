/**
 * Created by Gurami on 06/04/2016.
 */


window.onload = function(){

    function elemId(selector){
        return document.getElementById(selector);
    }

    function Calculator (){

        this.domElem = {
            answer: elemId('answer'),
            action: elemId('container_action'),
            num: elemId('container_num'),
            clear: elemId('clear')
        };

        this.answer = [];


        this.init();

    }


    Calculator.prototype.init = function (){
        this.clickButton();
    };



    Calculator.prototype.clickButton = function (){
        var __self = this;

        this.domElem.num.onclick = function (e){
            if (e.target.id === 'num_dot'){
                var lastElem = __self.answer[__self.answer.length - 1];
                
                if(lastElem === '.'){
                    __self.answer[__self.answer.length - 1] = e.target.innerHTML;
                    console.log(true);
                } else {
                    __self.setAnswer(e.target.innerHTML);
                }
                __self.render();
            } else if (e.target.id.slice(0,3) === 'num'){
                __self.setAnswer(e.target.innerHTML);
                __self.render();
            }
        };

        this.domElem.action.onclick = function (e){
            if (e.target.id.slice(0,6) === 'action'){
                if(e.target.innerHTML === '='){
                    var total = __self.getEqual();
                }

                var lastElem = __self.answer[__self.answer.length - 1];
                if(lastElem === '+' || lastElem === '-' || lastElem === '/' || lastElem === '*'){
                    __self.answer[__self.answer.length - 1] = e.target.innerHTML;
                    console.log(true);
                } else {
                    __self.setAnswer(e.target.innerHTML);
                }

                if(total) {
                    __self.answer = [];
                    __self.setAnswer(total);
                }

                __self.render();
            }
        };

        this.domElem.clear.onclick = function (){
            if(__self.answer.length > 0){
                __self.answer.pop();
                if(__self.answer.length === 0) {
                    __self.domElem.answer.innerHTML = 0;
                } else {
                    __self.render();
                }
            }
        };



    };


    Calculator.prototype.setAnswer = function (query){

            this.answer.push(query);

    };


    Calculator.prototype.getEqual = function (){
        var total = eval(this.answer.join(''));
        return total;
    };


    Calculator.prototype.render = function (){
        this.domElem.answer.innerHTML = this.answer.join('');
    };



    window.calc = new Calculator();


};