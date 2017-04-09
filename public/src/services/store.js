function Store(name) {
    this.name = name;
    this.state = {};
    this.subscribers = {};
}

Store.stores = {};

Store.init = function(name) {
    Store.stores[name] = new Store(name);
    return Store.stores[name];
}

Store.get = function (name) {
    if (!Store.stores[name]) {
        Store.init(name);
    }

    return Store.stores[name];
}

Store.prototype.set = function(prop, value) {
    this.state[prop] = value;
    this.update(prop);
}

Store.prototype.get = function(prop) {
    return this.state[prop];
}

Store.prototype.subscribe = function(prop, cb) {
    if (!this.subscribers[prop]) {
        this.subscribers[prop] = [];
    }
    this.subscribers[prop].push(cb);
}

Store.prototype.notify = function (prop, value) {
    this.dispatch(prop, value);
}

Store.prototype.dispatch = function(prop, value) {
    if (this.subscribers[prop]) {
        this.subscribers[prop].forEach(function(element) {
            setTimeout(_ => element(value), 0);
        });
    }
}

Store.prototype.update = function(prop) {
    let modelName = this.name + '.' + prop;
    $(`[model="${modelName}"]`).text(this.state[prop]);
    this.dispatch(prop, this.state[prop])
}

module.exports = Store;
