/*
    Strategy Pattern        
    This is the receiver for the command pattern which is abstracted out further to use the 
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

exports.StrategyInterface = StrategyInterface;
exports.StrategyContext = StrategyContext;


