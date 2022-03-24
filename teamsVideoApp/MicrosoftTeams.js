!function(e, n) {
    "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define("microsoftTeams", [], n) : "object" == typeof exports ? exports.microsoftTeams = n() : e.microsoftTeams = n()
}(window, function() {
    return function(t) {
        var r = {};
        function i(e) {
            if (r[e])
                return r[e].exports;
            var n = r[e] = {
                i: e,
                l: !1,
                exports: {}
            };
            return t[e].call(n.exports, n, n.exports, i),
            n.l = !0,
            n.exports
        }
        return i.m = t,
        i.c = r,
        i.d = function(e, n, t) {
            i.o(e, n) || Object.defineProperty(e, n, {
                enumerable: !0,
                get: t
            })
        }
        ,
        i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(n, e) {
            if (1 & e && (n = i(n)),
            8 & e)
                return n;
            if (4 & e && "object" == typeof n && n && n.__esModule)
                return n;
            var t = Object.create(null);
            if (i.r(t),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: n
            }),
            2 & e && "string" != typeof n)
                for (var r in n)
                    i.d(t, r, function(e) {
                        return n[e]
                    }
                    .bind(null, r));
            return t
        }
        ,
        i.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return i.d(n, "a", n),
            n
        }
        ,
        i.o = function(e, n) {
            return Object.prototype.hasOwnProperty.call(e, n)
        }
        ,
        i.p = "",
        i(i.s = 19)
    }([function(e, n, t) {
        "use strict";
        var r = this && this.__spreadArray || function(e, n, t) {
            if (t || 2 === arguments.length)
                for (var r, i = 0, o = n.length; i < o; i++)
                    !r && i in n || ((r = r || Array.prototype.slice.call(n, 0, i))[i] = n[i]);
            return e.concat(r || Array.prototype.slice.call(n))
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.sendMessageEventToChild = n.waitForMessageQueue = n.sendMessageToParent = n.uninitializeCommunication = n.initializeCommunication = n.Communication = void 0;
        var i = t(4)
          , o = t(6)
          , a = t(3)
          , s = function() {
            return function() {}
        }();
        n.Communication = s;
        var l = function() {
            function e() {}
            return e.parentMessageQueue = [],
            e.childMessageQueue = [],
            e.nextMessageId = 0,
            e.callbacks = {},
            e
        }();
        function u(e, n, t) {
            n instanceof Function ? t = n : n instanceof Array && (r = n);
            var r, n = s.parentWindow, e = y(e, r);
            o.GlobalVars.isFramelessWindow ? s.currentWindow && s.currentWindow.nativeInterface && s.currentWindow.nativeInterface.framelessPostMessage(JSON.stringify(e)) : (r = h(n),
            n && r ? n.postMessage(e, r) : C(n).push(e)),
            t && (l.callbacks[e.id] = t)
        }
        function d(e) {
            var n, t;
            e && e.data && "object" == typeof e.data && (c(n = e.source || e.originalEvent && e.originalEvent.source, t = e.origin || e.originalEvent && e.originalEvent.origin) && (m(n, t),
            n === s.parentWindow ? g(e) : n === s.childWindow && p(e)))
        }
        function c(e, n) {
            return (!s.currentWindow || e !== s.currentWindow) && (s.currentWindow && s.currentWindow.location && n && n === s.currentWindow.location.origin || !!(i.validOriginRegExp.test(n.toLowerCase()) || o.GlobalVars.additionalValidOriginsRegexp && o.GlobalVars.additionalValidOriginsRegexp.test(n.toLowerCase())))
        }
        function m(e, n) {
            o.GlobalVars.isFramelessWindow || s.parentWindow && !s.parentWindow.closed && e !== s.parentWindow ? s.childWindow && !s.childWindow.closed && e !== s.childWindow || (s.childWindow = e,
            s.childOrigin = n) : (s.parentWindow = e,
            s.parentOrigin = n),
            s.parentWindow && s.parentWindow.closed && (s.parentWindow = null,
            s.parentOrigin = null),
            s.childWindow && s.childWindow.closed && (s.childWindow = null,
            s.childOrigin = null),
            b(s.parentWindow),
            b(s.childWindow)
        }
        function g(e) {
            var n, t;
            "id"in e.data && "number" == typeof e.data.id ? (t = e.data,
            (n = l.callbacks[t.id]) && (n.apply(null, r(r([], t.args, !0), [t.isPartialResponse], !1)),
            f(e) || delete l.callbacks[t.id])) : "func"in e.data && "string" == typeof e.data.func && (t = e.data,
            (0,
            a.callHandler)(t.func, t.args))
        }
        function f(e) {
            return !0 === e.data.isPartialResponse
        }
        function p(e) {
            var r, n;
            "id"in e.data && "func"in e.data && (r = e.data,
            e = (n = (0,
            a.callHandler)(r.func, r.args))[0],
            n = n[1],
            e && void 0 !== n ? v(r.id, Array.isArray(n) ? n : [n]) : u(r.func, r.args, function() {
                for (var e, n = [], t = 0; t < arguments.length; t++)
                    n[t] = arguments[t];
                s.childWindow && (e = n.pop(),
                v(r.id, n, e))
            }))
        }
        function C(e) {
            return e === s.parentWindow ? l.parentMessageQueue : e === s.childWindow ? l.childMessageQueue : []
        }
        function h(e) {
            return e === s.parentWindow ? s.parentOrigin : e === s.childWindow ? s.childOrigin : null
        }
        function b(e) {
            for (var n = h(e), t = C(e); e && n && 0 < t.length; )
                e.postMessage(t.shift(), n)
        }
        function v(e, n, t) {
            var r = s.childWindow
              , n = P(e, n, t)
              , t = h(r);
            r && t && r.postMessage(n, t)
        }
        function y(e, n) {
            return {
                id: l.nextMessageId++,
                func: e,
                timestamp: Date.now(),
                args: n || []
            }
        }
        function P(e, n, t) {
            return {
                id: e,
                args: n || [],
                isPartialResponse: t
            }
        }
        function T(e, n) {
            return {
                func: e,
                args: n || []
            }
        }
        n.initializeCommunication = function(e, n) {
            l.messageListener = function(e) {
                return d(e)
            }
            ,
            s.currentWindow = s.currentWindow || window,
            s.parentWindow = s.currentWindow.parent !== s.currentWindow.self ? s.currentWindow.parent : s.currentWindow.opener,
            (s.parentWindow || n) && s.currentWindow.addEventListener("message", l.messageListener, !1),
            s.parentWindow || (o.GlobalVars.isFramelessWindow = !0,
            window.onNativeMessage = g);
            try {
                s.parentOrigin = "*",
                u("initialize", [i.version], e)
            } finally {
                s.parentOrigin = null
            }
        }
        ,
        n.uninitializeCommunication = function() {
            s.currentWindow.removeEventListener("message", l.messageListener, !1),
            s.parentWindow = null,
            s.parentOrigin = null,
            s.childWindow = null,
            s.childOrigin = null,
            l.parentMessageQueue = [],
            l.childMessageQueue = [],
            l.nextMessageId = 0,
            l.callbacks = {}
        }
        ,
        n.sendMessageToParent = u,
        n.waitForMessageQueue = function(e, n) {
            var t = s.currentWindow.setInterval(function() {
                0 === C(e).length && (clearInterval(t),
                n())
            }, 100)
        }
        ,
        n.sendMessageEventToChild = function(e, n) {
            var t = s.childWindow
              , e = T(e, n)
              , n = h(t);
            t && n ? t.postMessage(e, n) : C(t).push(e)
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.processAdditionalValidOrigins = n.isAPISupportedByPlatform = n.ensureInitialized = void 0;
        var r = t(4)
          , i = t(6)
          , o = t(5);
        n.ensureInitialized = function() {
            for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
            if (!i.GlobalVars.initializeCalled)
                throw new Error("The library has not yet been initialized");
            if (i.GlobalVars.frameContext && e && 0 < e.length) {
                for (var t = !1, r = 0; r < e.length; r++)
                    if (e[r] === i.GlobalVars.frameContext) {
                        t = !0;
                        break
                    }
                if (!t)
                    throw new Error("This call is not allowed in the '" + i.GlobalVars.frameContext + "' context")
            }
        }
        ,
        n.isAPISupportedByPlatform = function(e) {
            return void 0 === e && (e = r.defaultSDKVersionForCompatCheck),
            e = (0,
            o.compareSDKVersions)(i.GlobalVars.clientSupportedSDKVersion, e),
            !isNaN(e) && 0 <= e
        }
        ,
        n.processAdditionalValidOrigins = function(e) {
            var e = i.GlobalVars.additionalValidOrigins.concat(e.filter(function(e) {
                return "string" == typeof e && r.userOriginUrlValidationRegExp.test(e)
            }))
              , n = {}
              , e = e.filter(function(e) {
                return !n[e] && (n[e] = !0)
            });
            i.GlobalVars.additionalValidOrigins = e,
            0 < i.GlobalVars.additionalValidOrigins.length ? i.GlobalVars.additionalValidOriginsRegexp = (0,
            o.generateRegExpFromUrls)(i.GlobalVars.additionalValidOrigins) : i.GlobalVars.additionalValidOriginsRegexp = null
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.ChannelType = n.TaskModuleDimension = n.UserTeamRole = n.TeamType = n.FrameContexts = n.HostClientType = void 0,
        function(e) {
            e.desktop = "desktop",
            e.web = "web",
            e.android = "android",
            e.ios = "ios",
            e.rigel = "rigel",
            e.surfaceHub = "surfaceHub",
            e.teamsRoomsWindows = "teamsRoomsWindows",
            e.teamsRoomsAndroid = "teamsRoomsAndroid",
            e.teamsPhones = "teamsPhones",
            e.teamsDisplays = "teamsDisplays"
        }(n.HostClientType || (n.HostClientType = {})),
        function(e) {
            e.settings = "settings",
            e.content = "content",
            e.authentication = "authentication",
            e.remove = "remove",
            e.task = "task",
            e.sidePanel = "sidePanel",
            e.stage = "stage",
            e.meetingStage = "meetingStage"
        }(n.FrameContexts || (n.FrameContexts = {})),
        function(e) {
            e[e.Standard = 0] = "Standard",
            e[e.Edu = 1] = "Edu",
            e[e.Class = 2] = "Class",
            e[e.Plc = 3] = "Plc",
            e[e.Staff = 4] = "Staff"
        }(n.TeamType || (n.TeamType = {})),
        function(e) {
            e[e.Admin = 0] = "Admin",
            e[e.User = 1] = "User",
            e[e.Guest = 2] = "Guest"
        }(n.UserTeamRole || (n.UserTeamRole = {})),
        function(e) {
            e.Large = "large",
            e.Medium = "medium",
            e.Small = "small"
        }(n.TaskModuleDimension || (n.TaskModuleDimension = {})),
        function(e) {
            e.Regular = "Regular",
            e.Private = "Private",
            e.Shared = "Shared"
        }(n.ChannelType || (n.ChannelType = {}))
    }
    , function(e, n, t) {
        "use strict";
        var i = this && this.__spreadArray || function(e, n, t) {
            if (t || 2 === arguments.length)
                for (var r, i = 0, o = n.length; i < o; i++)
                    !r && i in n || ((r = r || Array.prototype.slice.call(n, 0, i))[i] = n[i]);
            return e.concat(r || Array.prototype.slice.call(n))
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.registerBeforeUnloadHandler = n.registerOnLoadHandler = n.registerFocusEnterHandler = n.registerBackButtonHandler = n.handleThemeChange = n.registerOnThemeChangeHandler = n.removeHandler = n.registerHandler = n.callHandler = n.initializeHandlers = void 0;
        var r = t(8)
          , o = t(0)
          , a = function() {
            function e() {}
            return e.handlers = {},
            e
        }();
        function s(e) {
            a.themeChangeHandler && a.themeChangeHandler(e),
            o.Communication.childWindow && (0,
            o.sendMessageEventToChild)("themeChange", [e])
        }
        function l() {
            a.backButtonPressHandler && a.backButtonPressHandler() || (0,
            r.navigateBack)()
        }
        function u(e) {
            a.focusEnterHandler && a.focusEnterHandler(e)
        }
        function d(e) {
            a.loadHandler && a.loadHandler(e),
            o.Communication.childWindow && (0,
            o.sendMessageEventToChild)("load", [e])
        }
        function c() {
            function e() {
                (0,
                o.sendMessageToParent)("readyToUnload", [])
            }
            a.beforeUnloadHandler && a.beforeUnloadHandler(e) || e()
        }
        n.initializeHandlers = function() {
            a.handlers.themeChange = s,
            a.handlers.backButtonPress = l,
            a.handlers.load = d,
            a.handlers.beforeUnload = c,
            a.handlers.focusEnter = u
        }
        ,
        n.callHandler = function(e, n) {
            return (e = a.handlers[e]) ? [!0, e.apply(this, n)] : [!1, void 0]
        }
        ,
        n.registerHandler = function(e, n, t, r) {
            void 0 === t && (t = !0),
            void 0 === r && (r = []),
            n ? (a.handlers[e] = n,
            t && (0,
            o.sendMessageToParent)("registerHandler", i([e], r, !0))) : delete a.handlers[e]
        }
        ,
        n.removeHandler = function(e) {
            delete a.handlers[e]
        }
        ,
        n.registerOnThemeChangeHandler = function(e) {
            (a.themeChangeHandler = e) && (0,
            o.sendMessageToParent)("registerHandler", ["themeChange"])
        }
        ,
        n.handleThemeChange = s,
        n.registerBackButtonHandler = function(e) {
            (a.backButtonPressHandler = e) && (0,
            o.sendMessageToParent)("registerHandler", ["backButton"])
        }
        ,
        n.registerFocusEnterHandler = function(e) {
            (a.focusEnterHandler = e) && (0,
            o.sendMessageToParent)("registerHandler", ["focusEnter"])
        }
        ,
        n.registerOnLoadHandler = function(e) {
            (a.loadHandler = e) && (0,
            o.sendMessageToParent)("registerHandler", ["load"])
        }
        ,
        n.registerBeforeUnloadHandler = function(e) {
            (a.beforeUnloadHandler = e) && (0,
            o.sendMessageToParent)("registerHandler", ["beforeUnload"])
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.userOriginUrlValidationRegExp = n.validOriginRegExp = n.validOrigins = n.scanBarCodeAPIMobileSupportVersion = n.getMediaCallbackSupportVersion = n.mediaAPISupportVersion = n.captureImageMobileSupportVersion = n.peoplePickerRequiredVersion = n.locationAPIsRequiredVersion = n.getUserJoinedTeamsSupportedAndroidClientVersion = n.videoAndImageMediaAPISupportVersion = n.defaultSDKVersionForCompatCheck = n.version = void 0;
        t = t(5);
        n.version = "1.11.0",
        n.defaultSDKVersionForCompatCheck = "2.0.1",
        n.videoAndImageMediaAPISupportVersion = "2.0.2",
        n.getUserJoinedTeamsSupportedAndroidClientVersion = "2.0.1",
        n.locationAPIsRequiredVersion = "1.9.0",
        n.peoplePickerRequiredVersion = "2.0.0",
        n.captureImageMobileSupportVersion = "1.7.0",
        n.mediaAPISupportVersion = "1.8.0",
        n.getMediaCallbackSupportVersion = "2.0.0",
        n.scanBarCodeAPIMobileSupportVersion = "1.9.0",
        n.validOrigins = ["https://teams.microsoft.com", "https://teams.microsoft.us", "https://gov.teams.microsoft.us", "https://dod.teams.microsoft.us", "https://int.teams.microsoft.com", "https://teams.live.com", "https://devspaces.skype.com", "https://ssauth.skype.com", "https://local.teams.live.com", "https://local.teams.live.com:8080", "https://local.teams.office.com", "https://local.teams.office.com:8080", "https://msft.spoppe.com", "https://*.sharepoint.com", "https://*.sharepoint-df.com", "https://*.sharepointonline.com", "https://outlook.office.com", "https://outlook-sdf.office.com", "https://*.teams.microsoft.com", "https://www.office.com", "https://word.office.com", "https://excel.office.com", "https://powerpoint.office.com", "https://www.officeppe.com", "https://*.www.office.com"],
        n.validOriginRegExp = (0,
        t.generateRegExpFromUrls)(n.validOrigins),
        n.userOriginUrlValidationRegExp = /^https\:\/\//
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.generateGUID = n.compareSDKVersions = n.getGenericOnCompleteHandler = n.generateRegExpFromUrls = void 0;
        var r = t(22);
        function i(e) {
            for (var n = "^", t = e.split("."), r = 0; r < t.length; r++)
                n += (0 < r ? "[.]" : "") + t[r].replace("*", "[^/^.]+");
            return n += "$"
        }
        n.generateRegExpFromUrls = function(e) {
            for (var n = "", t = 0; t < e.length; t++)
                n += (0 === t ? "" : "|") + i(e[t]);
            return new RegExp(n)
        }
        ,
        n.getGenericOnCompleteHandler = function(t) {
            return function(e, n) {
                if (!e)
                    throw new Error(t || n)
            }
        }
        ,
        n.compareSDKVersions = function(e, n) {
            if ("string" != typeof e || "string" != typeof n)
                return NaN;
            var t = e.split(".")
              , r = n.split(".");
            function i(e) {
                return /^\d+$/.test(e)
            }
            if (!t.every(i) || !r.every(i))
                return NaN;
            for (; t.length < r.length; )
                t.push("0");
            for (; r.length < t.length; )
                r.push("0");
            for (var o = 0; o < t.length; ++o)
                if (Number(t[o]) != Number(r[o]))
                    return Number(t[o]) > Number(r[o]) ? 1 : -1;
            return 0
        }
        ,
        n.generateGUID = function() {
            return r.v4()
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.GlobalVars = void 0;
        var r = function() {
            function e() {}
            return e.initializeCalled = !1,
            e.initializeCompleted = !1,
            e.additionalValidOrigins = [],
            e.additionalValidOriginsRegexp = null,
            e.initializeCallbacks = [],
            e.isFramelessWindow = !1,
            e.printCapabilityEnabled = !1,
            e
        }();
        n.GlobalVars = r
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.ErrorCode = n.FileOpenPreference = void 0,
        function(e) {
            e.Inline = "inline",
            e.Desktop = "desktop",
            e.Web = "web"
        }(n.FileOpenPreference || (n.FileOpenPreference = {})),
        function(e) {
            e[e.NOT_SUPPORTED_ON_PLATFORM = 100] = "NOT_SUPPORTED_ON_PLATFORM",
            e[e.INTERNAL_ERROR = 500] = "INTERNAL_ERROR",
            e[e.NOT_SUPPORTED_IN_CURRENT_CONTEXT = 501] = "NOT_SUPPORTED_IN_CURRENT_CONTEXT",
            e[e.PERMISSION_DENIED = 1e3] = "PERMISSION_DENIED",
            e[e.NETWORK_ERROR = 2e3] = "NETWORK_ERROR",
            e[e.NO_HW_SUPPORT = 3e3] = "NO_HW_SUPPORT",
            e[e.INVALID_ARGUMENTS = 4e3] = "INVALID_ARGUMENTS",
            e[e.UNAUTHORIZED_USER_OPERATION = 5e3] = "UNAUTHORIZED_USER_OPERATION",
            e[e.INSUFFICIENT_RESOURCES = 6e3] = "INSUFFICIENT_RESOURCES",
            e[e.THROTTLE = 7e3] = "THROTTLE",
            e[e.USER_ABORT = 8e3] = "USER_ABORT",
            e[e.OPERATION_TIMED_OUT = 8001] = "OPERATION_TIMED_OUT",
            e[e.OLD_PLATFORM = 9e3] = "OLD_PLATFORM",
            e[e.FILE_NOT_FOUND = 404] = "FILE_NOT_FOUND",
            e[e.SIZE_EXCEEDED = 1e4] = "SIZE_EXCEEDED"
        }(n.ErrorCode || (n.ErrorCode = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.sharing = n.video = n.people = n.monetization = n.meeting = n.location = n.media = n.ParentAppWindow = n.ChildAppWindow = n.tasks = n.settings = n.navigateToTab = n.navigateCrossDomain = n.navigateBack = n.returnFocus = n.shareDeepLink = n.setFrameContext = n.registerAppButtonHoverLeaveHandler = n.registerAppButtonHoverEnterHandler = n.registerAppButtonClickHandler = n.registerOnThemeChangeHandler = n.registerOnLoadHandler = n.registerFullScreenHandler = n.registerEnterSettingsHandler = n.registerFocusEnterHandler = n.registerBeforeUnloadHandler = n.registerBackButtonHandler = n.print = n.initializeWithFrameContext = n.initialize = n.getTabInstances = n.getMruTabInstances = n.getContext = n.executeDeepLink = n.enablePrintCapability = n.FileOpenPreference = n.ErrorCode = n.ChannelType = n.UserTeamRole = n.TeamType = n.TaskModuleDimension = n.HostClientType = n.FrameContexts = n.authentication = n.appInitialization = void 0;
        var r = t(25);
        Object.defineProperty(n, "appInitialization", {
            enumerable: !0,
            get: function() {
                return r.appInitialization
            }
        });
        var i = t(11);
        Object.defineProperty(n, "authentication", {
            enumerable: !0,
            get: function() {
                return i.authentication
            }
        });
        var o = t(2);
        Object.defineProperty(n, "FrameContexts", {
            enumerable: !0,
            get: function() {
                return o.FrameContexts
            }
        }),
        Object.defineProperty(n, "HostClientType", {
            enumerable: !0,
            get: function() {
                return o.HostClientType
            }
        }),
        Object.defineProperty(n, "TaskModuleDimension", {
            enumerable: !0,
            get: function() {
                return o.TaskModuleDimension
            }
        }),
        Object.defineProperty(n, "TeamType", {
            enumerable: !0,
            get: function() {
                return o.TeamType
            }
        }),
        Object.defineProperty(n, "UserTeamRole", {
            enumerable: !0,
            get: function() {
                return o.UserTeamRole
            }
        }),
        Object.defineProperty(n, "ChannelType", {
            enumerable: !0,
            get: function() {
                return o.ChannelType
            }
        });
        var a = t(7);
        Object.defineProperty(n, "ErrorCode", {
            enumerable: !0,
            get: function() {
                return a.ErrorCode
            }
        }),
        Object.defineProperty(n, "FileOpenPreference", {
            enumerable: !0,
            get: function() {
                return a.FileOpenPreference
            }
        });
        var s = t(26);
        Object.defineProperty(n, "enablePrintCapability", {
            enumerable: !0,
            get: function() {
                return s.enablePrintCapability
            }
        }),
        Object.defineProperty(n, "executeDeepLink", {
            enumerable: !0,
            get: function() {
                return s.executeDeepLink
            }
        }),
        Object.defineProperty(n, "getContext", {
            enumerable: !0,
            get: function() {
                return s.getContext
            }
        }),
        Object.defineProperty(n, "getMruTabInstances", {
            enumerable: !0,
            get: function() {
                return s.getMruTabInstances
            }
        }),
        Object.defineProperty(n, "getTabInstances", {
            enumerable: !0,
            get: function() {
                return s.getTabInstances
            }
        }),
        Object.defineProperty(n, "initialize", {
            enumerable: !0,
            get: function() {
                return s.initialize
            }
        }),
        Object.defineProperty(n, "initializeWithFrameContext", {
            enumerable: !0,
            get: function() {
                return s.initializeWithFrameContext
            }
        }),
        Object.defineProperty(n, "print", {
            enumerable: !0,
            get: function() {
                return s.print
            }
        }),
        Object.defineProperty(n, "registerBackButtonHandler", {
            enumerable: !0,
            get: function() {
                return s.registerBackButtonHandler
            }
        }),
        Object.defineProperty(n, "registerBeforeUnloadHandler", {
            enumerable: !0,
            get: function() {
                return s.registerBeforeUnloadHandler
            }
        }),
        Object.defineProperty(n, "registerFocusEnterHandler", {
            enumerable: !0,
            get: function() {
                return s.registerFocusEnterHandler
            }
        }),
        Object.defineProperty(n, "registerEnterSettingsHandler", {
            enumerable: !0,
            get: function() {
                return s.registerEnterSettingsHandler
            }
        }),
        Object.defineProperty(n, "registerFullScreenHandler", {
            enumerable: !0,
            get: function() {
                return s.registerFullScreenHandler
            }
        }),
        Object.defineProperty(n, "registerOnLoadHandler", {
            enumerable: !0,
            get: function() {
                return s.registerOnLoadHandler
            }
        }),
        Object.defineProperty(n, "registerOnThemeChangeHandler", {
            enumerable: !0,
            get: function() {
                return s.registerOnThemeChangeHandler
            }
        }),
        Object.defineProperty(n, "registerAppButtonClickHandler", {
            enumerable: !0,
            get: function() {
                return s.registerAppButtonClickHandler
            }
        }),
        Object.defineProperty(n, "registerAppButtonHoverEnterHandler", {
            enumerable: !0,
            get: function() {
                return s.registerAppButtonHoverEnterHandler
            }
        }),
        Object.defineProperty(n, "registerAppButtonHoverLeaveHandler", {
            enumerable: !0,
            get: function() {
                return s.registerAppButtonHoverLeaveHandler
            }
        }),
        Object.defineProperty(n, "setFrameContext", {
            enumerable: !0,
            get: function() {
                return s.setFrameContext
            }
        }),
        Object.defineProperty(n, "shareDeepLink", {
            enumerable: !0,
            get: function() {
                return s.shareDeepLink
            }
        });
        var l = t(27);
        Object.defineProperty(n, "returnFocus", {
            enumerable: !0,
            get: function() {
                return l.returnFocus
            }
        }),
        Object.defineProperty(n, "navigateBack", {
            enumerable: !0,
            get: function() {
                return l.navigateBack
            }
        }),
        Object.defineProperty(n, "navigateCrossDomain", {
            enumerable: !0,
            get: function() {
                return l.navigateCrossDomain
            }
        }),
        Object.defineProperty(n, "navigateToTab", {
            enumerable: !0,
            get: function() {
                return l.navigateToTab
            }
        });
        var u = t(12);
        Object.defineProperty(n, "settings", {
            enumerable: !0,
            get: function() {
                return u.settings
            }
        });
        var d = t(28);
        Object.defineProperty(n, "tasks", {
            enumerable: !0,
            get: function() {
                return d.tasks
            }
        });
        var c = t(16);
        Object.defineProperty(n, "ChildAppWindow", {
            enumerable: !0,
            get: function() {
                return c.ChildAppWindow
            }
        }),
        Object.defineProperty(n, "ParentAppWindow", {
            enumerable: !0,
            get: function() {
                return c.ParentAppWindow
            }
        });
        var m = t(17);
        Object.defineProperty(n, "media", {
            enumerable: !0,
            get: function() {
                return m.media
            }
        });
        var g = t(29);
        Object.defineProperty(n, "location", {
            enumerable: !0,
            get: function() {
                return g.location
            }
        });
        var f = t(30);
        Object.defineProperty(n, "meeting", {
            enumerable: !0,
            get: function() {
                return f.meeting
            }
        });
        var p = t(31);
        Object.defineProperty(n, "monetization", {
            enumerable: !0,
            get: function() {
                return p.monetization
            }
        });
        var C = t(32);
        Object.defineProperty(n, "people", {
            enumerable: !0,
            get: function() {
                return C.people
            }
        });
        var h = t(33);
        Object.defineProperty(n, "video", {
            enumerable: !0,
            get: function() {
                return h.video
            }
        });
        var b = t(34);
        Object.defineProperty(n, "sharing", {
            enumerable: !0,
            get: function() {
                return b.sharing
            }
        })
    }
    , function(e, n) {
        var t, r, i = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        i ? (t = new Uint8Array(16),
        e.exports = function() {
            return i(t),
            t
        }
        ) : (r = new Array(16),
        e.exports = function() {
            for (var e, n = 0; n < 16; n++)
                0 == (3 & n) && (e = 4294967296 * Math.random()),
                r[n] = e >>> ((3 & n) << 3) & 255;
            return r
        }
        )
    }
    , function(e, n) {
        for (var r = [], t = 0; t < 256; ++t)
            r[t] = (t + 256).toString(16).substr(1);
        e.exports = function(e, n) {
            var t = n || 0;
            return [(n = r)[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], n[e[+t]]].join("")
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.authentication = void 0;
        var c = t(1)
          , m = t(6)
          , g = t(2)
          , f = t(0)
          , p = t(3);
        !function(e) {
            var o, n;
            function a() {
                t();
                try {
                    f.Communication.childWindow && f.Communication.childWindow.close()
                } finally {
                    f.Communication.childWindow = null,
                    f.Communication.childOrigin = null
                }
            }
            function r(e) {
                o = e,
                a();
                var n = o.width || 600
                  , t = o.height || 400
                  , n = Math.min(n, f.Communication.currentWindow.outerWidth - 400)
                  , t = Math.min(t, f.Communication.currentWindow.outerHeight - 200)
                  , r = document.createElement("a");
                r.href = o.url;
                var i = void 0 !== f.Communication.currentWindow.screenLeft ? f.Communication.currentWindow.screenLeft : f.Communication.currentWindow.screenX
                  , e = void 0 !== f.Communication.currentWindow.screenTop ? f.Communication.currentWindow.screenTop : f.Communication.currentWindow.screenY;
                i += f.Communication.currentWindow.outerWidth / 2 - n / 2,
                e += f.Communication.currentWindow.outerHeight / 2 - t / 2,
                f.Communication.childWindow = f.Communication.currentWindow.open(r.href, "_blank", "toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, top=" + e + ", left=" + i + ", width=" + n + ", height=" + t),
                f.Communication.childWindow ? s() : l("FailedToOpenWindow")
            }
            function t() {
                n && (clearInterval(n),
                n = 0),
                (0,
                p.removeHandler)("initialize"),
                (0,
                p.removeHandler)("navigateCrossDomain")
            }
            function s() {
                t(),
                n = f.Communication.currentWindow.setInterval(function() {
                    if (!f.Communication.childWindow || f.Communication.childWindow.closed)
                        l("CancelledByUser");
                    else {
                        var e = f.Communication.childOrigin;
                        try {
                            f.Communication.childOrigin = "*",
                            (0,
                            f.sendMessageEventToChild)("ping")
                        } finally {
                            f.Communication.childOrigin = e
                        }
                    }
                }, 100),
                (0,
                p.registerHandler)("initialize", function() {
                    return [g.FrameContexts.authentication, m.GlobalVars.hostClientType]
                }),
                (0,
                p.registerHandler)("navigateCrossDomain", function() {
                    return !1
                })
            }
            function i(e) {
                try {
                    o && o.successCallback && o.successCallback(e)
                } finally {
                    o = null,
                    a()
                }
            }
            function l(e) {
                try {
                    o && o.failureCallback && o.failureCallback(e)
                } finally {
                    o = null,
                    a()
                }
            }
            function u(e, n, t) {
                var r;
                e && ((r = document.createElement("a")).href = decodeURIComponent(e),
                r.host && r.host !== window.location.host && "outlook.office.com" === r.host && -1 < r.search.indexOf("client_type=Win32_Outlook") && (n && "result" === n && (t && (r.href = d(r.href, "result", t)),
                f.Communication.currentWindow.location.assign(d(r.href, "authSuccess", ""))),
                n && "reason" === n && (t && (r.href = d(r.href, "reason", t)),
                f.Communication.currentWindow.location.assign(d(r.href, "authFailure", "")))))
            }
            function d(e, n, t) {
                var r = e.indexOf("#")
                  , i = (i = -1 === r ? "#" : e.substr(r)) + "&" + n + ("" !== t ? "=" + t : "");
                return (e = -1 === r ? e : e.substr(0, r)) + i
            }
            e.initialize = function() {
                (0,
                p.registerHandler)("authentication.authenticate.success", i, !1),
                (0,
                p.registerHandler)("authentication.authenticate.failure", l, !1)
            }
            ,
            e.registerAuthenticationHandlers = function(e) {
                o = e
            }
            ,
            e.authenticate = function(e) {
                var t = void 0 !== e ? e : o;
                (0,
                c.ensureInitialized)(g.FrameContexts.content, g.FrameContexts.sidePanel, g.FrameContexts.settings, g.FrameContexts.remove, g.FrameContexts.task, g.FrameContexts.stage, g.FrameContexts.meetingStage),
                m.GlobalVars.hostClientType === g.HostClientType.desktop || m.GlobalVars.hostClientType === g.HostClientType.android || m.GlobalVars.hostClientType === g.HostClientType.ios || m.GlobalVars.hostClientType === g.HostClientType.rigel || m.GlobalVars.hostClientType === g.HostClientType.teamsRoomsWindows || m.GlobalVars.hostClientType === g.HostClientType.teamsRoomsAndroid || m.GlobalVars.hostClientType === g.HostClientType.teamsPhones || m.GlobalVars.hostClientType === g.HostClientType.teamsDisplays ? ((e = document.createElement("a")).href = t.url,
                (0,
                f.sendMessageToParent)("authentication.authenticate", [e.href, t.width, t.height], function(e, n) {
                    e ? t.successCallback(n) : t.failureCallback(n)
                })) : r(t)
            }
            ,
            e.getAuthToken = function(t) {
                (0,
                c.ensureInitialized)(),
                (0,
                f.sendMessageToParent)("authentication.getAuthToken", [t.resources, t.claims, t.silent], function(e, n) {
                    e ? t.successCallback(n) : t.failureCallback(n)
                })
            }
            ,
            e.getUser = function(t) {
                (0,
                c.ensureInitialized)(),
                (0,
                f.sendMessageToParent)("authentication.getUser", function(e, n) {
                    e ? t.successCallback(n) : t.failureCallback(n)
                })
            }
            ,
            e.notifySuccess = function(e, n) {
                u(n, "result", e),
                (0,
                c.ensureInitialized)(g.FrameContexts.authentication),
                (0,
                f.sendMessageToParent)("authentication.authenticate.success", [e]),
                (0,
                f.waitForMessageQueue)(f.Communication.parentWindow, function() {
                    return setTimeout(function() {
                        return f.Communication.currentWindow.close()
                    }, 200)
                })
            }
            ,
            e.notifyFailure = function(e, n) {
                u(n, "reason", e),
                (0,
                c.ensureInitialized)(g.FrameContexts.authentication),
                (0,
                f.sendMessageToParent)("authentication.authenticate.failure", [e]),
                (0,
                f.waitForMessageQueue)(f.Communication.parentWindow, function() {
                    return setTimeout(function() {
                        return f.Communication.currentWindow.close()
                    }, 200)
                })
            }
        }(n.authentication || (n.authentication = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.settings = void 0;
        var s = t(1)
          , l = t(2)
          , u = t(5)
          , d = t(0)
          , c = t(3);
        !function(e) {
            var n, t;
            function r(e) {
                e = new i(e);
                n ? n(e) : e.notifySuccess()
            }
            e.initialize = function() {
                (0,
                c.registerHandler)("settings.save", r, !1),
                (0,
                c.registerHandler)("settings.remove", o, !1)
            }
            ,
            e.setValidityState = function(e) {
                (0,
                s.ensureInitialized)(l.FrameContexts.settings, l.FrameContexts.remove),
                (0,
                d.sendMessageToParent)("settings.setValidityState", [e])
            }
            ,
            e.getSettings = function(e) {
                (0,
                s.ensureInitialized)(l.FrameContexts.content, l.FrameContexts.settings, l.FrameContexts.remove, l.FrameContexts.sidePanel),
                (0,
                d.sendMessageToParent)("settings.getSettings", e)
            }
            ,
            e.setSettings = function(e, n) {
                (0,
                s.ensureInitialized)(l.FrameContexts.content, l.FrameContexts.settings, l.FrameContexts.sidePanel),
                (0,
                d.sendMessageToParent)("settings.setSettings", [e], n || (0,
                u.getGenericOnCompleteHandler)())
            }
            ,
            e.registerOnSaveHandler = function(e) {
                (0,
                s.ensureInitialized)(l.FrameContexts.settings),
                (n = e) && (0,
                d.sendMessageToParent)("registerHandler", ["save"])
            }
            ,
            e.registerOnRemoveHandler = function(e) {
                (0,
                s.ensureInitialized)(l.FrameContexts.remove, l.FrameContexts.settings),
                (t = e) && (0,
                d.sendMessageToParent)("registerHandler", ["remove"])
            }
            ;
            var i = function() {
                function e(e) {
                    this.notified = !1,
                    this.result = e || {}
                }
                return e.prototype.notifySuccess = function() {
                    this.ensureNotNotified(),
                    (0,
                    d.sendMessageToParent)("settings.save.success"),
                    this.notified = !0
                }
                ,
                e.prototype.notifyFailure = function(e) {
                    this.ensureNotNotified(),
                    (0,
                    d.sendMessageToParent)("settings.save.failure", [e]),
                    this.notified = !0
                }
                ,
                e.prototype.ensureNotNotified = function() {
                    if (this.notified)
                        throw new Error("The SaveEvent may only notify success or failure once.")
                }
                ,
                e
            }();
            function o() {
                var e = new a;
                t ? t(e) : e.notifySuccess()
            }
            var a = function() {
                function e() {
                    this.notified = !1
                }
                return e.prototype.notifySuccess = function() {
                    this.ensureNotNotified(),
                    (0,
                    d.sendMessageToParent)("settings.remove.success"),
                    this.notified = !0
                }
                ,
                e.prototype.notifyFailure = function(e) {
                    this.ensureNotNotified(),
                    (0,
                    d.sendMessageToParent)("settings.remove.failure", [e]),
                    this.notified = !0
                }
                ,
                e.prototype.ensureNotNotified = function() {
                    if (this.notified)
                        throw new Error("The removeEvent may only notify success or failure once.")
                }
                ,
                e
            }()
        }(n.settings || (n.settings = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.logs = void 0;
        var r = t(1)
          , i = t(0)
          , o = t(3);
        !function() {
            (n.logs || (n.logs = {})).registerGetLogHandler = function(n) {
                (0,
                r.ensureInitialized)(),
                n ? (0,
                o.registerHandler)("log.request", function() {
                    var e = n();
                    (0,
                    i.sendMessageToParent)("log.receive", [e])
                }) : (0,
                o.removeHandler)("log.request")
            }
        }()
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.registerUserSettingsChangeHandler = n.getConfigSetting = n.getChatMembers = n.registerCustomHandler = n.sendCustomEvent = n.sendCustomMessage = n.uploadCustomApp = n.showNotification = n.openFilePreview = n.exitFullscreen = n.enterFullscreen = n.getUserJoinedTeams = n.initializePrivateApis = void 0;
        var i = t(1)
          , r = t(2)
          , o = t(5)
          , a = t(0)
          , s = t(15)
          , l = t(3)
          , u = t(6)
          , d = t(7)
          , c = t(4);
        n.initializePrivateApis = function() {
            s.menus.initialize()
        }
        ,
        n.getUserJoinedTeams = function(e, n) {
            if ((0,
            i.ensureInitialized)(),
            (u.GlobalVars.hostClientType === r.HostClientType.android || u.GlobalVars.hostClientType === r.HostClientType.teamsRoomsAndroid || u.GlobalVars.hostClientType === r.HostClientType.teamsPhones || u.GlobalVars.hostClientType === r.HostClientType.teamsDisplays) && !(0,
            i.isAPISupportedByPlatform)(c.getUserJoinedTeamsSupportedAndroidClientVersion)) {
                var t = {
                    errorCode: d.ErrorCode.OLD_PLATFORM
                };
                throw new Error(JSON.stringify(t))
            }
            (0,
            a.sendMessageToParent)("getUserJoinedTeams", [n], e)
        }
        ,
        n.enterFullscreen = function() {
            (0,
            i.ensureInitialized)(r.FrameContexts.content),
            (0,
            a.sendMessageToParent)("enterFullscreen", [])
        }
        ,
        n.exitFullscreen = function() {
            (0,
            i.ensureInitialized)(r.FrameContexts.content),
            (0,
            a.sendMessageToParent)("exitFullscreen", [])
        }
        ,
        n.openFilePreview = function(e) {
            (0,
            i.ensureInitialized)(r.FrameContexts.content),
            e = [e.entityId, e.title, e.description, e.type, e.objectUrl, e.downloadUrl, e.webPreviewUrl, e.webEditUrl, e.baseUrl, e.editFile, e.subEntityId, e.viewerAction, e.fileOpenPreference, e.conversationId],
            (0,
            a.sendMessageToParent)("openFilePreview", e)
        }
        ,
        n.showNotification = function(e) {
            (0,
            i.ensureInitialized)(r.FrameContexts.content),
            e = [e.message, e.notificationType],
            (0,
            a.sendMessageToParent)("showNotification", e)
        }
        ,
        n.uploadCustomApp = function(e, n) {
            (0,
            i.ensureInitialized)(),
            (0,
            a.sendMessageToParent)("uploadCustomApp", [e], n || (0,
            o.getGenericOnCompleteHandler)())
        }
        ,
        n.sendCustomMessage = function(e, n, t) {
            (0,
            i.ensureInitialized)(),
            (0,
            a.sendMessageToParent)(e, n, t)
        }
        ,
        n.sendCustomEvent = function(e, n) {
            if ((0,
            i.ensureInitialized)(),
            !a.Communication.childWindow)
                throw new Error("The child window has not yet been initialized or is not present");
            (0,
            a.sendMessageEventToChild)(e, n)
        }
        ,
        n.registerCustomHandler = function(e, t) {
            var r = this;
            (0,
            i.ensureInitialized)(),
            (0,
            l.registerHandler)(e, function() {
                for (var e = [], n = 0; n < arguments.length; n++)
                    e[n] = arguments[n];
                return t.apply(r, e)
            })
        }
        ,
        n.getChatMembers = function(e) {
            (0,
            i.ensureInitialized)(),
            (0,
            a.sendMessageToParent)("getChatMembers", e)
        }
        ,
        n.getConfigSetting = function(e, n) {
            (0,
            i.ensureInitialized)(),
            (0,
            a.sendMessageToParent)("getConfigSetting", [n], e)
        }
        ,
        n.registerUserSettingsChangeHandler = function(e, n) {
            (0,
            i.ensureInitialized)(),
            (0,
            l.registerHandler)("userSettingsChange", n, !0, [e])
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.menus = void 0;
        var l = t(1)
          , u = t(0)
          , d = t(3);
        !function(e) {
            var t, r, i, n = function() {
                return function() {
                    this.enabled = !0,
                    this.selected = !1
                }
            }();
            function o(e) {
                i && i(e) || ((0,
                l.ensureInitialized)(),
                (0,
                u.sendMessageToParent)("viewConfigItemPress", [e]))
            }
            function a(e) {
                t && t(e) || ((0,
                l.ensureInitialized)(),
                (0,
                u.sendMessageToParent)("handleNavBarMenuItemPress", [e]))
            }
            function s(e) {
                r && r(e) || ((0,
                l.ensureInitialized)(),
                (0,
                u.sendMessageToParent)("handleActionMenuItemPress", [e]))
            }
            e.MenuItem = n,
            function(e) {
                e.dropDown = "dropDown",
                e.popOver = "popOver"
            }(e.MenuListType || (e.MenuListType = {})),
            e.initialize = function() {
                (0,
                d.registerHandler)("navBarMenuItemPress", a, !1),
                (0,
                d.registerHandler)("actionMenuItemPress", s, !1),
                (0,
                d.registerHandler)("setModuleView", o, !1)
            }
            ,
            e.setUpViews = function(e, n) {
                (0,
                l.ensureInitialized)(),
                i = n,
                (0,
                u.sendMessageToParent)("setUpViews", [e])
            }
            ,
            e.setNavBarMenu = function(e, n) {
                (0,
                l.ensureInitialized)(),
                t = n,
                (0,
                u.sendMessageToParent)("setNavBarMenu", [e])
            }
            ,
            e.showActionMenu = function(e, n) {
                (0,
                l.ensureInitialized)(),
                r = n,
                (0,
                u.sendMessageToParent)("showActionMenu", [e])
            }
        }(n.menus || (n.menus = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.ParentAppWindow = n.ChildAppWindow = void 0;
        var r = t(1)
          , i = t(2)
          , o = t(5)
          , a = t(0)
          , s = t(3)
          , t = function() {
            function e() {}
            return e.prototype.postMessage = function(e, n) {
                (0,
                r.ensureInitialized)(),
                (0,
                a.sendMessageToParent)("messageForChild", [e], n || (0,
                o.getGenericOnCompleteHandler)())
            }
            ,
            e.prototype.addEventListener = function(e, n) {
                "message" === e && (0,
                s.registerHandler)("messageForParent", n)
            }
            ,
            e
        }();
        n.ChildAppWindow = t;
        t = function() {
            function e() {}
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return this._instance || (this._instance = new this)
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.postMessage = function(e, n) {
                (0,
                r.ensureInitialized)(i.FrameContexts.task),
                (0,
                a.sendMessageToParent)("messageForParent", [e], n || (0,
                o.getGenericOnCompleteHandler)())
            }
            ,
            e.prototype.addEventListener = function(e, n) {
                "message" === e && (0,
                s.registerHandler)("messageForChild", n)
            }
            ,
            e
        }();
        n.ParentAppWindow = t
    }
    , function(e, n, t) {
        "use strict";
        var r = this && this.__extends || function() {
            var r = function(e, n) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, n) {
                    e.__proto__ = n
                }
                || function(e, n) {
                    for (var t in n)
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
                }
                )(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n)
                    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                function t() {
                    this.constructor = e
                }
                r(e, n),
                e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
                new t)
            }
        }();
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.media = void 0;
        var i = t(6)
          , o = t(7)
          , l = t(1)
          , u = t(2)
          , a = t(5)
          , d = t(18)
          , c = t(0)
          , m = t(3)
          , g = t(4);
        !function(e) {
            !function(e) {
                e.Base64 = "base64",
                e.ID = "id"
            }(e.FileFormat || (e.FileFormat = {}));
            var n = function() {
                return function() {}
            }();
            e.File = n,
            e.captureImage = function(e) {
                if (!e)
                    throw new Error("[captureImage] Callback cannot be null");
                (0,
                l.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.task),
                i.GlobalVars.isFramelessWindow ? (0,
                l.isAPISupportedByPlatform)(g.captureImageMobileSupportVersion) ? (0,
                c.sendMessageToParent)("captureImage", e) : e({
                    errorCode: o.ErrorCode.OLD_PLATFORM
                }, void 0) : e({
                    errorCode: o.ErrorCode.NOT_SUPPORTED_ON_PLATFORM
                }, void 0)
            }
            ;
            var s = function(t) {
                function e(e) {
                    void 0 === e && (e = null);
                    var n = t.call(this) || this;
                    return e && (n.content = e.content,
                    n.format = e.format,
                    n.mimeType = e.mimeType,
                    n.name = e.name,
                    n.preview = e.preview,
                    n.size = e.size),
                    n
                }
                return r(e, t),
                e.prototype.getMedia = function(e) {
                    if (!e)
                        throw new Error("[get Media] Callback cannot be null");
                    (0,
                    l.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.task),
                    (0,
                    l.isAPISupportedByPlatform)(g.mediaAPISupportVersion) ? (0,
                    d.validateGetMediaInputs)(this.mimeType, this.format, this.content) ? (0,
                    l.isAPISupportedByPlatform)(g.getMediaCallbackSupportVersion) ? this.getMediaViaCallback(e) : this.getMediaViaHandler(e) : e({
                        errorCode: o.ErrorCode.INVALID_ARGUMENTS
                    }, null) : e({
                        errorCode: o.ErrorCode.OLD_PLATFORM
                    }, null)
                }
                ,
                e.prototype.getMediaViaCallback = function(t) {
                    var r = {
                        mediaMimeType: this.mimeType,
                        assembleAttachment: []
                    }
                      , e = [this.content];
                    (0,
                    c.sendMessageToParent)("getMedia", e, function(e) {
                        var n;
                        t && (e && e.error ? t(e.error, null) : e && e.mediaChunk ? e.mediaChunk.chunkSequence <= 0 ? (n = (0,
                        d.createFile)(r.assembleAttachment, r.mediaMimeType),
                        t(e.error, n)) : (e = (0,
                        d.decodeAttachment)(e.mediaChunk, r.mediaMimeType),
                        r.assembleAttachment.push(e)) : t({
                            errorCode: o.ErrorCode.INTERNAL_ERROR,
                            message: "data received is null"
                        }, null))
                    })
                }
                ,
                e.prototype.getMediaViaHandler = function(t) {
                    var r = (0,
                    a.generateGUID)()
                      , i = {
                        mediaMimeType: this.mimeType,
                        assembleAttachment: []
                    }
                      , e = [r, this.content];
                    this.content && t && (0,
                    c.sendMessageToParent)("getMedia", e),
                    (0,
                    m.registerHandler)("getMedia" + r, function(e) {
                        var n;
                        t && ((n = JSON.parse(e)).error ? (t(n.error, null),
                        (0,
                        m.removeHandler)("getMedia" + r)) : n.mediaChunk ? n.mediaChunk.chunkSequence <= 0 ? (e = (0,
                        d.createFile)(i.assembleAttachment, i.mediaMimeType),
                        t(n.error, e),
                        (0,
                        m.removeHandler)("getMedia" + r)) : (n = (0,
                        d.decodeAttachment)(n.mediaChunk, i.mediaMimeType),
                        i.assembleAttachment.push(n)) : (t({
                            errorCode: o.ErrorCode.INTERNAL_ERROR,
                            message: "data received is null"
                        }, null),
                        (0,
                        m.removeHandler)("getMedia" + r)))
                    })
                }
                ,
                e
            }(n);
            e.Media = s,
            function(e) {
                e[e.Photo = 1] = "Photo",
                e[e.Document = 2] = "Document",
                e[e.Whiteboard = 3] = "Whiteboard",
                e[e.BusinessCard = 4] = "BusinessCard"
            }(e.CameraStartMode || (e.CameraStartMode = {})),
            function(e) {
                e[e.Camera = 1] = "Camera",
                e[e.Gallery = 2] = "Gallery"
            }(e.Source || (e.Source = {})),
            function(e) {
                e[e.Image = 1] = "Image",
                e[e.VideoAndImage = 3] = "VideoAndImage",
                e[e.Audio = 4] = "Audio"
            }(e.MediaType || (e.MediaType = {})),
            function(e) {
                e[e.ID = 1] = "ID",
                e[e.URL = 2] = "URL"
            }(e.ImageUriType || (e.ImageUriType = {})),
            e.selectMedia = function(e, a) {
                if (!a)
                    throw new Error("[select Media] Callback cannot be null");
                if ((0,
                l.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.task),
                (0,
                l.isAPISupportedByPlatform)(g.mediaAPISupportVersion)) {
                    if ((0,
                    d.isMediaCallForVideoAndImageInputs)(e)) {
                        if (i.GlobalVars.hostClientType != u.HostClientType.android && i.GlobalVars.hostClientType != u.HostClientType.ios) {
                            var n = {
                                errorCode: o.ErrorCode.NOT_SUPPORTED_ON_PLATFORM
                            };
                            return void a(n, null)
                        }
                        if (!(0,
                        l.isAPISupportedByPlatform)(g.videoAndImageMediaAPISupportVersion)) {
                            t = {
                                errorCode: o.ErrorCode.OLD_PLATFORM
                            };
                            return void a(t, null)
                        }
                    }
                    (0,
                    d.validateSelectMediaInputs)(e) ? (0,
                    c.sendMessageToParent)("selectMedia", [e], function(e, n) {
                        if (n) {
                            for (var t = [], r = 0, i = n; r < i.length; r++) {
                                var o = i[r];
                                t.push(new s(o))
                            }
                            a(e, t)
                        } else
                            a(e, null)
                    }) : (e = {
                        errorCode: o.ErrorCode.INVALID_ARGUMENTS
                    },
                    a(e, null))
                } else {
                    var t = {
                        errorCode: o.ErrorCode.OLD_PLATFORM
                    };
                    a(t, null)
                }
            }
            ,
            e.viewImages = function(e, n) {
                if (!n)
                    throw new Error("[view images] Callback cannot be null");
                (0,
                l.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.task),
                (0,
                l.isAPISupportedByPlatform)(g.mediaAPISupportVersion) ? (0,
                d.validateViewImagesInput)(e) ? (0,
                c.sendMessageToParent)("viewImages", [e], n) : n({
                    errorCode: o.ErrorCode.INVALID_ARGUMENTS
                }) : n({
                    errorCode: o.ErrorCode.OLD_PLATFORM
                })
            }
            ,
            e.scanBarCode = function(e, n) {
                if (!e)
                    throw new Error("[media.scanBarCode] Callback cannot be null");
                (0,
                l.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.task),
                i.GlobalVars.hostClientType !== u.HostClientType.desktop && i.GlobalVars.hostClientType !== u.HostClientType.web && i.GlobalVars.hostClientType !== u.HostClientType.rigel && i.GlobalVars.hostClientType !== u.HostClientType.teamsRoomsWindows && i.GlobalVars.hostClientType !== u.HostClientType.teamsRoomsAndroid && i.GlobalVars.hostClientType !== u.HostClientType.teamsPhones && i.GlobalVars.hostClientType !== u.HostClientType.teamsDisplays ? (0,
                l.isAPISupportedByPlatform)(g.scanBarCodeAPIMobileSupportVersion) ? (0,
                d.validateScanBarCodeInput)(n) ? (0,
                c.sendMessageToParent)("media.scanBarCode", [n], e) : e({
                    errorCode: o.ErrorCode.INVALID_ARGUMENTS
                }, null) : e({
                    errorCode: o.ErrorCode.OLD_PLATFORM
                }, null) : e({
                    errorCode: o.ErrorCode.NOT_SUPPORTED_ON_PLATFORM
                }, null)
            }
        }(n.media || (n.media = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.validatePeoplePickerInput = n.validateScanBarCodeInput = n.validateViewImagesInput = n.validateGetMediaInputs = n.isMediaCallForVideoAndImageInputs = n.validateSelectMediaInputs = n.decodeAttachment = n.createFile = void 0;
        var r = t(17);
        n.createFile = function(e, n) {
            if (null == e || null == n || e.length <= 0)
                return null;
            var t, r = 1;
            return e.sort(function(e, n) {
                return e.sequence > n.sequence ? 1 : -1
            }),
            e.forEach(function(e) {
                e.sequence == r && (t = t ? new Blob([t, e.file],{
                    type: n
                }) : new Blob([e.file],{
                    type: n
                }),
                r++)
            }),
            t
        }
        ,
        n.decodeAttachment = function(e, n) {
            if (null == e || null == n)
                return null;
            for (var t = atob(e.chunk), r = new Array(t.length), i = 0; i < t.length; i++)
                r[i] = t.charCodeAt(i);
            var o = new Uint8Array(r)
              , n = new Blob([o],{
                type: n
            });
            return {
                sequence: e.chunkSequence,
                file: n
            }
        }
        ,
        n.validateSelectMediaInputs = function(e) {
            return !(null == e || 10 < e.maxMediaCount)
        }
        ,
        n.isMediaCallForVideoAndImageInputs = function(e) {
            return !(!e || e.mediaType != r.media.MediaType.VideoAndImage && !e.videoAndImageProps)
        }
        ,
        n.validateGetMediaInputs = function(e, n, t) {
            return null != e && null != n && n == r.media.FileFormat.ID && null != t
        }
        ,
        n.validateViewImagesInput = function(e) {
            return !(null == e || e.length <= 0 || 10 < e.length)
        }
        ,
        n.validateScanBarCodeInput = function(e) {
            return !e || !(null === e.timeOutIntervalInSec || e.timeOutIntervalInSec <= 0 || 60 < e.timeOutIntervalInSec)
        }
        ,
        n.validatePeoplePickerInput = function(e) {
            if (e) {
                if (e.title && "string" != typeof e.title)
                    return !1;
                if (e.setSelected && "object" != typeof e.setSelected)
                    return !1;
                if (e.openOrgWideSearchInChatOrChannel && "boolean" != typeof e.openOrgWideSearchInChatOrChannel)
                    return !1;
                if (e.singleSelect && "boolean" != typeof e.singleSelect)
                    return !1
            }
            return !0
        }
    }
    , function(e, n, t) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function(e, n, t, r) {
            void 0 === r && (r = t),
            Object.defineProperty(e, r, {
                enumerable: !0,
                get: function() {
                    return n[t]
                }
            })
        }
        : function(e, n, t, r) {
            e[r = void 0 === r ? t : r] = n[t]
        }
        )
          , i = this && this.__exportStar || function(e, n) {
            for (var t in e)
                "default" === t || Object.prototype.hasOwnProperty.call(n, t) || r(n, e, t)
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        i(t(20), n),
        i(t(8), n)
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.teams = n.appEntity = n.files = n.remoteCamera = n.meetingRoom = n.conversations = n.registerUserSettingsChangeHandler = n.uploadCustomApp = n.registerCustomHandler = n.sendCustomEvent = n.showNotification = n.sendCustomMessage = n.openFilePreview = n.getUserJoinedTeams = n.getConfigSetting = n.getChatMembers = n.exitFullscreen = n.enterFullscreen = n.UserSettingTypes = n.ViewerActionTypes = n.NotificationTypes = n.logs = n.menus = n.bot = void 0;
        var r = t(21);
        Object.defineProperty(n, "bot", {
            enumerable: !0,
            get: function() {
                return r.bot
            }
        });
        var i = t(15);
        Object.defineProperty(n, "menus", {
            enumerable: !0,
            get: function() {
                return i.menus
            }
        });
        var o = t(13);
        Object.defineProperty(n, "logs", {
            enumerable: !0,
            get: function() {
                return o.logs
            }
        });
        var a = t(35);
        Object.defineProperty(n, "NotificationTypes", {
            enumerable: !0,
            get: function() {
                return a.NotificationTypes
            }
        }),
        Object.defineProperty(n, "ViewerActionTypes", {
            enumerable: !0,
            get: function() {
                return a.ViewerActionTypes
            }
        }),
        Object.defineProperty(n, "UserSettingTypes", {
            enumerable: !0,
            get: function() {
                return a.UserSettingTypes
            }
        });
        var s = t(14);
        Object.defineProperty(n, "enterFullscreen", {
            enumerable: !0,
            get: function() {
                return s.enterFullscreen
            }
        }),
        Object.defineProperty(n, "exitFullscreen", {
            enumerable: !0,
            get: function() {
                return s.exitFullscreen
            }
        }),
        Object.defineProperty(n, "getChatMembers", {
            enumerable: !0,
            get: function() {
                return s.getChatMembers
            }
        }),
        Object.defineProperty(n, "getConfigSetting", {
            enumerable: !0,
            get: function() {
                return s.getConfigSetting
            }
        }),
        Object.defineProperty(n, "getUserJoinedTeams", {
            enumerable: !0,
            get: function() {
                return s.getUserJoinedTeams
            }
        }),
        Object.defineProperty(n, "openFilePreview", {
            enumerable: !0,
            get: function() {
                return s.openFilePreview
            }
        }),
        Object.defineProperty(n, "sendCustomMessage", {
            enumerable: !0,
            get: function() {
                return s.sendCustomMessage
            }
        }),
        Object.defineProperty(n, "showNotification", {
            enumerable: !0,
            get: function() {
                return s.showNotification
            }
        }),
        Object.defineProperty(n, "sendCustomEvent", {
            enumerable: !0,
            get: function() {
                return s.sendCustomEvent
            }
        }),
        Object.defineProperty(n, "registerCustomHandler", {
            enumerable: !0,
            get: function() {
                return s.registerCustomHandler
            }
        }),
        Object.defineProperty(n, "uploadCustomApp", {
            enumerable: !0,
            get: function() {
                return s.uploadCustomApp
            }
        }),
        Object.defineProperty(n, "registerUserSettingsChangeHandler", {
            enumerable: !0,
            get: function() {
                return s.registerUserSettingsChangeHandler
            }
        });
        var l = t(36);
        Object.defineProperty(n, "conversations", {
            enumerable: !0,
            get: function() {
                return l.conversations
            }
        });
        var u = t(37);
        Object.defineProperty(n, "meetingRoom", {
            enumerable: !0,
            get: function() {
                return u.meetingRoom
            }
        });
        var d = t(38);
        Object.defineProperty(n, "remoteCamera", {
            enumerable: !0,
            get: function() {
                return d.remoteCamera
            }
        });
        var c = t(39);
        Object.defineProperty(n, "files", {
            enumerable: !0,
            get: function() {
                return c.files
            }
        });
        var m = t(40);
        Object.defineProperty(n, "appEntity", {
            enumerable: !0,
            get: function() {
                return m.appEntity
            }
        });
        var g = t(41);
        Object.defineProperty(n, "teams", {
            enumerable: !0,
            get: function() {
                return g.teams
            }
        })
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.bot = void 0;
        var i = t(0)
          , o = t(1);
        !function(e) {
            e.sendQuery = function(e, t, r) {
                (0,
                o.ensureInitialized)(),
                (0,
                i.sendMessageToParent)("bot.executeQuery", [e], function(e, n) {
                    (e ? t : r)(n)
                })
            }
            ,
            e.getSupportedCommands = function(t, r) {
                (0,
                o.ensureInitialized)(),
                (0,
                i.sendMessageToParent)("bot.getSupportedCommands", function(e, n) {
                    (e ? t : r)(n)
                })
            }
            ,
            e.authenticate = function(e, t, r) {
                (0,
                o.ensureInitialized)(),
                (0,
                i.sendMessageToParent)("bot.authenticate", [e], function(e, n) {
                    (e ? t : r)(n)
                })
            }
            ,
            function(e) {
                e.Results = "Results",
                e.Auth = "Auth"
            }(e.ResponseType || (e.ResponseType = {}))
        }(n.bot || (n.bot = {}))
    }
    , function(e, n, t) {
        var r = t(23)
          , i = t(24)
          , t = i;
        t.v1 = r,
        t.v4 = i,
        e.exports = t
    }
    , function(e, n, t) {
        var d, c, m = t(9), g = t(10), f = 0, p = 0;
        e.exports = function(e, n, t) {
            var r = n && t || 0
              , i = n || []
              , o = (e = e || {}).node || d
              , a = void 0 !== e.clockseq ? e.clockseq : c;
            null != o && null != a || (l = m(),
            null == o && (o = d = [1 | l[0], l[1], l[2], l[3], l[4], l[5]]),
            null == a && (a = c = 16383 & (l[6] << 8 | l[7])));
            var s = void 0 !== e.msecs ? e.msecs : (new Date).getTime()
              , t = void 0 !== e.nsecs ? e.nsecs : p + 1
              , l = s - f + (t - p) / 1e4;
            if (l < 0 && void 0 === e.clockseq && (a = a + 1 & 16383),
            1e4 <= (t = (l < 0 || f < s) && void 0 === e.nsecs ? 0 : t))
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            f = s,
            c = a,
            t = (1e4 * (268435455 & (s += 122192928e5)) + (p = t)) % 4294967296,
            i[r++] = t >>> 24 & 255,
            i[r++] = t >>> 16 & 255,
            i[r++] = t >>> 8 & 255,
            i[r++] = 255 & t,
            s = s / 4294967296 * 1e4 & 268435455,
            i[r++] = s >>> 8 & 255,
            i[r++] = 255 & s,
            i[r++] = s >>> 24 & 15 | 16,
            i[r++] = s >>> 16 & 255,
            i[r++] = a >>> 8 | 128,
            i[r++] = 255 & a;
            for (var u = 0; u < 6; ++u)
                i[r + u] = o[u];
            return n || g(i)
        }
    }
    , function(e, n, t) {
        var a = t(9)
          , s = t(10);
        e.exports = function(e, n, t) {
            var r = n && t || 0;
            "string" == typeof e && (n = "binary" === e ? new Array(16) : null,
            e = null);
            var i = (e = e || {}).random || (e.rng || a)();
            if (i[6] = 15 & i[6] | 64,
            i[8] = 63 & i[8] | 128,
            n)
                for (var o = 0; o < 16; ++o)
                    n[r + o] = i[o];
            return n || s(i)
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.appInitialization = void 0;
        var r = t(1)
          , i = t(4)
          , o = t(0);
        !function(n) {
            n.Messages = {
                AppLoaded: "appInitialization.appLoaded",
                Success: "appInitialization.success",
                Failure: "appInitialization.failure",
                ExpectedFailure: "appInitialization.expectedFailure"
            },
            function(e) {
                e.AuthFailed = "AuthFailed",
                e.Timeout = "Timeout",
                e.Other = "Other"
            }(n.FailedReason || (n.FailedReason = {})),
            function(e) {
                e.PermissionError = "PermissionError",
                e.NotFound = "NotFound",
                e.Throttling = "Throttling",
                e.Offline = "Offline",
                e.Other = "Other"
            }(n.ExpectedFailureReason || (n.ExpectedFailureReason = {})),
            n.notifyAppLoaded = function() {
                (0,
                r.ensureInitialized)(),
                (0,
                o.sendMessageToParent)(n.Messages.AppLoaded, [i.version])
            }
            ,
            n.notifySuccess = function() {
                (0,
                r.ensureInitialized)(),
                (0,
                o.sendMessageToParent)(n.Messages.Success, [i.version])
            }
            ,
            n.notifyFailure = function(e) {
                (0,
                r.ensureInitialized)(),
                (0,
                o.sendMessageToParent)(n.Messages.Failure, [e.reason, e.message])
            }
            ,
            n.notifyExpectedFailure = function(e) {
                (0,
                r.ensureInitialized)(),
                (0,
                o.sendMessageToParent)(n.Messages.ExpectedFailure, [e.reason, e.message])
            }
        }(n.appInitialization || (n.appInitialization = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.initializeWithFrameContext = n.setFrameContext = n.executeDeepLink = n.shareDeepLink = n.getMruTabInstances = n.getTabInstances = n.registerEnterSettingsHandler = n.registerFocusEnterHandler = n.registerBeforeUnloadHandler = n.registerOnLoadHandler = n.registerBackButtonHandler = n.registerAppButtonHoverLeaveHandler = n.registerAppButtonHoverEnterHandler = n.registerAppButtonClickHandler = n.registerFullScreenHandler = n.registerOnThemeChangeHandler = n.getContext = n.print = n.enablePrintCapability = n._uninitialize = n._initialize = n.initialize = void 0;
        var r = t(1)
          , i = t(6)
          , o = t(4)
          , a = t(12)
          , s = t(5)
          , l = t(13)
          , u = t(2)
          , d = t(0)
          , c = t(11)
          , m = t(14)
          , g = t(3);
        function f(e, n) {
            i.GlobalVars.initializeCalled || (i.GlobalVars.initializeCalled = !0,
            g.initializeHandlers(),
            (0,
            d.initializeCommunication)(function(e, n, t) {
                void 0 === t && (t = o.defaultSDKVersionForCompatCheck),
                i.GlobalVars.frameContext = e,
                i.GlobalVars.hostClientType = n,
                i.GlobalVars.clientSupportedSDKVersion = t,
                i.GlobalVars.initializeCallbacks.forEach(function(e) {
                    return e()
                }),
                i.GlobalVars.initializeCallbacks = [],
                i.GlobalVars.initializeCompleted = !0
            }, n),
            c.authentication.initialize(),
            a.settings.initialize(),
            (0,
            m.initializePrivateApis)()),
            Array.isArray(n) && (0,
            r.processAdditionalValidOrigins)(n),
            e && (i.GlobalVars.initializeCompleted ? e() : i.GlobalVars.initializeCallbacks.push(e))
        }
        function p() {
            window.print()
        }
        function C(e) {
            (0,
            r.ensureInitialized)(),
            g.registerOnThemeChangeHandler(e)
        }
        function h(e) {
            (0,
            r.ensureInitialized)(),
            g.registerHandler("fullScreenChange", e)
        }
        function b(e) {
            (0,
            r.ensureInitialized)(),
            g.registerBackButtonHandler(e)
        }
        function v(e) {
            (0,
            r.ensureInitialized)(),
            g.registerOnLoadHandler(e)
        }
        function y(e) {
            (0,
            r.ensureInitialized)(),
            g.registerBeforeUnloadHandler(e)
        }
        function P(e) {
            (0,
            r.ensureInitialized)(),
            g.registerFocusEnterHandler(e)
        }
        function T(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content),
            (0,
            d.sendMessageToParent)("setFrameContext", [e])
        }
        n.initialize = f,
        n._initialize = function(e) {
            d.Communication.currentWindow = e
        }
        ,
        n._uninitialize = function() {
            i.GlobalVars.initializeCalled && (i.GlobalVars.frameContext && (C(null),
            h(null),
            b(null),
            y(null),
            P(null),
            v(null),
            l.logs.registerGetLogHandler(null)),
            i.GlobalVars.frameContext === u.FrameContexts.settings && a.settings.registerOnSaveHandler(null),
            i.GlobalVars.frameContext === u.FrameContexts.remove && a.settings.registerOnRemoveHandler(null),
            i.GlobalVars.initializeCalled = !1,
            i.GlobalVars.initializeCompleted = !1,
            i.GlobalVars.initializeCallbacks = [],
            i.GlobalVars.additionalValidOrigins = [],
            i.GlobalVars.frameContext = null,
            i.GlobalVars.hostClientType = null,
            (i.GlobalVars.isFramelessWindow = !1,
            d.uninitializeCommunication)())
        }
        ,
        n.enablePrintCapability = function() {
            i.GlobalVars.printCapabilityEnabled || (i.GlobalVars.printCapabilityEnabled = !0,
            (0,
            r.ensureInitialized)(),
            document.addEventListener("keydown", function(e) {
                (e.ctrlKey || e.metaKey) && 80 === e.keyCode && (p(),
                e.cancelBubble = !0,
                e.preventDefault(),
                e.stopImmediatePropagation())
            }))
        }
        ,
        n.print = p,
        n.getContext = function(n) {
            (0,
            r.ensureInitialized)(),
            (0,
            d.sendMessageToParent)("getContext", function(e) {
                e.frameContext || (e.frameContext = i.GlobalVars.frameContext),
                n(e)
            })
        }
        ,
        n.registerOnThemeChangeHandler = C,
        n.registerFullScreenHandler = h,
        n.registerAppButtonClickHandler = function(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content),
            g.registerHandler("appButtonClick", e)
        }
        ,
        n.registerAppButtonHoverEnterHandler = function(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content),
            g.registerHandler("appButtonHoverEnter", e)
        }
        ,
        n.registerAppButtonHoverLeaveHandler = function(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content),
            g.registerHandler("appButtonHoverLeave", e)
        }
        ,
        n.registerBackButtonHandler = b,
        n.registerOnLoadHandler = v,
        n.registerBeforeUnloadHandler = y,
        n.registerFocusEnterHandler = P,
        n.registerEnterSettingsHandler = function(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content),
            g.registerHandler("changeSettings", e)
        }
        ,
        n.getTabInstances = function(e, n) {
            (0,
            r.ensureInitialized)(),
            (0,
            d.sendMessageToParent)("getTabInstances", [n], e)
        }
        ,
        n.getMruTabInstances = function(e, n) {
            (0,
            r.ensureInitialized)(),
            (0,
            d.sendMessageToParent)("getMruTabInstances", [n], e)
        }
        ,
        n.shareDeepLink = function(e) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.sidePanel, u.FrameContexts.meetingStage),
            (0,
            d.sendMessageToParent)("shareDeepLink", [e.subEntityId, e.subEntityLabel, e.subEntityWebUrl])
        }
        ,
        n.executeDeepLink = function(e, n) {
            (0,
            r.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.sidePanel, u.FrameContexts.settings, u.FrameContexts.task, u.FrameContexts.stage, u.FrameContexts.meetingStage),
            (0,
            d.sendMessageToParent)("executeDeepLink", [e], n || (0,
            s.getGenericOnCompleteHandler)())
        }
        ,
        n.setFrameContext = T,
        n.initializeWithFrameContext = function(e, n, t) {
            f(n, t),
            T(e)
        }
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.navigateBack = n.navigateCrossDomain = n.navigateToTab = n.returnFocus = void 0;
        var r = t(1)
          , i = t(5)
          , o = t(2)
          , a = t(0);
        n.returnFocus = function(e) {
            (0,
            r.ensureInitialized)(o.FrameContexts.content),
            (0,
            a.sendMessageToParent)("returnFocus", [e])
        }
        ,
        n.navigateToTab = function(e, n) {
            (0,
            r.ensureInitialized)(),
            (0,
            a.sendMessageToParent)("navigateToTab", [e], n || (0,
            i.getGenericOnCompleteHandler)("Invalid internalTabInstanceId and/or channelId were/was provided"))
        }
        ,
        n.navigateCrossDomain = function(e, n) {
            (0,
            r.ensureInitialized)(o.FrameContexts.content, o.FrameContexts.sidePanel, o.FrameContexts.settings, o.FrameContexts.remove, o.FrameContexts.task, o.FrameContexts.stage, o.FrameContexts.meetingStage),
            (0,
            a.sendMessageToParent)("navigateCrossDomain", [e], n || (0,
            i.getGenericOnCompleteHandler)("Cross-origin navigation is only supported for URLs matching the pattern registered in the manifest."))
        }
        ,
        n.navigateBack = function(e) {
            (0,
            r.ensureInitialized)(),
            (0,
            a.sendMessageToParent)("navigateBack", [], e || (0,
            i.getGenericOnCompleteHandler)("Back navigation is not supported in the current client or context."))
        }
    }
    , function(e, n, t) {
        "use strict";
        var r = this && this.__rest || function(e, n) {
            var t = {};
            for (i in e)
                Object.prototype.hasOwnProperty.call(e, i) && n.indexOf(i) < 0 && (t[i] = e[i]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                    n.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (t[i[r]] = e[i[r]]);
            return t
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.tasks = void 0;
        var i = t(2)
          , o = t(16)
          , a = t(0)
          , s = t(1);
        !function(e) {
            e.startTask = function(e, n) {
                return (0,
                s.ensureInitialized)(i.FrameContexts.content, i.FrameContexts.sidePanel, i.FrameContexts.meetingStage),
                (0,
                a.sendMessageToParent)("tasks.startTask", [e], n),
                new o.ChildAppWindow
            }
            ,
            e.updateTask = function(e) {
                (0,
                s.ensureInitialized)(i.FrameContexts.task),
                e.width,
                e.height;
                var n = r(e, ["width", "height"]);
                if (Object.keys(n).length)
                    throw new Error("updateTask requires a taskInfo argument containing only width and height");
                (0,
                a.sendMessageToParent)("tasks.updateTask", [e])
            }
            ,
            e.submitTask = function(e, n) {
                (0,
                s.ensureInitialized)(i.FrameContexts.task),
                (0,
                a.sendMessageToParent)("tasks.completeTask", [e, Array.isArray(n) ? n : [n]])
            }
        }(n.tasks || (n.tasks = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.location = void 0;
        var r = t(7)
          , i = t(1)
          , o = t(2)
          , a = t(0)
          , s = t(4);
        !function(e) {
            e.getLocation = function(e, n) {
                if (!n)
                    throw new Error("[location.getLocation] Callback cannot be null");
                (0,
                i.ensureInitialized)(o.FrameContexts.content, o.FrameContexts.task),
                (0,
                i.isAPISupportedByPlatform)(s.locationAPIsRequiredVersion) ? e ? (0,
                a.sendMessageToParent)("location.getLocation", [e], n) : n({
                    errorCode: r.ErrorCode.INVALID_ARGUMENTS
                }, void 0) : n({
                    errorCode: r.ErrorCode.OLD_PLATFORM
                }, void 0)
            }
            ,
            e.showLocation = function(e, n) {
                if (!n)
                    throw new Error("[location.showLocation] Callback cannot be null");
                (0,
                i.ensureInitialized)(o.FrameContexts.content, o.FrameContexts.task),
                (0,
                i.isAPISupportedByPlatform)(s.locationAPIsRequiredVersion) ? e ? (0,
                a.sendMessageToParent)("location.showLocation", [e], n) : n({
                    errorCode: r.ErrorCode.INVALID_ARGUMENTS
                }, void 0) : n({
                    errorCode: r.ErrorCode.OLD_PLATFORM
                }, void 0)
            }
        }(n.location || (n.location = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.meeting = void 0;
        var r = t(0)
          , i = t(3)
          , o = t(1)
          , a = t(2);
        !function(e) {
            !function(e) {
                e.Unknown = "Unknown",
                e.Adhoc = "Adhoc",
                e.Scheduled = "Scheduled",
                e.Recurring = "Recurring",
                e.Broadcast = "Broadcast",
                e.MeetNow = "MeetNow"
            }(e.MeetingType || (e.MeetingType = {})),
            e.getIncomingClientAudioState = function(e) {
                if (!e)
                    throw new Error("[get incoming client audio state] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel, a.FrameContexts.meetingStage),
                (0,
                r.sendMessageToParent)("getIncomingClientAudioState", e)
            }
            ,
            e.toggleIncomingClientAudio = function(e) {
                if (!e)
                    throw new Error("[toggle incoming client audio] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel, a.FrameContexts.meetingStage),
                (0,
                r.sendMessageToParent)("toggleIncomingClientAudio", e)
            }
            ,
            e.getMeetingDetails = function(e) {
                if (!e)
                    throw new Error("[get meeting details] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel, a.FrameContexts.meetingStage, a.FrameContexts.settings, a.FrameContexts.content),
                (0,
                r.sendMessageToParent)("meeting.getMeetingDetails", e)
            }
            ,
            e.getAuthenticationTokenForAnonymousUser = function(e) {
                if (!e)
                    throw new Error("[get Authentication Token For AnonymousUser] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel, a.FrameContexts.meetingStage),
                (0,
                r.sendMessageToParent)("meeting.getAuthenticationTokenForAnonymousUser", e)
            }
            ,
            e.getLiveStreamState = function(e) {
                if (!e)
                    throw new Error("[get live stream state] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.getLiveStreamState", e)
            }
            ,
            e.requestStartLiveStreaming = function(e, n, t) {
                if (!e)
                    throw new Error("[request start live streaming] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.requestStartLiveStreaming", [n, t], e)
            }
            ,
            e.requestStopLiveStreaming = function(e) {
                if (!e)
                    throw new Error("[request stop live streaming] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.requestStopLiveStreaming", e)
            }
            ,
            e.registerLiveStreamChangedHandler = function(e) {
                if (!e)
                    throw new Error("[register live stream changed handler] Handler cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                i.registerHandler)("meeting.liveStreamChanged", e)
            }
            ,
            e.shareAppContentToStage = function(e, n) {
                if (!e)
                    throw new Error("[share app content to stage] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.shareAppContentToStage", [n], e)
            }
            ,
            e.getAppContentStageSharingCapabilities = function(e) {
                if (!e)
                    throw new Error("[get app content stage sharing capabilities] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.getAppContentStageSharingCapabilities", e)
            }
            ,
            e.stopSharingAppContentToStage = function(e) {
                if (!e)
                    throw new Error("[stop sharing app content to stage] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.stopSharingAppContentToStage", e)
            }
            ,
            e.getAppContentStageSharingState = function(e) {
                if (!e)
                    throw new Error("[get app content stage sharing state] Callback cannot be null");
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                r.sendMessageToParent)("meeting.getAppContentStageSharingState", e)
            }
        }(n.meeting || (n.meeting = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.monetization = void 0;
        var r = t(0)
          , i = t(1)
          , o = t(2);
        !function() {
            (n.monetization || (n.monetization = {})).openPurchaseExperience = function(e, n) {
                if (!e)
                    throw new Error("[open purchase experience] Callback cannot be null");
                (0,
                i.ensureInitialized)(o.FrameContexts.content),
                (0,
                r.sendMessageToParent)("monetization.openPurchaseExperience", [n], e)
            }
        }()
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.people = void 0;
        var r = t(1)
          , i = t(2)
          , o = t(7)
          , a = t(18)
          , s = t(0)
          , l = t(4);
        !function() {
            (n.people || (n.people = {})).selectPeople = function(e, n) {
                if (!e)
                    throw new Error("[people picker] Callback cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.content, i.FrameContexts.task, i.FrameContexts.settings),
                (0,
                r.isAPISupportedByPlatform)(l.peoplePickerRequiredVersion) ? (0,
                a.validatePeoplePickerInput)(n) ? (0,
                s.sendMessageToParent)("people.selectPeople", [n], e) : e({
                    errorCode: o.ErrorCode.INVALID_ARGUMENTS
                }, null) : e({
                    errorCode: o.ErrorCode.OLD_PLATFORM
                }, void 0)
            }
        }()
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.video = void 0;
        var i = t(0)
          , o = t(1)
          , a = t(2)
          , s = t(3);
        !function(e) {
            function t() {
                (0,
                i.sendMessageToParent)("video.videoFrameProcessed")
            }
            function r(e) {
                (0,
                i.sendMessageToParent)("video.notifyError", [e])
            }
            !function(e) {
                e[e.NV12 = 0] = "NV12"
            }(e.VideoFrameFormat || (e.VideoFrameFormat = {})),
            function(e) {
                e[e.EffectChanged = 0] = "EffectChanged",
                e[e.EffectDisabled = 1] = "EffectDisabled"
            }(e.EffectChangeType || (e.EffectChangeType = {})),
            e.registerForVideoFrame = function(n, e) {
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                s.registerHandler)("video.newVideoFrame", function(e) {
                    void 0 !== e && n(e, t, r)
                }),
                (0,
                i.sendMessageToParent)("video.registerForVideoFrame", [e])
            }
            ,
            e.notifySelectedVideoEffectChanged = function(e, n) {
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                i.sendMessageToParent)("video.videoEffectChanged", [e, n])
            }
            ,
            e.registerForVideoEffect = function(e) {
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                s.registerHandler)("video.effectParameterChange", e)
            }
            ,
            e.registerForPreviewStatus = function(e) {
                (0,
                o.ensureInitialized)(a.FrameContexts.sidePanel),
                (0,
                s.registerHandler)("video.previewStatusChanged", e)
            }
        }(n.video || (n.video = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.sharing = void 0;
        var a = t(1)
          , s = t(0)
          , l = t(7)
          , u = t(2);
        !function(t) {
            function r(e, n) {
                if (e && e.content && e.content.length)
                    return 1;
                n && n({
                    errorCode: l.ErrorCode.INVALID_ARGUMENTS,
                    message: "Shared content is missing"
                })
            }
            function i(n, e) {
                if (n.content.some(function(e) {
                    return !e.type
                }))
                    e && e({
                        errorCode: l.ErrorCode.INVALID_ARGUMENTS,
                        message: "Shared content type cannot be undefined"
                    });
                else {
                    if (!n.content.some(function(e) {
                        return e.type !== n.content[0].type
                    }))
                        return 1;
                    e && e({
                        errorCode: l.ErrorCode.INVALID_ARGUMENTS,
                        message: "Shared content must be of the same type"
                    })
                }
            }
            function o(e, n) {
                if ("URL" === e.content[0].type) {
                    if (!e.content.some(function(e) {
                        return !e.url
                    }))
                        return 1;
                    n && n({
                        errorCode: l.ErrorCode.INVALID_ARGUMENTS,
                        message: "URLs are required for URL content types"
                    })
                } else
                    n && n({
                        errorCode: l.ErrorCode.INVALID_ARGUMENTS,
                        message: "Content type is unsupported"
                    })
            }
            t.SharingAPIMessages = {
                shareWebContent: "sharing.shareWebContent"
            },
            t.shareWebContent = function(e, n) {
                r(e, n) && i(e, n) && o(e, n) && ((0,
                a.ensureInitialized)(u.FrameContexts.content, u.FrameContexts.sidePanel, u.FrameContexts.task, u.FrameContexts.stage, u.FrameContexts.meetingStage),
                (0,
                s.sendMessageToParent)(t.SharingAPIMessages.shareWebContent, [e], n))
            }
        }(n.sharing || (n.sharing = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.UserSettingTypes = n.ViewerActionTypes = n.NotificationTypes = void 0,
        function(e) {
            e.fileDownloadStart = "fileDownloadStart",
            e.fileDownloadComplete = "fileDownloadComplete"
        }(n.NotificationTypes || (n.NotificationTypes = {})),
        function(e) {
            e.view = "view",
            e.edit = "edit",
            e.editNew = "editNew"
        }(n.ViewerActionTypes || (n.ViewerActionTypes = {})),
        function(e) {
            e.fileOpenPreference = "fileOpenPreference",
            e.theme = "theme"
        }(n.UserSettingTypes || (n.UserSettingTypes = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.conversations = void 0;
        var r = t(1)
          , o = t(2)
          , a = t(0)
          , s = t(3);
        !function(e) {
            e.openConversation = function(i) {
                (0,
                r.ensureInitialized)(o.FrameContexts.content),
                (0,
                a.sendMessageToParent)("conversations.openConversation", [{
                    title: i.title,
                    subEntityId: i.subEntityId,
                    conversationId: i.conversationId,
                    channelId: i.channelId,
                    entityId: i.entityId
                }], function(e, n) {
                    if (!e)
                        throw new Error(n)
                }),
                i.onStartConversation && (0,
                s.registerHandler)("startConversation", function(e, n, t, r) {
                    return i.onStartConversation({
                        subEntityId: e,
                        conversationId: n,
                        channelId: t,
                        entityId: r
                    })
                }),
                i.onCloseConversation && (0,
                s.registerHandler)("closeConversation", function(e, n, t, r) {
                    return i.onCloseConversation({
                        subEntityId: e,
                        conversationId: n,
                        channelId: t,
                        entityId: r
                    })
                })
            }
            ,
            e.closeConversation = function() {
                (0,
                r.ensureInitialized)(o.FrameContexts.content),
                (0,
                a.sendMessageToParent)("conversations.closeConversation"),
                (0,
                s.removeHandler)("startConversation"),
                (0,
                s.removeHandler)("closeConversation")
            }
        }(n.conversations || (n.conversations = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.meetingRoom = void 0;
        var r = t(1)
          , i = t(0)
          , o = t(3);
        !function(e) {
            !function(e) {
                e.toggleMute = "toggleMute",
                e.toggleCamera = "toggleCamera",
                e.toggleCaptions = "toggleCaptions",
                e.volume = "volume",
                e.showVideoGallery = "showVideoGallery",
                e.showContent = "showContent",
                e.showVideoGalleryAndContent = "showVideoGalleryAndContent",
                e.showLargeGallery = "showLargeGallery",
                e.showTogether = "showTogether",
                e.leaveMeeting = "leaveMeeting"
            }(e.Capability || (e.Capability = {})),
            e.getPairedMeetingRoomInfo = function(e) {
                (0,
                r.ensureInitialized)(),
                (0,
                i.sendMessageToParent)("meetingRoom.getPairedMeetingRoomInfo", e)
            }
            ,
            e.sendCommandToPairedMeetingRoom = function(e, n) {
                if (!e || 0 == e.length)
                    throw new Error("[meetingRoom.sendCommandToPairedMeetingRoom] Command name cannot be null or empty");
                if (!n)
                    throw new Error("[meetingRoom.sendCommandToPairedMeetingRoom] Callback cannot be null");
                (0,
                r.ensureInitialized)(),
                (0,
                i.sendMessageToParent)("meetingRoom.sendCommandToPairedMeetingRoom", [e], n)
            }
            ,
            e.registerMeetingRoomCapabilitiesUpdateHandler = function(n) {
                if (!n)
                    throw new Error("[meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(),
                (0,
                o.registerHandler)("meetingRoom.meetingRoomCapabilitiesUpdate", function(e) {
                    (0,
                    r.ensureInitialized)(),
                    n(e)
                })
            }
            ,
            e.registerMeetingRoomStatesUpdateHandler = function(n) {
                if (!n)
                    throw new Error("[meetingRoom.registerMeetingRoomStatesUpdateHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(),
                (0,
                o.registerHandler)("meetingRoom.meetingRoomStatesUpdate", function(e) {
                    (0,
                    r.ensureInitialized)(),
                    n(e)
                })
            }
        }(n.meetingRoom || (n.meetingRoom = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.remoteCamera = void 0;
        var r = t(1)
          , i = t(2)
          , o = t(0)
          , a = t(3);
        !function(e) {
            !function(e) {
                e.Reset = "Reset",
                e.ZoomIn = "ZoomIn",
                e.ZoomOut = "ZoomOut",
                e.PanLeft = "PanLeft",
                e.PanRight = "PanRight",
                e.TiltUp = "TiltUp",
                e.TiltDown = "TiltDown"
            }(e.ControlCommand || (e.ControlCommand = {})),
            function(e) {
                e[e.CommandResetError = 0] = "CommandResetError",
                e[e.CommandZoomInError = 1] = "CommandZoomInError",
                e[e.CommandZoomOutError = 2] = "CommandZoomOutError",
                e[e.CommandPanLeftError = 3] = "CommandPanLeftError",
                e[e.CommandPanRightError = 4] = "CommandPanRightError",
                e[e.CommandTiltUpError = 5] = "CommandTiltUpError",
                e[e.CommandTiltDownError = 6] = "CommandTiltDownError",
                e[e.SendDataError = 7] = "SendDataError"
            }(e.ErrorReason || (e.ErrorReason = {})),
            function(e) {
                e[e.None = 0] = "None",
                e[e.ControlDenied = 1] = "ControlDenied",
                e[e.ControlNoResponse = 2] = "ControlNoResponse",
                e[e.ControlBusy = 3] = "ControlBusy",
                e[e.AckTimeout = 4] = "AckTimeout",
                e[e.ControlTerminated = 5] = "ControlTerminated",
                e[e.ControllerTerminated = 6] = "ControllerTerminated",
                e[e.DataChannelError = 7] = "DataChannelError",
                e[e.ControllerCancelled = 8] = "ControllerCancelled",
                e[e.ControlDisabled = 9] = "ControlDisabled",
                e[e.ControlTerminatedToAllowOtherController = 10] = "ControlTerminatedToAllowOtherController"
            }(e.SessionTerminatedReason || (e.SessionTerminatedReason = {})),
            e.getCapableParticipants = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.getCapableParticipants] Callback cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                o.sendMessageToParent)("remoteCamera.getCapableParticipants", e)
            }
            ,
            e.requestControl = function(e, n) {
                if (!e)
                    throw new Error("[remoteCamera.requestControl] Participant cannot be null");
                if (!n)
                    throw new Error("[remoteCamera.requestControl] Callback cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                o.sendMessageToParent)("remoteCamera.requestControl", [e], n)
            }
            ,
            e.sendControlCommand = function(e, n) {
                if (!e)
                    throw new Error("[remoteCamera.sendControlCommand] ControlCommand cannot be null");
                if (!n)
                    throw new Error("[remoteCamera.sendControlCommand] Callback cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                o.sendMessageToParent)("remoteCamera.sendControlCommand", [e], n)
            }
            ,
            e.terminateSession = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.terminateSession] Callback cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                o.sendMessageToParent)("remoteCamera.terminateSession", e)
            }
            ,
            e.registerOnCapableParticipantsChangeHandler = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.registerOnCapableParticipantsChangeHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                a.registerHandler)("remoteCamera.capableParticipantsChange", e)
            }
            ,
            e.registerOnErrorHandler = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.registerOnErrorHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                a.registerHandler)("remoteCamera.handlerError", e)
            }
            ,
            e.registerOnDeviceStateChangeHandler = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.registerOnDeviceStateChangeHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                a.registerHandler)("remoteCamera.deviceStateChange", e)
            }
            ,
            e.registerOnSessionStatusChangeHandler = function(e) {
                if (!e)
                    throw new Error("[remoteCamera.registerOnSessionStatusChangeHandler] Handler cannot be null");
                (0,
                r.ensureInitialized)(i.FrameContexts.sidePanel),
                (0,
                a.registerHandler)("remoteCamera.sessionStatusChange", e)
            }
        }(n.remoteCamera || (n.remoteCamera = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.files = void 0;
        var r = t(0)
          , i = t(1)
          , o = t(8);
        !function(e) {
            !function(e) {
                e.Dropbox = "DROPBOX",
                e.Box = "BOX",
                e.Sharefile = "SHAREFILE",
                e.GoogleDrive = "GOOGLEDRIVE",
                e.Egnyte = "EGNYTE"
            }(e.CloudStorageProvider || (e.CloudStorageProvider = {})),
            function(e) {
                e[e.Sharepoint = 0] = "Sharepoint",
                e[e.WopiIntegration = 1] = "WopiIntegration",
                e[e.Google = 2] = "Google"
            }(e.CloudStorageProviderType || (e.CloudStorageProviderType = {})),
            e.getCloudStorageFolders = function(e, n) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e || 0 == e.length)
                    throw new Error("[files.getCloudStorageFolders] channelId name cannot be null or empty");
                if (!n)
                    throw new Error("[files.getCloudStorageFolders] Callback cannot be null");
                (0,
                r.sendMessageToParent)("files.getCloudStorageFolders", [e], n)
            }
            ,
            e.addCloudStorageFolder = function(e, n) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e || 0 == e.length)
                    throw new Error("[files.addCloudStorageFolder] channelId name cannot be null or empty");
                if (!n)
                    throw new Error("[files.addCloudStorageFolder] Callback cannot be null");
                (0,
                r.sendMessageToParent)("files.addCloudStorageFolder", [e], n)
            }
            ,
            e.deleteCloudStorageFolder = function(e, n, t) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e)
                    throw new Error("[files.deleteCloudStorageFolder] channelId name cannot be null or empty");
                if (!n)
                    throw new Error("[files.deleteCloudStorageFolder] folderToDelete cannot be null or empty");
                if (!t)
                    throw new Error("[files.deleteCloudStorageFolder] Callback cannot be null");
                (0,
                r.sendMessageToParent)("files.deleteCloudStorageFolder", [e, n], t)
            }
            ,
            e.getCloudStorageFolderContents = function(e, n, t) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e || !n)
                    throw new Error("[files.getCloudStorageFolderContents] folder/providerCode name cannot be null or empty");
                if (!t)
                    throw new Error("[files.getCloudStorageFolderContents] Callback cannot be null");
                if ("isSubdirectory"in e && !e.isSubdirectory)
                    throw new Error("[files.getCloudStorageFolderContents] provided folder is not a subDirectory");
                (0,
                r.sendMessageToParent)("files.getCloudStorageFolderContents", [e, n], t)
            }
            ,
            e.openCloudStorageFile = function(e, n, t) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e || !n)
                    throw new Error("[files.openCloudStorageFile] file/providerCode cannot be null or empty");
                if (e.isSubdirectory)
                    throw new Error("[files.openCloudStorageFile] provided file is a subDirectory");
                (0,
                r.sendMessageToParent)("files.openCloudStorageFile", [e, n, t])
            }
        }(n.files || (n.files = {}))
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.appEntity = void 0;
        var i = t(0)
          , o = t(1)
          , a = t(8);
        !function() {
            (n.appEntity || (n.appEntity = {})).selectAppEntity = function(e, n, t, r) {
                if ((0,
                o.ensureInitialized)(a.FrameContexts.content),
                !e || 0 == e.length)
                    throw new Error("[appEntity.selectAppEntity] threadId name cannot be null or empty");
                if (!r)
                    throw new Error("[appEntity.selectAppEntity] Callback cannot be null");
                (0,
                i.sendMessageToParent)("appEntity.selectAppEntity", [e, n, t], r)
            }
        }()
    }
    , function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.teams = void 0;
        var r = t(0)
          , i = t(1)
          , o = t(8);
        !function(e) {
            !function(e) {
                e[e.Regular = 0] = "Regular",
                e[e.Private = 1] = "Private",
                e[e.Shared = 2] = "Shared"
            }(e.ChannelType || (e.ChannelType = {})),
            e.getTeamChannels = function(e, n) {
                if ((0,
                i.ensureInitialized)(o.FrameContexts.content),
                !e)
                    throw new Error("[teams.getTeamChannels] groupId cannot be null or empty");
                if (!n)
                    throw new Error("[teams.getTeamChannels] Callback cannot be null");
                (0,
                r.sendMessageToParent)("teams.getTeamChannels", [e], n)
            }
            ,
            e.refreshSiteUrl = function(e, n) {
                if ((0,
                i.ensureInitialized)(),
                !e)
                    throw new Error("[teams.refreshSiteUrl] threadId cannot be null or empty");
                if (!n)
                    throw new Error("[teams.refreshSiteUrl] Callback cannot be null");
                (0,
                r.sendMessageToParent)("teams.refreshSiteUrl", [e], n)
            }
        }(n.teams || (n.teams = {}))
    }
    ])
});
