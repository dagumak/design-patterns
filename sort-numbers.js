// Factory to return a random, a few unique, reversed, etc...
var numbers = function(type) {
    var numbers = new Numbers(1000);
    switch(type) {
        case "reverse":
            // return numbers.getArrayOfReverseNumbers();
            break;
        case "random":
            return numbers.getArrayOfRandomNumbers();
            break;
    }
}

// Class for Numbers
function Numbers(numberOfNumbers) { // constructor
    var numbers = [];

    if(!numberOfNumbers) {
        numberOfNumbers = 100; // default to 100 numbers 
    }
    
    this.getArrayOfRandomNumbers = function() {
        for(var x = 0; x < numberOfNumbers; x++) {
            numbers.push(getRandomInt(0, numberOfNumbers));
        }
        return numbers;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

var thousandRandomNumbers = numbers("random");
console.log(thousandRandomNumbers)
