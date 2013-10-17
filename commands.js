var Numbers = require('./numbers').Numbers
    , StrategyContext = require('./strategy').StrategyContext
    , MergeSort = require('./sorting-algorithms/mergesort').MergeSort
    , InsertionSort = require('./sorting-algorithms/insertionsort').InsertionSort
    , QuickSortRandomPivot = require('./sorting-algorithms/quicksort').QuickSortRandomPivot;

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
    Command Pattern: Invoker
*/
var SortCommandInvoker = function() {
    var arrayOfCommands = []
    this.store = function(command) {
        if(!(command instanceof CommandInterface)) {
            throw "This is not a valid command";
        }
        arrayOfCommands.push(command);
    }

    this.execute = function() {
        arrayOfCommands.forEach(function(command, index, array) {
            command.execute();
        })    
    }
}

exports.SortCommandInvoker = SortCommandInvoker;


/*
    Command Pattern: Concrete Commands
    Used to enforce the implementation of execute. Also, used for tagging objects; The invoker 
    will only run commands that are an instance of this interface.
*/

var MergeSortCommand = function() {};
MergeSortCommand.prototype = new CommandInterface();
MergeSortCommand.prototype.execute = function() {
    var strategyContext = new StrategyContext(new MergeSort());
    strategyContext.executeStrategy(new Numbers(10000000, "random"));
};

var InsertionSortCommand = function() {};
InsertionSortCommand.prototype = new CommandInterface();
InsertionSortCommand.prototype.execute = function() {
    var strategyContext = new StrategyContext(new InsertionSort());
    strategyContext.executeStrategy(new Numbers(10000, "random"));
};

var QuickSortRandomPivotCommand = function() {};
QuickSortRandomPivotCommand.prototype = new CommandInterface();
QuickSortRandomPivotCommand.prototype.execute = function() {
    var strategyContext = new StrategyContext(new QuickSortRandomPivot());
    strategyContext.executeStrategy(new Numbers(10000000, "random"));
};   

exports.MergeSortCommand = MergeSortCommand;
exports.InsertionSortCommand = InsertionSortCommand;
exports.QuickSortRandomPivotCommand = QuickSortRandomPivotCommand;




