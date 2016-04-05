/**
 * Created by Gurami on 05/04/2016.
 */

window.onload = function(){

    function MorseTranslator(){
        this.domElem = {
            TtoM: document.getElementById('encrypt'), // Text to morse
            MtoT: document.getElementById('decrypt'), // Morse to text
            text: document.getElementById('text'), // text area
            MorT: document.getElementById('morse_or_text') // morse or text area
        };
        this.match = '^[a-zA-Z0-9]+$';
        this.alphabet = {
            a: '.-',
            b: '-...',
            c: '-.-.',
            d: '-..',
            e: '.',
            f: '..-.',
            g: '--.',
            h: '....',
            i: '..',
            j: '.---',
            k: '-.-',
            l: '.-..',
            m: '--',
            n: '-.',
            o: '---',
            p: '.--.',
            q: '--.-',
            r: '.-.',
            s: '...',
            t: '-',
            u: '..-',
            v: '...-',
            w: '.--',
            x: '-..-',
            y: '-.--',
            z: '--..',
            1: '.----',
            2: '..---',
            3: '...--',
            4: '....-',
            5: '.....',
            6: '-....',
            7: '--...',
            8: '---..',
            9: '----.',
            0: '-----',
            '.': '.-.-.-',
            ',': '--..--',
            ':': '---...',
            '?': '..--..',
            '\'': '.----.',
            '-': '-....-',
            '/': '-..-.',
            ')': '-.--.-',
            '(': '-.--.-',
            '\"': '.-..-.',
            '@': '.--.-.',
            '=': '-...-',
            '\u00A0': ' / ' // this.alphabet["\u00A0"]
        };

        this.init();
    }
    MorseTranslator.prototype.init = function (){
        this.clickTextToMorse();
        this.clickMorseToText();
    };

    MorseTranslator.prototype.textToMorse = function (text){
        var __self = this;
        text = text.split('');

        var result = text.map(function(item){
            if(item === " " || item === '\n') item = "\u00A0";
            else item = item.toLowerCase();
            return __self.alphabet[item];
        });

        return result.join(' ');
    };

    MorseTranslator.prototype.clickTextToMorse = function (){
        var __self = this;

        this.domElem.TtoM.onclick = function(){
            var text = __self.domElem.text.value;
            __self.domElem.MorT.value = __self.textToMorse(text);
        };

    };

    MorseTranslator.prototype.morseToText = function (text){
        var __self = this;
        text = text.split(' ');
        var result = text.map(function(item){

            if(item === '/') {
                item = '\u00A0';
            } else {
                for(var i in __self.alphabet){
                    if(__self.alphabet[i] === item){
                        item = i;
                    }
                }
            }

            return item;
        });
        return result.join('');
    };

    MorseTranslator.prototype.clickMorseToText = function (){
        var __self = this;


        this.domElem.MtoT.onclick = function (){
            var text = __self.domElem.text.value;
            __self.domElem.MorT.value = __self.morseToText(text);
        };
    };


    var morse = new MorseTranslator();
    console.log(morse);
};