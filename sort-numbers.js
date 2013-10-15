(function() {
    /***************************************************
        Class dependencies
    ****************************************************/
    var Commands = require('./commands');
    var SortCommandInvoker = Commands.SortCommandInvoker;
    var MergeSortCommand = Commands.MergeSortCommand;
    var InsertionSortCommand = Commands.InsertionSortCommand;
    var QuickSortRandomPivotCommand = Commands.QuickSortRandomPivotCommand;


    /*
        Run     
    */
    var sortCommandInvoker = new SortCommandInvoker();
    sortCommandInvoker.storeAndExecute(new MergeSortCommand());
    sortCommandInvoker.storeAndExecute(new InsertionSortCommand());
    sortCommandInvoker.storeAndExecute(new QuickSortRandomPivotCommand());


})();
