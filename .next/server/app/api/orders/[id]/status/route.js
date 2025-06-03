/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/orders/[id]/status/route";
exports.ids = ["app/api/orders/[id]/status/route"];
exports.modules = {

/***/ "(rsc)/./app/api/orders/[id]/status/route.ts":
/*!*********************************************!*\
  !*** ./app/api/orders/[id]/status/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shered_constants_auth_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/shered/constants/auth-options */ \"(rsc)/./shered/constants/auth-options.ts\");\n/* harmony import */ var _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/prisma/prisma-client */ \"(rsc)/./prisma/prisma-client.ts\");\n\n\n\n\nasync function PATCH(request, context) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_shered_constants_auth_options__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user?.id || session.user.role !== 'Admin') {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Доступ запрещён. Требуются права администратора.'\n            }, {\n                status: 403\n            });\n        }\n        const params = await context.params;\n        const { id } = params;\n        const body = await request.json();\n        const { status } = body;\n        if (!status || ![\n            'PENDING',\n            'SUCCEEDED',\n            'CANCELLED'\n        ].includes(status)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Неверный статус заказа.'\n            }, {\n                status: 400\n            });\n        }\n        const updatedOrder = await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_3__.prisma.orders.update({\n            where: {\n                id: Number(id)\n            },\n            data: {\n                status\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(updatedOrder);\n    } catch (error) {\n        console.error('[ADMIN_ORDERS_STATUS_PATCH] Ошибка в', new Date().toISOString(), error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Ошибка сервера'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL29yZGVycy9baWRdL3N0YXR1cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDRTtBQUNpQjtBQUNkO0FBRXpDLGVBQWVJLE1BQ3BCQyxPQUFnQixFQUNoQkMsT0FBNEM7SUFFNUMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sMkRBQWdCQSxDQUFDQyx1RUFBV0E7UUFFbEQsSUFBSSxDQUFDSyxTQUFTQyxNQUFNQyxNQUFNRixRQUFRQyxJQUFJLENBQUNFLElBQUksS0FBSyxTQUFTO1lBQ3ZELE9BQU9WLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQW1ELEdBQzVEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFDQSxNQUFNQyxTQUFTLE1BQU1SLFFBQVFRLE1BQU07UUFDbkMsTUFBTSxFQUFFTCxFQUFFLEVBQUUsR0FBR0s7UUFDZixNQUFNQyxPQUFPLE1BQU1WLFFBQVFNLElBQUk7UUFDL0IsTUFBTSxFQUFFRSxNQUFNLEVBQUUsR0FBR0U7UUFFbkIsSUFBSSxDQUFDRixVQUFVLENBQUM7WUFBQztZQUFXO1lBQWE7U0FBWSxDQUFDRyxRQUFRLENBQUNILFNBQVM7WUFDdEUsT0FBT2IscURBQVlBLENBQUNXLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBMEIsR0FDbkM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1JLGVBQWUsTUFBTWQseURBQU1BLENBQUNlLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO1lBQzlDQyxPQUFPO2dCQUFFWCxJQUFJWSxPQUFPWjtZQUFJO1lBQ3hCYSxNQUFNO2dCQUFFVDtZQUFPO1FBQ2pCO1FBRUEsT0FBT2IscURBQVlBLENBQUNXLElBQUksQ0FBQ007SUFDM0IsRUFBRSxPQUFPTCxPQUFPO1FBQ2RXLFFBQVFYLEtBQUssQ0FDWCx3Q0FDQSxJQUFJWSxPQUFPQyxXQUFXLElBQ3RCYjtRQUVGLE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN0RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHJvbmV0ZWxcXERlc2t0b3BcXGV5cnNcXGt5cnNhY2hcXGFwcFxcYXBpXFxvcmRlcnNcXFtpZF1cXHN0YXR1c1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL3NoZXJlZC9jb25zdGFudHMvYXV0aC1vcHRpb25zJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9wcmlzbWEvcHJpc21hLWNsaWVudCc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0goXHJcbiAgcmVxdWVzdDogUmVxdWVzdCxcclxuICBjb250ZXh0OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG5cclxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQgfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09ICdBZG1pbicpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQlNC+0YHRgtGD0L8g0LfQsNC/0YDQtdGJ0ZHQvS4g0KLRgNC10LHRg9GO0YLRgdGPINC/0YDQsNCy0LAg0LDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YDQsC4nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCBjb250ZXh0LnBhcmFtcztcclxuICAgIGNvbnN0IHsgaWQgfSA9IHBhcmFtcztcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgIGNvbnN0IHsgc3RhdHVzIH0gPSBib2R5O1xyXG5cclxuICAgIGlmICghc3RhdHVzIHx8ICFbJ1BFTkRJTkcnLCAnU1VDQ0VFREVEJywgJ0NBTkNFTExFRCddLmluY2x1ZGVzKHN0YXR1cykpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQndC10LLQtdGA0L3Ri9C5INGB0YLQsNGC0YPRgSDQt9Cw0LrQsNC30LAuJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZWRPcmRlciA9IGF3YWl0IHByaXNtYS5vcmRlcnMudXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IE51bWJlcihpZCkgfSxcclxuICAgICAgZGF0YTogeyBzdGF0dXMgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1cGRhdGVkT3JkZXIpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAnW0FETUlOX09SREVSU19TVEFUVVNfUEFUQ0hdINCe0YjQuNCx0LrQsCDQsicsXHJcbiAgICAgIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgZXJyb3JcclxuICAgICk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCcgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIlBBVENIIiwicmVxdWVzdCIsImNvbnRleHQiLCJzZXNzaW9uIiwidXNlciIsImlkIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInBhcmFtcyIsImJvZHkiLCJpbmNsdWRlcyIsInVwZGF0ZWRPcmRlciIsIm9yZGVycyIsInVwZGF0ZSIsIndoZXJlIiwiTnVtYmVyIiwiZGF0YSIsImNvbnNvbGUiLCJEYXRlIiwidG9JU09TdHJpbmciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/orders/[id]/status/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&page=%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute.ts&appDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&page=%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute.ts&appDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ronetel_Desktop_eyrs_kyrsach_app_api_orders_id_status_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/orders/[id]/status/route.ts */ \"(rsc)/./app/api/orders/[id]/status/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/orders/[id]/status/route\",\n        pathname: \"/api/orders/[id]/status\",\n        filename: \"route\",\n        bundlePath: \"app/api/orders/[id]/status/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ronetel\\\\Desktop\\\\eyrs\\\\kyrsach\\\\app\\\\api\\\\orders\\\\[id]\\\\status\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ronetel_Desktop_eyrs_kyrsach_app_api_orders_id_status_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZvcmRlcnMlMkYlNUJpZCU1RCUyRnN0YXR1cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGb3JkZXJzJTJGJTVCaWQlNUQlMkZzdGF0dXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZvcmRlcnMlMkYlNUJpZCU1RCUyRnN0YXR1cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNyb25ldGVsJTVDRGVza3RvcCU1Q2V5cnMlNUNreXJzYWNoJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNyb25ldGVsJTVDRGVza3RvcCU1Q2V5cnMlNUNreXJzYWNoJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvQztBQUNqSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxccm9uZXRlbFxcXFxEZXNrdG9wXFxcXGV5cnNcXFxca3lyc2FjaFxcXFxhcHBcXFxcYXBpXFxcXG9yZGVyc1xcXFxbaWRdXFxcXHN0YXR1c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvb3JkZXJzL1tpZF0vc3RhdHVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvb3JkZXJzL1tpZF0vc3RhdHVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9vcmRlcnMvW2lkXS9zdGF0dXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxyb25ldGVsXFxcXERlc2t0b3BcXFxcZXlyc1xcXFxreXJzYWNoXFxcXGFwcFxcXFxhcGlcXFxcb3JkZXJzXFxcXFtpZF1cXFxcc3RhdHVzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&page=%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute.ts&appDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./prisma/prisma-client.ts":
/*!*********************************!*\
  !*** ./prisma/prisma-client.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9wcmlzbWEvcHJpc21hLWNsaWVudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xccm9uZXRlbFxcRGVza3RvcFxcZXlyc1xca3lyc2FjaFxccHJpc21hXFxwcmlzbWEtY2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./prisma/prisma-client.ts\n");

/***/ }),

