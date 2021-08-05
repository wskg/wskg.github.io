window.onload = function () {
    let btn = document.querySelector('#button')
    let cur = document.querySelector('.cur')
    let audio = document.querySelector('audio')
    let currentTime = document.querySelector('#currentTime')
    let flag = true

    document.addEventListener('click', function () {
        let big = document.querySelector('#big')
        if (flag) {
            big.style.animationPlayState = 'running'
            btn.style.display = 'none'
            audio.play()
            let cur = document.querySelector('.cur')
            let num = 0
            let timer = 0
            let processbtn = document.querySelector('#processbtn')
            time = setInterval(function () {
                let sec = parseInt(audio.currentTime) % 60
                let min = parseInt(audio.currentTime / 60)
                if (sec >= 10) {
                    currentTime.innerText = '0' + min + ':' + sec
                } else {
                    currentTime.innerText = '0' + min + ':' + '0' + sec
                }
                timer++
                num = parseInt(audio.currentTime) / 239 * 280 / 100
                cur.style.width = num + 'rem'
                processbtn.style.left = num + 'rem'
                if (timer == 239) {
                    clearInterval(time)
                }
            }, 1000)
            flag = false
        } else {
            clearInterval(time)
            big.style.animationPlayState = 'paused'
            btn.style.display = 'block'
            audio.pause()
            flag = true
        }
    })
    let totalTime = document.querySelector('#totalTime')
    let minutes = '0' + parseInt(audio.duration / 60)
    let seconds = parseInt(audio.duration - 180)
    totalTime.innerText = minutes + ':' + seconds
    let processbtn = document.querySelector('#processbtn')
    let bar = document.querySelector('.process-bar')
    //限制最大宽高，不让滑块出去
    var maxW = bar.clientWidth;
    //手指触摸开始，记录div的初始位置
    processbtn.addEventListener('touchstart', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        oL = touch.clientX - processbtn.offsetLeft;
    });
    //触摸中的，位置记录

    processbtn.addEventListener('touchmove', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        var oLeft = touch.clientX - oL;
        if (oLeft < 0) {
            oLeft = 0;
        } else if (oLeft >= maxW) {
            oLeft = maxW;
        }
        cur.style.width = oLeft / 100 + 'rem'
        audio.currentTime = oLeft / 280 * 239
        processbtn.style.left = oLeft / 100 + 'rem'
    });
}