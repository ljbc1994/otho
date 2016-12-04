/**
  * otho.js v0.1.0
  * Created by Louie Colgan (@ljbc1994)
  * Released under the MIT License.
  */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Otho = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('../utils/promise');

var _promise2 = _interopRequireDefault(_promise);

var _isArray = require('../utils/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * Handles loading the image and firing callbacks if the 
 * image has loaded or has failed. 
 */
var DeferredImage = function () {
    _createClass(DeferredImage, null, [{
        key: 'wait',


        /**
         * @function
         * Loops through array / link of image sources and creates
         * deferred images, firing the callback when all images
         * have finished loading or have errored out.
         * @param {String|Array<String>} - An array of image srcs.
         * @param {Function} - Callback function for when the image has loaded.
         * @returns {Promise|null} - Promise which resolves when all the images
         * have been loaded.
         */
        value: function wait(src, loaded) {

            if (!(0, _isArray2.default)(src)) {

                src = [src];
            }

            var noImages = src.length;
            var images = [];
            var usePromise = _promise2.default !== undefined;

            var tempLoaded = function tempLoaded() {

                noImages--;

                if (noImages === 0 && !usePromise) {

                    loaded();
                }
            };

            for (var i = 0; i < src.length; i++) {

                var deferred = new DeferredImage({
                    src: src[i],
                    loaded: tempLoaded.bind(this),
                    failed: tempLoaded.bind(this)
                });

                if (usePromise) {

                    images.push(deferred.$promise);
                }
            }

            return usePromise ? _promise2.default.type.all(images) : null;
        }

        /**
         * @function
         * Initialising the configuration for the deferred image.
         * @param {Object} - The image src as well as callback methods.
         */

    }]);

    function DeferredImage(_ref) {
        var src = _ref.src,
            loaded = _ref.loaded,
            failed = _ref.failed;

        _classCallCheck(this, DeferredImage);

        this.src = src;
        this.pseudo = new Image();
        this._loaded = loaded || function () {};
        this._failed = failed || function () {};

        this.init();
    }

    /**
     * @function
     * Load the image and fire when the image has loaded or
     * returned an error.
     */


    _createClass(DeferredImage, [{
        key: 'init',
        value: function init() {

            var self = this;

            self.pseudo.src = this.src;

            self.pseudo.addEventListener('load', this._loaded);
            self.pseudo.addEventListener('error', this._failed);

            if (_promise2.default !== undefined) {

                this.$promise = _promise2.default.instance(function (resolve, reject) {

                    self.pseudo.addEventListener('load', resolve);
                    self.pseudo.addEventListener('error', reject);
                });
            }
        }
    }]);

    return DeferredImage;
}();

exports.default = DeferredImage;

},{"../utils/is-array":9,"../utils/promise":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = require('./watcher');

var _watcher2 = _interopRequireDefault(_watcher);

var _deferredImage = require('./deferred-image');

var _deferredImage2 = _interopRequireDefault(_deferredImage);

var _promise = require('../utils/promise');

var _promise2 = _interopRequireDefault(_promise);

var _options = require('../config/options');

var _isArray = require('../utils/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('../utils/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNodeList = require('../utils/is-node-list');

var _isNodeList2 = _interopRequireDefault(_isNodeList);

var _extend = require('../utils/extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * Responsible for initialising the watchers, passing
 * through the configuration and ensuring user defined
 * callbacks are executed when necessary.
 */
var Handler = function () {

    /**
     * @function
     * Initialising the configuration for the handler.
     * @param {Object} - amalgamation of default and user defined options.
     */
    function Handler(_ref) {
        var els = _ref.els,
            error = _ref.error,
            placehold = _ref.placehold,
            forcePlacehold = _ref.forcePlacehold,
            imageLoaded = _ref.imageLoaded,
            imageLoading = _ref.imageLoading,
            sync = _ref.sync,
            inView = _ref.inView,
            background = _ref.background,
            success = _ref.success,
            fail = _ref.fail,
            progress = _ref.progress,
            loaded = _ref.loaded;

        _classCallCheck(this, Handler);

        this.els = this._getElements(els);

        this.watchers = [];

        // Image src for placehold or if error occurs.
        this.error = error;
        this.placehold = placehold;

        this.inView = inView;
        this.background = background;
        this.forcePlacehold = forcePlacehold;

        // Classes to add to the image / holder.
        this.imageLoaded = imageLoaded;
        this.imageLoading = imageLoading;

        // Callback functions.
        this.fail = fail || function () {};
        this.loaded = loaded || function () {};
        this.success = success || function () {};
        this.progress = progress || function () {};

        if ((typeof sync === 'undefined' ? 'undefined' : _typeof(sync)) === 'object') {

            this.sync = (0, _extend2.default)(_options.syncOptions, sync);
        }
    }

    /**
     * @function
     * Ensures different types of elements are outputted as an array.
     * @param {Array|Function|Object} els - Elements that are either holders or elements.
     * @returns {Array} - An array of images / holders.
     */


    _createClass(Handler, [{
        key: '_getElements',
        value: function _getElements(els) {

            if ((0, _isArray2.default)(els)) {

                return els;
            } else if ((0, _isFunction2.default)(els)) {

                return els.call(this);
            } else if ((0, _isNodeList2.default)(els)) {

                return Array.prototype.slice.call(els, 0);
            } else {

                return [els];
            }
        }

        /**
         * @function
         * Create the watchers with default configuration,
         * note this can be overidden by "data-o" attributes on
         * the watcher's element.
         * @returns {Promise|Array<Object>} 
         */

    }, {
        key: 'init',
        value: function init() {

            this._attachWatchers();

            // Ensure that the placehold and error images are loaded before loading the other images.
            if (this.forcePlacehold && (this.placehold || this.error)) {

                var cb = _promise2.default !== undefined ? function () {} : this._initWatchers.bind(this);

                var finished = _deferredImage2.default.wait([this.error, this.placehold], cb);

                if (_promise2.default !== undefined) {

                    return finished.then(this._initWatchers.bind(this));
                }
            }

            if (this.sync) {

                return this._syncWatchers();
            }

            return this._initWatchers();
        }

        /**
         * @function
         * Create the watchers with settings, note this 
         * can be overidden by "data-o" attributes on
         * the watcher's element.
         */

    }, {
        key: '_attachWatchers',
        value: function _attachWatchers() {

            var self = this;

            for (var i = 0; i < self.els.length; i++) {

                var watcher = new _watcher2.default({
                    el: self.els[i],
                    error: self.error,
                    placehold: self.placehold,
                    imageLoaded: self.imageLoaded,
                    imageLoading: self.imageLoading,
                    background: self.background,
                    loaded: self._imageLoaded.bind(self),
                    failed: self._imageFailed.bind(self),
                    success: self._imagesSuccess.bind(self)
                });

                self.watchers.push(watcher);
            }
        }

        /**
         * @function 
         * Initialise the watchers to show the placeholder and
         * load the images. 
         * @returns {Promise|Array<Object>} A promise that waits for the watcher
         * instances to resolve or an array of watchers.
         */

    }, {
        key: '_initWatchers',
        value: function _initWatchers() {
            var _this = this;

            var watcherInstances = this.watchers.map(function (watcher) {

                return _this.inView ? watcher.watchView() : watcher.init();
            });

            if (_promise2.default !== undefined) {

                return _promise2.default.type.all(watcherInstances);
            }

            return watcherInstances;
        }

        /**
         * @function 
         * Initialise the watchers synchronously.
         */

    }, {
        key: '_syncWatchers',
        value: function _syncWatchers() {

            var self = this;
            var perLoad = self.sync.perLoad;

            var index = 1;
            var maxIndex = Math.ceil(self.watchers.length / perLoad);

            self.watchers.map(function (watcher) {
                return watcher._setup();
            });

            _watcher2.default.queue(self.watchers.slice(0, perLoad), function nextWatcher() {

                index++;

                if (index <= maxIndex) {

                    _watcher2.default.queue(self.watchers.slice(perLoad * (index - 1), perLoad * index), nextWatcher);
                }
            });
        }

        /**
         * @function 
         * Called when an image has been loaded, computes the
         * progress of the watchers as well as firing other
         * callbacks.
         * @param {Object::Watcher} watcher - The object that listens to the image status.
         */

    }, {
        key: '_imageLoaded',
        value: function _imageLoaded(watcher) {

            var self = this;
            var toLoad = self.watchers.length;
            var haveLoaded = self.watchers.filter(function (watcher) {
                return watcher.hasLoaded;
            }).length;

            self.loaded(watcher);

            self.progress(watcher, {
                total: toLoad,
                loaded: haveLoaded,
                percent: Math.round(haveLoaded / toLoad * 100)
            });

            if (toLoad === haveLoaded) {

                self._imagesSuccess();
            }
        }

        /**
         * @function
         * Called when an image has failed to load, and fires
         * a callback.
         * @param {Object::Watcher} watcher - The object that listens to the image status.
         */

    }, {
        key: '_imageFailed',
        value: function _imageFailed(watcher) {

            var self = this;

            self.fail(watcher);

            self._watchUpdates();
        }

        /**
         * @function
         * Called when all of the images have been loaded, and fires
         * a callback.
         * @param {Object::Watcher} watcher - The object that listens to the image status.
         */

    }, {
        key: '_imagesSuccess',
        value: function _imagesSuccess() {

            var self = this;

            self.success(self.watchers);

            self._watchUpdates();
        }
    }, {
        key: '_watchUpdates',
        value: function _watchUpdates() {

            var self = this;

            window.addEventListener('resize', function () {

                self.watchers.filter(function (watcher) {
                    return watcher.hasBackground && watcher.hasChanged();
                }).forEach(function (watcher) {
                    return watcher.updateBackground();
                });
            });
        }

        /**
         * @function
         * Manually trigger updating images whose source that has changed, intended
         * for use if the website has altered the src of an image.
         */

    }, {
        key: 'update',
        value: function update() {

            this.watchers.filter(function (watcher) {
                return watcher.toLoad !== watcher.img.src && !watcher.hasBackground;
            }).forEach(function (watcher) {
                return watcher.init();
            });
        }
    }]);

    return Handler;
}();

exports.default = Handler;

},{"../config/options":4,"../utils/extend":7,"../utils/is-array":9,"../utils/is-function":10,"../utils/is-node-list":12,"../utils/promise":13,"./deferred-image":1,"./watcher":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('../utils/promise');

var _promise2 = _interopRequireDefault(_promise);

var _isArray = require('../utils/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

var _isImage = require('../utils/is-image');

var _isImage2 = _interopRequireDefault(_isImage);

var _inView = require('../utils/in-view');

var _inView2 = _interopRequireDefault(_inView);

var _domTraversal = require('../utils/dom-traversal');

var _styleManipulation = require('../utils/style-manipulation');

var _deferredImage = require('./deferred-image');

var _deferredImage2 = _interopRequireDefault(_deferredImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * Watches the status of the image load, manipulating the
 * associated element and firing callbacks depending on the
 * image's status.
 */
var Watcher = function () {
    _createClass(Watcher, null, [{
        key: 'queue',


        /**
         * @function
         * Initialise the array of watchers and when finished,
         * execute the callback. 
         * @param {Array|Object} watchers - A watcher or an array of watchers.
         * @param {Function} loaded - The callback to execute when finished. 
         */
        value: function queue(watchers, loaded) {

            if (!(0, _isArray2.default)(watchers)) {

                watchers = [watchers];
            }

            var noWatchers = watchers.length;

            var tempLoaded = function tempLoaded() {

                noWatchers--;

                if (noWatchers === 0) {

                    loaded();
                }
            };

            for (var i = 0; i < watchers.length; i++) {

                var currentWatcher = watchers[i];

                currentWatcher._any = tempLoaded.bind(this);

                // Watcher should already be setup before initialisation.
                currentWatcher.init(true);
            }
        }

        /**
         * @function
         * Initialising the configuration for the watcher.
         * @param {Object} - Defined options.
         */

    }]);

    function Watcher(_ref) {
        var el = _ref.el,
            error = _ref.error,
            placehold = _ref.placehold,
            loaded = _ref.loaded,
            failed = _ref.failed,
            imageLoaded = _ref.imageLoaded,
            imageLoading = _ref.imageLoading,
            background = _ref.background;

        _classCallCheck(this, Watcher);

        this.el = el;
        this.error = this.el.getAttribute('data-o-error') || error;
        this.background = this.el.getAttribute('data-o-background') || background;
        this.placehold = this.el.getAttribute('data-o-placehold') || placehold;
        this.imageLoaded = this.el.getAttribute('data-o-loaded') || imageLoaded;
        this.imageLoading = this.el.getAttribute('data-o-loading') || imageLoading;

        this.loaded = loaded;
        this.failed = failed;
    }

    /**
     * @function
     * Indicate that the image is loading, swap out the image's
     * src for the specified placeholder src and defer loading of 
     * the image to an Image object.
     * @param {Boolean} reinit - Whether to setup the watcher again.
     * @returns {Object} - The watcher.
     */


    _createClass(Watcher, [{
        key: 'init',
        value: function init(reinit) {

            if (!reinit) this._setup();

            (0, _styleManipulation.addClass)(this.el, this.imageLoading);

            this.pseudo = new _deferredImage2.default({
                src: this.toLoad,
                loaded: this._loaded.bind(this),
                failed: this._error.bind(this)
            });

            if (_promise2.default !== undefined) {

                return this.pseudo.$promise;
            }

            return this;
        }
    }, {
        key: '_setup',
        value: function _setup() {

            this.pseudo = {};
            this.inView = false;
            this.hasLoaded = false;
            this.hasBackground = false;

            this._getElement(this.el);
            this.toLoad = this._getImage();
            this._setImage(this.placehold);

            (0, _styleManipulation.removeClass)(this.el, this.imageLoaded, this.imageLoading);
        }

        /**
         * @function
         * Check whether the element is visible within the view,
         * also, reevaluate whether the element is visible when
         * window is scrolled or resized.
         * @returns {Object|Promise} - The watcher or a promise.
         */

    }, {
        key: 'watchView',
        value: function watchView() {

            this._setup();

            window.addEventListener('scroll', this._onViewChange.bind(this));
            window.addEventListener('resize', this._onViewChange.bind(this));

            return this._onViewChange();
        }

        /**
         * @function
         * Check whether the image loaded has changed
         */

    }, {
        key: 'hasChanged',
        value: function hasChanged() {

            return this.toLoad !== (0, _styleManipulation.getBackgroundImage)(this.img);
        }

        /**
         * @function
         * Check whether the element is visible within the view,
         * and if so, initialise the watcher.
         * @returns {Object|Promise} - The watcher or a promise.
         */

    }, {
        key: '_onViewChange',
        value: function _onViewChange() {

            if (!(0, _inView2.default)(this.el) || this.inView) {

                return;
            }

            // No need for listeners when image has loaded.
            window.removeEventListener('scroll', this._onViewChange.bind(this));
            window.removeEventListener('resize', this._onViewChange.bind(this));

            this.init(true);

            this.inView = true;
        }

        /**
         * @function
         * Determine whether the element contains an image or is just the
         * image itself and set the element's image to either the element
         * or the first child image.
         * @param {Object} el - The element
         */

    }, {
        key: '_getElement',
        value: function _getElement(el) {

            this.img = (0, _isImage2.default)(el) || this.background ? el : (0, _domTraversal.findClosestImage)(el);
        }

        /**
         * @function
         * Set the image src of the element's image based on whether
         * it's a background image or an image element.
         * @params {String} src - The image src
         */

    }, {
        key: '_setImage',
        value: function _setImage(src) {

            if (this.background) {

                (0, _styleManipulation.setBackgroundImage)(this.img, src);
            } else {

                this.img.src = src;
            }
        }

        /**
         * @function
         * Get the image src of the element's image based on whether
         * it's a background image or an image element.
         * @returns {String} - The image src
         */

    }, {
        key: '_getImage',
        value: function _getImage() {

            return this.background ? (0, _styleManipulation.getBackgroundImage)(this.img) : this.img.getAttribute('data-o-src');
        }

        /**
         * @function
         * The image has loaded succesfully, swap out the image's 
         * placeholder src for the loaded src. Also, fire associated
         * callback. 
         */

    }, {
        key: '_loaded',
        value: function _loaded() {

            (0, _styleManipulation.removeClass)(this.el, this.imageLoading);
            (0, _styleManipulation.addClass)(this.el, this.imageLoaded);

            this._setImage(this.toLoad);

            this.hasLoaded = true;

            this.loaded(this);

            this._any(this);
        }

        /**
         * @function
         * The image has loaded unsuccesfully, swap out the image's 
         * placeholder src for the error src. Also, fire associated
         * callback. 
         */

    }, {
        key: '_error',
        value: function _error() {

            (0, _styleManipulation.removeClass)(this.el, this.imageLoading);

            this._setImage(this.error);

            this.hasLoaded = true;

            this.failed(this);

            this._any(this);
        }

        /**
         * TODO: Expand upon functionality, currently just for
         * the ^ static queue function.
         * @function
         * Executed whenever an image has been loaded or an 
         * error has been found.
         * @returns { Object::Watcher } Return this instance.
         */

    }, {
        key: '_any',
        value: function _any() {

            return this;
        }
    }]);

    return Watcher;
}();

exports.default = Watcher;

},{"../utils/dom-traversal":6,"../utils/in-view":8,"../utils/is-array":9,"../utils/is-image":11,"../utils/promise":13,"../utils/style-manipulation":14,"./deferred-image":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @object
 * Default options for the handler.
 */
var defaultOptions = {
    els: document.getElementsByTagName('img'),

    error: '',
    placehold: '',

    forcePlacehold: false,
    inView: false,
    background: false,
    sync: false,

    imageLoaded: 'o-image-loaded',
    imageLoading: 'o-image-loading'
};

/**
 * @object
 * Default options for synchronous image 
 * loading.
 */
var syncOptions = {
    perLoad: 1
};

exports.defaultOptions = defaultOptions;
exports.syncOptions = syncOptions;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _options = require('./config/options');

var _handler = require('./components/handler');

var _handler2 = _interopRequireDefault(_handler);

var _extend = require('./utils/extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * Load Otho and parse through the user's options.
 * @param {Object} userOptions - The user defined options  
 * @returns {Array<Watcher>|Promise} - List of watchers and a promise containing watchers
 */
function load(userOptions) {

  var options = (0, _extend2.default)(_options.defaultOptions, userOptions);

  return new _handler2.default(options).init();
}

},{"./components/handler":2,"./config/options":4,"./utils/extend":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findClosestImage = exports.findChildrenImages = undefined;

var _isImage = require('./is-image');

var _isImage2 = _interopRequireDefault(_isImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * Find all descendent images of the element
 * @param el - The element to check.
 * @returns {Array} - An array of descendent images
 */
function findChildrenImages(el) {

    var _images = [];

    (function _find(el) {

        if ((0, _isImage2.default)(el)) {

            return _images.push(el);
        }

        return Array.prototype.slice.apply(el.childNodes).forEach(_find);
    })(el);

    return _images;
}

/**
 * @function
 * Find all descendent images of the element and 
 * return the first image found.
 * @param el - The element to check.
 * @returns {Object|null} - The image or, if none 
 * found, null.
 */
function findClosestImage(el) {

    var _images = findChildrenImages(el);

    return _images.length ? _images[0] : null;
}

exports.findChildrenImages = findChildrenImages;
exports.findClosestImage = findClosestImage;

},{"./is-image":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = extend;
/**
 * @function
 * See https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/ for full description.
 * @param {Object} arguments - List of objects that need to be extended.
 * @returns {Object} - Extended object
 */
function extend() {

    var extended = {},
        deep = false,
        i = 0,
        length = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {

        deep = arguments[0];
        i++;
    }

    var merge = function merge(obj) {

        for (var prop in obj) {

            if (Object.prototype.hasOwnProperty.call(obj, prop)) {

                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {

                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {

                    extended[prop] = obj[prop];
                }
            }
        }
    };

    for (; i < length; i++) {
        merge(arguments[i]);
    }return extended;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = inView;
/**
 * @function
 * Determines whether the supplied element is visible in the view.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is in the view.
 */
function inView(el) {

    var rect = el.getBoundingClientRect();
    var doc = document.documentElement;

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || doc.clientHeight) && rect.right <= (window.innerWidth || doc.clientWidth);
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;
/**
 * @function
 * Determines whether the supplied element is an array.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an array
 */
function isArray(el) {

  return Object.prototype.toString.call(el) === '[object Array]';
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;
/**
 * @function
 * Determines whether the supplied element is an array.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an array
 */
function isFunction(el) {

  return !!(el && el.constructor && el.call && el.apply);
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isImage;
/**
 * @function
 * Determines whether the supplied element is an image.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an image
 */
function isImage(el) {

  return el.nodeName.toLowerCase() === 'img';
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isNodeList;
/**
 * @function
 * Determines whether the supplied element is a node list.
 * See http://stackoverflow.com/questions/7238177/how-to-detect-htmlcollection-nodelist-in-javascript for a detailed description.
 * @param nodes - The nodes to check.
 * @returns {Boolean} - Whether the element is a node list
 */
function isNodeList(nodes) {

    var stringRepr = Object.prototype.toString.call(nodes);

    return (typeof nodes === 'undefined' ? 'undefined' : _typeof(nodes)) === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && typeof nodes.length === 'number' && (nodes.length === 0 || _typeof(nodes[0]) === "object" && nodes[0].nodeType > 0);
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @function
 * Checks whether the browser supports native promises.
 * @returns {Boolean} - Whether the browser supports native promises.
 */
function hasNativeSupport() {
    return typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1;
}

/**
 * @Object
 * Checks whether variants of promises are supported and returns
 * that promise with an instance if it's native as well as the
 * promise object.
 * Supports:
 *  - Native implementations and the Bluebird library
 *  - jQuery / Zepto implementations
 *  - Kris Kowal's Q implementation
 * Notes: Check whether the promise is an A+ implementation.
 * @returns {Object} - An instance of the promise as well as
 * the promise object.
 */

exports.default = function getSupportedPromise() {

    var _Promise = void 0,
        lib = void 0;

    if (hasNativeSupport()) {

        _Promise = Promise;
    } else if ((lib = window.jQuery || window.Zepto) && lib.promise !== null) {

        _Promise = lib.promise;
    } else if (window.Q !== null) {

        _Promise = window.Q;
    }

    if (_Promise !== null) {

        return {

            instance: function instance(fn) {
                return hasNativeSupport() ? new _Promise(fn) : _Promise(fn);
            },

            type: _Promise

        };
    } else {

        return undefined;
    }
}();

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.getBackgroundImage = getBackgroundImage;
exports.setBackgroundImage = setBackgroundImage;
/**
 * @function
 * Add class(es) to an element.
 * Note: Could probably use rest params for this...
 * @param el - The element to add the class(es) to.
 * @param arguments - List of classes to add to the element.
 */
function addClass(el /* , classes to add */) {

    var toAdd = Array.prototype.slice.call(arguments, 1);
    var classes = el.className.split(' ');

    if (toAdd.length === 0) {
        throw new Error("You need to provide at least one class");
    }

    el.className = classes.concat(toAdd).join(' ').trim();
}

/**
 * @function
 * Remove class(es) from an element.
 * Note: Could probably use rest params for this...
 * @param el - The element to remove the class(es) from.
 * @param arguments - List of classes to remove from the element.
 */
function removeClass(el /*, classes to remove */) {

    var toRemove = Array.prototype.slice.call(arguments, 1);

    if (toRemove.length === 0) {
        throw new Error("You need to provide at least one class");
    }

    el.className = el.className.split(' ').filter(function (className) {
        return toRemove.indexOf(className) === -1;
    }).join(' ').trim();
}

/**
 * @function
 * Get the background image of the element
 * @param el - The element to get the background image from.
 * @param style - The property of the element to retrieve.
 */
function getBackgroundImage(el) {

    var background = window.getComputedStyle(el, null).getPropertyValue('background');
    var urlIndex = background.indexOf('url(') + 4;
    var endIndex = background.slice(urlIndex).indexOf(')');

    return background.slice(urlIndex).slice(0, endIndex).replace(/["|']/g, "");
}

/**
 * @function
 * Set the background image of the element
 * @param el - The element to get the background image from.
 * @param style - The property of the element to retrieve.
 */
function setBackgroundImage(el, src) {

    el.style.backgroundImage = 'url(' + src + ')';
}

},{}]},{},[5])(5)
});
//# sourceMappingURL=otho.js.map
