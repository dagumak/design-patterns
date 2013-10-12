(function() {
    // Factory to return a random, a few unique, reversed, etc...
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



    // Command pattern to invoke algorithms

    // Invoker
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


    // Receiver


    // Command Interface
    function CommandInterface() {}
    CommandInterface.prototype.execute = function() {
        throw "Must implement the execute function";
    }

    // Concrete Commands
    var SortCommand = function() {}
    SortCommand.prototype = new CommandInterface();

    var MergeSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    }

    MergeSortCommand.prototype = new SortCommand();
    MergeSortCommand.prototype.execute = function() {
        // execute the number sorting
        console.log("MergeSort: ", this.numbers.length);
    }

    var InsertionSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    }

    InsertionSortCommand.prototype = new SortCommand();
    InsertionSortCommand.prototype.execute = function() {
        // execute the number sorting
        console.log("InsertionSort: ", this.numbers.length);
    }

    var SelectionSortCommand = function() {
        // Constructor
        this.numbers = thousandNumbers("random");
    }
    SelectionSortCommand.prototype = new SortCommand();
    SelectionSortCommand.prototype.execute = function() {
        // execute the number sorting
        console.log("SelectionSort: ", this.numbers.length);
    }

    var sortCommandInvoker = new SortCommandInvoker();
    sortCommandInvoker.storeAndExecute(new MergeSortCommand());
    sortCommandInvoker.storeAndExecute(new InsertionSortCommand());
    sortCommandInvoker.storeAndExecute(new SelectionSortCommand());
})();

