var Numbers = require('../numbers').Numbers
    , StrategyInterface = require('../strategy').StrategyInterface;

var InsertionSort = function() {}
InsertionSort.prototype = new StrategyInterface();
InsertionSort.prototype.sort = function(numbersArray, beginning, end, tempArray) {
    function InsertionSort(arrayOfNumbers) {
        for(var x = 0; x < arrayOfNumbers.length; x++) {
            var valueToInsert = arrayOfNumbers[x];
            var indexHole = x;

            while(indexHole > 0 && valueToInsert < arrayOfNumbers[indexHole-1]) {
                arrayOfNumbers[indexHole] = arrayOfNumbers[indexHole-1];
                indexHole = indexHole - 1;
            }

            arrayOfNumbers[indexHole] = valueToInsert;
        }
        return arrayOfNumbers;
    }

    var start = new Date().getTime();
    var sortedNumbers = InsertionSort(numbersArray);
    var end = new Date().getTime();

    console.log("InsertionSort (",this.numberWithCommas(numbersArray.length),"numbers ): ", end - start, " ms");
};

exports.InsertionSort = InsertionSort;