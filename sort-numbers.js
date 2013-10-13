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
            for(var x = 0; x < numberOfNumbers; x++) {
                numbers.push(getRandomInt(0, numberOfNumbers));
            }
            return numbers;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }

    var thousandNumbers = function(type) {
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

    function StrategyContext(strategy) {
        this.strategy = strategy;    
    }
    StrategyContext.prototype.executeStrategy = function(numbers) {
        this.strategy.sort(numbers);
    };

    var MergeSort = function() {}
    MergeSort.prototype = new StrategyInterface();
    MergeSort.prototype.sort = function(numbersArray, beginning, end, tempArray) {
        // Implement Algorithm
        console.log("MergeSort: ", numbersArray.length);
    };

    var InsertionSort = function() {}
    InsertionSort.prototype = new StrategyInterface();
    InsertionSort.prototype.sort = function(numbersArray, beginning, end, tempArray) {
        // Implement Algorithm
        console.log("InsertionSort: ", numbersArray.length);
    };

    var SelectionSort = function() {}
    SelectionSort.prototype = new StrategyInterface();
    SelectionSort.prototype.sort = function(numbersArray, beginning, end, tempArray) {
        // Implement Algorithm
        console.log("SelectionSort: ", numbersArray.length);
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

    var MergeSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    };
    MergeSortCommand.prototype = new SortCommand();
    MergeSortCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new MergeSort());
        strategyContext.executeStrategy(this.numbers);
    };

    var InsertionSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    };
    InsertionSortCommand.prototype = new SortCommand();
    InsertionSortCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new InsertionSort());
        strategyContext.executeStrategy(this.numbers);
    };

    var SelectionSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    };
    SelectionSortCommand.prototype = new SortCommand();
    SelectionSortCommand.prototype.execute = function() {
        var strategyContext = new StrategyContext(new SelectionSort());
        strategyContext.executeStrategy(this.numbers);
    };


    /*
        Run     
    */
    var sortCommandInvoker = new SortCommandInvoker();
    sortCommandInvoker.storeAndExecute(new MergeSortCommand());
    sortCommandInvoker.storeAndExecute(new InsertionSortCommand());
    sortCommandInvoker.storeAndExecute(new SelectionSortCommand());
})();
