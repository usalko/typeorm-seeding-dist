"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
var tslib_1 = require("tslib");
var Faker = require("faker");
var factory_util_1 = require("./utils/factory.util");
var log_util_1 = require("./utils/log.util");
var connection_1 = require("./connection");
var EntityFactory = /** @class */ (function () {
    function EntityFactory(name, entity, factory, context) {
        this.name = name;
        this.entity = entity;
        this.factory = factory;
        this.context = context;
    }
    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------
    /**
     * This function is used to alter the generated values of entity, before it
     * is persist into the database
     */
    EntityFactory.prototype.map = function (mapFunction) {
        this.mapFunction = mapFunction;
        return this;
    };
    /**
     * Make a new entity, but does not persist it
     */
    EntityFactory.prototype.make = function (overrideParams) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.makeEnity(overrideParams, false)];
            });
        });
    };
    /**
     * Create makes a new entity and does persist it
     */
    EntityFactory.prototype.create = function (overrideParams, saveOptions) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var option, connection, em, entity, error_1, message, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, connection_1.getConnectionOptions)()];
                    case 1:
                        option = _a.sent();
                        return [4 /*yield*/, (0, connection_1.createConnection)(option)];
                    case 2:
                        connection = _a.sent();
                        if (!(connection && connection.isConnected)) return [3 /*break*/, 8];
                        em = connection.createEntityManager();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.makeEnity(overrideParams, true)];
                    case 4:
                        entity = _a.sent();
                        return [4 /*yield*/, em.save(entity, saveOptions)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_1 = _a.sent();
                        message = 'Could not save entity';
                        (0, log_util_1.printError)(message, error_1);
                        throw new Error(message);
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        message = 'No db connection is given';
                        (0, log_util_1.printError)(message);
                        throw new Error(message);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    EntityFactory.prototype.makeMany = function (amount, overrideParams) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, index, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        list = [];
                        index = 0;
                        _c.label = 1;
                    case 1:
                        if (!(index < amount)) return [3 /*break*/, 4];
                        _a = list;
                        _b = index;
                        return [4 /*yield*/, this.make(overrideParams)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, list];
                }
            });
        });
    };
    EntityFactory.prototype.createMany = function (amount, overrideParams, saveOptions) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, index, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        list = [];
                        index = 0;
                        _c.label = 1;
                    case 1:
                        if (!(index < amount)) return [3 /*break*/, 4];
                        _a = list;
                        _b = index;
                        return [4 /*yield*/, this.create(overrideParams, saveOptions)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, list];
                }
            });
        });
    };
    EntityFactory.prototype.seed = function (overrideParams) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                (0, log_util_1.printWarning)('The seed() method is deprecated please use the create() method instead');
                return [2 /*return*/, this.create(overrideParams)];
            });
        });
    };
    EntityFactory.prototype.seedMany = function (amount, overrideParams) {
        if (overrideParams === void 0) { overrideParams = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                (0, log_util_1.printWarning)('The seedMany() method is deprecated please use the createMany() method instead');
                return [2 /*return*/, this.createMany(amount, overrideParams)];
            });
        });
    };
    // -------------------------------------------------------------------------
    // Private Helpers
    // -------------------------------------------------------------------------
    EntityFactory.prototype.makeEnity = function (overrideParams, isSeeding) {
        if (overrideParams === void 0) { overrideParams = {}; }
        if (isSeeding === void 0) { isSeeding = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entity, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.factory) {
                            throw new Error('Could not found entity');
                        }
                        entity = this.resolveEntity(this.factory(Faker, this.context), isSeeding);
                        if (!this.mapFunction) return [3 /*break*/, 2];
                        _a = this.mapFunction;
                        return [4 /*yield*/, entity];
                    case 1:
                        entity = _a.apply(this, [_b.sent()]);
                        _b.label = 2;
                    case 2: return [2 /*return*/, entity.then(function (value) {
                            for (var key in overrideParams) {
                                if (overrideParams.hasOwnProperty(key)) {
                                    value[key] = overrideParams[key];
                                }
                            }
                            return value;
                        })];
                }
            });
        });
    };
    EntityFactory.prototype.resolveEntity = function (entity, isSeeding) {
        if (isSeeding === void 0) { isSeeding = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _i, attribute, _d, _e, subEntityFactory, _f, _g, _h, _j, error_2, message;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = entity;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _k.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 11];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 10];
                        attribute = _c;
                        if (!entity.hasOwnProperty(attribute)) {
                            return [3 /*break*/, 10];
                        }
                        if (!(0, factory_util_1.isPromiseLike)(entity[attribute])) return [3 /*break*/, 3];
                        _d = entity;
                        _e = attribute;
                        return [4 /*yield*/, entity[attribute]];
                    case 2:
                        _d[_e] = _k.sent();
                        _k.label = 3;
                    case 3:
                        if (!(entity[attribute] &&
                            typeof entity[attribute] === 'object' &&
                            entity[attribute].constructor.name === EntityFactory.name)) return [3 /*break*/, 10];
                        subEntityFactory = entity[attribute];
                        _k.label = 4;
                    case 4:
                        _k.trys.push([4, 9, , 10]);
                        if (!isSeeding) return [3 /*break*/, 6];
                        _f = entity;
                        _g = attribute;
                        return [4 /*yield*/, subEntityFactory.create()];
                    case 5:
                        _f[_g] = _k.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        _h = entity;
                        _j = attribute;
                        return [4 /*yield*/, subEntityFactory.make()];
                    case 7:
                        _h[_j] = _k.sent();
                        _k.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _k.sent();
                        message = "Could not make ".concat(subEntityFactory.name);
                        (0, log_util_1.printError)(message, error_2);
                        throw new Error(message);
                    case 10:
                        _i++;
                        return [3 /*break*/, 1];
                    case 11: return [2 /*return*/, entity];
                }
            });
        });
    };
    return EntityFactory;
}());
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=entity-factory.js.map