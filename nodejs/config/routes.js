'use strict';


module.exports = function(app) {
    var todoList = require('../controller/controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/users/:user_id')
        .get(todoList.findUsers);

    app.route('/users')
        .post(todoList.createUsers);

    app.route('/users')
        .put(todoList.updateUsers);
    
    app.route('/users')
        .delete(todoList.deleteUsers);

    app.route('/getPerson')
    	.post(todoList.getPerson);

    app.route('/getCustomerFromOracle')
        .get(todoList.getCustomer);

     app.route('/findCustomer')
        .post(todoList.findCustomer);

    app.route('/insertCustomer')
        .post(todoList.insertCustomer);
};