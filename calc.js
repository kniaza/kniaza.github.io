var calc = new Calculator();
function Calculator(){
   return this.calc;
}
calc = {
  a: 0,
  b: 0,
  op: '',
  calculate: function (str){
    var operation = str.split(' ');
    this.a = +operation[0];
    this.b = +operation[2];
    this.op = operation[1];
    
    if(this[this.op]){
      return this[this.op](this.a,this.b);
    } else {
      return "is not have operation";
    }
  },
  
  '+': function (a,b){
    return a + b;
  },
  '-': function (a,b){
    return a - b;
  },
  addMethod: function (op,func){
    this[op] = func;
  }
  
};

console.log( calc.calculate('3 + 7') );



calc.addMethod('*', function(a, b) {
  return a * b;
});
calc.addMethod('/', function(a, b) {
  return a / b;
});
calc.addMethod('^', function(a, b) {
  return Math.pow(a, b);
});


var result = calc.calculate('16 / 3');
console.log( result );




