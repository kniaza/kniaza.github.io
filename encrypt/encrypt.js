/**
 * Created by Gurami on 02/04/2016.
 */


window.onload = function (){

    var textForm = document.getElementById('text');
    var eod = document.getElementById('encrypt_or_decrypt'); //encrypt_or_decrypt = eod
    var encryptButton = document.getElementById('encrypt');
    var decryptButton = document.getElementById('decrypt');

    function encrypt(text){
        var arr = [];
        if(text.length === 0 || text === null){
            //text = prompt('Sheiyvane sityva');
        } else {

            for(var i = 0;i < text.length;i++){

                arr.push(String.fromCharCode((text.charCodeAt(i) - 77) * 5));

            }
        }

        return arr.join('');
    }


    function decrypt(text) {

        var crypt = [];
        var deCrypt = [];
        for(var i = 0; i < text.length; i++){
            crypt.push(text.charAt(i));
        }

        for(var j = 0; j < crypt.length; j++){
            deCrypt.push(String.fromCharCode((text.charCodeAt(j) / 5) + 77) );

        }

        return deCrypt.join('');
    }



    encryptButton.onclick = function (){
        eod.value = encrypt(textForm.value);
    };

    decryptButton.onclick = function (){
        eod.value = decrypt(textForm.value);
    };



//
//console.log(encrypt(text));
//console.log(decrypt(encrypt(text)));



};