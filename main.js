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

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

$('.container, .title a').on('click', function (e) {
    clearSelection();
    randomizeBackground();
});

$('.title a').on('mouseenter', function (e) {
    $(e.currentTarget).addClass('hovered');
    function move() {
        
        if ($(e.currentTarget).hasClass('hovered')) {
            var $chars = $(e.currentTarget).find('.char');
            $(e.currentTarget).prepend($chars.eq(getRandomArbitary(0, $chars.length)));
            setTimeout(function () {
                move();
            }, 50);
        }
    }

    move();
});

  $('.title a').on('mouseleave', function (e) {
    $(e.currentTarget).removeClass('hovered');
      var text = $(this).data('text'),
          $chars = $(e.currentTarget).find('.char');
    
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