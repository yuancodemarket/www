/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "build/" + ({"compiler":"compiler","editor":"editor"}[chunkId]||chunkId) + "." + {"compiler":"a9dcdeba","editor":"34992d91"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/docs.sass":
/*!************************!*\
  !*** ./docs/docs.sass ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!../node_modules/postcss-loader/src??ref--9-oneOf-3-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./docs.sass */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./docs/docs.sass\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"0f80765e\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./docs/docs.sass?");

/***/ }),

/***/ "./docs/img/logo_number_spinner.svg":
/*!******************************************!*\
  !*** ./docs/img/logo_number_spinner.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/logo_number_spinner.svg\";\n\n//# sourceURL=webpack:///./docs/img/logo_number_spinner.svg?");

/***/ }),

/***/ "./docs/screen/screen_capsule.png":
/*!****************************************!*\
  !*** ./docs/screen/screen_capsule.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/screen_capsule.png\";\n\n//# sourceURL=webpack:///./docs/screen/screen_capsule.png?");

/***/ }),

/***/ "./docs/screen/screen_classic.png":
/*!****************************************!*\
  !*** ./docs/screen/screen_classic.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/screen_classic.png\";\n\n//# sourceURL=webpack:///./docs/screen/screen_classic.png?");

/***/ }),

/***/ "./docs/screen/screen_d3d.png":
/*!************************************!*\
  !*** ./docs/screen/screen_d3d.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/screen_d3d.png\";\n\n//# sourceURL=webpack:///./docs/screen/screen_d3d.png?");

/***/ }),

/***/ "./docs/screen/screen_default.png":
/*!****************************************!*\
  !*** ./docs/screen/screen_default.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/screen_default.png\";\n\n//# sourceURL=webpack:///./docs/screen/screen_default.png?");

/***/ }),

/***/ "./docs/screen/screen_logo.png":
/*!*************************************!*\
  !*** ./docs/screen/screen_logo.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/screen_logo.png\";\n\n//# sourceURL=webpack:///./docs/screen/screen_logo.png?");

/***/ }),

