/**
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

import $ from './lib/zepto.js';
import render from './lib/render.js';
import customEvent from './lib/customEvent.js'

import './audio.less';
import tpl from './audio.html';
import listTpl from './list.html';

const defaultConfig = {
    id: 'player-wrap',      //播放器容器id
    isAutoplay: true,       //是否自动播放
    tpl: tpl,               //音频播放器模板

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

class AudioPlayer {
    constructor(config) {
        this.config = $.extend({}, defaultConfig, config || {});
        this.init();
    }

    init() {
        this._initStatus();
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
        this.audio.setAttribute('src', this.data[0].src);
        this.audio.setAttribute('preload', 'metadata');

        if (config.isAutoplay) {
            this.play();
        }

        document.body.appendChild(this.audio);
    }

    _initStatus() {
        let me = this,
            config = this.config;

        this.playStatus = config.isAutoplay ? 'play' : 'pause';
        this.playListStatus = 'show';
        this.playIdx = 0;
        this.data = config.data;
        this.loopType = config.loopType;
        this.totalNum = this.data.length;
    }

    _createPlayer() {
        let me = this,
            config = this.config,
            playIcon = (this.playStatus === 'play') ? 'pause' : 'play';

        this.el = $(`#${config.id}`);
        this.el.html(render(config.tpl, {
            data: this.data,
            playIcon: playIcon
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

        audio.addEventListener('durationchange', $.proxy(this._durationchangeCb, this), false);
        audio.addEventListener('progress', $.proxy(this._progressCb, this), false);
        audio.addEventListener('ended', $.proxy(this._endedCb, this), false);

        $(window).on('resize', $.proxy(this._setPlaybarPos, this));
        $(window).on('orientationchange', $.proxy(this._setPlaybarPos, this));

        this.el.on('click', '.play-btn, .cover-play-btn', $.proxy(this.togglePlay, this));
        this.playBar.on('click', $.proxy(this.assignPlay, this));
        this.loopBtn.on('click', $.proxy(this._toggleOrderLoop, this));

        playPointer.on('touchmove', $.proxy(this._movePlaybar, this));
        playPointer.on('touchend', $.proxy(this.assignPlay, this));
        playPointer.on('mousedown', $.proxy(this._mousedownCb, this));

        this.playListBtn.on('click', $.proxy(this._togglePlayList, this));
        this.playListWrap.on('click', 'li', $.proxy(this.switchPlay, this));

        this.preBtn.on('click', $.proxy(this.prePlay, this));
        this.nextBtn.on('click', $.proxy(this.nextPlay, this));
    }

    _durationchangeCb() {
        this.totalTime.html(this.formatSeconds(this.audio.duration));
    }

    _progressCb(event) {
        let me = this,
            config = this.config,
            audio = this.audio;

        let loadedPercent = audio.buffered.length ? 
            audio.buffered.end(audio.buffered.length - 1) / audio.duration : 0;

        this.loadedBar.css('width', loadedPercent * 100 + '%');

        $.trigger(this, 'playing', [{
            song: this.data[this.playIdx],
            loadedPercent: loadedPercent
        }]);
    }

    _endedCb(event) {
        switch(this.loopType) {
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

        $.trigger(this, 'ended', [{
            song: this.data[this.playIdx]
        }]);
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

    _toggleOrderLoop(event) {
        switch(this.loopType) {
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
    setLoopType(type) {
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
    addtoPlayList(song) {
        this.totalNum++;
        this.data.push(song);

        //render list template
        song.idx = this.totalNum;
        this.playListWrap.append(render(listTpl, song));

        $.trigger(this, 'afterAddtoPlayList', [{
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
    switchPlay(event) {
        let me = this,
            config = this.config,
            playListItems = this.playListItems,
            idx = event;

        if (typeof event === 'object') {
            idx = $(event.currentTarget).data('idx')
        }

        if (this.playIdx === idx) return;

        let songData = this.data[idx];
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

        //根据不同的事件取相应的坐标值
        let pointerClientX = event.clientX || event.touches[0].clientX;
        let offsetX = pointerClientX - this.playBarClientX;
        let curPercent = Math.min(offsetX / this.playBarWidth, 1);

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
            song: me.data[this.playIdx]
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
            songInfo: me.data[this.playIdx]
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
}

export {AudioPlayer};
