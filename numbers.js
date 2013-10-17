exports.Numbers = function(numberOfNumbers, type) { 
    // constructor
    var numbers = [];

    if(!numberOfNumbers) {
        numberOfNumbers = 100; // default to 100 numbers 
    }

    
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    switch(type) {
        case "reverse":
            // return numbers.getArrayOfReverseNumbers();
            break;
        case "random":
            return getArrayOfRandomNumbers.call(this);
            break;
    }

    // Private
    function getArrayOfRandomNumbers() {
        while(numberOfNumbers) {
            numbers.push(this.getRandomInt(0, numberOfNumbers));
            numberOfNumbers--;
        }
        return numbers;
    }

}