/***/ "./global.requires.js":
/*!****************************!*\
  !*** ./global.requires.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue */ \"./node_modules/bootstrap-vue/esm/index.js\");\n/* harmony import */ var bootstrap_vue_dist_bootstrap_vue_icons_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue/dist/bootstrap-vue-icons.min.css */ \"./node_modules/bootstrap-vue/dist/bootstrap-vue-icons.min.css\");\n/* harmony import */ var bootstrap_vue_dist_bootstrap_vue_icons_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_vue_dist_bootstrap_vue_icons_min_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__[\"BootstrapVueIcons\"]);\n\n//# sourceURL=webpack:///./global.requires.js?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/eslint-loader/index.js?!./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_kerwin_Desktop_number_spinner_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'numberSpinner',\n  data: function data() {\n    return {\n      isCurrent: true,\n\n      /**\n       * 動效滾動中 flag\n       * @private\n       */\n      isAnimation: false,\n\n      /**\n       * 加減事件樣式名稱\n       * @summary dir type class\n       * @type {String}\n       * @value plus | minus\n       * @private\n       */\n      animationType: 'plus',\n\n      /**\n       * bootstrap icon class\n       * @private\n       */\n      icon: {\n        minus: 'dash',\n        plus: 'plus'\n      }\n    };\n  },\n  props: {\n    /**\n     * 支援 bootstrap-vue icon<br />\n     * 使用方法 :<br />\n     * 1. bootstrap<br />\n     * 2. :bootstrap=\"{ minus: 'caret-left-fill', plus: 'caret-right-fill' }\"\n     */\n    bootstrap: {\n      type: Boolean | Object,\n      default: false\n    },\n\n    /**\n     * 啓用動態效果\n     * @values true | false\n     */\n    transition: {\n      type: Boolean,\n      default: true\n    },\n\n    /** 最小值 */\n    min: {\n      type: Number,\n      default: 0\n    },\n\n    /** 最大值 */\n    max: {\n      type: Number,\n      default: 10\n    },\n\n    /** 步進間隔 */\n    step: {\n      type: Number | String,\n      default: 1,\n      validator: function validator(value) {\n        return Number(value) === value && value % 1 === 0;\n      }\n    },\n\n    /** 數值 */\n    value: {\n      type: Number | String,\n      default: 0\n    }\n  },\n  watch: {\n    value: {\n      handler: function handler(newValue) {\n        if (newValue == '') {\n          this.$emit('update:value', 0);\n          return;\n        }\n\n        if (newValue > this.max) {\n          this.$emit('update:value', this.max);\n        } else if (newValue < this.min) {\n          this.$emit('update:value', this.min);\n        }\n      },\n      immediate: true\n    }\n  },\n  filters: {\n    toNumber: function toNumber(value) {\n      return value * 1;\n    }\n  },\n  methods: {\n    /** @prive */\n    mainCommand: function mainCommand(type) {\n      var _this = this;\n\n      if (this.isAnimation) return;\n      this.isAnimation = true;\n      this.animationType = type;\n      var validatorFail = type == 'plus' ? this.value >= this.max : this.value <= this.min;\n\n      if (validatorFail) {\n        this.isAnimation = false;\n        return;\n      }\n\n      var dir = type == 'plus' ? 1 : -1;\n      /**\n       * 更新事件\n       * @property {Number} value\n       */\n\n      this.$emit('update:value', this.value * 1 + this.step * dir);\n      this.isCurrent = !this.isCurrent;\n      setTimeout(function () {\n        _this.isAnimation = false;\n      }, 100);\n    },\n\n    /** @prive */\n    plus: function plus() {\n      this.mainCommand('plus');\n    },\n\n    /** @prive */\n    minus: function minus() {\n      this.mainCommand('minus');\n    }\n  },\n  computed: {\n    hasBootstrap: function hasBootstrap() {\n      return this.bootstrap !== false;\n    },\n    getIcon: function getIcon() {\n      var res = Object(_Users_kerwin_Desktop_number_spinner_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, this.icon);\n\n      if (this.hasBootstrap) {\n        res = Object(_Users_kerwin_Desktop_number_spinner_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_Users_kerwin_Desktop_number_spinner_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, res), this.bootstrap);\n      }\n\n      return res;\n    },\n    klass: function klass() {\n      return {\n        numberSpinner: {\n          'numberSpinner--plus': this.animationType == 'plus',\n          'numberSpinner--minus': this.animationType == 'minus'\n        },\n        btnMinus: {\n          disabled: this.value <= this.min\n        },\n        btnPlus: {\n          disabled: this.value >= this.max\n        }\n      };\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.js?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"59d1595a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"59d1595a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"numberSpinner\", class: _vm.klass.numberSpinner },\n    [\n      _c(\n        \"div\",\n        {\n          staticClass: \"numberSpinner__button numberSpinner__button--minus\",\n          class: _vm.klass.btnMinus,\n          on: { click: _vm.minus }\n        },\n        [\n          _vm._t(\"minus\", [\n            !_vm.hasBootstrap\n              ? [\n                  _c(\n                    \"svg\",\n                    {\n                      attrs: {\n                        width: \"13\",\n                        height: \"13\",\n                        viewbox: \"0 0 13 13\",\n                        fill: \"none\",\n                        xmlns: \"http://www.w3.org/2000/svg\"\n                      }\n                    },\n                    [\n                      _c(\"path\", {\n                        attrs: {\n                          d: \"M3 6.3H10\",\n                          stroke: \"#959593\",\n                          \"stroke-width\": \"2\",\n                          \"stroke-linecap\": \"round\",\n                          \"stroke-linejoin\": \"round\"\n                        }\n                      })\n                    ]\n                  )\n                ]\n              : [\n                  _c(\"b-icon\", {\n                    attrs: { icon: _vm.getIcon.minus, \"aria-hidden\": \"true\" }\n                  })\n                ]\n          ])\n        ],\n        2\n      ),\n      _c(\n        \"div\",\n        { staticClass: \"numberSpinner__blockGroup\" },\n        [\n          _c(\"transition\", { attrs: { name: _vm.transition ? \"fade\" : \"\" } }, [\n            _vm.isCurrent\n              ? _c(\"div\", { key: \"pre\", staticClass: \"numberSpinner__block\" }, [\n                  _vm._v(_vm._s(_vm._f(\"toNumber\")(_vm.value)))\n                ])\n              : _c(\n                  \"div\",\n                  { key: \"current\", staticClass: \"numberSpinner__block\" },\n                  [_vm._v(_vm._s(_vm._f(\"toNumber\")(_vm.value)))]\n                )\n          ])\n        ],\n        1\n      ),\n      _c(\n        \"div\",\n        {\n          staticClass: \"numberSpinner__button numberSpinner__button--plus\",\n          class: _vm.klass.btnPlus,\n          on: { click: _vm.plus }\n        },\n        [\n          _vm._t(\"plus\", [\n            !_vm.hasBootstrap\n              ? [\n                  _c(\n                    \"svg\",\n                    {\n                      attrs: {\n                        width: \"13\",\n                        height: \"13\",\n                        viewbox: \"0 0 13 13\",\n                        fill: \"none\",\n                        xmlns: \"http://www.w3.org/2000/svg\"\n                      }\n                    },\n                    [\n                      _c(\"path\", {\n                        attrs: {\n                          d: \"M6.5 3V10\",\n                          stroke: \"#959593\",\n                          \"stroke-width\": \"2\",\n                          \"stroke-linecap\": \"round\",\n                          \"stroke-linejoin\": \"round\"\n                        }\n                      }),\n                      _c(\"path\", {\n                        attrs: {\n                          d: \"M3 6.17188H10\",\n                          stroke: \"#959593\",\n                          \"stroke-width\": \"2\",\n                          \"stroke-linecap\": \"round\",\n                          \"stroke-linejoin\": \"round\"\n                        }\n                      })\n                    ]\n                  )\n                ]\n              : [\n                  _c(\"b-icon\", {\n                    attrs: { icon: _vm.getIcon.plus, \"aria-hidden\": \"true\" }\n                  })\n                ]\n          ])\n        ],\n        2\n      ),\n      _c(\"input\", {\n        attrs: { type: \"hidden\" },\n        domProps: { value: _vm.value },\n        on: {\n          input: function($event) {\n            return _vm.$emit(\"update:value\", $event.target.value)\n          }\n        }\n      })\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2259d1595a-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./docs/docs.sass":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./docs/docs.sass ***!
  \*********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./img/logo_number_spinner.svg */ \"./docs/img/logo_number_spinner.svg\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);\n// Module\nexports.push([module.i, \".rsg--logo-94 {\\n  width: 100% !important;\\n  height: 136px !important;\\n  font-size: 0 !important;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") center center no-repeat !important;\\n  background-size: contain !important;\\n}\\n\\n.rootTag {\\n  display: inline-flex;\\n}\\n\\n.noticeSection {\\n  padding: 0.5em 1em;\\n  color: #efefef;\\n  font-size: 0.85em;\\n  margin-bottom: 15px;\\n  border: 1px solid #fff;\\n  background-color: #33548b;\\n}\\n\\n.demo-list {\\n  margin: 0;\\n  padding: 0;\\n  display: flex;\\n  align-items: flex-start;\\n  flex-direction: column;\\n  list-style: none;\\n}\\n\\n.demo-list-item {\\n  margin: 5px 10px;\\n  display: flex;\\n  align-items: center;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./docs/docs.sass?./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/number-spinner/style/themes/default.sass":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./src/components/number-spinner/style/themes/default.sass ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".numberSpinner {\\n  display: flex;\\n  align-items: center;\\n}\\n.numberSpinner input {\\n  overflow: hidden;\\n  color: transparent;\\n  font: 0/0 a;\\n  text-shadow: none;\\n  background-color: transparent;\\n  border: 0;\\n  white-space: nowrap;\\n  text-indent: 100%;\\n  width: 0 !important;\\n  height: 0 !important;\\n  overflow: hidden !important;\\n  visibility: hidden !important;\\n}\\n.numberSpinner__blockGroup {\\n  order: 2;\\n  min-width: 30px;\\n  min-height: 30px;\\n  overflow: visible;\\n  margin: 0 3px;\\n  color: #424242;\\n  position: relative;\\n  flex: 1 0 30px;\\n  background-color: #fff;\\n  border: 3px solid #555;\\n  border-radius: 8px;\\n}\\n.theme-small .numberSpinner__blockGroup {\\n  min-width: 26px;\\n  min-height: 26px;\\n  flex: 1 0 26px;\\n}\\n.theme-bigger .numberSpinner__blockGroup {\\n  min-width: 35px;\\n  min-height: 35px;\\n  flex: 1 0 35px;\\n}\\n.numberSpinner__block {\\n  width: 100%;\\n  height: 100%;\\n  color: #555;\\n  font-size: 18px;\\n  line-height: 1em;\\n  font-weight: bold;\\n  font-family: Arial;\\n  display: flex;\\n  position: absolute;\\n  justify-content: center;\\n  align-items: center;\\n  -webkit-user-select: none;\\n     -moz-user-select: none;\\n      -ms-user-select: none;\\n          user-select: none;\\n  z-index: 1;\\n  border-radius: 8px;\\n  background-color: transparent;\\n}\\n.theme-small .numberSpinner__block {\\n  font-size: 16px;\\n}\\n.theme-bigger .numberSpinner__block {\\n  font-size: 20px;\\n}\\n.numberSpinner__button {\\n  cursor: pointer;\\n  min-width: 30px;\\n  min-height: 30px;\\n  color: #5f5f5f;\\n  font-size: 14px;\\n  font-weight: bold;\\n  font-family: \\\"Arial black\\\";\\n  display: inline-flex;\\n  justify-content: center;\\n  align-items: center;\\n  -webkit-user-select: none;\\n     -moz-user-select: none;\\n      -ms-user-select: none;\\n          user-select: none;\\n  background-color: transparent;\\n  border: 3px solid #ccc;\\n  border-radius: 8px;\\n  min-width: auto !important;\\n  min-height: auto !important;\\n}\\n.theme-small .numberSpinner__button {\\n  min-width: 26px;\\n  min-height: 26px;\\n}\\n.theme-bigger .numberSpinner__button {\\n  min-width: 35px;\\n  min-height: 35px;\\n}\\n.numberSpinner__button svg {\\n  transform: translate(0, 0) scale(1.2);\\n}\\n.numberSpinner__button path {\\n  stroke: #5f5f5f;\\n  fill: #5f5f5f;\\n  transition: all 0.4s ease-in;\\n}\\n.numberSpinner__button.disabled {\\n  cursor: not-allowed;\\n  color: #929292;\\n}\\n.numberSpinner__button.disabled path {\\n  stroke: #929292;\\n  fill: #929292;\\n}\\n.numberSpinner__button:not(.disabled):hover {\\n  color: #000;\\n}\\n.numberSpinner__button:not(.disabled):hover path {\\n  stroke: #000;\\n  fill: #000;\\n}\\n.numberSpinner__button:not(.disabled):active {\\n  position: relative;\\n  transform: translate(0.5px, 0.5px);\\n}\\n.numberSpinner__button--minus {\\n  order: 1;\\n}\\n.numberSpinner__button--plus {\\n  order: 3;\\n}\\n.numberSpinner__button svg {\\n  transform: translate(0, 0) scale(1);\\n}\\n\\n.numberSpinner__blockGroup .numberSpinner__block {\\n  position: absolute;\\n}\\n\\n.fade-enter-active {\\n  transition: transform 0.4s ease-out, opacity 0.3s, scale 0.4s;\\n}\\n\\n.fade-leave-active {\\n  transition: transform 0.5s, opacity 0.5s 0.1s, scale 0.5s 0.5s;\\n}\\n\\n.fade-enter, .fade-leave-active {\\n  opacity: 0;\\n}\\n\\n.numberSpinner--plus .fade-enter {\\n  transform: translateY(11px);\\n}\\n.numberSpinner--plus .fade-leave-active {\\n  transform: translateY(-31px);\\n}\\n\\n.numberSpinner--minus .fade-enter {\\n  transform: translateY(-11px);\\n}\\n.numberSpinner--minus .fade-leave-active {\\n  transform: translateY(31px);\\n}\\n\\n.theme-black .numberSpinner__blockGroup {\\n  border-color: #333;\\n}\\n.theme-red .numberSpinner__blockGroup {\\n  border-color: #f67082;\\n}\\n.theme-green .numberSpinner__blockGroup {\\n  border-color: #73c151;\\n}\\n.theme-blue .numberSpinner__blockGroup {\\n  border-color: #218ae6;\\n}\\n.theme-yellow .numberSpinner__blockGroup {\\n  border-color: #e4b114;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/number-spinner/style/themes/default.sass?./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/installation.md":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/installation.md ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '### 方法一\\u3001手動安裝\\n\\n複製元件資料到\\uFF0C您的專案底下 :\\n\\n```md\\n複製 \\'number-spinner/dist\\' 到 \\'src/components/number-spinner\\'\\n```\\n\\n```javascript\\n<span class=\"token keyword\">import</span> numberSpinner <span class=\"token keyword\">from</span> <span class=\"token string\">\\'@/components/number-spinner/number-spinner.umd.min.js\\'</span>\\n<span class=\"token keyword\">import</span> <span class=\"token string\">\\'@/components/number-spinner/style/themes/logo.sass\\'</span>\\nVue<span class=\"token punctuation\">.</span><span class=\"token function\">use</span><span class=\"token punctuation\">(</span>numberSpinner<span class=\"token punctuation\">)</span>\\n```\\n\\n<div class=\"noticeSection\">如果您有使用 eslint 請在根目錄下建立 .eslintIgnore\\uFF0C排除 `number-spinner.umd.min.js`</div>\\n\\n[更多主題樣式](#主題樣式)\\n\\n<br />\\n\\n### 方法二\\u3001NPM 本地安裝\\n\\n思考到版控與共享資源\\uFF0C才建議第三方資料庫存放\\uFF0C你完全可以更改存放路徑\\n\\n```shell\\n<span class=\"token comment\"># 指令安裝</span>\\n<span class=\"token function\">npm</span> <span class=\"token function\">install</span> ./third/number-spinner\\n```\\n\\nOR\\n\\n```json\\n<span class=\"token comment\">// package.json 安裝</span>\\n<span class=\"token property\">\"dependencies\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\\n  <span class=\"token property\">\"number-spinner\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"file:./third/number-spinner\"</span>\\n<span class=\"token punctuation\">}</span>\\n```'\n    }]\n\n//# sourceURL=webpack:///./docs/installation.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/theme_example.md":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/theme_example.md ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '<div style=\"display:flex;align-items:center;\">\\n  Default\\n  <img src=\"./img/screen_default.png\" alt=\"default theme\" width=\"100\"/>\\n  Logo\\n  <img src=\"./img/screen_logo.png\" alt=\"logo theme\" width=\"100\"/>\\n  Classic\\n  <img src=\"./img/screen_classic.png\" alt=\"classic theme\" width=\"100\"/>\\n  Capsule\\n  <img src=\"./img/screen_capsule.png\" alt=\"capsule theme\" width=\"100\"/>\\n  3D\\n  <img src=\"./img/screen_d3d.png\" alt=\"3d theme\" width=\"100\"/>\\n</div>\\n\\ndefault.sass / classes.sass / logo.sass / capsule.sass / d3d.sass'\n    }]\n\n//# sourceURL=webpack:///./docs/theme_example.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/theme_io.md":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/theme_io.md ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '[線上樣式產生器](https://yuancodemarket.github.io/www/number_spinner_vue/theme_io/)\\n\\n### 自訂樣式: 使用線上樣式產生器\\n\\n1.  建立 customizeTheme.scss 檔案\\n2.  貼上線上樣式產生器\\uFF0C產生的程式碼\\n3.  檢查樣式樣式路徑是否正確\\n\\n```scss\\n<span class=\"token comment\">// customizeTheme.scss</span>\\n<span class=\"token comment\">// 線上樣式產生器會產生像下面的 scss 碼</span>\\n<span class=\"token comment\">// 因為 () 格式 sass 編譯不接受斷行\\uFF0C所以採用 scss 檔</span>\\n<span class=\"token comment\">// 如果你想要也可以自行改為 sass 檔</span>\\n@use <span class=\"token string\">\"@/components/number-spinner/style/themes/default.sass\"</span> with <span class=\"token punctuation\">(</span>\\n  <span class=\"token property\"><span class=\"token variable\">$orderMap</span></span><span class=\"token punctuation\">:</span><span class=\"token punctuation\">(</span><span class=\"token property\">minus</span><span class=\"token punctuation\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">,</span> <span class=\"token property\">blockGroup</span><span class=\"token punctuation\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">,</span> <span class=\"token property\">plus</span><span class=\"token punctuation\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\\n  <span class=\"token property\"><span class=\"token variable\">$colorSwitch</span></span><span class=\"token punctuation\">:</span> <span class=\"token boolean\">false</span><span class=\"token punctuation\">,</span>\\n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\\n```\\n\\n**如果你的安裝是採:**\\n\\n-   方法一: 樣式路徑為 `@/components/number-spinner/style/themes/logo.sass`\\n-   方法二: 樣式路徑為 `number-spinner/dist/style/themes/logo.sass`\\n\\n實際路徑還是要根據你的專案及檔相對配置去做更改\\u3002'\n    }]\n\n//# sourceURL=webpack:///./docs/theme_io.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/usage.md":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/usage.md ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '全局註冊\\n\\n```javascript\\n<span class=\"token keyword\">import</span> numberSpinner <span class=\"token keyword\">from</span> <span class=\"token string\">\\'number-spinner\\'</span>\\n<span class=\"token keyword\">import</span> <span class=\"token string\">\\'number-spinner/dist/style/themes/logo.sass\\'</span>\\nVue<span class=\"token punctuation\">.</span><span class=\"token function\">use</span><span class=\"token punctuation\">(</span>numberSpinner<span class=\"token punctuation\">)</span>\\n```\\n\\n局部注册\\n\\n```javascript\\n<span class=\"token keyword\">import</span> numberSpinner <span class=\"token keyword\">from</span> <span class=\"token string\">\\'number-spinner\\'</span>\\n<span class=\"token keyword\">import</span> <span class=\"token string\">\\'number-spinner/dist/style/themes/logo.sass\\'</span>\\n\\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token punctuation\">{</span>\\n  components<span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\\n    numberSpinner<span class=\"token punctuation\">,</span>\\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\\n<span class=\"token punctuation\">}</span>\\n```'\n    }]\n\n//# sourceURL=webpack:///./docs/usage.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/use_bootstrap_icon.md":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./docs/use_bootstrap_icon.md ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '### Vue cli 安裝\\n\\n```shell\\n<span class=\"token comment\"># 指令安裝</span>\\n<span class=\"token function\">npm</span> <span class=\"token function\">install</span> bootstrap-vue\\n```\\n\\n```javascript\\n<span class=\"token comment\">// main.js</span>\\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> BootstrapVueIcons <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">\\'bootstrap-vue\\'</span>\\n<span class=\"token keyword\">import</span> <span class=\"token string\">\\'bootstrap-vue/dist/bootstrap-vue-icons.min.css\\'</span>\\nVue<span class=\"token punctuation\">.</span><span class=\"token function\">use</span><span class=\"token punctuation\">(</span>BootstrapVueIcons<span class=\"token punctuation\">)</span>\\n```'\n    }]\n\n//# sourceURL=webpack:///./docs/use_bootstrap_icon.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=numberSpinner&file=.%2FnumberSpinner.vue&shouldShowDefaultExample=false&customLangs=vue%7Cjs%7Cjsx%7Chtml!./src/components/number-spinner/numberSpinner.md":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=numberSpinner&file=.%2FnumberSpinner.vue&shouldShowDefaultExample=false&customLangs=vue%7Cjs%7Cjsx%7Chtml!./src/components/number-spinner/numberSpinner.md ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [\n    {\n        'type': 'markdown',\n        'content': '## 使用範例\\n\\n### 單筆資料'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <numberSpinner :value.sync=\"singleValue\"></numberSpinner>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <numberSpinner :value.sync=\\\\\"singleValue\\\\\"></numberSpinner>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 多筆資料'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <ul class=\"demo-list\">\\n    <li class=\"demo-list-item\" v-for=\"item in producsts\" :key=\"item.id\">\\n      {{ item.name }} &nbsp;\\n      <numberSpinner :value.sync=\"item.value\"></numberSpinner>\\n    </li>\\n  </ul>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      producsts: [\\n        { id: \\'p001\\', name: \\'Logitc 無線鍵盤 K380\\', amout: 990, value: 0 },\\n        { id: \\'p002\\', name: \\'Razer 電競精英版黑 RGB\\', amout: 2300, value: 0 },\\n        { id: \\'p003\\', name: \\'LG 32吋電競曲面螢幕\\', amout: 4990, value: 0 },\\n      ],\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <ul class=\\\\\"demo-list\\\\\">\\\\n    <li class=\\\\\"demo-list-item\\\\\" v-for=\\\\\"item in producsts\\\\\" :key=\\\\\"item.id\\\\\">\\\\n      {{ item.name }} &nbsp;\\\\n      <numberSpinner :value.sync=\\\\\"item.value\\\\\"></numberSpinner>\\\\n    </li>\\\\n  </ul>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      producsts: [\\n        { id: \\'p001\\', name: \\'Logitc 無線鍵盤 K380\\', amout: 990, value: 0 },\\n        { id: \\'p002\\', name: \\'Razer 電競精英版黑 RGB\\', amout: 2300, value: 0 },\\n        { id: \\'p003\\', name: \\'LG 32吋電競曲面螢幕\\', amout: 4990, value: 0 } ],\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 數值範圍及步進'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <numberSpinner\\n    :value.sync=\"singleValue\"\\n    :min=\"1\"\\n    :max=\"20\"\\n    :step=\"2\"\\n  ></numberSpinner>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 1,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <numberSpinner\\\\n    :value.sync=\\\\\"singleValue\\\\\"\\\\n    :min=\\\\\"1\\\\\"\\\\n    :max=\\\\\"20\\\\\"\\\\n    :step=\\\\\"2\\\\\"\\\\n  ></numberSpinner>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 1,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 關閉動效'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <numberSpinner :value.sync=\"singleValue\" :transition=\"false\"></numberSpinner>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 1,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <numberSpinner :value.sync=\\\\\"singleValue\\\\\" :transition=\\\\\"false\\\\\"></numberSpinner>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 1,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 透過 Slot 自訂 ICON\\n\\n可替換 svg 圖標'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <numberSpinner :value.sync=\"singleValue\">\\n    <template v-slot:minus>\\n      <svg\\n        width=\"1em\"\\n        height=\"1em\"\\n        viewBox=\"0 0 16 16\"\\n        class=\"bi bi-arrow-left-short\"\\n        fill=\"currentColor\"\\n        xmlns=\"http://www.w3.org/2000/svg\"\\n      >\\n        <path\\n          fill-rule=\"evenodd\"\\n          d=\"M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z\"\\n        />\\n        <path\\n          fill-rule=\"evenodd\"\\n          d=\"M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z\"\\n        />\\n      </svg>\\n    </template>\\n    <template v-slot:plus>\\n      <svg\\n        width=\"1em\"\\n        height=\"1em\"\\n        viewBox=\"0 0 16 16\"\\n        class=\"bi bi-arrow-right-short\"\\n        fill=\"currentColor\"\\n        xmlns=\"http://www.w3.org/2000/svg\"\\n      >\\n        <path\\n          fill-rule=\"evenodd\"\\n          d=\"M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z\"\\n        />\\n        <path\\n          fill-rule=\"evenodd\"\\n          d=\"M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z\"\\n        />\\n      </svg>\\n    </template>\\n  </numberSpinner>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <numberSpinner :value.sync=\\\\\"singleValue\\\\\">\\\\n    <template v-slot:minus>\\\\n      <svg\\\\n        width=\\\\\"1em\\\\\"\\\\n        height=\\\\\"1em\\\\\"\\\\n        viewBox=\\\\\"0 0 16 16\\\\\"\\\\n        class=\\\\\"bi bi-arrow-left-short\\\\\"\\\\n        fill=\\\\\"currentColor\\\\\"\\\\n        xmlns=\\\\\"http://www.w3.org/2000/svg\\\\\"\\\\n      >\\\\n        <path\\\\n          fill-rule=\\\\\"evenodd\\\\\"\\\\n          d=\\\\\"M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z\\\\\"\\\\n        />\\\\n        <path\\\\n          fill-rule=\\\\\"evenodd\\\\\"\\\\n          d=\\\\\"M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z\\\\\"\\\\n        />\\\\n      </svg>\\\\n    </template>\\\\n    <template v-slot:plus>\\\\n      <svg\\\\n        width=\\\\\"1em\\\\\"\\\\n        height=\\\\\"1em\\\\\"\\\\n        viewBox=\\\\\"0 0 16 16\\\\\"\\\\n        class=\\\\\"bi bi-arrow-right-short\\\\\"\\\\n        fill=\\\\\"currentColor\\\\\"\\\\n        xmlns=\\\\\"http://www.w3.org/2000/svg\\\\\"\\\\n      >\\\\n        <path\\\\n          fill-rule=\\\\\"evenodd\\\\\"\\\\n          d=\\\\\"M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z\\\\\"\\\\n        />\\\\n        <path\\\\n          fill-rule=\\\\\"evenodd\\\\\"\\\\n          d=\\\\\"M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z\\\\\"\\\\n        />\\\\n      </svg>\\\\n    </template>\\\\n  </numberSpinner>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### Bootstrap icon\\n\\n需要安裝 bootstrap-vue'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <div class=\"rootTag\">\\n    <numberSpinner :value.sync=\"singleValue\" bootstrap></numberSpinner>\\n    &nbsp;\\n    <numberSpinner\\n      :value.sync=\"singleValue\"\\n      :bootstrap=\"{ minus: \\'caret-left-fill\\', plus: \\'caret-right-fill\\' }\"\\n    ></numberSpinner>\\n  </div>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <div class=\\\\\"rootTag\\\\\">\\\\n    <numberSpinner :value.sync=\\\\\"singleValue\\\\\" bootstrap></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n      :bootstrap=\\\\\"{ minus: \\'caret-left-fill\\', plus: \\'caret-right-fill\\' }\\\\\"\\\\n    ></numberSpinner>\\\\n  </div>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 尺寸大小\\n\\ntheme-small, theme-bigger'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <div class=\"rootTag\">\\n    <numberSpinner\\n      class=\"theme-small\"\\n      :value.sync=\"singleValue\"\\n    ></numberSpinner>\\n    &nbsp;\\n    <numberSpinner :value.sync=\"singleValue\"></numberSpinner>\\n    &nbsp;\\n    <numberSpinner\\n      class=\"theme-bigger\"\\n      :value.sync=\"singleValue\"\\n    ></numberSpinner>\\n  </div>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <div class=\\\\\"rootTag\\\\\">\\\\n    <numberSpinner\\\\n      class=\\\\\"theme-small\\\\\"\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n    ></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner :value.sync=\\\\\"singleValue\\\\\"></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner\\\\n      class=\\\\\"theme-bigger\\\\\"\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n    ></numberSpinner>\\\\n  </div>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': '### 色彩主題\\n\\ntheme-black, theme-red, theme-blue, theme-green, theme-yellow'\n    },\n    {\n        'type': 'code',\n        'content': '<template>\\n  <div class=\"rootTag\">\\n    <numberSpinner\\n      class=\"theme-black\"\\n      :value.sync=\"singleValue\"\\n    ></numberSpinner>\\n    &nbsp;\\n    <numberSpinner class=\"theme-red\" :value.sync=\"singleValue\"></numberSpinner>\\n    &nbsp;\\n    <numberSpinner class=\"theme-blue\" :value.sync=\"singleValue\"></numberSpinner>\\n    &nbsp;\\n    <numberSpinner\\n      class=\"theme-green\"\\n      :value.sync=\"singleValue\"\\n    ></numberSpinner>\\n    &nbsp;\\n    <numberSpinner\\n      class=\"theme-yellow\"\\n      :value.sync=\"singleValue\"\\n    ></numberSpinner>\\n  </div>\\n</template>\\n<script>\\nexport default {\\n  data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n</script>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n;return {\\n  template: \"\\\\n  <div class=\\\\\"rootTag\\\\\">\\\\n    <numberSpinner\\\\n      class=\\\\\"theme-black\\\\\"\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n    ></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner class=\\\\\"theme-red\\\\\" :value.sync=\\\\\"singleValue\\\\\"></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner class=\\\\\"theme-blue\\\\\" :value.sync=\\\\\"singleValue\\\\\"></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner\\\\n      class=\\\\\"theme-green\\\\\"\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n    ></numberSpinner>\\\\n    &nbsp;\\\\n    <numberSpinner\\\\n      class=\\\\\"theme-yellow\\\\\"\\\\n      :value.sync=\\\\\"singleValue\\\\\"\\\\n    ></numberSpinner>\\\\n  </div>\\\\n\",\\n  \\n  data: function data() {\\n    return {\\n      singleValue: 0,\\n    }\\n  },\\n}\\n\\n',\n            'style': void 0\n        }\n    }\n]\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=numberSpinner&file=.%252FnumberSpinner.vue&shouldShowDefaultExample=false&customLangs=vue%257Cjs%257Cjsx%257Chtml");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/number-spinner/numberSpinner.vue":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/number-spinner/numberSpinner.vue ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'displayName': 'numberSpinner',\n    'exportName': 'default',\n    'description': '',\n    'tags': {},\n    'props': [\n        {\n            'name': 'bootstrap',\n            'description': '支援 bootstrap-vue icon<br />\\n使用方法 :<br />\\n1. bootstrap<br />\\n2. :bootstrap=\"{ minus: \\'caret-left-fill\\', plus: \\'caret-right-fill\\' }\"',\n            'type': { 'name': 'Boolean | Object' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        },\n        {\n            'name': 'max',\n            'description': '最大值',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '10'\n            }\n        },\n        {\n            'name': 'min',\n            'description': '最小值',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '0'\n            }\n        },\n        {\n            'name': 'step',\n            'description': '步進間隔',\n            'type': { 'name': 'Number | String' },\n            'defaultValue': {\n                'func': false,\n                'value': '1'\n            }\n        },\n        {\n            'name': 'transition',\n            'description': '啓用動態效果',\n            'tags': {},\n            'values': ['true | false'],\n            'type': { 'name': 'boolean' },\n            'defaultValue': {\n                'func': false,\n                'value': 'true'\n            }\n        },\n        {\n            'name': 'value',\n            'description': '數值',\n            'type': { 'name': 'Number | String' },\n            'defaultValue': {\n                'func': false,\n                'value': '0'\n            }\n        }\n    ],\n    'events': {\n        'update:value': {\n            'name': 'update:value',\n            'type': { 'names': ['undefined'] },\n            'description': '更新事件',\n            'properties': [{\n                    'type': { 'names': ['Number'] },\n                    'name': 'value',\n                    'description': void 0\n                }]\n        }\n    },\n    'methods': void 0,\n    'slots': {\n        'minus': {\n            'name': 'minus',\n            'description': 'Use this slot minus'\n        },\n        'plus': {\n            'name': 'plus',\n            'description': 'Use this slot plus'\n        }\n    },\n    'examples': __webpack_require__(/*! !./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=numberSpinner&file=.%2FnumberSpinner.vue&shouldShowDefaultExample=false&customLangs=vue%7Cjs%7Cjsx%7Chtml!./src/components/number-spinner/numberSpinner.md */ \"./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=numberSpinner&file=.%2FnumberSpinner.vue&shouldShowDefaultExample=false&customLangs=vue%7Cjs%7Cjsx%7Chtml!./src/components/number-spinner/numberSpinner.md\")\n}\n\t\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js");

/***/ }),

