/*!
 * audioPlayer v0.0.1 (https://github.com/zhangchen2397/audioPlayer.git)
 * Copyright 2016, zhangchen2397@126.com
 * MIT license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AudioPlayer = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * html5 audio player 音频播放器组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - 自定义播放器结构及皮肤
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - 播放进度条，指定位置播放，拖拽播放
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - 支持播放列表播放，动态插入歌曲到播放列表
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - 支持单曲循环、顺序循环多种循环播放方式
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  - 快速切换上一曲/下一曲
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2016-07-28
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author samczhang@tencent.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * --------------------------------------
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 对外调用接口及自定义事件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method play 播放
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method pause 暂停
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method prePlay 上一首
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method nextPlay 下一首
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method switchPlay 指定列表索引播放
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method togglePlay 切换播放与暂停
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method setLoopType 设置循环播放方式
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @method addtoPlayList 添加歌曲到播放列表
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @customEvent play 开始播放
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @customEvent pause 暂停播放
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @customEvent playing 播放中
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @customEvent ended 播放结束
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * --------------------------------------
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 使用demo
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   new AudioPlayer({
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *       data: [{
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           title: '曾经的你',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           author: '许巍',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           src: '/example/asset/music/once.mp3',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           cover: '/example/asset/image/cover_once.jpeg'
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *       }, {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           title: 'You\'re Beautiful',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           author: 'James Blunt',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           src: '/example/asset/music/you_are_beautiful.mp4',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           cover: '/example/asset/image/cover_yab.jpg'
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *       }, {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           title: 'I\'m Yours',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           author: 'Jason Mraz',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           src: '/example/asset/music/i_am_yours.mp4',
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *           cover: '/example/asset/image/cover_iay.jpg'
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *       }]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   });
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _zepto = __webpack_require__(1);

	var _zepto2 = _interopRequireDefault(_zepto);

	var _render = __webpack_require__(2);

	var _render2 = _interopRequireDefault(_render);

	var _customEvent = __webpack_require__(3);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	__webpack_require__(4);

	var _audio = __webpack_require__(12);

	var _audio2 = _interopRequireDefault(_audio);

	var _list = __webpack_require__(13);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultConfig = {
	    id: 'player-wrap', //播放器容器id
	    isAutoplay: true, //是否自动播放
	    tpl: _audio2.default, //音频播放器模板

	    /**
	     * loopType {string} 播放循环方式
	     *   none: 不循环,
	     *   single: 单曲循环
	     *   order: 顺序循环
	     */
	    loopType: 'order',

	    /**
	     * data {array} 音频数据，数组的每一项为对象
	     *  title: 歌名
	     *  author: 作者
	     *  src: 音频地址
	     *  cover: 音频封面图
	     */
	    data: []
	};

	var AudioPlayer = function () {
	    function AudioPlayer(config) {
	        _classCallCheck(this, AudioPlayer);

	        this.config = _zepto2.default.extend({}, defaultConfig, config || {});
	        this.init();
	    }

	    _createClass(AudioPlayer, [{
	        key: 'init',
	        value: function init() {
	            this._initStatus();
	            this._createAudio();
	            this._createPlayer();
	            this._cache();
	            this._setPlaybarPos();
	            this._setPlayListHeight();
	            this._initEvent();
	        }
	    }, {
	        key: '_createAudio',
	        value: function _createAudio() {
	            var me = this,
	                config = this.config;

	            this.audio = document.createElement('audio');
	            this.audio.setAttribute('src', this.data[0].src);
	            this.audio.setAttribute('preload', 'metadata');

	            if (config.isAutoplay) {
	                this.play();
	            }

	            document.body.appendChild(this.audio);
	        }
	    }, {
	        key: '_initStatus',
	        value: function _initStatus() {
	            var me = this,
	                config = this.config;

	            this.playStatus = config.isAutoplay ? 'play' : 'pause';
	            this.playListStatus = 'show';
	            this.playIdx = 0;
	            this.data = config.data;
	            this.loopType = config.loopType;
	            this.totalNum = this.data.length;
	        }
	    }, {
	        key: '_createPlayer',
	        value: function _createPlayer() {
	            var me = this,
	                config = this.config,
	                playIcon = this.playStatus === 'play' ? 'pause' : 'play';

	            this.el = (0, _zepto2.default)('#' + config.id);
	            this.el.html((0, _render2.default)(config.tpl, {
	                data: this.data,
	                playIcon: playIcon
	            }));
	        }
	    }, {
	        key: '_cache',
	        value: function _cache() {
	            var me = this,
	                config = this.config,
	                el = this.el;

	            //dom cache
	            this.playTime = el.find('.play-time');
	            this.totalTime = el.find('.total-time');
	            this.playBar = el.find('.play-bar');
	            this.loadedBar = el.find('.loaded');
	            this.playedBar = el.find('.played');
	            this.playPointer = el.find('.pointer');
	            this.playListBtn = el.find('.icon-list');
	            this.playListWrap = el.find('.play-list');
	            this.playListItems = this.playListWrap.find('li');

	            this.nextBtn = el.find('.icon-nextsong');
	            this.preBtn = el.find('.icon-presong');
	            this.cover = el.find('img.cover');
	            this.title = el.find('.info h3');
	            this.loopBtn = el.find('.icon-loop');
	            this.playBtn = el.find('.play-btn');
	            this.coverPlayBtn = el.find('.cover-play-btn');

	            //event callback cache
	            this.tempMovePlaybar = _zepto2.default.proxy(this._movePlaybar, this);
	            this.tempMouseupCb = _zepto2.default.proxy(this._mouseupCb, this);
	        }

	        //设置及缓存播放进度条位置信息，方便计算百分比

	    }, {
	        key: '_setPlaybarPos',
	        value: function _setPlaybarPos() {
	            var playBarPos = this.playBar[0].getBoundingClientRect();
	            this.playBarClientX = playBarPos.left;
	            this.playBarWidth = playBarPos.width;
	        }

	        //初始化及缓存播放列表高度，做动画需要

	    }, {
	        key: '_setPlayListHeight',
	        value: function _setPlayListHeight() {
	            var playListWrap = this.playListWrap;
	            this.playListHeight = playListWrap.height();
	            playListWrap.css('height', this.playListHeight);
	        }
	    }, {
	        key: '_initEvent',
	        value: function _initEvent() {
	            var me = this,
	                config = this.config,
	                playPointer = this.playPointer,
	                audio = this.audio;

	            audio.addEventListener('durationchange', _zepto2.default.proxy(this._durationchangeCb, this), false);
	            audio.addEventListener('progress', _zepto2.default.proxy(this._progressCb, this), false);
	            audio.addEventListener('ended', _zepto2.default.proxy(this._endedCb, this), false);

	            (0, _zepto2.default)(window).on('resize', _zepto2.default.proxy(this._setPlaybarPos, this));
	            (0, _zepto2.default)(window).on('orientationchange', _zepto2.default.proxy(this._setPlaybarPos, this));

	            this.el.on('click', '.play-btn, .cover-play-btn', _zepto2.default.proxy(this.togglePlay, this));
	            this.playBar.on('click', _zepto2.default.proxy(this.assignPlay, this));
	            this.loopBtn.on('click', _zepto2.default.proxy(this._toggleOrderLoop, this));

	            playPointer.on('touchmove', _zepto2.default.proxy(this._movePlaybar, this));
	            playPointer.on('touchend', _zepto2.default.proxy(this.assignPlay, this));
	            playPointer.on('mousedown', _zepto2.default.proxy(this._mousedownCb, this));

	            this.playListBtn.on('click', _zepto2.default.proxy(this._togglePlayList, this));
	            this.playListWrap.on('click', 'li', _zepto2.default.proxy(this.switchPlay, this));

	            this.preBtn.on('click', _zepto2.default.proxy(this.prePlay, this));
	            this.nextBtn.on('click', _zepto2.default.proxy(this.nextPlay, this));
	        }
	    }, {
	        key: '_durationchangeCb',
	        value: function _durationchangeCb() {
	            this.totalTime.html(this.formatSeconds(this.audio.duration));
	        }
	    }, {
	        key: '_progressCb',
	        value: function _progressCb(event) {
	            var me = this,
	                config = this.config,
	                audio = this.audio;

	            var loadedPercent = audio.buffered.length ? audio.buffered.end(audio.buffered.length - 1) / audio.duration : 0;

	            this.loadedBar.css('width', loadedPercent * 100 + '%');

	            _zepto2.default.trigger(this, 'playing', [{
	                song: this.data[this.playIdx],
	                loadedPercent: loadedPercent
	            }]);
	        }
	    }, {
	        key: '_endedCb',
	        value: function _endedCb(event) {
	            switch (this.loopType) {
	                case 'order':
	                    this.nextPlay();
	                    break;
	                case 'single':
	                    this.switchPlay(this.playIdx);
	                    break;
	                case 'none':
	                    this.togglePlay();
	                    break;
	                default:
	                    break;
	            }

	            _zepto2.default.trigger(this, 'ended', [{
	                song: this.data[this.playIdx]
	            }]);
	        }
	    }, {
	        key: 'prePlay',
	        value: function prePlay() {
	            var idx = this.playIdx - 1;
	            if (idx < 0) {
	                idx = this.totalNum - 1;
	            }

	            this.switchPlay(idx);
	        }
	    }, {
	        key: 'nextPlay',
	        value: function nextPlay() {
	            var idx = this.playIdx + 1;
	            if (idx > this.totalNum - 1) {
	                idx = 0;
	            }

	            this.switchPlay(idx);
	        }
	    }, {
	        key: '_toggleOrderLoop',
	        value: function _toggleOrderLoop(event) {
	            switch (this.loopType) {
	                case 'order':
	                    this.loopType = 'none';
	                    this.loopBtn.addClass('gray');
	                    break;
	                case 'none':
	                    this.loopType = 'order';
	                    this.loopBtn.removeClass('gray');
	                    break;
	                default:
	                    break;
	            }
	        }

	        /**
	         * 设置循环播放方式
	         * type {string} 循环播放方式
	         *  none: 不循环
	         *  order: 顺序循环
	         *  single: 单曲循环
	         */

	    }, {
	        key: 'setLoopType',
	        value: function setLoopType(type) {
	            this.loopType = type;
	        }

	        /**
	         * 添加新歌曲到播放列表
	         * song {object} 需要添加的歌曲对象
	         *  title: 歌名
	         *  author: 作者
	         *  src: 音频地址
	         *  cover: 音频封面图
	         */

	    }, {
	        key: 'addtoPlayList',
	        value: function addtoPlayList(song) {
	            this.totalNum++;
	            this.data.push(song);

	            //render list template
	            song.idx = this.totalNum;
	            this.playListWrap.append((0, _render2.default)(_list2.default, song));

	            _zepto2.default.trigger(this, 'afterAddtoPlayList', [{
	                song: song
	            }]);
	        }

	        /**
	         * 歌曲播放切换
	         * event {event object | idx}
	         * 接收参数有两种方式
	         *  一种通过事件event找到需要播放的idx
	         *  直接传入需要播放的idx
	         * idx 从0开始
	         */

	    }, {
	        key: 'switchPlay',
	        value: function switchPlay(event) {
	            var me = this,
	                config = this.config,
	                playListItems = this.playListItems,
	                idx = event;

	            if ((typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {
	                idx = (0, _zepto2.default)(event.currentTarget).data('idx');
	            }

	            if (this.playIdx === idx) return;

	            var songData = this.data[idx];
	            playListItems.removeClass('cur');
	            (0, _zepto2.default)(playListItems.get(idx)).addClass('cur');

	            this.pause();
	            this.audio.setAttribute('src', songData.src);
	            this.playIdx = idx;
	            this.play();

	            this.cover.attr('src', songData.cover);
	            this.title.html(songData.title + '<span>' + songData.author + '</span>');
	        }
	    }, {
	        key: '_togglePlayList',
	        value: function _togglePlayList(event) {
	            var me = this,
	                config = this.config,
	                playListWrap = this.playListWrap;

	            if (this.playListStatus === 'show') {
	                playListWrap.css('height', 0);
	                this.playListStatus = 'hide';
	            } else {
	                playListWrap.css('height', this.playListHeight);
	                this.playListStatus = 'show';
	            }
	        }
	    }, {
	        key: '_mousedownCb',
	        value: function _mousedownCb() {
	            var me = this;
	            var playPointer = this.playPointer;
	            playPointer.on('mousemove', this.tempMovePlaybar);
	            playPointer.on('mouseup', this.tempMouseupCb);
	        }
	    }, {
	        key: '_mouseupCb',
	        value: function _mouseupCb(event) {
	            var me = this;
	            var playPointer = this.playPointer;

	            playPointer.unbind('mousemove', this.tempMovePlaybar);
	            playPointer.unbind('mouseup', this.tempMouseupCb);

	            this.assignPlay(event);
	        }
	    }, {
	        key: '_movePlaybar',
	        value: function _movePlaybar(event) {
	            event.preventDefault();
	            event.stopPropagation();

	            this.clearPlayTimer();

	            //根据不同的事件取相应的坐标值
	            var pointerClientX = event.clientX || event.touches[0].clientX;
	            var offsetX = pointerClientX - this.playBarClientX;
	            var curPercent = Math.min(offsetX / this.playBarWidth, 1);

	            this.playedBar.css('width', curPercent * 100 + '%');
	            this.playTime.html(this.formatSeconds(this.audio.duration * curPercent));
	        }
	    }, {
	        key: 'assignPlay',
	        value: function assignPlay(event) {
	            event.preventDefault();
	            event.stopPropagation();

	            var audio = this.audio;

	            //分点击事件和touchend事件，获取坐标的方式不一样
	            var pointerClientX = event.clientX || event.changedTouches[0].clientX;
	            var curPercent = (pointerClientX - this.playBarClientX) / this.playBarWidth;

	            //指定位置播放，立即更新播放指示点
	            //已播放时间及已播放进度条通过playTimer自动更新
	            audio.currentTime = audio.duration * curPercent;
	            this.playedBar.css('width', curPercent * 100 + '%');

	            //如果是通过拖拽播放，需要重新开启playtimer
	            if (!this.playTimer) {
	                this.startPlayTimer();
	            }
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var me = this,
	                config = this.config,
	                audio = this.audio;

	            audio.play();
	            this.playStatus = 'play';
	            this.startPlayTimer();

	            if (this.el) {
	                this.playBtn.addClass('icon-pause');
	                this.coverPlayBtn.addClass('icon-pause');
	                this.playBtn.removeClass('icon-play');
	                this.coverPlayBtn.removeClass('icon-play');
	            }

	            _zepto2.default.trigger(this, 'play', [{
	                song: me.data[this.playIdx]
	            }]);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            var me = this,
	                config = this.config,
	                audio = this.audio;

	            audio.pause();
	            this.playStatus = 'pause';

	            this.clearPlayTimer();

	            this.playBtn.removeClass('icon-pause');
	            this.coverPlayBtn.removeClass('icon-pause');
	            this.playBtn.addClass('icon-play');
	            this.coverPlayBtn.addClass('icon-play');

	            _zepto2.default.trigger(this, 'pause', [{
	                songInfo: me.data[this.playIdx]
	            }]);
	        }
	    }, {
	        key: 'startPlayTimer',
	        value: function startPlayTimer() {
	            var _this = this;

	            var audio = this.audio;

	            this.playTimer = setInterval(function () {
	                var playedPercent = audio.currentTime / audio.duration;
	                _this.playedBar.css('width', playedPercent * 100 + '%');
	                _this.playTime.html(_this.formatSeconds(audio.currentTime));
	            }, 500);
	        }
	    }, {
	        key: 'clearPlayTimer',
	        value: function clearPlayTimer() {
	            if (this.playTimer) {
	                clearInterval(this.playTimer);
	                this.playTimer = null;
	            }
	        }
	    }, {
	        key: 'togglePlay',
	        value: function togglePlay(event) {
	            if (this.playStatus === 'play') {
	                this.pause();
	            } else {
	                this.play();
	            }
	        }
	    }, {
	        key: 'formatSeconds',
	        value: function formatSeconds(seconds) {
	            var minute = parseInt(seconds / 60, 10);
	            var second = parseInt(seconds - minute * 60, 10);
	            var actNum = function actNum(num) {
	                var rst = '';
	                if (num < 1) {
	                    rst = '00';
	                } else if (num >= 1 && num < 10) {
	                    rst = '0' + num;
	                } else {
	                    rst = num;
	                }

	                return rst;
	            };

	            minute = actNum(minute);
	            second = actNum(second);

	            return minute + ':' + second;
	        }
	    }]);

	    return AudioPlayer;
	}();

	exports.AudioPlayer = AudioPlayer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
	(function (global, factory) {
	  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return factory(global);
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else factory(global);
	})(typeof window !== "undefined" ? window : undefined, function (window) {
	  var Zepto = function () {
	    var undefined,
	        key,
	        $,
	        classList,
	        emptyArray = [],
	        _concat = emptyArray.concat,
	        _filter = emptyArray.filter,
	        _slice = emptyArray.slice,
	        document = window.document,
	        elementDisplay = {},
	        classCache = {},
	        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
	        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	        rootNodeRE = /^(?:body|html)$/i,
	        capitalRE = /([A-Z])/g,


	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	        adjacencyOperators = ['after', 'prepend', 'before', 'append'],
	        table = document.createElement('table'),
	        tableRow = document.createElement('tr'),
	        containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	        readyRE = /complete|loaded|interactive/,
	        simpleSelectorRE = /^[\w-]*$/,
	        class2type = {},
	        toString = class2type.toString,
	        zepto = {},
	        camelize,
	        uniq,
	        tempParent = document.createElement('div'),
	        propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	        isArray = Array.isArray || function (object) {
	      return object instanceof Array;
	    };

	    zepto.matches = function (element, selector) {
	      if (!selector || !element || element.nodeType !== 1) return false;
	      var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
	      if (matchesSelector) return matchesSelector.call(element, selector);
	      // fall back to performing a selector:
	      var match,
	          parent = element.parentNode,
	          temp = !parent;
	      if (temp) (parent = tempParent).appendChild(element);
	      match = ~zepto.qsa(parent, selector).indexOf(element);
	      temp && tempParent.removeChild(element);
	      return match;
	    };

	    function type(obj) {
	      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	    }

	    function isFunction(value) {
	      return type(value) == "function";
	    }
	    function isWindow(obj) {
	      return obj != null && obj == obj.window;
	    }
	    function isDocument(obj) {
	      return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	    }
	    function isObject(obj) {
	      return type(obj) == "object";
	    }
	    function isPlainObject(obj) {
	      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	    }

	    function likeArray(obj) {
	      var length = !!obj && 'length' in obj && obj.length,
	          type = $.type(obj);

	      return 'function' != type && !isWindow(obj) && ('array' == type || length === 0 || typeof length == 'number' && length > 0 && length - 1 in obj);
	    }

	    function compact(array) {
	      return _filter.call(array, function (item) {
	        return item != null;
	      });
	    }
	    function flatten(array) {
	      return array.length > 0 ? $.fn.concat.apply([], array) : array;
	    }
	    camelize = function camelize(str) {
	      return str.replace(/-+(.)?/g, function (match, chr) {
	        return chr ? chr.toUpperCase() : '';
	      });
	    };
	    function dasherize(str) {
	      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	    }
	    uniq = function uniq(array) {
	      return _filter.call(array, function (item, idx) {
	        return array.indexOf(item) == idx;
	      });
	    };

	    function classRE(name) {
	      return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
	    }

	    function maybeAddPx(name, value) {
	      return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
	    }

	    function defaultDisplay(nodeName) {
	      var element, display;
	      if (!elementDisplay[nodeName]) {
	        element = document.createElement(nodeName);
	        document.body.appendChild(element);
	        display = getComputedStyle(element, '').getPropertyValue("display");
	        element.parentNode.removeChild(element);
	        display == "none" && (display = "block");
	        elementDisplay[nodeName] = display;
	      }
	      return elementDisplay[nodeName];
	    }

	    function _children(element) {
	      return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
	        if (node.nodeType == 1) return node;
	      });
	    }

	    function Z(dom, selector) {
	      var i,
	          len = dom ? dom.length : 0;
	      for (i = 0; i < len; i++) {
	        this[i] = dom[i];
	      }this.length = len;
	      this.selector = selector || '';
	    }

	    // `$.zepto.fragment` takes a html string and an optional tag name
	    // to generate DOM nodes from the given html string.
	    // The generated DOM nodes are returned as an array.
	    // This function can be overridden in plugins for example to make
	    // it compatible with browsers that don't support the DOM fully.
	    zepto.fragment = function (html, name, properties) {
	      var dom, nodes, container;

	      // A special case optimization for a single tag
	      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

	      if (!dom) {
	        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
	        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
	        if (!(name in containers)) name = '*';

	        container = containers[name];
	        container.innerHTML = '' + html;
	        dom = $.each(_slice.call(container.childNodes), function () {
	          container.removeChild(this);
	        });
	      }

	      if (isPlainObject(properties)) {
	        nodes = $(dom);
	        $.each(properties, function (key, value) {
	          if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
	        });
	      }

	      return dom;
	    };

	    // `$.zepto.Z` swaps out the prototype of the given `dom` array
	    // of nodes with `$.fn` and thus supplying all the Zepto functions
	    // to the array. This method can be overridden in plugins.
	    zepto.Z = function (dom, selector) {
	      return new Z(dom, selector);
	    };

	    // `$.zepto.isZ` should return `true` if the given object is a Zepto
	    // collection. This method can be overridden in plugins.
	    zepto.isZ = function (object) {
	      return object instanceof zepto.Z;
	    };

	    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	    // takes a CSS selector and an optional context (and handles various
	    // special cases).
	    // This method can be overridden in plugins.
	    zepto.init = function (selector, context) {
	      var dom;
	      // If nothing given, return an empty Zepto collection
	      if (!selector) return zepto.Z();
	      // Optimize for string selectors
	      else if (typeof selector == 'string') {
	          selector = selector.trim();
	          // If it's a html fragment, create nodes from it
	          // Note: In both Chrome 21 and Firefox 15, DOM error 12
	          // is thrown if the fragment doesn't begin with <
	          if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
	          // If there's a context, create a collection on that context first, and select
	          // nodes from there
	          else if (context !== undefined) return $(context).find(selector);
	            // If it's a CSS selector, use it to select nodes.
	            else dom = zepto.qsa(document, selector);
	        }
	        // If a function is given, call it when the DOM is ready
	        else if (isFunction(selector)) return $(document).ready(selector);
	          // If a Zepto collection is given, just return it
	          else if (zepto.isZ(selector)) return selector;else {
	              // normalize array if an array of nodes is given
	              if (isArray(selector)) dom = compact(selector);
	              // Wrap DOM nodes.
	              else if (isObject(selector)) dom = [selector], selector = null;
	                // If it's a html fragment, create nodes from it
	                else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
	                  // If there's a context, create a collection on that context first, and select
	                  // nodes from there
	                  else if (context !== undefined) return $(context).find(selector);
	                    // And last but no least, if it's a CSS selector, use it to select nodes.
	                    else dom = zepto.qsa(document, selector);
	            }
	      // create a new Zepto collection from the nodes found
	      return zepto.Z(dom, selector);
	    };

	    // `$` will be the base `Zepto` object. When calling this
	    // function just call `$.zepto.init, which makes the implementation
	    // details of selecting nodes and creating Zepto collections
	    // patchable in plugins.
	    $ = function $(selector, context) {
	      return zepto.init(selector, context);
	    };

	    function extend(target, source, deep) {
	      for (key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
	          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
	          extend(target[key], source[key], deep);
	        } else if (source[key] !== undefined) target[key] = source[key];
	      }
	    }

	    // Copy all but undefined properties from one or more
	    // objects to the `target` object.
	    $.extend = function (target) {
	      var deep,
	          args = _slice.call(arguments, 1);
	      if (typeof target == 'boolean') {
	        deep = target;
	        target = args.shift();
	      }
	      args.forEach(function (arg) {
	        extend(target, arg, deep);
	      });
	      return target;
	    };

	    // `$.zepto.qsa` is Zepto's CSS selector implementation which
	    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	    // This method can be overridden in plugins.
	    zepto.qsa = function (element, selector) {
	      var found,
	          maybeID = selector[0] == '#',
	          maybeClass = !maybeID && selector[0] == '.',
	          nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
	          // Ensure that a 1 char tag name still gets checked
	      isSimple = simpleSelectorRE.test(nameOnly);
	      return element.getElementById && isSimple && maybeID ? // Safari DocumentFragment doesn't have getElementById
	      (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11 ? [] : _slice.call(isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
	      maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	      element.getElementsByTagName(selector) : // Or a tag
	      element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      );
	    };

	    function filtered(nodes, selector) {
	      return selector == null ? $(nodes) : $(nodes).filter(selector);
	    }

	    $.contains = document.documentElement.contains ? function (parent, node) {
	      return parent !== node && parent.contains(node);
	    } : function (parent, node) {
	      while (node && (node = node.parentNode)) {
	        if (node === parent) return true;
	      }return false;
	    };

	    function funcArg(context, arg, idx, payload) {
	      return isFunction(arg) ? arg.call(context, idx, payload) : arg;
	    }

	    function setAttribute(node, name, value) {
	      value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
	    }

	    // access className property while respecting SVGAnimatedString
	    function className(node, value) {
	      var klass = node.className || '',
	          svg = klass && klass.baseVal !== undefined;

	      if (value === undefined) return svg ? klass.baseVal : klass;
	      svg ? klass.baseVal = value : node.className = value;
	    }

	    // "true"  => true
	    // "false" => false
	    // "null"  => null
	    // "42"    => 42
	    // "42.5"  => 42.5
	    // "08"    => "08"
	    // JSON    => parse if valid
	    // String  => self
	    function deserializeValue(value) {
	      try {
	        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	      } catch (e) {
	        return value;
	      }
	    }

	    $.type = type;
	    $.isFunction = isFunction;
	    $.isWindow = isWindow;
	    $.isArray = isArray;
	    $.isPlainObject = isPlainObject;

	    $.isEmptyObject = function (obj) {
	      var name;
	      for (name in obj) {
	        return false;
	      }return true;
	    };

	    $.isNumeric = function (val) {
	      var num = Number(val),
	          type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	      return val != null && type != 'boolean' && (type != 'string' || val.length) && !isNaN(num) && isFinite(num) || false;
	    };

	    $.inArray = function (elem, array, i) {
	      return emptyArray.indexOf.call(array, elem, i);
	    };

	    $.camelCase = camelize;
	    $.trim = function (str) {
	      return str == null ? "" : String.prototype.trim.call(str);
	    };

	    // plugin compatibility
	    $.uuid = 0;
	    $.support = {};
	    $.expr = {};
	    $.noop = function () {};

	    $.map = function (elements, callback) {
	      var value,
	          values = [],
	          i,
	          key;
	      if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i);
	        if (value != null) values.push(value);
	      } else for (key in elements) {
	        value = callback(elements[key], key);
	        if (value != null) values.push(value);
	      }
	      return flatten(values);
	    };

	    $.each = function (elements, callback) {
	      var i, key;
	      if (likeArray(elements)) {
	        for (i = 0; i < elements.length; i++) {
	          if (callback.call(elements[i], i, elements[i]) === false) return elements;
	        }
	      } else {
	        for (key in elements) {
	          if (callback.call(elements[key], key, elements[key]) === false) return elements;
	        }
	      }

	      return elements;
	    };

	    $.grep = function (elements, callback) {
	      return _filter.call(elements, callback);
	    };

	    if (window.JSON) $.parseJSON = JSON.parse;

	    // Populate the class2type map
	    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	      class2type["[object " + name + "]"] = name.toLowerCase();
	    });

	    // Define methods that will be available on all
	    // Zepto collections
	    $.fn = {
	      constructor: zepto.Z,
	      length: 0,

	      // Because a collection acts like an array
	      // copy over these useful array functions.
	      forEach: emptyArray.forEach,
	      reduce: emptyArray.reduce,
	      push: emptyArray.push,
	      sort: emptyArray.sort,
	      splice: emptyArray.splice,
	      indexOf: emptyArray.indexOf,
	      concat: function concat() {
	        var i,
	            value,
	            args = [];
	        for (i = 0; i < arguments.length; i++) {
	          value = arguments[i];
	          args[i] = zepto.isZ(value) ? value.toArray() : value;
	        }
	        return _concat.apply(zepto.isZ(this) ? this.toArray() : this, args);
	      },

	      // `map` and `slice` in the jQuery API work differently
	      // from their array counterparts
	      map: function map(fn) {
	        return $($.map(this, function (el, i) {
	          return fn.call(el, i, el);
	        }));
	      },
	      slice: function slice() {
	        return $(_slice.apply(this, arguments));
	      },

	      ready: function ready(callback) {
	        // need to check if document.body exists for IE as that browser reports
	        // document ready when it hasn't yet created the body element
	        if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener('DOMContentLoaded', function () {
	          callback($);
	        }, false);
	        return this;
	      },
	      get: function get(idx) {
	        return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
	      },
	      toArray: function toArray() {
	        return this.get();
	      },
	      size: function size() {
	        return this.length;
	      },
	      remove: function remove() {
	        return this.each(function () {
	          if (this.parentNode != null) this.parentNode.removeChild(this);
	        });
	      },
	      each: function each(callback) {
	        emptyArray.every.call(this, function (el, idx) {
	          return callback.call(el, idx, el) !== false;
	        });
	        return this;
	      },
	      filter: function filter(selector) {
	        if (isFunction(selector)) return this.not(this.not(selector));
	        return $(_filter.call(this, function (element) {
	          return zepto.matches(element, selector);
	        }));
	      },
	      add: function add(selector, context) {
	        return $(uniq(this.concat($(selector, context))));
	      },
	      is: function is(selector) {
	        return this.length > 0 && zepto.matches(this[0], selector);
	      },
	      not: function not(selector) {
	        var nodes = [];
	        if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
	          if (!selector.call(this, idx)) nodes.push(this);
	        });else {
	          var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
	          this.forEach(function (el) {
	            if (excludes.indexOf(el) < 0) nodes.push(el);
	          });
	        }
	        return $(nodes);
	      },
	      has: function has(selector) {
	        return this.filter(function () {
	          return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
	        });
	      },
	      eq: function eq(idx) {
	        return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
	      },
	      first: function first() {
	        var el = this[0];
	        return el && !isObject(el) ? el : $(el);
	      },
	      last: function last() {
	        var el = this[this.length - 1];
	        return el && !isObject(el) ? el : $(el);
	      },
	      find: function find(selector) {
	        var result,
	            $this = this;
	        if (!selector) result = $();else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') result = $(selector).filter(function () {
	          var node = this;
	          return emptyArray.some.call($this, function (parent) {
	            return $.contains(parent, node);
	          });
	        });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
	          return zepto.qsa(this, selector);
	        });
	        return result;
	      },
	      closest: function closest(selector, context) {
	        var nodes = [],
	            collection = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object' && $(selector);
	        this.each(function (_, node) {
	          while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
	            node = node !== context && !isDocument(node) && node.parentNode;
	          }if (node && nodes.indexOf(node) < 0) nodes.push(node);
	        });
	        return $(nodes);
	      },
	      parents: function parents(selector) {
	        var ancestors = [],
	            nodes = this;
	        while (nodes.length > 0) {
	          nodes = $.map(nodes, function (node) {
	            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	              ancestors.push(node);
	              return node;
	            }
	          });
	        }return filtered(ancestors, selector);
	      },
	      parent: function parent(selector) {
	        return filtered(uniq(this.pluck('parentNode')), selector);
	      },
	      children: function children(selector) {
	        return filtered(this.map(function () {
	          return _children(this);
	        }), selector);
	      },
	      contents: function contents() {
	        return this.map(function () {
	          return this.contentDocument || _slice.call(this.childNodes);
	        });
	      },
	      siblings: function siblings(selector) {
	        return filtered(this.map(function (i, el) {
	          return _filter.call(_children(el.parentNode), function (child) {
	            return child !== el;
	          });
	        }), selector);
	      },
	      empty: function empty() {
	        return this.each(function () {
	          this.innerHTML = '';
	        });
	      },
	      // `pluck` is borrowed from Prototype.js
	      pluck: function pluck(property) {
	        return $.map(this, function (el) {
	          return el[property];
	        });
	      },
	      show: function show() {
	        return this.each(function () {
	          this.style.display == "none" && (this.style.display = '');
	          if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
	        });
	      },
	      replaceWith: function replaceWith(newContent) {
	        return this.before(newContent).remove();
	      },
	      wrap: function wrap(structure) {
	        var func = isFunction(structure);
	        if (this[0] && !func) var dom = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1;

	        return this.each(function (index) {
	          $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
	        });
	      },
	      wrapAll: function wrapAll(structure) {
	        if (this[0]) {
	          $(this[0]).before(structure = $(structure));
	          var children;
	          // drill down to the inmost element
	          while ((children = structure.children()).length) {
	            structure = children.first();
	          }$(structure).append(this);
	        }
	        return this;
	      },
	      wrapInner: function wrapInner(structure) {
	        var func = isFunction(structure);
	        return this.each(function (index) {
	          var self = $(this),
	              contents = self.contents(),
	              dom = func ? structure.call(this, index) : structure;
	          contents.length ? contents.wrapAll(dom) : self.append(dom);
	        });
	      },
	      unwrap: function unwrap() {
	        this.parent().each(function () {
	          $(this).replaceWith($(this).children());
	        });
	        return this;
	      },
	      clone: function clone() {
	        return this.map(function () {
	          return this.cloneNode(true);
	        });
	      },
	      hide: function hide() {
	        return this.css("display", "none");
	      },
	      toggle: function toggle(setting) {
	        return this.each(function () {
	          var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
	        });
	      },
	      prev: function prev(selector) {
	        return $(this.pluck('previousElementSibling')).filter(selector || '*');
	      },
	      next: function next(selector) {
	        return $(this.pluck('nextElementSibling')).filter(selector || '*');
	      },
	      html: function html(_html) {
	        return 0 in arguments ? this.each(function (idx) {
	          var originHtml = this.innerHTML;
	          $(this).empty().append(funcArg(this, _html, idx, originHtml));
	        }) : 0 in this ? this[0].innerHTML : null;
	      },
	      text: function text(_text) {
	        return 0 in arguments ? this.each(function (idx) {
	          var newText = funcArg(this, _text, idx, this.textContent);
	          this.textContent = newText == null ? '' : '' + newText;
	        }) : 0 in this ? this.pluck('textContent').join("") : null;
	      },
	      attr: function attr(name, value) {
	        var result;
	        return typeof name == 'string' && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined : this.each(function (idx) {
	          if (this.nodeType !== 1) return;
	          if (isObject(name)) for (key in name) {
	            setAttribute(this, key, name[key]);
	          } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
	        });
	      },
	      removeAttr: function removeAttr(name) {
	        return this.each(function () {
	          this.nodeType === 1 && name.split(' ').forEach(function (attribute) {
	            setAttribute(this, attribute);
	          }, this);
	        });
	      },
	      prop: function prop(name, value) {
	        name = propMap[name] || name;
	        return 1 in arguments ? this.each(function (idx) {
	          this[name] = funcArg(this, value, idx, this[name]);
	        }) : this[0] && this[0][name];
	      },
	      removeProp: function removeProp(name) {
	        name = propMap[name] || name;
	        return this.each(function () {
	          delete this[name];
	        });
	      },
	      data: function data(name, value) {
	        var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();

	        var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);

	        return data !== null ? deserializeValue(data) : undefined;
	      },
	      val: function val(value) {
	        if (0 in arguments) {
	          if (value == null) value = "";
	          return this.each(function (idx) {
	            this.value = funcArg(this, value, idx, this.value);
	          });
	        } else {
	          return this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
	            return this.selected;
	          }).pluck('value') : this[0].value);
	        }
	      },
	      offset: function offset(coordinates) {
	        if (coordinates) return this.each(function (index) {
	          var $this = $(this),
	              coords = funcArg(this, coordinates, index, $this.offset()),
	              parentOffset = $this.offsetParent().offset(),
	              props = {
	            top: coords.top - parentOffset.top,
	            left: coords.left - parentOffset.left
	          };

	          if ($this.css('position') == 'static') props['position'] = 'relative';
	          $this.css(props);
	        });
	        if (!this.length) return null;
	        if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0])) return { top: 0, left: 0 };
	        var obj = this[0].getBoundingClientRect();
	        return {
	          left: obj.left + window.pageXOffset,
	          top: obj.top + window.pageYOffset,
	          width: Math.round(obj.width),
	          height: Math.round(obj.height)
	        };
	      },
	      css: function css(property, value) {
	        if (arguments.length < 2) {
	          var element = this[0];
	          if (typeof property == 'string') {
	            if (!element) return;
	            return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property);
	          } else if (isArray(property)) {
	            if (!element) return;
	            var props = {};
	            var computedStyle = getComputedStyle(element, '');
	            $.each(property, function (_, prop) {
	              props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
	            });
	            return props;
	          }
	        }

	        var css = '';
	        if (type(property) == 'string') {
	          if (!value && value !== 0) this.each(function () {
	            this.style.removeProperty(dasherize(property));
	          });else css = dasherize(property) + ":" + maybeAddPx(property, value);
	        } else {
	          for (key in property) {
	            if (!property[key] && property[key] !== 0) this.each(function () {
	              this.style.removeProperty(dasherize(key));
	            });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
	          }
	        }

	        return this.each(function () {
	          this.style.cssText += ';' + css;
	        });
	      },
	      index: function index(element) {
	        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
	      },
	      hasClass: function hasClass(name) {
	        if (!name) return false;
	        return emptyArray.some.call(this, function (el) {
	          return this.test(className(el));
	        }, classRE(name));
	      },
	      addClass: function addClass(name) {
	        if (!name) return this;
	        return this.each(function (idx) {
	          if (!('className' in this)) return;
	          classList = [];
	          var cls = className(this),
	              newName = funcArg(this, name, idx, cls);
	          newName.split(/\s+/g).forEach(function (klass) {
	            if (!$(this).hasClass(klass)) classList.push(klass);
	          }, this);
	          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
	        });
	      },
	      removeClass: function removeClass(name) {
	        return this.each(function (idx) {
	          if (!('className' in this)) return;
	          if (name === undefined) return className(this, '');
	          classList = className(this);
	          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
	            classList = classList.replace(classRE(klass), " ");
	          });
	          className(this, classList.trim());
	        });
	      },
	      toggleClass: function toggleClass(name, when) {
	        if (!name) return this;
	        return this.each(function (idx) {
	          var $this = $(this),
	              names = funcArg(this, name, idx, className(this));
	          names.split(/\s+/g).forEach(function (klass) {
	            (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
	          });
	        });
	      },
	      scrollTop: function scrollTop(value) {
	        if (!this.length) return;
	        var hasScrollTop = 'scrollTop' in this[0];
	        if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
	        return this.each(hasScrollTop ? function () {
	          this.scrollTop = value;
	        } : function () {
	          this.scrollTo(this.scrollX, value);
	        });
	      },
	      scrollLeft: function scrollLeft(value) {
	        if (!this.length) return;
	        var hasScrollLeft = 'scrollLeft' in this[0];
	        if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
	        return this.each(hasScrollLeft ? function () {
	          this.scrollLeft = value;
	        } : function () {
	          this.scrollTo(value, this.scrollY);
	        });
	      },
	      position: function position() {
	        if (!this.length) return;

	        var elem = this[0],

	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),

	        // Get correct offsets
	        offset = this.offset(),
	            parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

	        // Subtract element margins
	        // note: when an element has margin: auto the offsetLeft and marginLeft
	        // are the same in Safari causing offset.left to incorrectly be 0
	        offset.top -= parseFloat($(elem).css('margin-top')) || 0;
	        offset.left -= parseFloat($(elem).css('margin-left')) || 0;

	        // Add offsetParent borders
	        parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
	        parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

	        // Subtract the two offsets
	        return {
	          top: offset.top - parentOffset.top,
	          left: offset.left - parentOffset.left
	        };
	      },
	      offsetParent: function offsetParent() {
	        return this.map(function () {
	          var parent = this.offsetParent || document.body;
	          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
	            parent = parent.offsetParent;
	          }return parent;
	        });
	      }
	    };

	    // for now
	    $.fn.detach = $.fn.remove

	    // Generate the `width` and `height` functions
	    ;['width', 'height'].forEach(function (dimension) {
	      var dimensionProperty = dimension.replace(/./, function (m) {
	        return m[0].toUpperCase();
	      });

	      $.fn[dimension] = function (value) {
	        var offset,
	            el = this[0];
	        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
	          el = $(this);
	          el.css(dimension, funcArg(this, value, idx, el[dimension]()));
	        });
	      };
	    });

	    function traverseNode(node, fun) {
	      fun(node);
	      for (var i = 0, len = node.childNodes.length; i < len; i++) {
	        traverseNode(node.childNodes[i], fun);
	      }
	    }

	    // Generate the `after`, `prepend`, `before`, `append`,
	    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	    adjacencyOperators.forEach(function (operator, operatorIndex) {
	      var inside = operatorIndex % 2; //=> prepend, append

	      $.fn[operator] = function () {
	        // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	        var argType,
	            nodes = $.map(arguments, function (arg) {
	          var arr = [];
	          argType = type(arg);
	          if (argType == "array") {
	            arg.forEach(function (el) {
	              if (el.nodeType !== undefined) return arr.push(el);else if ($.zepto.isZ(el)) return arr = arr.concat(el.get());
	              arr = arr.concat(zepto.fragment(el));
	            });
	            return arr;
	          }
	          return argType == "object" || arg == null ? arg : zepto.fragment(arg);
	        }),
	            parent,
	            copyByClone = this.length > 1;
	        if (nodes.length < 1) return this;

	        return this.each(function (_, target) {
	          parent = inside ? target : target.parentNode;

	          // convert all methods to a "before" operation
	          target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

	          var parentInDocument = $.contains(document.documentElement, parent);

	          nodes.forEach(function (node) {
	            if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

	            parent.insertBefore(node, target);
	            if (parentInDocument) traverseNode(node, function (el) {
	              if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) {
	                var target = el.ownerDocument ? el.ownerDocument.defaultView : window;
	                target['eval'].call(target, el.innerHTML);
	              }
	            });
	          });
	        });
	      };

	      // after    => insertAfter
	      // prepend  => prependTo
	      // before   => insertBefore
	      // append   => appendTo
	      $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
	        $(html)[operator](this);
	        return this;
	      };
	    });

	    zepto.Z.prototype = Z.prototype = $.fn;

	    // Export internal API functions in the `$.zepto` namespace
	    zepto.uniq = uniq;
	    zepto.deserializeValue = deserializeValue;
	    $.zepto = zepto;

	    return $;
	  }();

	  window.Zepto = Zepto;
	  window.$ === undefined && (window.$ = Zepto);(function ($) {
	    var _zid = 1,
	        undefined,
	        slice = Array.prototype.slice,
	        isFunction = $.isFunction,
	        isString = function isString(obj) {
	      return typeof obj == 'string';
	    },
	        handlers = {},
	        specialEvents = {},
	        focusinSupported = 'onfocusin' in window,
	        focus = { focus: 'focusin', blur: 'focusout' },
	        hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

	    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

	    function zid(element) {
	      return element._zid || (element._zid = _zid++);
	    }
	    function findHandlers(element, event, fn, selector) {
	      event = parse(event);
	      if (event.ns) var matcher = matcherFor(event.ns);
	      return (handlers[zid(element)] || []).filter(function (handler) {
	        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	      });
	    }
	    function parse(event) {
	      var parts = ('' + event).split('.');
	      return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
	    }
	    function matcherFor(ns) {
	      return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
	    }

	    function eventCapture(handler, captureSetting) {
	      return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
	    }

	    function realEvent(type) {
	      return hover[type] || focusinSupported && focus[type] || type;
	    }

	    function add(element, events, fn, data, selector, delegator, capture) {
	      var id = zid(element),
	          set = handlers[id] || (handlers[id] = []);
	      events.split(/\s/).forEach(function (event) {
	        if (event == 'ready') return $(document).ready(fn);
	        var handler = parse(event);
	        handler.fn = fn;
	        handler.sel = selector;
	        // emulate mouseenter, mouseleave
	        if (handler.e in hover) fn = function fn(e) {
	          var related = e.relatedTarget;
	          if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
	        };
	        handler.del = delegator;
	        var callback = delegator || fn;
	        handler.proxy = function (e) {
	          e = compatible(e);
	          if (e.isImmediatePropagationStopped()) return;
	          e.data = data;
	          var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
	          if (result === false) e.preventDefault(), e.stopPropagation();
	          return result;
	        };
	        handler.i = set.length;
	        set.push(handler);
	        if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	      });
	    }
	    function remove(element, events, fn, selector, capture) {
	      var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
	        findHandlers(element, event, fn, selector).forEach(function (handler) {
	          delete handlers[id][handler.i];
	          if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	        });
	      });
	    }

	    $.event = { add: add, remove: remove };

	    $.proxy = function (fn, context) {
	      var args = 2 in arguments && slice.call(arguments, 2);
	      if (isFunction(fn)) {
	        var proxyFn = function proxyFn() {
	          return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
	        };
	        proxyFn._zid = zid(fn);
	        return proxyFn;
	      } else if (isString(context)) {
	        if (args) {
	          args.unshift(fn[context], fn);
	          return $.proxy.apply(null, args);
	        } else {
	          return $.proxy(fn[context], fn);
	        }
	      } else {
	        throw new TypeError("expected function");
	      }
	    };

	    $.fn.bind = function (event, data, callback) {
	      return this.on(event, data, callback);
	    };
	    $.fn.unbind = function (event, callback) {
	      return this.off(event, callback);
	    };
	    $.fn.one = function (event, selector, data, callback) {
	      return this.on(event, selector, data, callback, 1);
	    };

	    var returnTrue = function returnTrue() {
	      return true;
	    },
	        returnFalse = function returnFalse() {
	      return false;
	    },
	        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
	        eventMethods = {
	      preventDefault: 'isDefaultPrevented',
	      stopImmediatePropagation: 'isImmediatePropagationStopped',
	      stopPropagation: 'isPropagationStopped'
	    };

	    function compatible(event, source) {
	      if (source || !event.isDefaultPrevented) {
	        source || (source = event);

	        $.each(eventMethods, function (name, predicate) {
	          var sourceMethod = source[name];
	          event[name] = function () {
	            this[predicate] = returnTrue;
	            return sourceMethod && sourceMethod.apply(source, arguments);
	          };
	          event[predicate] = returnFalse;
	        });

	        event.timeStamp || (event.timeStamp = Date.now());

	        if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
	      }
	      return event;
	    }

	    function createProxy(event) {
	      var key,
	          proxy = { originalEvent: event };
	      for (key in event) {
	        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
	      }return compatible(proxy, event);
	    }

	    $.fn.delegate = function (selector, event, callback) {
	      return this.on(event, selector, callback);
	    };
	    $.fn.undelegate = function (selector, event, callback) {
	      return this.off(event, selector, callback);
	    };

	    $.fn.live = function (event, callback) {
	      $(document.body).delegate(this.selector, event, callback);
	      return this;
	    };
	    $.fn.die = function (event, callback) {
	      $(document.body).undelegate(this.selector, event, callback);
	      return this;
	    };

	    $.fn.on = function (event, selector, data, callback, one) {
	      var autoRemove,
	          delegator,
	          $this = this;
	      if (event && !isString(event)) {
	        $.each(event, function (type, fn) {
	          $this.on(type, selector, data, fn, one);
	        });
	        return $this;
	      }

	      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
	      if (callback === undefined || data === false) callback = data, data = undefined;

	      if (callback === false) callback = returnFalse;

	      return $this.each(function (_, element) {
	        if (one) autoRemove = function autoRemove(e) {
	          remove(element, e.type, callback);
	          return callback.apply(this, arguments);
	        };

	        if (selector) delegator = function delegator(e) {
	          var evt,
	              match = $(e.target).closest(selector, element).get(0);
	          if (match && match !== element) {
	            evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
	            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
	          }
	        };

	        add(element, event, callback, data, selector, delegator || autoRemove);
	      });
	    };
	    $.fn.off = function (event, selector, callback) {
	      var $this = this;
	      if (event && !isString(event)) {
	        $.each(event, function (type, fn) {
	          $this.off(type, selector, fn);
	        });
	        return $this;
	      }

	      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

	      if (callback === false) callback = returnFalse;

	      return $this.each(function () {
	        remove(this, event, callback, selector);
	      });
	    };

	    $.fn.trigger = function (event, args) {
	      event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
	      event._args = args;
	      return this.each(function () {
	        // handle focus(), blur() by calling them directly
	        if (event.type in focus && typeof this[event.type] == "function") this[event.type]();
	        // items in the collection might not be DOM elements
	        else if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
	      });
	    };

	    // triggers event handlers on current element just as if an event occurred,
	    // doesn't trigger an actual event, doesn't bubble
	    $.fn.triggerHandler = function (event, args) {
	      var e, result;
	      this.each(function (i, element) {
	        e = createProxy(isString(event) ? $.Event(event) : event);
	        e._args = args;
	        e.target = element;
	        $.each(findHandlers(element, event.type || event), function (i, handler) {
	          result = handler.proxy(e);
	          if (e.isImmediatePropagationStopped()) return false;
	        });
	      });
	      return result;
	    }

	    // shortcut methods for `.bind(event, fn)` for each event type
	    ;('focusin focusout focus blur load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
	      $.fn[event] = function (callback) {
	        return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
	      };
	    });

	    $.Event = function (type, props) {
	      if (!isString(type)) props = type, type = props.type;
	      var event = document.createEvent(specialEvents[type] || 'Events'),
	          bubbles = true;
	      if (props) for (var name in props) {
	        name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
	      }event.initEvent(type, bubbles, true);
	      return compatible(event);
	    };
	  })(Zepto);(function ($) {
	    var jsonpID = +new Date(),
	        document = window.document,
	        key,
	        name,
	        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	        scriptTypeRE = /^(?:text|application)\/javascript/i,
	        xmlTypeRE = /^(?:text|application)\/xml/i,
	        jsonType = 'application/json',
	        htmlType = 'text/html',
	        blankRE = /^\s*$/,
	        originAnchor = document.createElement('a');

	    originAnchor.href = window.location.href;

	    // trigger a custom event and return false if it was cancelled
	    function triggerAndReturn(context, eventName, data) {
	      var event = $.Event(eventName);
	      $(context).trigger(event, data);
	      return !event.isDefaultPrevented();
	    }

	    // trigger an Ajax "global" event
	    function triggerGlobal(settings, context, eventName, data) {
	      if (settings.global) return triggerAndReturn(context || document, eventName, data);
	    }

	    // Number of active Ajax requests
	    $.active = 0;

	    function ajaxStart(settings) {
	      if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
	    }
	    function ajaxStop(settings) {
	      if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
	    }

	    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	    function ajaxBeforeSend(xhr, settings) {
	      var context = settings.context;
	      if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

	      triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
	    }
	    function ajaxSuccess(data, xhr, settings, deferred) {
	      var context = settings.context,
	          status = 'success';
	      settings.success.call(context, data, status, xhr);
	      if (deferred) deferred.resolveWith(context, [data, status, xhr]);
	      triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
	      ajaxComplete(status, xhr, settings);
	    }
	    // type: "timeout", "error", "abort", "parsererror"
	    function ajaxError(error, type, xhr, settings, deferred) {
	      var context = settings.context;
	      settings.error.call(context, xhr, type, error);
	      if (deferred) deferred.rejectWith(context, [xhr, type, error]);
	      triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
	      ajaxComplete(type, xhr, settings);
	    }
	    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	    function ajaxComplete(status, xhr, settings) {
	      var context = settings.context;
	      settings.complete.call(context, xhr, status);
	      triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
	      ajaxStop(settings);
	    }

	    function ajaxDataFilter(data, type, settings) {
	      if (settings.dataFilter == empty) return data;
	      var context = settings.context;
	      return settings.dataFilter.call(context, data, type);
	    }

	    // Empty function, used as default callback
	    function empty() {}

	    $.ajaxJSONP = function (options, deferred) {
	      if (!('type' in options)) return $.ajax(options);

	      var _callbackName = options.jsonpCallback,
	          callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'Zepto' + jsonpID++,
	          script = document.createElement('script'),
	          originalCallback = window[callbackName],
	          responseData,
	          abort = function abort(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort');
	      },
	          xhr = { abort: abort },
	          abortTimeout;

	      if (deferred) deferred.promise(xhr);

	      $(script).on('load error', function (e, errorType) {
	        clearTimeout(abortTimeout);
	        $(script).off().remove();

	        if (e.type == 'error' || !responseData) {
	          ajaxError(null, errorType || 'error', xhr, options, deferred);
	        } else {
	          ajaxSuccess(responseData[0], xhr, options, deferred);
	        }

	        window[callbackName] = originalCallback;
	        if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

	        originalCallback = responseData = undefined;
	      });

	      if (ajaxBeforeSend(xhr, options) === false) {
	        abort('abort');
	        return xhr;
	      }

	      window[callbackName] = function () {
	        responseData = arguments;
	      };

	      script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
	      document.head.appendChild(script);

	      if (options.timeout > 0) abortTimeout = setTimeout(function () {
	        abort('timeout');
	      }, options.timeout);

	      return xhr;
	    };

	    $.ajaxSettings = {
	      // Default type of request
	      type: 'GET',
	      // Callback that is executed before request
	      beforeSend: empty,
	      // Callback that is executed if the request succeeds
	      success: empty,
	      // Callback that is executed the the server drops error
	      error: empty,
	      // Callback that is executed on request complete (both: error and success)
	      complete: empty,
	      // The context for the callbacks
	      context: null,
	      // Whether to trigger "global" Ajax events
	      global: true,
	      // Transport
	      xhr: function xhr() {
	        return new window.XMLHttpRequest();
	      },
	      // MIME types mapping
	      // IIS returns Javascript as "application/x-javascript"
	      accepts: {
	        script: 'text/javascript, application/javascript, application/x-javascript',
	        json: jsonType,
	        xml: 'application/xml, text/xml',
	        html: htmlType,
	        text: 'text/plain'
	      },
	      // Whether the request is to another domain
	      crossDomain: false,
	      // Default timeout
	      timeout: 0,
	      // Whether data should be serialized to string
	      processData: true,
	      // Whether the browser should be allowed to cache GET responses
	      cache: true,
	      //Used to handle the raw response data of XMLHttpRequest.
	      //This is a pre-filtering function to sanitize the response.
	      //The sanitized response should be returned
	      dataFilter: empty
	    };

	    function mimeToDataType(mime) {
	      if (mime) mime = mime.split(';', 2)[0];
	      return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
	    }

	    function appendQuery(url, query) {
	      if (query == '') return url;
	      return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	    }

	    // serialize payload and append it to the URL for GET requests
	    function serializeData(options) {
	      if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
	      if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType)) options.url = appendQuery(options.url, options.data), options.data = undefined;
	    }

	    $.ajax = function (options) {
	      var settings = $.extend({}, options || {}),
	          deferred = $.Deferred && $.Deferred(),
	          urlAnchor,
	          hashIndex;
	      for (key in $.ajaxSettings) {
	        if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
	      }ajaxStart(settings);

	      if (!settings.crossDomain) {
	        urlAnchor = document.createElement('a');
	        urlAnchor.href = settings.url;
	        // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
	        urlAnchor.href = urlAnchor.href;
	        settings.crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
	      }

	      if (!settings.url) settings.url = window.location.toString();
	      if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex);
	      serializeData(settings);

	      var dataType = settings.dataType,
	          hasPlaceholder = /\?.+=\?/.test(settings.url);
	      if (hasPlaceholder) dataType = 'jsonp';

	      if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) settings.url = appendQuery(settings.url, '_=' + Date.now());

	      if ('jsonp' == dataType) {
	        if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
	        return $.ajaxJSONP(settings, deferred);
	      }

	      var mime = settings.accepts[dataType],
	          headers = {},
	          setHeader = function setHeader(name, value) {
	        headers[name.toLowerCase()] = [name, value];
	      },
	          protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	          xhr = settings.xhr(),
	          nativeSetHeader = xhr.setRequestHeader,
	          abortTimeout;

	      if (deferred) deferred.promise(xhr);

	      if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
	      setHeader('Accept', mime || '*/*');
	      if (mime = settings.mimeType || mime) {
	        if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
	        xhr.overrideMimeType && xhr.overrideMimeType(mime);
	      }
	      if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

	      if (settings.headers) for (name in settings.headers) {
	        setHeader(name, settings.headers[name]);
	      }xhr.setRequestHeader = setHeader;

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	          xhr.onreadystatechange = empty;
	          clearTimeout(abortTimeout);
	          var result,
	              error = false;
	          if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
	            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));

	            if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob') result = xhr.response;else {
	              result = xhr.responseText;

	              try {
	                // http://perfectionkills.com/global-eval-what-are-the-options/
	                // sanitize response accordingly if data filter callback provided
	                result = ajaxDataFilter(result, dataType, settings);
	                if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
	              } catch (e) {
	                error = e;
	              }

	              if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred);
	            }

	            ajaxSuccess(result, xhr, settings, deferred);
	          } else {
	            ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
	          }
	        }
	      };

	      if (ajaxBeforeSend(xhr, settings) === false) {
	        xhr.abort();
	        ajaxError(null, 'abort', xhr, settings, deferred);
	        return xhr;
	      }

	      var async = 'async' in settings ? settings.async : true;
	      xhr.open(settings.type, settings.url, async, settings.username, settings.password);

	      if (settings.xhrFields) for (name in settings.xhrFields) {
	        xhr[name] = settings.xhrFields[name];
	      }for (name in headers) {
	        nativeSetHeader.apply(xhr, headers[name]);
	      }if (settings.timeout > 0) abortTimeout = setTimeout(function () {
	        xhr.onreadystatechange = empty;
	        xhr.abort();
	        ajaxError(null, 'timeout', xhr, settings, deferred);
	      }, settings.timeout);

	      // avoid sending empty string (#319)
	      xhr.send(settings.data ? settings.data : null);
	      return xhr;
	    };

	    // handle optional data/success arguments
	    function parseArguments(url, data, success, dataType) {
	      if ($.isFunction(data)) dataType = success, success = data, data = undefined;
	      if (!$.isFunction(success)) dataType = success, success = undefined;
	      return {
	        url: url,
	        data: data,
	        success: success,
	        dataType: dataType
	      };
	    }

	    $.get = function () /* url, data, success, dataType */{
	      return $.ajax(parseArguments.apply(null, arguments));
	    };

	    $.post = function () /* url, data, success, dataType */{
	      var options = parseArguments.apply(null, arguments);
	      options.type = 'POST';
	      return $.ajax(options);
	    };

	    $.getJSON = function () /* url, data, success */{
	      var options = parseArguments.apply(null, arguments);
	      options.dataType = 'json';
	      return $.ajax(options);
	    };

	    $.fn.load = function (url, data, success) {
	      if (!this.length) return this;
	      var self = this,
	          parts = url.split(/\s/),
	          selector,
	          options = parseArguments(url, data, success),
	          callback = options.success;
	      if (parts.length > 1) options.url = parts[0], selector = parts[1];
	      options.success = function (response) {
	        self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
	        callback && callback.apply(self, arguments);
	      };
	      $.ajax(options);
	      return this;
	    };

	    var escape = encodeURIComponent;

	    function serialize(params, obj, traditional, scope) {
	      var type,
	          array = $.isArray(obj),
	          hash = $.isPlainObject(obj);
	      $.each(obj, function (key, value) {
	        type = $.type(value);
	        if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
	        // handle data in serializeArray() format
	        if (!scope && array) params.add(value.name, value.value);
	        // recurse into nested objects
	        else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
	      });
	    }

	    $.param = function (obj, traditional) {
	      var params = [];
	      params.add = function (key, value) {
	        if ($.isFunction(value)) value = value();
	        if (value == null) value = "";
	        this.push(escape(key) + '=' + escape(value));
	      };
	      serialize(params, obj, traditional);
	      return params.join('&').replace(/%20/g, '+');
	    };
	  })(Zepto);(function ($) {
	    $.fn.serializeArray = function () {
	      var name,
	          type,
	          result = [],
	          add = function add(value) {
	        if (value.forEach) return value.forEach(add);
	        result.push({ name: name, value: value });
	      };
	      if (this[0]) $.each(this[0].elements, function (_, field) {
	        type = field.type, name = field.name;
	        if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && (type != 'radio' && type != 'checkbox' || field.checked)) add($(field).val());
	      });
	      return result;
	    };

	    $.fn.serialize = function () {
	      var result = [];
	      this.serializeArray().forEach(function (elm) {
	        result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
	      });
	      return result.join('&');
	    };

	    $.fn.submit = function (callback) {
	      if (0 in arguments) this.bind('submit', callback);else if (this.length) {
	        var event = $.Event('submit');
	        this.eq(0).trigger(event);
	        if (!event.isDefaultPrevented()) this.get(0).submit();
	      }
	      return this;
	    };
	  })(Zepto);(function () {
	    // getComputedStyle shouldn't freak out when called
	    // without a valid element as argument
	    try {
	      getComputedStyle(undefined);
	    } catch (e) {
	      var nativeGetComputedStyle = getComputedStyle;
	      window.getComputedStyle = function (element, pseudoElement) {
	        try {
	          return nativeGetComputedStyle(element, pseudoElement);
	        } catch (e) {
	          return null;
	        }
	      };
	    }
	  })();
	  return Zepto;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = mTpl;
	var cache = {};

	function mTpl(str, data, startSelector, endSelector, isCache) {
	    var t = this,
	        d = data,
	        el = document.getElementById(str),
	        tpl = el ? el.innerHTML : str,
	        isCache = isCache != undefined ? isCache : true,
	        valueArr = [],
	        fn = function fn() {},
	        htmlEncode = function htmlEncode(s, n) {
	        if (!n) {
	            s = s.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	        }

	        return s;
	    },
	        compileFn = function compileFn(args, strFormatTpl) {
	        return new Function(propArr, "var mTpl_htmlEncode=" + htmlEncode.toString() + ";\n var s='';\n s+='" + strFormatTpl + "';\n return s");
	    },
	        resetChar = function resetChar(s) {
	        return 'mTpl_' + s + '_mTpl';
	    },
	        recoverChar = function recoverChar(s) {
	        return s.replace(new RegExp(r, 'g'), '\r').replace(new RegExp(n, 'g'), '\n').replace(/mTpl_comment\d+;/g, function (l) {
	            var i = l.slice(12, l.length - 1);
	            return mTpl_comment[i];
	        });
	    },
	        mTpl_comment = {
	        length: 0
	    },
	        l = resetChar('L', tpl),
	        r = resetChar('R', tpl),
	        n = resetChar('N', tpl);

	    if (isCache && cache[str]) {
	        for (var i = 0, list = cache[str].propList, len = list.length; i < len; i++) {
	            valueArr.push(d[list[i]]);
	        }
	        fn = cache[str].parsefn;
	    } else {
	        var a = startSelector,
	            b = endSelector;
	        if (!tpl) {
	            return '';
	        }
	        if (!a || !b) {
	            a = '<' + '%';
	            b = '%' + '>';
	        }
	        if (!(tpl.indexOf(a) > -1 && tpl.indexOf(b) > -1)) {
	            return tpl;
	        }

	        var formatTpl = function formatTpl(str, isError) {
	            var N = isError ? '\n' : '';
	            r = isError ? '' : r;
	            n = isError ? '' : n;

	            var eb = function (s) {
	                return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	            }(b),
	                reg = new RegExp(l + '(?:(?!' + eb + ')[\\s\\S])*' + eb + '|(\'+)', 'g');

	            return tpl.replace(/<!--(?:(?!-->)[\s\S])*-->/g, function (l) {
	                var i = mTpl_comment.length++;
	                mTpl_comment[i] = l;
	                return 'mTpl_comment' + i + ';';
	            }).split('\\').join('\\\\').replace(/[\r]/g, r).replace(/[\n]/g, n).split(a).join(l).replace(reg, function (l, $1) {
	                return $1 ? new Array($1.length + 1).join('\r') : l;
	            }).replace(new RegExp(l + '=(.*?)' + b, 'g'), "';" + N + " s+=mTpl_htmlEncode(String($1));" + N + " s+='").replace(new RegExp(l + '\!=(.*?)' + b, 'g'), "';" + N + " s+=mTpl_htmlEncode(String($1),true);" + N + " s+='").split(l).join("';" + N).split(b).join(N + ' s+=\'').split('\r').join('\\\'');
	        };

	        var p,
	            propArr = [];
	        for (p in d) {
	            propArr.push(p);
	            valueArr.push(d[p]);
	        }

	        fn = compileFn(propArr, formatTpl(str));
	        isCache && (cache[str] = {
	            parsefn: fn,
	            propList: propArr
	        });
	    }

	    var s;

	    try {
	        s = fn.apply(t, valueArr);
	    } catch (e) {
	        fn = compileFn(propArr, formatTpl(str, true));
	        s = fn.apply(t, valueArr);
	    }

	    return recoverChar(s);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _zepto = __webpack_require__(1);

	var _zepto2 = _interopRequireDefault(_zepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* Bind an event to an object instead of a DOM Node
	```
	$.bind(this,'event',function(){});
	```
	* @param {Object} object
	* @param {String} event name
	* @param {Function} function to execute
	* @title $.bind(object,event,function);
	*/
	_zepto2.default.bind = function (obj, ev, f) {
	    if (!obj.__events) obj.__events = {};
	    if (!_zepto2.default.isArray(ev)) ev = [ev];
	    for (var i = 0; i < ev.length; i++) {
	        if (!obj.__events[ev[i]]) obj.__events[ev[i]] = [];
	        obj.__events[ev[i]].push(f);
	    }
	};

	/**
	* Trigger an event to an object instead of a DOM Node
	```
	$.trigger(this,'event',arguments);
	```
	* @param {Object} object
	* @param {String} event name
	* @param {Array} arguments
	* @title $.trigger(object,event,argments);
	*/
	_zepto2.default.trigger = function (obj, ev, args) {
	    var ret = true;
	    if (!obj.__events) return ret;
	    if (!_zepto2.default.isArray(ev)) ev = [ev];
	    if (!_zepto2.default.isArray(args)) args = [];
	    for (var i = 0; i < ev.length; i++) {
	        if (obj.__events[ev[i]]) {
	            var evts = obj.__events[ev[i]];
	            for (var j = 0; j < evts.length; j++) {
	                if (_zepto2.default.isFunction(evts[j]) && evts[j].apply(obj, args) === false) ret = false;
	            }
	        }
	    }
	    return ret;
	};
	/**
	* Unbind an event to an object instead of a DOM Node
	```
	$.unbind(this,'event',function(){});
	```
	* @param {Object} object
	* @param {String} event name
	* @param {Function} function to execute
	* @title $.unbind(object,event,function);
	*/
	_zepto2.default.unbind = function (obj, ev, f) {
	    if (!obj.__events) return ret;
	    if (!_zepto2.default.isArray(ev)) ev = [ev];
	    for (var i = 0; i < ev.length; i++) {
	        if (obj.__events[ev[i]]) {
	            var evts = obj.__events[ev[i]];
	            for (var j = 0; j < evts.length; j++) {
	                if (f == undefined) delete evts[j];
	                if (evts[j] == f) {
	                    evts.splice(j, 1);
	                    break;
	                }
	            }
	        }
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	module.exports = "<% var curInfo = data[0]; %>\n<div class=\"audio-player\">\n    <div>\n        <div class=\"cover\">\n            <img class=\"cover\" src=\"<%= curInfo.cover %>\" />\n            <i class=\"iconfont cover-play-btn icon-<%= playIcon %>\"></i>\n        </div>\n\n        <div class=\"info\">\n            <h3><%= curInfo.title %><span><%= curInfo.author %></span></h3>\n\n            <ul class=\"play-control\">\n                <li class=\"time play-time\">00:00</li>\n                <li class=\"play-bar\">\n                    <div class=\"loaded\"></div>\n                    <div class=\"played\">\n                        <div class=\"pointer\"></div>\n                    </div>\n                </li>\n                <li class=\"time total-time\">00:00</li>\n            </ul>\n\n            <ul class=\"play-act\">\n                <li class=\"iconfont act-side icon-loop\"></li>\n                <li class=\"iconfont act-mid icon-presong\"></li>\n                <li class=\"iconfont play-btn icon-<%= playIcon %>\"></li>\n                <li class=\"iconfont act-mid icon-nextsong\"></li>\n                <li class=\"iconfont act-side icon-list\"></li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"play-list\">\n        <ul>\n            <% for (var i = 0; i < data.length; i++) { %>\n                <% var idx = i + 1; %>\n                <% var item = data[i]; %>\n                <li data-idx=<%= i %> <% if (i === 0) { %>class=\"cur\"<% } %>>\n                    <span class=\"idx\"><%= idx %></span>\n                    <span class=\"title\"><%= item.title %></span>\n                    <span class=\"author\"><%= item.author %></span>\n                </li>\n            <% } %>\n        </ul>\n    </div>\n</div>";

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<li data-idx=\"<%= idx %>\">\n    <span class=\"idx\"><%= idx %></span>\n    <span class=\"title\"><%= title %></span>\n    <span class=\"author\"><%= author %></span>\n</li>";

/***/ }
/******/ ])
});
;