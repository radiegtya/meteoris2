/* Ledger */
Router.route('ledger', function() {
    Router.go('ledgerIndex');
});
Router.route('ledger/index/:limit?/', {
    name: 'ledgerIndex',
    controller: LedgerController,
    action: 'index',
});
Router.route('ledger/insert/', {
    name: 'ledgerInsert',
    controller: LedgerController,
    action: 'insert',
});
Router.route('ledger/update/:_id?', {
    name: 'ledgerUpdate',
    controller: LedgerController,
    action: 'update',
});
Router.route('ledger/view/:_id?', {
    name: 'ledgerView',
    controller: LedgerController,
    action: 'view',
});
/* EOF Ledger */