/***/ "./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_eslint_loader_index_js_ref_13_0_numberSpinner_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/eslint-loader??ref--13-0!./numberSpinner.js?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/eslint-loader/index.js?!./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_eslint_loader_index_js_ref_13_0_numberSpinner_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.js?");

/***/ }),

/***/ "./src/components/number-spinner/numberSpinner.vue":
/*!*********************************************************!*\
  !*** ./src/components/number-spinner/numberSpinner.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug& */ \"./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug&\");\n/* harmony import */ var _numberSpinner_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberSpinner.js?vue&type=script&lang=js& */ \"./src/components/number-spinner/numberSpinner.js?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _numberSpinner_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/number-spinner/numberSpinner.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.vue?");

/***/ }),

/***/ "./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug&":
/*!*************************************************************************************************!*\
  !*** ./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_59d1595a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"59d1595a-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/pug-plain-loader!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"59d1595a-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/pug-plain-loader/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/number-spinner/numberSpinner.vue?vue&type=template&id=76b232a6&lang=pug&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_59d1595a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_59d1595a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_pug_plain_loader_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_numberSpinner_vue_vue_type_template_id_76b232a6_lang_pug___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/number-spinner/numberSpinner.vue?");

/***/ }),

/***/ "./src/components/number-spinner/style/themes/default.sass":
/*!*****************************************************************!*\
  !*** ./src/components/number-spinner/style/themes/default.sass ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!../../../../../node_modules/postcss-loader/src??ref--9-oneOf-3-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./default.sass */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/number-spinner/style/themes/default.sass\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"66585cbf\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./src/components/number-spinner/style/themes/default.sass?");

