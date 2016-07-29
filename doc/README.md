HTML5 audio player
======

[先点击查看demo](https://zhangchen2397.github.io/audioPlayer/example/)

![qr code](https://zhangchen2397.github.io/audioPlayer/doc/qrcode.png)

![player](https://zhangchen2397.github.io/audioPlayer/doc/player.png)


###组件简介
html5 audio player 音频播放器组件，封装`audio`相关`API`，可自由定制皮肤，对于拖拽事件做了相应的兼容处理，可适应于`pc`及`移动端`音频播放。

###组件主要功能
1. 自定义播放器结构及皮肤
2. 播放进度条，指定位置播放，拖拽播放
3. 支持播放列表播放，动态插入歌曲到播放列表
4. 支持单曲循环、顺序循环多种循环播放方式
5. 快速切换上一曲/下一曲

###配置参数说明
```javascript
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
```

###对外调用接口及自定义事件
```javascript
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
 ```

###组件初始化及使用
```javascript
(function() {
    var audioIns = new AudioPlayer({
        data: [{
            title: '曾经的你',
            author: '许巍',
            src: '/audioPlayer/example/asset/music/once.mp3',
            cover: '/audioPlayer/example/asset/image/cover_once.jpeg'
        }, {
            title: 'You\'re Beautiful',
            author: 'James Blunt',
            src: '/audioPlayer/example/asset/music/you_are_beautiful.mp4',
            cover: '/audioPlayer/example/asset/image/cover_yab.jpg?ver=1'
        }, {
            title: 'I\'m Yours',
            author: 'Jason Mraz',
            src: '/audioPlayer/example/asset/music/i_am_yours.mp4',
            cover: '/audioPlayer/example/asset/image/cover_iay.jpg?ver=1'
        }]
    });

    //监听play事件，通过event拿到相应的事件参数
    $.bind(audioIns, 'play', function(event) {
        console.log(event);
    });

    //动态添加新歌曲到播放列表
    audioIns.addtoPlayList({
        title: '曾经的你',
        author: '许巍',
        src: '/audioPlayer/example/asset/music/once.mp3',
        cover: '/audioPlayer/example/asset/image/cover_once.jpeg'
    });
})();
```

###本地二次开发与调试
```
git clone https://github.com/zhangchen2397/audioPlayer.git
cd audioPlayer

//安装依赖
npm install

//采用es6开发，通过webpack打包, babel转换es6代码
webpack --watch

//开启本地调试服务器预览
webpack-dev-server
localhost:8080
```