/***/ "(rsc)/./shered/constants/auth-options.ts":
/*!******************************************!*\
  !*** ./shered/constants/auth-options.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/prisma/prisma-client */ \"(rsc)/./prisma/prisma-client.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || '',\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: 'Email',\n                    type: 'text'\n                },\n                password: {\n                    label: 'Password',\n                    type: 'password'\n                }\n            },\n            async authorize (credentials) {\n                console.log('Credentials received:', credentials);\n                if (!credentials) {\n                    console.log('No credentials provided');\n                    return null;\n                }\n                const findUser = await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__.prisma.users.findFirst({\n                    where: {\n                        Email_user: credentials.email\n                    }\n                });\n                if (!findUser) {\n                    console.log('User not found:', credentials.email);\n                    return null;\n                }\n                console.log('User found:', findUser);\n                const isPasswordValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_3__.compare)(credentials.password, findUser.Password_user);\n                if (!isPasswordValid) {\n                    console.log('Invalid password for user:', credentials.email);\n                    return null;\n                }\n                if (!findUser.verified) {\n                    console.log('User not verified:', credentials.email);\n                    return null;\n                }\n                const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().sign({\n                    id: findUser.ID_User,\n                    email: findUser.Email_user\n                }, process.env.JWT_SECRET || '');\n                console.log('Authentication successful, token generated');\n                return {\n                    id: findUser.ID_User,\n                    email: findUser.Email_user,\n                    name: findUser.Name_user,\n                    role: findUser.role,\n                    accessToken: token\n                };\n            }\n        })\n    ],\n    secret: process.env.NEXTAUTH_SECRET,\n    pages: {\n        signIn: '/api/auth/signin'\n    },\n    session: {\n        strategy: 'jwt'\n    },\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            try {\n                if (account?.provider === 'credentials' && user.id && user.token) {\n                    const response = await fetch('/api/merge-cart', {\n                        method: 'POST',\n                        headers: {\n                            'Content-Type': 'application/json'\n                        },\n                        body: JSON.stringify({\n                            userId: Number(user.id),\n                            cartToken: user.token\n                        })\n                    });\n                    if (!response.ok) {\n                        console.error('Failed to merge cart:', await response.text());\n                    }\n                }\n                if (!user.email) {\n                    return false;\n                }\n                const findUser = await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__.prisma.users.findFirst({\n                    where: {\n                        OR: [\n                            {\n                                provider: account?.provider,\n                                providerId: account?.providerAccountId ? String(account.providerAccountId) : null\n                            },\n                            {\n                                Email_user: user.email\n                            }\n                        ]\n                    }\n                });\n                if (findUser) {\n                    await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__.prisma.users.update({\n                        where: {\n                            ID_User: findUser.ID_User\n                        },\n                        data: {\n                            provider: account?.provider,\n                            providerId: account?.providerAccountId ? String(account.providerAccountId) : null\n                        }\n                    });\n                    if (account?.provider === 'google' && user.id && user.token) {\n                        const response = await fetch('/api/merge-cart', {\n                            method: 'POST',\n                            headers: {\n                                'Content-Type': 'application/json'\n                            },\n                            body: JSON.stringify({\n                                userId: Number(user.id),\n                                cartToken: user.token\n                            })\n                        });\n                        if (!response.ok) {\n                            console.error('Failed to merge cart:', await response.text());\n                        }\n                    }\n                    return true;\n                }\n                const newUser = await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__.prisma.users.create({\n                    data: {\n                        Email_user: user.email,\n                        Name_user: user.name || 'User #' + user.id,\n                        Password_user: (0,bcryptjs__WEBPACK_IMPORTED_MODULE_3__.hashSync)(user.email, 10),\n                        verified: new Date(),\n                        provider: account?.provider,\n                        providerId: account?.providerAccountId ? String(account.providerAccountId) : null\n                    }\n                });\n                if (account?.provider === 'google' && newUser.ID_User && user.token) {\n                    const response = await fetch('/api/merge-cart', {\n                        method: 'POST',\n                        headers: {\n                            'Content-Type': 'application/json'\n                        },\n                        body: JSON.stringify({\n                            userId: newUser.ID_User,\n                            cartToken: user.token\n                        })\n                    });\n                    if (!response.ok) {\n                        console.error('Failed to merge cart:', await response.text());\n                    }\n                }\n                return true;\n            } catch (error) {\n                console.error('Error [SIGNIN]', error);\n                return false;\n            }\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = Number(user.id);\n                token.email = user.email;\n                token.fullName = user.name;\n                token.role = user.role;\n                token.token = user.token;\n            }\n            if (!token.email) {\n                return token;\n            }\n            const findUser = await _prisma_prisma_client__WEBPACK_IMPORTED_MODULE_2__.prisma.users.findFirst({\n                where: {\n                    Email_user: token.email\n                }\n            });\n            if (findUser) {\n                token.id = findUser.ID_User;\n                token.email = findUser.Email_user;\n                token.fullName = findUser.Name_user;\n                token.role = findUser.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.id = Number(token.id);\n                session.user.role = token.role;\n                session.user.token = token.token;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUtmLEtBQUs7WUFDMUI7WUFFQSxJQUFJLENBQUNBLE1BQU1mLEtBQUssRUFBRTtnQkFDaEIsT0FBT2U7WUFDVDtZQUVBLE1BQU1SLFdBQVcsTUFBTXJCLHlEQUFNQSxDQUFDc0IsS0FBSyxDQUFDQyxTQUFTLENBQUM7Z0JBQzVDQyxPQUFPO29CQUNMQyxZQUFZSSxNQUFNZixLQUFLO2dCQUN6QjtZQUNGO1lBRUEsSUFBSU8sVUFBVTtnQkFDWlEsTUFBTUUsRUFBRSxHQUFHVixTQUFTVyxPQUFPO2dCQUMzQkgsTUFBTWYsS0FBSyxHQUFHTyxTQUFTSSxVQUFVO2dCQUNqQ0ksTUFBTXlDLFFBQVEsR0FBR2pELFNBQVNhLFNBQVM7Z0JBQ25DTCxNQUFNTSxJQUFJLEdBQUdkLFNBQVNjLElBQUk7WUFDNUI7WUFFQSxPQUFPTjtRQUNUO1FBQ0EsTUFBTVksU0FBUSxFQUFFQSxPQUFPLEVBQUVaLEtBQUssRUFBRTtZQUM5QixJQUFJWSxTQUFTRyxNQUFNO2dCQUNqQkgsUUFBUUcsSUFBSSxDQUFDYixFQUFFLEdBQUd5QixPQUFPM0IsTUFBTUUsRUFBRTtnQkFDakNVLFFBQVFHLElBQUksQ0FBQ1QsSUFBSSxHQUFHTixNQUFNTSxJQUFJO2dCQUM5Qk0sUUFBUUcsSUFBSSxDQUFDZixLQUFLLEdBQUdBLE1BQU1BLEtBQUs7WUFDbEM7WUFDQSxPQUFPWTtRQUNUO0lBQ0Y7QUFDRixFQUFFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHJvbmV0ZWxcXERlc2t0b3BcXGV5cnNcXGt5cnNhY2hcXHNoZXJlZFxcY29uc3RhbnRzXFxhdXRoLW9wdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9wcmlzbWEvcHJpc21hLWNsaWVudCc7XHJcbmltcG9ydCB7IGNvbXBhcmUsIGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IEF1dGhPcHRpb25zID0ge1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCB8fCAnJyxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIH0pLFxyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICd0ZXh0JyB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVkZW50aWFscyByZWNlaXZlZDonLCBjcmVkZW50aWFscyk7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ05vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXJzLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBFbWFpbF91c2VyOiBjcmVkZW50aWFscy5lbWFpbCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghZmluZFVzZXIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIG5vdCBmb3VuZDonLCBjcmVkZW50aWFscy5lbWFpbCk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGZvdW5kOicsIGZpbmRVc2VyKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgY29tcGFyZShcclxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgZmluZFVzZXIuUGFzc3dvcmRfdXNlclxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBwYXNzd29yZCBmb3IgdXNlcjonLCBjcmVkZW50aWFscy5lbWFpbCk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZmluZFVzZXIudmVyaWZpZWQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIG5vdCB2ZXJpZmllZDonLCBjcmVkZW50aWFscy5lbWFpbCk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgICAgICB7IGlkOiBmaW5kVXNlci5JRF9Vc2VyLCBlbWFpbDogZmluZFVzZXIuRW1haWxfdXNlciB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAnJ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRoZW50aWNhdGlvbiBzdWNjZXNzZnVsLCB0b2tlbiBnZW5lcmF0ZWQnKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGZpbmRVc2VyLklEX1VzZXIsXHJcbiAgICAgICAgICBlbWFpbDogZmluZFVzZXIuRW1haWxfdXNlcixcclxuICAgICAgICAgIG5hbWU6IGZpbmRVc2VyLk5hbWVfdXNlcixcclxuICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLnJvbGUsXHJcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogdG9rZW4sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9hcGkvYXV0aC9zaWduaW4nLFxyXG4gIH0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxyXG4gIH0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09ICdjcmVkZW50aWFscycgJiYgdXNlci5pZCAmJiB1c2VyLnRva2VuKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL21lcmdlLWNhcnQnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgIHVzZXJJZDogTnVtYmVyKHVzZXIuaWQpLFxyXG4gICAgICAgICAgICAgIGNhcnRUb2tlbjogdXNlci50b2tlbixcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBtZXJnZSBjYXJ0OicsIGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIuZW1haWwpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXJzLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBPUjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBhY2NvdW50Py5wcm92aWRlcixcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVySWQ6IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkXHJcbiAgICAgICAgICAgICAgICAgID8gU3RyaW5nKGFjY291bnQucHJvdmlkZXJBY2NvdW50SWQpXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgRW1haWxfdXNlcjogdXNlci5lbWFpbCB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZpbmRVc2VyKSB7XHJcbiAgICAgICAgICBhd2FpdCBwcmlzbWEudXNlcnMudXBkYXRlKHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICBJRF9Vc2VyOiBmaW5kVXNlci5JRF9Vc2VyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgcHJvdmlkZXI6IGFjY291bnQ/LnByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgIHByb3ZpZGVySWQ6IGFjY291bnQ/LnByb3ZpZGVyQWNjb3VudElkXHJcbiAgICAgICAgICAgICAgICA/IFN0cmluZyhhY2NvdW50LnByb3ZpZGVyQWNjb3VudElkKVxyXG4gICAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnZ29vZ2xlJyAmJiB1c2VyLmlkICYmIHVzZXIudG9rZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9tZXJnZS1jYXJ0Jywge1xyXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IE51bWJlcih1c2VyLmlkKSxcclxuICAgICAgICAgICAgICAgIGNhcnRUb2tlbjogdXNlci50b2tlbixcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIG1lcmdlIGNhcnQ6JywgYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgcHJpc21hLnVzZXJzLmNyZWF0ZSh7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIEVtYWlsX3VzZXI6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIE5hbWVfdXNlcjogdXNlci5uYW1lIHx8ICdVc2VyICMnICsgdXNlci5pZCxcclxuICAgICAgICAgICAgUGFzc3dvcmRfdXNlcjogaGFzaFN5bmModXNlci5lbWFpbCwgMTApLFxyXG4gICAgICAgICAgICB2ZXJpZmllZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgcHJvdmlkZXI6IGFjY291bnQ/LnByb3ZpZGVyLFxyXG4gICAgICAgICAgICBwcm92aWRlcklkOiBhY2NvdW50Py5wcm92aWRlckFjY291bnRJZFxyXG4gICAgICAgICAgICAgID8gU3RyaW5nKGFjY291bnQucHJvdmlkZXJBY2NvdW50SWQpXHJcbiAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnZ29vZ2xlJyAmJiBuZXdVc2VyLklEX1VzZXIgJiYgdXNlci50b2tlbikge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9tZXJnZS1jYXJ0Jywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICB1c2VySWQ6IG5ld1VzZXIuSURfVXNlcixcclxuICAgICAgICAgICAgICBjYXJ0VG9rZW46IHVzZXIudG9rZW4sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbWVyZ2UgY2FydDonLCBhd2FpdCByZXNwb25zZS50ZXh0KCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBbU0lHTklOXScsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdG9rZW4uaWQgPSBOdW1iZXIodXNlci5pZCk7XHJcbiAgICAgICAgdG9rZW4uZW1haWwgPSB1c2VyLmVtYWlsO1xyXG4gICAgICAgIHRva2VuLmZ1bGxOYW1lID0gdXNlci5uYW1lO1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgdG9rZW4udG9rZW4gPSB1c2VyLnRva2VuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRva2VuLmVtYWlsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmaW5kVXNlciA9IGF3YWl0IHByaXNtYS51c2Vycy5maW5kRmlyc3Qoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBFbWFpbF91c2VyOiB0b2tlbi5lbWFpbCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChmaW5kVXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gZmluZFVzZXIuSURfVXNlcjtcclxuICAgICAgICB0b2tlbi5lbWFpbCA9IGZpbmRVc2VyLkVtYWlsX3VzZXI7XHJcbiAgICAgICAgdG9rZW4uZnVsbE5hbWUgPSBmaW5kVXNlci5OYW1lX3VzZXI7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IGZpbmRVc2VyLnJvbGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoc2Vzc2lvbj8udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IE51bWJlcih0b2tlbi5pZCk7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xyXG4gICAgICAgIHNlc3Npb24udXNlci50b2tlbiA9IHRva2VuLnRva2VuO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsIkdvb2dsZVByb3ZpZGVyIiwicHJpc21hIiwiY29tcGFyZSIsImhhc2hTeW5jIiwiand0IiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsImZpbmRVc2VyIiwidXNlcnMiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsIkVtYWlsX3VzZXIiLCJpc1Bhc3N3b3JkVmFsaWQiLCJQYXNzd29yZF91c2VyIiwidmVyaWZpZWQiLCJ0b2tlbiIsInNpZ24iLCJpZCIsIklEX1VzZXIiLCJKV1RfU0VDUkVUIiwiTmFtZV91c2VyIiwicm9sZSIsImFjY2Vzc1Rva2VuIiwic2VjcmV0IiwiTkVYVEFVVEhfU0VDUkVUIiwicGFnZXMiLCJzaWduSW4iLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJ1c2VyIiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VySWQiLCJOdW1iZXIiLCJjYXJ0VG9rZW4iLCJvayIsImVycm9yIiwidGV4dCIsIk9SIiwicHJvdmlkZXJJZCIsInByb3ZpZGVyQWNjb3VudElkIiwiU3RyaW5nIiwidXBkYXRlIiwiZGF0YSIsIm5ld1VzZXIiLCJjcmVhdGUiLCJEYXRlIiwiZnVsbE5hbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./shered/constants/auth-options.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/jsonwebtoken","vendor-chunks/@babel","vendor-chunks/lodash.includes","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/oidc-token-hash","vendor-chunks/lodash.isplainobject","vendor-chunks/@panva","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&page=%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2F%5Bid%5D%2Fstatus%2Froute.ts&appDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cronetel%5CDesktop%5Ceyrs%5Ckyrsach&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();