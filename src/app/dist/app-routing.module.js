"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./core/guard/auth.guard");
var login_auth_guard_1 = require("./core/guard/login-auth.guard");
var routes = [
    {
        path: 'login',
        canActivate: [login_auth_guard_1.LoginAuthGuard],
        loadComponent: function () { return Promise.resolve().then(function () { return require('./pages/login/login.page'); }).then(function (c) { return c.LoginPage; }); }
    },
    {
        path: 'sign-in',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./pages/sign-in/sign-in.page'); }).then(function (c) { return c.SignInPage; }); }
    },
    {
        path: 'memo',
        canActivate: [auth_guard_1.AuthGuard],
        loadComponent: function () { return Promise.resolve().then(function () { return require('./pages/memo/memo.page'); }).then(function (c) { return c.MemoPage; }); }
    },
    {
        path: 'memo-detail',
        canActivate: [auth_guard_1.AuthGuard],
        loadComponent: function () { return Promise.resolve().then(function () { return require('./pages/memo-detail/memo-detail.page'); }).then(function (c) { return c.MemoDetailPage; }); }
    },
    {
        path: 'memo-detail/:id',
        canActivate: [auth_guard_1.AuthGuard],
        loadComponent: function () { return Promise.resolve().then(function () { return require('./pages/memo-detail/memo-detail.page'); }).then(function (c) { return c.MemoDetailPage; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
