var Numbers = require('../numbers').Numbers
    , StrategyInterface = require('../strategy').StrategyInterface;

var QuickSortRandomPivot = function() {}
QuickSortRandomPivot.prototype = new StrategyInterface();
QuickSortRandomPivot.prototype.sort = function(numbersArray, beginning, end, tempArray) {
    function swapElements(array, indexI, indexJ) {
        var temp = array[indexI];
        array[indexI] = array[indexJ];
        array[indexJ] = temp;
    }

    function partition(arrayOfNumbers, first, last, pivotIndex) {
        var pivotValue = arrayOfNumbers[pivotIndex];

        // Move pivot element to the last spot
        swapElements(arrayOfNumbers, pivotIndex, last);

        var i = first; 

        // One over from the right to exclude the pivot element
        for(var j = first; j < last; j++ ) {
            if(arrayOfNumbers[j] < pivotValue) {
                swapElements(arrayOfNumbers, i, j);
                i++;
            }
        }

        // Move element to where it belongs
        swapElements(arrayOfNumbers, i, last);
        return i;
    }
    
    function QuickSortRandomPivot(arrayOfNumbers, first, last) {
        if( first < last ) {
            var pivotIndex = new Numbers(arrayOfNumbers.length).getRandomInt(first, last);
            var newPivotIndex = partition(arrayOfNumbers, first, last, pivotIndex);
            QuickSortRandomPivot(arrayOfNumbers, first, newPivotIndex-1);
            QuickSortRandomPivot(arrayOfNumbers, newPivotIndex+1, last);
        }
        return arrayOfNumbers;
    }

    var start = new Date().getTime();
    var sortedNumbers = QuickSortRandomPivot(numbersArray, 0, numbersArray.length-1);
    var end = new Date().getTime();

    console.log("QuickSortRandomPivot (",this.numberWithCommas(numbersArray.length),"numbers ): ", end - start, " ms");
};

exports.QuickSortRandomPivot = QuickSortRandomPivot;