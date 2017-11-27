var box = $('.box'),
  imgBox = $('.imgBox'),
  img = $('.img'),
  handle = $('.handle'),
  swiper = $('.swiper'),
  text = $('.text'),
  verify = $('.verify'),
  verified = $('.verified');

// 图片集合
var imgs = [];
for (let i = 1; i < 6; i++) {
  imgs.push('' + i + i);
}
// 随机生成下标
var index = Math.round(Math.random() * 4);

$(function() {
  // 随机添加背景图
  verify.css('background-image', `url('imgs/${imgs[index]}.jpg')`);
  img.attr('src', `imgs/${imgs[index]}.jpg`);

  window.onload = init();
});

function init() {
  // 随机生成坐标（图片框固定为300px）
  var verX = 150 * (1 + Math.random()) - 30,
    verY = 75 + Math.random() * 150;

  fnDown(verX, verY);
}

function fnDown(verX, verY) {
  swiper.mousedown(function() {
    e = event || window.event;
    e.stopPropagation();

    // 30为模块宽度
    verify.css({
      display: 'block',
      top: `${verY}px`,
      'background-position': `-${verX}px -${verY}px`
    });
    verified.css({ display: 'block', left: `${verX}px`, top: `${verY}px` });
    // 获取鼠标到按钮的距离
    var disX = e.clientX - $(this).offset().left,
      disY = e.clientY - $(this).offset().top;
    text.css('opacity', '0');
    box.bind('mousemove', function() {
      e = event || window.event;
      fnMove(e, disX, disY);
    });

    // 释放
    box.bind('mouseup', function() {
      var stopL = verify.offset().left - 28;
      // 误差在2px以内则算做成功
      if (Math.abs(stopL - verX) > 2) {
        alert('验证失败');
      } else {
        alert('验证成功');
      }
      // 解绑移动事件，并将滑动模块归位
      box.unbind('mousemove');
      swiper.css('left', '0px');
      verify.css('left', '10px');
      text.css('opacity', '1');
      box.unbind('mouseup');
    });
  });
}

function fnMove(e, posX, posY) {
  // 这里的e是以鼠标为参考
  var l = e.clientX - posX - $(handle).offset().left,
    winW = $(handle).width() + 29;
  // 限制拖动范围只能在handle中
  if (l < 0) {
    l = 0;
  } else if (l > winW) {
    l = winW;
  }

  swiper.css('left', `${l}px`);
  verify.css('left', `${l + 10}px`);
}
