"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/completeorder",{

/***/ "./pages/completeorder.js":
/*!********************************!*\
  !*** ./pages/completeorder.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nfunction OrderCompletionPage() {\n    _s();\n    // Initial state for the basket items\n    const [basketItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            id: 1,\n            name: \"iPhone 13 128 GB - Black\",\n            price: 1.00,\n            image: \"https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png\",\n            seller: \"Hepsiburada\",\n            quantity: 1\n        },\n        {\n            id: 2,\n            name: \"Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692\",\n            price: 1.00,\n            image: \"https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png\",\n            seller: \"Hepsiburada\",\n            quantity: 1\n        }\n    ]);\n    // State for the address and payment method\n    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [paymentMethod, setPaymentMethod] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    // Function to handle form submission\n    const handlePurchase = ()=>{\n        // Implement what should happen when purchase is made\n        console.log(\"Purchase made with address:\", address, \"and payment method:\", paymentMethod);\n    };\n    const additionalProducts = basketItems.length > 2 ? basketItems.length - 2 : 0;\n    // Calculate the total price\n    const totalPrice = basketItems.reduce((total, item)=>total + item.price * item.quantity, 0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mt-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Order Summary\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"d-flex align-items-center mb-3\",\n                children: [\n                    basketItems.slice(0, 2).map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: item.image,\n                            alt: item.name,\n                            className: \"rounded-circle\",\n                            style: {\n                                width: \"60px\",\n                                height: \"60px\",\n                                objectFit: \"cover\",\n                                position: \"relative\",\n                                zIndex: index + 1,\n                                marginLeft: index === 0 ? \"0\" : \"-30px\",\n                                border: \"2px solid white\"\n                            }\n                        }, item.id, false, {\n                            fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                            lineNumber: 46,\n                            columnNumber: 11\n                        }, this)),\n                    additionalProducts > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"rounded-circle bg-secondary d-flex justify-content-center align-items-center\",\n                        style: {\n                            width: \"60px\",\n                            height: \"60px\",\n                            marginLeft: \"-30px\",\n                            color: \"white\",\n                            zIndex: basketItems.length + 1,\n                            border: \"2px solid white\"\n                        },\n                        children: [\n                            \"+\",\n                            additionalProducts\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 57,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"me-3\",\n                        children: [\n                            \"Total: \",\n                            totalPrice.toFixed(2),\n                            \" TL\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 68,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"Shipping Address\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 71,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                className: \"form-control mb-3\",\n                placeholder: \"Enter your address\",\n                value: address,\n                onChange: (e)=>setAddress(e.target.value)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 72,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"Payment Method\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                className: \"form-select mb-3\",\n                value: paymentMethod,\n                onChange: (e)=>setPaymentMethod(e.target.value),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"\",\n                        children: \"Select a payment method\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 86,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"creditCard\",\n                        children: \"Credit Card\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 87,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"debitCard\",\n                        children: \"Debit Card\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 88,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"paypal\",\n                        children: \"PayPal\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                        lineNumber: 89,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"btn btn-primary\",\n                onClick: handlePurchase,\n                children: \"Purchase\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n                lineNumber: 92,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\aydin\\\\Documents\\\\GitHub\\\\shopping-website\\\\pages\\\\completeorder.js\",\n        lineNumber: 41,\n        columnNumber: 5\n    }, this);\n}\n_s(OrderCompletionPage, \"SIqDfTNzputmvpFN1N0ZJ5QsEDo=\");\n_c = OrderCompletionPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (OrderCompletionPage);\nvar _c;\n$RefreshReg$(_c, \"OrderCompletionPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBO0FBNEZULCtEQUFlQSxtQkFBbUJBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvY29tcGxldGVvcmRlci5qcz9mMjlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE5hdmJhciBmcm9tICdAL2NvbXBvbmVudHMvTmF2YmFyJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnO1xyXG5cclxuZnVuY3Rpb24gT3JkZXJDb21wbGV0aW9uUGFnZSgpIHtcclxuICAvLyBJbml0aWFsIHN0YXRlIGZvciB0aGUgYmFza2V0IGl0ZW1zXHJcbiAgY29uc3QgW2Jhc2tldEl0ZW1zXSA9IHVzZVN0YXRlKFtcclxuICAgIHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIG5hbWU6ICdpUGhvbmUgMTMgMTI4IEdCIC0gQmxhY2snLFxyXG4gICAgICBwcmljZTogMS4wMCxcclxuICAgICAgaW1hZ2U6ICdodHRwczovL3BhcmNzLm9yZy5hdS93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wMy9wbGFjZWhvbGRlci1pbWFnZS1yZWQtMS5wbmcnLFxyXG4gICAgICBzZWxsZXI6ICdIZXBzaWJ1cmFkYScsXHJcbiAgICAgIHF1YW50aXR5OiAxXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogMixcclxuICAgICAgbmFtZTogJ0Jvc2NoIFByb2Zlc3Npb25hbCBTY3Jld2RyaXZlciBCaXQgU2V0IDQ0KzEgUGllY2UgLSAyNjA3MDE3NjkyJyxcclxuICAgICAgcHJpY2U6IDEuMDAsXHJcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly9wYXJjcy5vcmcuYXUvd3AtY29udGVudC91cGxvYWRzLzIwMTYvMDMvcGxhY2Vob2xkZXItaW1hZ2UtcmVkLTEucG5nJyxcclxuICAgICAgc2VsbGVyOiAnSGVwc2lidXJhZGEnLFxyXG4gICAgICBxdWFudGl0eTogMVxyXG4gICAgfVxyXG4gIF0pO1xyXG5cclxuICAvLyBTdGF0ZSBmb3IgdGhlIGFkZHJlc3MgYW5kIHBheW1lbnQgbWV0aG9kXHJcbiAgY29uc3QgW2FkZHJlc3MsIHNldEFkZHJlc3NdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtwYXltZW50TWV0aG9kLCBzZXRQYXltZW50TWV0aG9kXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvblxyXG4gIGNvbnN0IGhhbmRsZVB1cmNoYXNlID0gKCkgPT4ge1xyXG4gICAgLy8gSW1wbGVtZW50IHdoYXQgc2hvdWxkIGhhcHBlbiB3aGVuIHB1cmNoYXNlIGlzIG1hZGVcclxuICAgIGNvbnNvbGUubG9nKCdQdXJjaGFzZSBtYWRlIHdpdGggYWRkcmVzczonLCBhZGRyZXNzLCAnYW5kIHBheW1lbnQgbWV0aG9kOicsIHBheW1lbnRNZXRob2QpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFkZGl0aW9uYWxQcm9kdWN0cyA9IGJhc2tldEl0ZW1zLmxlbmd0aCA+IDIgPyBiYXNrZXRJdGVtcy5sZW5ndGggLSAyIDogMDtcclxuICAvLyBDYWxjdWxhdGUgdGhlIHRvdGFsIHByaWNlXHJcbiAgY29uc3QgdG90YWxQcmljZSA9IGJhc2tldEl0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+IHRvdGFsICsgaXRlbS5wcmljZSAqIGl0ZW0ucXVhbnRpdHksIDApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXQtNFwiPlxyXG4gICAgICA8aDI+T3JkZXIgU3VtbWFyeTwvaDI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBtYi0zXCI+XHJcblxyXG4gICAgICAgIHtiYXNrZXRJdGVtcy5zbGljZSgwLCAyKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8aW1nIGtleT17aXRlbS5pZH0gc3JjPXtpdGVtLmltYWdlfSBhbHQ9e2l0ZW0ubmFtZX0gY2xhc3NOYW1lPVwicm91bmRlZC1jaXJjbGVcIlxyXG4gICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAnNjBweCcsIGhlaWdodDogJzYwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsXHJcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgekluZGV4OiBpbmRleCArIDEsIC8vIFN0YWNrIHdpdGggdGhlIHJpZ2h0bW9zdCBpbWFnZSBvbiB0b3BcclxuICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBpbmRleCA9PT0gMCA/ICcwJyA6ICctMzBweCcsIC8vIE92ZXJsYXAgaW1hZ2VzXHJcbiAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkIHdoaXRlJ1xyXG4gICAgICAgICAgICAgICB9fSAvPlxyXG4gICAgICAgICkpfVxyXG5cclxuICAgICAgICB7YWRkaXRpb25hbFByb2R1Y3RzID4gMCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtY2lyY2xlIGJnLXNlY29uZGFyeSBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcIlxyXG4gICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAnNjBweCcsIGhlaWdodDogJzYwcHgnLFxyXG4gICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICctMzBweCcsXHJcbiAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgICAgekluZGV4OiBiYXNrZXRJdGVtcy5sZW5ndGggKyAxLCAvLyBBYm92ZSBhbGwgaW1hZ2VzXHJcbiAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkIHdoaXRlJ1xyXG4gICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgK3thZGRpdGlvbmFsUHJvZHVjdHN9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1lLTNcIj5Ub3RhbDoge3RvdGFsUHJpY2UudG9GaXhlZCgyKX0gVEw8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGgzPlNoaXBwaW5nIEFkZHJlc3M8L2gzPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIG1iLTNcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBhZGRyZXNzXCJcclxuICAgICAgICB2YWx1ZT17YWRkcmVzc31cclxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFkZHJlc3MoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGgzPlBheW1lbnQgTWV0aG9kPC9oMz5cclxuICAgICAgPHNlbGVjdFxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tc2VsZWN0IG1iLTNcIlxyXG4gICAgICAgIHZhbHVlPXtwYXltZW50TWV0aG9kfVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF5bWVudE1ldGhvZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgID5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGEgcGF5bWVudCBtZXRob2Q8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3JlZGl0Q2FyZFwiPkNyZWRpdCBDYXJkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRlYml0Q2FyZFwiPkRlYml0IENhcmQ8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGF5cGFsXCI+UGF5UGFsPC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG5cclxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVQdXJjaGFzZX0+UHVyY2hhc2U8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9yZGVyQ29tcGxldGlvblBhZ2U7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJOYXZiYXIiLCJPcmRlckNvbXBsZXRpb25QYWdlIiwiYmFza2V0SXRlbXMiLCJpZCIsIm5hbWUiLCJwcmljZSIsImltYWdlIiwic2VsbGVyIiwicXVhbnRpdHkiLCJhZGRyZXNzIiwic2V0QWRkcmVzcyIsInBheW1lbnRNZXRob2QiLCJzZXRQYXltZW50TWV0aG9kIiwiaGFuZGxlUHVyY2hhc2UiLCJjb25zb2xlIiwibG9nIiwiYWRkaXRpb25hbFByb2R1Y3RzIiwibGVuZ3RoIiwidG90YWxQcmljZSIsInJlZHVjZSIsInRvdGFsIiwiaXRlbSIsImRpdiIsImNsYXNzTmFtZSIsImgyIiwic2xpY2UiLCJtYXAiLCJpbmRleCIsImltZyIsInNyYyIsImFsdCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJvYmplY3RGaXQiLCJwb3NpdGlvbiIsInpJbmRleCIsIm1hcmdpbkxlZnQiLCJib3JkZXIiLCJjb2xvciIsInNwYW4iLCJ0b0ZpeGVkIiwiaDMiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0Iiwic2VsZWN0Iiwib3B0aW9uIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/completeorder.js\n"));

/***/ })

});