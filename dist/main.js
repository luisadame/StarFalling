/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./js/utils.js\");\n\nvar _utils2 = _interopRequireDefault(_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvas = document.getElementById(\"stars\");\n\nfunction setCanvasSize() {\n  canvas.width = innerWidth;\n  canvas.height = innerHeight;\n}\nsetCanvasSize();\n\nvar ctx = canvas.getContext(\"2d\");\n\naddEventListener(\"resize\", function () {\n  setCanvasSize();\n  init();\n});\n\n// the object\nfunction Star(x, y, radius, color) {\n  this.x = x;\n  this.y = y;\n  this.radius = radius;\n  this.color = color;\n  this.velocity = {\n    x: _utils2.default.randomIntFromRange(-4, 4),\n    y: 3\n  };\n  this.glow = 10;\n}\n\nStar.prototype.draw = function () {\n  ctx.save();\n  ctx.beginPath();\n  ctx.shadowBlur = this.glow;\n  ctx.shadowColor = this.color;\n  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n  ctx.fillStyle = this.color;\n  ctx.fill();\n  ctx.closePath();\n  ctx.restore();\n};\n\nStar.prototype.update = function () {\n  this.draw();\n\n  if (this.y + this.radius + this.velocity.y >= innerHeight) {\n    this.velocity.y = -this.velocity.y * 0.8;\n    this.shatter();\n    this.radius -= 3;\n    this.glow -= 2;\n  } else {\n    this.velocity.y += 1;\n  }\n\n  this.y += this.velocity.y;\n  this.x += this.velocity.x;\n};\n\nStar.prototype.shatter = function () {\n  for (var i = 0; i < 8; i++) {\n    miniStars.push(new MiniStar(this.x, this.y, 5, \"red\"));\n  }\n};\n\nfunction MiniStar(x, y, radius, color) {\n  Star.call(this, x, y, radius, color);\n  this.velocity = {\n    x: _utils2.default.randomIntFromRange(-5, 5),\n    y: _utils2.default.randomIntFromRange(-15, 15)\n  };\n  this.friction = 0.8;\n  this.gravity = 0.2;\n  this.ttl = 100;\n  this.opacity = 1;\n}\n\nMiniStar.prototype.draw = function () {\n  ctx.save();\n  ctx.beginPath();\n  ctx.shadowBlur = this.glow;\n  ctx.shadowColor = this.color;\n  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n  ctx.fillStyle = \"rgba(255, 255, 255, \" + this.opacity + \")\";\n  ctx.fill();\n  ctx.closePath();\n  ctx.restore();\n};\n\nMiniStar.prototype.update = function () {\n  this.draw();\n\n  if (this.y + this.radius + this.velocity.y >= innerHeight) {\n    this.velocity.y = -this.velocity.y * this.friction;\n  } else {\n    this.velocity.y += this.gravity;\n  }\n\n  this.x += this.velocity.x;\n  this.y += this.velocity.y;\n  this.opacity -= 1 / this.ttl--;\n  this.glow -= 10 / this.ttl;\n};\n\nfunction addStar() {\n  var x = _utils2.default.randomIntFromRange(20, innerWidth - 20);\n  var radius = _utils2.default.randomIntFromRange(10, 20);\n  stars.push(new Star(x, 0, radius, 'white'));\n}\n\nfunction addMountainRange(amount, height, color) {\n  var mountainWidth = canvas.width / amount || 1;\n  for (var i = 0; i < amount; i++) {\n    ctx.beginPath();\n    ctx.fillStyle = color;\n    ctx.moveTo(0, canvas.height);\n    ctx.lineTo(mountainWidth, canvas.height);\n    ctx.lineTo(mountainWidth / 2, canvas.height - height);\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n// initialization\nvar stars = void 0;\nvar miniStars = void 0;\nvar backgroundStyle = ctx.createLinearGradient(0, 0, 0, canvas.height);\nbackgroundStyle.addColorStop(0, '#002C52');\nbackgroundStyle.addColorStop(1, '#001152');\n\nfunction init() {\n  stars = [];\n  miniStars = [];\n\n  addStar();\n  setInterval(addStar, 1000);\n}\n\n// the animation loop\nfunction animate() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n  // Add background to the scene\n  ctx.fillStyle = backgroundStyle;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n\n  // Add mountains\n  addMountainRange(1, 300, '#142533');\n\n  stars.forEach(function (star, index) {\n    star.update();\n    if (star.radius <= 0) {\n      stars.splice(index, 1);\n    }\n  });\n\n  miniStars.forEach(function (miniStar, index) {\n    miniStar.update();\n    if (miniStar.ttl <= 0) {\n      miniStars.splice(index, 1);\n    }\n  });\n\n  requestAnimationFrame(animate);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction randomIntFromRange(min, max) {\n    return Math.floor(Math.random() * (max - min + 1) + min);\n}\n\nmodule.exports = {\n    randomIntFromRange: randomIntFromRange\n};\n\n//# sourceURL=webpack:///./js/utils.js?");

/***/ })

/******/ });