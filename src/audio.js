/**
 * html5 audio player 音频播放器组件
 * 可调用封装好的api，包装各种皮肤的播放器
 * 提供（播放进度条，拖拽定位/快进/快退播放，连播/播放列表/循环播放，上下曲）
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
 * @method toggleLoop 切换是否循环播放
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

import $ from './lib/zepto.js';
import render from './lib/render.js';
import customEvent from './lib/customEvent.js'

import './audio.less';
import tpl from './audio.html';

const defaultConfig = {
    id: 'player-wrap',      //播放器容器id
    preload: 'metadata',    //预加载方式
    isLoop: true,           //是否循环播放
    isAutoplay: true,       //是否自动播放
    tpl: tpl,               //音频播放器模板

    /**
     * data {array} 音频数据，数组的每一项为对象
     *  title: 歌名
     *  author: 作者
     *  src: 音频地址
     *  cover: 音频封面图
     */
    data: []
};

class AudioPlayer {
    constructor(config) {
        this.config = this.extend({}, defaultConfig, config || {});
        this.init();
    }

    init() {
        this._createAudio();
        this._createPlayer();
        this._cache();
        this._setPlaybarPos();
        this._setPlayListHeight();
        this._initEvent();
    }

    _createAudio() {
        let me = this,
            config = this.config;

        this.audio = document.createElement('audio');
        this.audio.setAttribute('src', config.data[0].src);
        this.audio.setAttribute('preload', config.preload);

        //如果只有一首，通过loop属性设置是否循环播放
        if (config.data.length < 2 && config.isLoop) {
            this.audio.setAttribute('loop', 'loop');
        }

        if (config.isAutoplay) {
            this.play();
        }

        document.body.appendChild(this.audio);
    }

    _createPlayer() {
        let me = this,
            config = this.config;

        this.el = $(`#${config.id}`);
        this.el.html(render(config.tpl, {
            data: config.data
        }));
    }

    _cache() {
        let me = this,
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

        //init status
        this.playStatus = config.isAutoplay ? 'play' : 'pause';
        this.playListStatus = 'show';
        this.playIdx = 0;
        this.totalNum = config.data.length;
        this.isLoop = config.isLoop;

        //event callback cache
        this.tempMovePlaybar = $.proxy(this._movePlaybar, this);
        this.tempMouseupCb = $.proxy(this._mouseupCb, this);
    }

    //设置及缓存播放进度条位置信息，方便计算百分比
    _setPlaybarPos() {
        let playBarPos = this.playBar[0].getBoundingClientRect();
        this.playBarClientX = playBarPos.left;
        this.playBarWidth = playBarPos.width;
    }

    //初始化及缓存播放列表高度，做动画需要
    _setPlayListHeight() {
        let playListWrap = this.playListWrap;
        this.playListHeight = playListWrap.height();
        playListWrap.css('height', this.playListHeight);
    }

    _initEvent() {
        let me = this,
            config = this.config,
            playPointer = this.playPointer,
            audio = this.audio;

        audio.addEventListener('durationchange', (event) => {
            me.totalTime.html(me.formatSeconds(audio.duration));
        }, false);

        audio.addEventListener('progress', (event) => {
            let loadedPercent = audio.buffered.length ? 
                audio.buffered.end(audio.buffered.length - 1) / audio.duration : 0;

            me.loadedBar.css('width', loadedPercent * 100 + '%');

            $.trigger(this, 'playing', [{
                song: config.data[this.playIdx],
                loadedPercent: loadedPercent
            }]);
        }, false);

        audio.addEventListener('ended', (event) => {
            if (this.isLoop) {
                this.nextPlay();
            }

            $.trigger(this, 'ended', [{
                song: config.data[this.playIdx]
            }]);
        }, false);

        $(window).on('resize', $.proxy(this._setPlaybarPos, this));
        $(window).on('orientationchange', $.proxy(this._setPlaybarPos, this));

        this.el.on('click', '.play-btn, .cover-play-btn', $.proxy(this.togglePlay, this));
        this.playBar.on('click', $.proxy(this.assignPlay, this));
        this.loopBtn.on('click', $.proxy(this.toggleLoop, this));

        playPointer.on('touchmove', $.proxy(this._movePlaybar, this));
        playPointer.on('touchend', $.proxy(this.assignPlay, this));
        playPointer.on('mousedown', $.proxy(this._mousedownCb, this));

        this.playListBtn.on('click', $.proxy(this._togglePlayList, this));
        this.playListWrap.on('click', 'li', $.proxy(this.switchPlay, this));

        this.preBtn.on('click', $.proxy(this.prePlay, this));
        this.nextBtn.on('click', $.proxy(this.nextPlay, this));
    }

    prePlay() {
        let idx = this.playIdx - 1;
        if (idx < 0) {
            idx = this.totalNum - 1;
        }

        this.switchPlay(idx);
    }

