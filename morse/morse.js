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
            '=': '-...-'
        };

        this.init();
    }
    MorseTranslator.prototype.init = function(){
        
    };

    MorseTranslator.prototype.textToMorse = function(){



    };


    var morse = new MorseTranslator();
    console.log(morse);
};