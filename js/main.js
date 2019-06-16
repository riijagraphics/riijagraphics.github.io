randomizeBackground();
createChars($('.title a'), 1000, 0);

function randomizeBackground() {
    var rn = Math.floor((Math.random() * 150) + 100);
    var rs = Math.floor((Math.random() * 11) + 4);
        var t = new Trianglify({
     x_gradient: Trianglify.colorbrewer.Spectral[rs],
        noiseIntensity: 0,
        cellsize: rn
    });
    var pattern = t.generate(window.innerWidth, window.innerWidth+200);
    document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
}

function createChars (el, duration, minDuration){
  var str = $(el).text().trim();
  $(el).html('');
  for (var i in str) {
    var $char = $(document.createElement('span'))
        $char.addClass('char');
        $char.text(str[i]);
        $(el).append($char);
    $char.css('transition-delay', (minDuration + duration * Math.random()) + 'ms');
  }
}

function getRandomArbitary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

$('.container, .title a').on('click', function (e) {
    randomizeBackground();
});

$('.container').on('mouseenter', function (e) {
    var target = $(e.currentTarget).find('.title a');
    target.addClass('hovered');
    function move() {
        
        if (target.hasClass('hovered')) {
            var $chars = target.find('.char');
            target.prepend($chars.eq(getRandomArbitary(0, $chars.length)));
            setTimeout(function () {
                move();
            }, 50);
        }
    }

    move();
});

  $('.container').on('mouseleave', function (e) {
    var target = $(e.currentTarget).find('.title a');
    target.removeClass('hovered');
      var text = target.data('text'),
          $chars = target.find('.char');
    
    var ind = 0;
            function setChar() { 
                $chars.eq(ind).text(text[ind]);
                ind++;
                if (ind < text.length) {
                    setTimeout(function () {
                        setChar();
                    }, 50);
                }
            }

            setTimeout(function () {
                setChar();
            }, 100);
    
  })