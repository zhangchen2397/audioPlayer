(function() {
    var audioIns = new AudioPlayer({
        data: [{
            title: '曾经的你',
            author: '许巍',
            src: 'https://zhangchen2397.github.io/audioPlayer/example/asset/music/once.mp3',
            cover: 'https://zhangchen2397.github.io/audioPlayer/example/asset/image/cover_once.jpeg?ver=1'
        }, {
            title: 'You\'re Beautiful',
            author: 'James Blunt',
            src: 'https://zhangchen2397.github.io/audioPlayer/example/asset/music/you_are_beautiful.mp4',
            cover: 'https://zhangchen2397.github.io/audioPlayer/example/asset/image/cover_yab.jpg?ver=1'
        }, {
            title: 'I\'m Yours',
            author: 'Jason Mraz',
            src: 'https://zhangchen2397.github.io/audioPlayer/example/asset/music/i_am_yours.mp4',
            cover: 'https://zhangchen2397.github.io/audioPlayer/example/asset/image/cover_iay.jpg?ver=1'
        }]
    });

    $.bind(audioIns, 'play', function(event) {
        //console.log(event);
    });
})();