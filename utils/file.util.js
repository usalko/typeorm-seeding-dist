"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFiles = exports.importFiles = void 0;
var tslib_1 = require("tslib");
var glob = require("glob");
var path = require("path");
var importFiles = function (filePaths) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(filePaths.map(function (filePath) { var _a; return _a = filePath, Promise.resolve().then(function () { return require(_a); }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.importFiles = importFiles;
var loadFiles = function (filePattern) {
    return filePattern
        .map(function (pattern) { return glob.sync(path.resolve(process.cwd(), pattern)); })
        .reduce(function (acc, filePath) { return acc.concat(filePath); }, []);
};
exports.loadFiles = loadFiles;
//# sourceMappingURL=file.util.js.map