/***/ }),

/***/ 0:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./global.requires.js ./src/components/number-spinner/style/themes/default.sass ./docs/img/logo_number_spinner.svg ./docs/docs.sass ./docs/screen/screen_default.png ./docs/screen/screen_logo.png ./docs/screen/screen_classic.png ./docs/screen/screen_capsule.png ./docs/screen/screen_d3d.png ./node_modules/vue-styleguidist/lib/client/index ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/global.requires.js */\"./global.requires.js\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/src/components/number-spinner/style/themes/default.sass */\"./src/components/number-spinner/style/themes/default.sass\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/img/logo_number_spinner.svg */\"./docs/img/logo_number_spinner.svg\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/docs.sass */\"./docs/docs.sass\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/screen/screen_default.png */\"./docs/screen/screen_default.png\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/screen/screen_logo.png */\"./docs/screen/screen_logo.png\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/screen/screen_classic.png */\"./docs/screen/screen_classic.png\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/screen/screen_capsule.png */\"./docs/screen/screen_capsule.png\");\n__webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/docs/screen/screen_d3d.png */\"./docs/screen/screen_d3d.png\");\nmodule.exports = __webpack_require__(/*! /Users/kerwin/Desktop/number-spinner/node_modules/vue-styleguidist/lib/client/index */\"./node_modules/vue-styleguidist/lib/client/index.js\");\n\n\n//# sourceURL=webpack:///multi_./global.requires.js_./src/components/number-spinner/style/themes/default.sass_./docs/img/logo_number_spinner.svg_./docs/docs.sass_./docs/screen/screen_default.png_./docs/screen/screen_logo.png_./docs/screen/screen_classic.png_./docs/screen/screen_capsule.png_./docs/screen/screen_d3d.png_./node_modules/vue-styleguidist/lib/client/index?");

/***/ })

/******/ });