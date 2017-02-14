"use strict";
class Actor {
    defaultState() {
        return {};
    }
    receive(msg, state, params) {
        const action = this._route[msg];
        return action ? action.call(this, state, params) : state;
    }
    route(name) {
        return name ? this._route[name] : this._route;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Actor;