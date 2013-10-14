(function() {

    /***************************************************
        Factory Pattern
        Will return different orders of numbers depending on the caller
    ****************************************************/
    function Numbers(numberOfNumbers) { 
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

    var numbers = function(numberOfNumbers, type) {
        var numbers = new Numbers(numberOfNumbers);

        switch(type) {
            case "reverse":
                // return numbers.getArrayOfReverseNumbers();
                break;
            case "random":
                return numbers.getArrayOfRandomNumbers();
                break;
        }
    }



    
    /***************************************************
        Command Pattern and Strategy Pattern
        This is used to run commands that sort numbers
    ****************************************************/
    
    /*
        Command Pattern: Receiver
    */
    function SortCommandInvoker() {
        var arrayOfCommands = []
        this.storeAndExecute = function(command) {
            if(!(command instanceof CommandInterface)) {
                throw "This is not a valid command";
            }
            arrayOfCommands.push(command);
            command.execute();
        }
    }

    /*
        Command Pattern: Receiver and Strategy Pattern        
        This is the received for the command pattern which is abstracted out further to use the 
        strategy pattern
    */
    function StrategyInterface() {}
    StrategyInterface.prototype.sort = function(numbers) { 
        // The subclass will shadow this function thus emulating an interface behaviour
        throw "Must implement algorithm function";
    }       
    StrategyInterface.prototype.numberWithCommas = function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function StrategyContext(strategy) {
        this.strategy = strategy;    
    }
    StrategyContext.prototype.executeStrategy = function(numbers) {
        this.strategy.sort(numbers);
    };

    var MergeSort = function() {}
    MergeSort.prototype = new StrategyInterface();
    MergeSort.prototype.sort = function(numbersArray) {
        function TopDownSplitMerge(arrayOfNumbers) {     
            var length = arrayOfNumbers.length
            var middleIndex = parseInt(length/2);

            if(length <= 1) {
                return arrayOfNumbers;
            }                       

            // Split left side
            var left = TopDownSplitMerge(arrayOfNumbers.slice(0, middleIndex));  

            // Split right side
            var right = TopDownSplitMerge(arrayOfNumbers.slice(middleIndex, length));   

            // Merge every back together
            return TopDownMerge(left, right);
        }
         
        function TopDownMerge(left, right) {
            var results = [], 
                leftLength = left.length, 
                rightLength = right.length
                

            for(var leftIndex = 0, rightIndex = 0; leftIndex < leftLength || rightIndex < rightLength; ) {
                // If left/right is empty, then keep pushing the other side
                if(leftIndex < leftLength && rightIndex < rightLength) { 
                    if(left[leftIndex] <= right[rightIndex]) {
                       results.push(left[leftIndex]);
                       leftIndex++; 
                    } else {
                       results.push(right[rightIndex]);
                       rightIndex++;
                    }
                } else if(leftIndex < leftLength) {
                   results.push(left[leftIndex]);
                   leftIndex++; 
                } else {
                   results.push(right[rightIndex]);
                   rightIndex++;
                }
                    
            }

            return results;
        }

        var start = new Date().getTime();
        var sortedNumbers = TopDownSplitMerge(numbersArray);
        var end = new Date().getTime();

        console.log("MergeSort (",this.numberWithCommas(numbersArray.length),"numbers ): ", end - start, " ms");
    };

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

    /*
        Command Pattern: Command Interface
        Used to enforce the implementation of execute. Also, used for tagging objects; The invoker 
        will only run commands that are an instance of this interface.
    */
    function CommandInterface() {}
    CommandInterface.prototype.execute = function() {
        throw "Must implement the execute function";
    };

    /*
        Command Pattern: Concrete Commands
        Used to enforce the implementation of execute. Also, used for tagging objects; The invoker 
        will only run commands that are an instance of this interface.
    */
    var SortCommand = function() {};
    SortCommand.prototype = new CommandInterface();

    var MergeSortCommand = function() {};
    MergeSortCommand.prototype = new SortCommand();
    MergeSortCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new MergeSort());
        strategyContext.executeStrategy(numbers(10000000, "random"));
    };

    var InsertionSortCommand = function() {};
    InsertionSortCommand.prototype = new SortCommand();
    InsertionSortCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new InsertionSort());
        strategyContext.executeStrategy(numbers(10000, "random"));
    };

    var QuickSortRandomPivotCommand = function() {};
    QuickSortRandomPivotCommand.prototype = new SortCommand();
    QuickSortRandomPivotCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new QuickSortRandomPivot());
        strategyContext.executeStrategy(numbers(10000000, "random"));
    };    

    /*
        Run     
    */
    var sortCommandInvoker = new SortCommandInvoker();
    sortCommandInvoker.storeAndExecute(new MergeSortCommand());
    sortCommandInvoker.storeAndExecute(new InsertionSortCommand());
    sortCommandInvoker.storeAndExecute(new QuickSortRandomPivotCommand());


})();
