var Numbers = require('./numbers').Numbers;
var Strategies = require('./strategies');
var StrategyContext = Strategies.StrategyContext;
var MergeSort = Strategies.MergeSort;
var InsertionSort = Strategies.InsertionSort;
var QuickSortRandomPivot = Strategies.QuickSortRandomPivot;

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

/*
    Command Pattern: Invoker
*/
exports.SortCommandInvoker = function() {
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


