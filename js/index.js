var box = $('.box'),
  imgBox = $('.imgBox'),
  handle = $('.handle'),
  swiper = $('.swiper'),
  text = $('.text'),
  verify = $('.verify'),
  verified = $('.verified'),
  refresh = $('.refresh')

// 图片集合
var imgs = []
for (let i = 1; i < 17; i++) {
  imgs.push('' + i + i)
}

$(function() {
  // 随机添加背景图
  refreshImg()

  refresh.click(function() {
    e = event || window.event
    e.stopPropagation()

    refreshImg()
    start()
  })

  refresh.mousedown(function() {
    $(this).addClass('click')
  })
  refresh.mouseup(function() {
    $(this).removeClass('click')
  })

  window.onload = start()
})

function start() {
  var verImg = document.getElementsByClassName('verImg')[0]

  if (verImg) {
    verImg.onload = function() {
      // 获取图片高度
      var imgH = this.clientHeight
      // 随机生成坐标（图片框固定宽度为300px，高度不定）
      var verX = 150 * (1 + Math.random()) - 38,
        verY = imgH / 4 + Math.random() * imgH / 2

      // 用户移动滑块函数
      fnDown(verX, verY)
    }
  }
}

function fnDown(verX, verY) {
  swiper.mousedown(function() {
    e = event || window.event
    e.stopPropagation()

    // 30为模块宽度
    verify.css({
      display: 'block',
      top: `${verY}px`,
      'background-position': `-${verX}px -${verY}px`
    })
    verified.css({ display: 'block', left: `${verX}px`, top: `${verY}px` })
    // 获取鼠标到按钮的距离
    var disX = e.clientX - $(this).offset().left,
      disY = e.clientY - $(this).offset().top
    text.css('opacity', '0')

    // 防止重复绑定触发多次
    box.unbind('mousemove')
    box.unbind('mouseup')

    // 移动
    box.bind('mousemove', function() {
      e = event || window.event
      fnMove(e, disX, disY)
    })

    // 释放
    box.bind('mouseup', function() {
      var stopL = verify.offset().left - 28
      // 误差在2px以内则算做成功
      if (Math.abs(stopL - verX) > 2) {
        alert('验证失败')
      } else {
        alert('验证成功')
      }
      // 解除绑定，并将滑动模块归位
      box.unbind('mousemove')
      swiper.css('left', '0px')
      verify.css('left', '10px')
      text.css('opacity', '1')
      box.unbind('mouseup')
    })
  })
}

function fnMove(e, posX, posY) {
  // 这里的e是以鼠标为参考
  var l = e.clientX - posX - $(handle).offset().left,
    winW = $(handle).width() + 29
  // 限制拖动范围只能在handle中
  if (l < 0) {
    l = 0
  } else if (l > winW) {
    l = winW
  }

  swiper.css('left', `${l}px`)
  verify.css('left', `${l + 10}px`)
}

function refreshImg() {
  // 随机生成下标
  var index = Math.round(Math.random() * 15)
  var imgH = 0

  verify.hide()
  verified.hide()

  var verImg = $('.verImg')
  if (verImg.length) {
    verImg.attr('src', `imgs/${imgs[index]}.jpg`)
  } else {
    imgBox.prepend(`<img class='verImg' src="imgs/${imgs[index]}.jpg" />`)
  }
  verify.css('background-image', `url('imgs/${imgs[index]}.jpg')`)
}
