"use strict";
let id = 0;
class QueryLang {
    constructor(name, lang) {
        this._id = ++id;
        this._name = name;
        this._lang = lang;
    }
    id() {
        return this._id;
    }
    name() {
        return this._name;
    }
    lang() {
        return this._lang;
    }
}
//expose
function QL(name, lang) {
    return new QueryLang(name, lang);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QL;