    nextPlay() {
        let idx = this.playIdx + 1;
        if (idx > this.totalNum - 1) {
            idx = 0;
        }

        this.switchPlay(idx);
    }

    toggleLoop() {
        if (this.isLoop) {
            this.isLoop = false;
            this.loopBtn.addClass('gray');

            //如果只有一首，操作loop属性
            if (this.totalNum < 2) {
                this.audio.removeAttribute('loop');
            }
        } else {
            this.isLoop = true;
            this.loopBtn.removeClass('gray');

            if (this.totalNum < 2) {
                this.audio.setAttribute('loop');
            }
        }
    }

    /**
     * 歌曲播放切换
     * event {event object | idx}
     * 接收参数有两种方式
     *  一种通过事件event找到需要播放的idx
     *  直接传入需要播放的idx
     * idx 从0开始
     */
    switchPlay(event) {
        let me = this,
            config = this.config,
            playListItems = this.playListItems,
            idx = event;

        if (typeof event === 'object') {
            idx = $(event.currentTarget).data('idx')
        }

        if (this.playIdx === idx) return;

        let songData = config.data[idx];
        playListItems.removeClass('cur');
        $(playListItems.get(idx)).addClass('cur');

        this.pause();
        this.audio.setAttribute('src', songData.src);
        this.playIdx = idx;
        this.play();

        this.cover.attr('src', songData.cover);
        this.title.html(`${songData.title}<span>${songData.author}</span>`);
    }

    _togglePlayList(event) {
        let me = this,
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

    _mousedownCb() {
        let me = this;
        let playPointer = this.playPointer;
        playPointer.on('mousemove', this.tempMovePlaybar);
        playPointer.on('mouseup', this.tempMouseupCb);
    }

    _mouseupCb(event) {
        let me = this;
        let playPointer = this.playPointer;

        playPointer.unbind('mousemove', this.tempMovePlaybar);
        playPointer.unbind('mouseup', this.tempMouseupCb);

        this.assignPlay(event);
    }

    _movePlaybar(event) {
        event.preventDefault();
        event.stopPropagation();

        this.clearPlayTimer();

        let pointerClientX = event.clientX || event.touches[0].clientX;
        let curPercent = Math.min((pointerClientX - this.playBarClientX) / this.playBarWidth, 1);

        this.playedBar.css('width', curPercent * 100 + '%');
        this.playTime.html(this.formatSeconds(this.audio.duration * curPercent));
    }

    assignPlay(event) {
        event.preventDefault();
        event.stopPropagation();

        let audio = this.audio;

        //分点击事件和touchend事件，获取坐标的方式不一样
        let pointerClientX = event.clientX || event.changedTouches[0].clientX;
        let curPercent = (pointerClientX - this.playBarClientX) / this.playBarWidth;

        //指定位置播放，立即更新播放指示点
        //已播放时间及已播放进度条通过playTimer自动更新
        audio.currentTime = audio.duration * curPercent;
        this.playedBar.css('width', curPercent * 100 + '%');

        //如果是通过拖拽播放，需要重新开启playtimer
        if (!this.playTimer) {
            this.startPlayTimer();
        }
    }

    play() {
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

        $.trigger(this, 'play', [{
            song: config.data[this.playIdx]
        }]);
    }

    pause() {
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

        $.trigger(this, 'pause', [{
            songInfo: config.data[this.playIdx]
        }]);
    }

    startPlayTimer() {
        let audio = this.audio;

        this.playTimer = setInterval(() => {
            let playedPercent = audio.currentTime / audio.duration;
            this.playedBar.css('width', playedPercent * 100 + '%');
            this.playTime.html(this.formatSeconds(audio.currentTime));
        }, 500);
    }

    clearPlayTimer() {
        if (this.playTimer) {
            clearInterval(this.playTimer);
            this.playTimer = null;
        }
    }

    togglePlay(event) {
        if (this.playStatus === 'play') {
            this.pause();
        } else {
            this.play();
        }
    }

    formatSeconds(seconds) {
        let minute = parseInt(seconds / 60, 10);
        let second = parseInt(seconds - minute * 60, 10);
        let actNum = (num) => {
            let rst = '';
            if (num < 1) {
                rst = '00';
            } else if (num >= 1 && num < 10) {
                rst = `0${num}`;
            } else {
                rst = num;
            }

            return rst;
        }

        minute = actNum(minute);
        second = actNum(second);

        return `${minute}:${second}`;
    }

    extend(object) {
        let args = Array.prototype.slice.call(arguments, 1);

        for (let i = 0, source; source = args[i]; i++) {
            if (!source) continue;
            for (let property in source) {
                object[property] = source[property];
            }
        }

        return object;
    }
}

export {AudioPlayer};