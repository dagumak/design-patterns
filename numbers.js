exports.Numbers = function(numberOfNumbers) { 
    // constructor
    var numbers = [];

    if(!numberOfNumbers) {
        numberOfNumbers = 100; // default to 100 numbers 
    }
    
    this.getArrayOfRandomNumbers = function() {
        while(numberOfNumbers) {
            numbers.push(this.getRandomInt(0, numberOfNumbers));
            numberOfNumbers--;
        }
        return numbers;
    }

    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
