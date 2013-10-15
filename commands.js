var Numbers = require('./numbers').Numbers;
var Strategies = require('./strategies');
var StrategyContext = Strategies.StrategyContext;
var MergeSort = Strategies.MergeSort;
var InsertionSort = Strategies.InsertionSort;
var QuickSortRandomPivot = Strategies.QuickSortRandomPivot;


/***************************************************
    Factory Pattern
    Will return different orders of numbers depending on the caller
****************************************************/


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

exports.MergeSortCommand = MergeSortCommand;
exports.InsertionSortCommand = InsertionSortCommand;
exports.QuickSortRandomPivotCommand = QuickSortRandomPivotCommand;

/*
    Command Pattern: Invoker
*/
exports.SortCommandInvoker = function() {
    var arrayOfCommands = []
    this.storeAndExecute = function(command) {
        if(!(command instanceof CommandInterface)) {
            throw "This is not a valid command";
        }
        arrayOfCommands.push(command);
        command.execute();
    }
}


