"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSeeding = exports.tearDownDatabase = exports.useRefreshDatabase = exports.runSeeder = exports.factory = exports.define = exports.times = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var entity_factory_1 = require("./entity-factory");
var factory_util_1 = require("./utils/factory.util");
var file_util_1 = require("./utils/file.util");
var connection_1 = require("./connection");
// -------------------------------------------------------------------------
// Handy Exports
// -------------------------------------------------------------------------
tslib_1.__exportStar(require("./importer"), exports);
tslib_1.__exportStar(require("./connection"), exports);
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "times", { enumerable: true, get: function () { return helpers_1.times; } });
global.seeder = {
    entityFactories: new Map(),
};
// -------------------------------------------------------------------------
// Facade functions
// -------------------------------------------------------------------------
var define = function (entity, factoryFn) {
    ;
    global.seeder.entityFactories.set((0, factory_util_1.getNameOfEntity)(entity), {
        entity: entity,
        factory: factoryFn,
    });
};
exports.define = define;
var factory = function (entity) { return function (context) {
    var name = (0, factory_util_1.getNameOfEntity)(entity);
    var entityFactoryObject = global.seeder.entityFactories.get(name);
    return new entity_factory_1.EntityFactory(name, entity, entityFactoryObject.factory, context);
}; };
exports.factory = factory;
var runSeeder = function (clazz) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var seeder, connection;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                seeder = new clazz();
                return [4 /*yield*/, (0, connection_1.createConnection)()];
            case 1:
                connection = _a.sent();
                return [2 /*return*/, seeder.run(exports.factory, connection)];
        }
    });
}); };
exports.runSeeder = runSeeder;
// -------------------------------------------------------------------------
// Facade functions for testing
// -------------------------------------------------------------------------
var useRefreshDatabase = function (options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var option, connection;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, connection_1.configureConnection)(options);
                    return [4 /*yield*/, (0, connection_1.getConnectionOptions)()];
                case 1:
                    option = _a.sent();
                    return [4 /*yield*/, (0, connection_1.createConnection)(option)];
                case 2:
                    connection = _a.sent();
                    if (!(connection && connection.isConnected)) return [3 /*break*/, 5];
                    return [4 /*yield*/, connection.dropDatabase()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.synchronize()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, connection];
            }
        });
    });
};
exports.useRefreshDatabase = useRefreshDatabase;
var tearDownDatabase = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var connection;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, connection_1.createConnection)()];
            case 1:
                connection = _a.sent();
                return [2 /*return*/, connection && connection.isConnected ? connection.close() : undefined];
        }
    });
}); };
exports.tearDownDatabase = tearDownDatabase;
var useSeeding = function (options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var option, factoryFiles;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, connection_1.configureConnection)(options);
                    return [4 /*yield*/, (0, connection_1.getConnectionOptions)()];
                case 1:
                    option = _a.sent();
                    factoryFiles = (0, file_util_1.loadFiles)(option.factories);
                    return [4 /*yield*/, (0, file_util_1.importFiles)(factoryFiles)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.useSeeding = useSeeding;
//# sourceMappingURL=typeorm-seeding.js.map