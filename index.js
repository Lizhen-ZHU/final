


function play(){
    var audio = document.getElementById("audio");
    audio.play();
              }

window.addEventListener('keydown', function(e) {
 const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
 const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
 if (!audio) return;
 audio.currentTime = 0;
 audio.play();
 // key.classList.add('active')
})



var correctOrder = 'ghjt';
// var globalMusic = document.querySelector('.global-music');


// user input keyboard trigger the first page transition
var userInput = '';
document.body.addEventListener('keypress', function(e) {
userInput = userInput + e.key;
var inputLength = userInput.length;
if(userInput === correctOrder.slice(0, inputLength)) {
 if(inputLength === correctOrder.length) {
  musicOperation($('.global-music')[0], true)
  removeFromPage($('.pianowrapper')[0], 2, function() {
    showEndorsement();
    showPage('.trailer-page')
  })

    // music.play();
    // var pageHeight = window.innerHeight;
    // window.scrollTo(0, pageHeight)
 }
}else {
 userInput = '';
 alert('Please type "GHJT"')
}
})

// -----------------------
window.onload = function() {
// var video = document.querySelector('video');
$('video').addClass('active')
}

var videoList = [
  {
    title: 'Dance',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378438/dance.mov',
    screenShot: 'https://media.giphy.com/media/l3vRaHTeHMH0fQ9fG/giphy.gif'
  },
  {
    title: 'Theater',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378429/thea.mov',
    screenShot: 'https://res.cloudinary.com/dxzphanl0/image/upload/v1544583505/screenShot/freeway.png'
  },
  {
    title: 'Observationary',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378439/obser.mov',
    screenShot: 'https://media.giphy.com/media/xUA7aVPLS7eZaak3Ru/source.gif'
  },{
    title: 'Freeway',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544384214/free.mp4',
    screenShot: 'https://media.giphy.com/media/3oz8xWiqIYbnkDN3lS/source.gif'
  },
  {
    title: 'Jazz Club',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378435/jazz.mov',
    screenShot: 'https://i.gifer.com/1SLI.gif'
  },
]




// var nextPeo = document.querySelector('.video-list-control');
// nextPeo.addEventListener('click', function() {
//    var people = document.querySelector('.peoplewrap');
//    people.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
//   document.body.style.overflow = 'unset';
// });

//----------------------------

// var string =  `                                       
// Someone in the crowd 
// could be the one you need to know
// The one to finally lift you off the ground

// Someone in the crowd could take you
// where you wanna go
// If you're the someone ready to be found
// `;

// var textEl = document.querySelector('.text');
// var a = ' ';
// var i = 0;
// var id = setInterval(function(){
// a = a + string[i];
// i++;
// textEl.textContent = a;

// if (i === string.length)
// {
// clearInterval(id);
// }},100)


// var string2 =  `
                                
// A rush
// A glance
// A touch
// A dance

// To look in somebody's eyes
// To light up the skies
// To open the world and send them reeling
// A voice that says, I'll be here
// And you'll be alright
// `;

// var textEl2 = document.querySelector('.text2');
// var b = ' ';
// var u = 0;
// var id2 = setInterval(function(){
// b = b + string2[u];
// u++;
// textEl2.textContent = b;

// if (u === string2.length)
// {
// clearInterval(id2);
// }},100)


//----------------------
// var explore = document.querySelector('.explore');

// explore.addEventListener('click', function() {
//    var nextEl = document.querySelector('.mappage');
//    nextEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
//    document.body.style.overflow = 'unset';
//    //修改css里面的style；
//    //慢慢往下下滑
// });



//-----------------------------------


// var wrapperEl =document.querySelector('.videowrapper')
// var video = document.querySelectorAll('video');

// function show (box, content) {

// box.addEventListener('click', function() {
   
// for(var i = 0; i < video.length; i++) {
//  clearActive(video[i])
// }
//  wrapperEl.classList.add('active');
//    content.classList.add('active');

//    if(content.getAttribute('id')=== 'v1') {
//      content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378438/dance.mov'
//  }
//    if(content.getAttribute('id')=== 'v2') {
//      content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378429/thea.mov'
//  }

//  if(content.getAttribute('id')=== 'v3') {
//      content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544384214/free.mp4'
//  }

// if(content.getAttribute('id')=== 'v4') {
//      content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378439/obser.mov'
//  }
//  if(content.getAttribute('id')=== 'v5') {
//      content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378435/jazz.mov'
//  }
// })
// };
// var freeway = document.querySelector('#Freeway');
// var observatory = document.querySelector('#Observatory');
// var dance = document.querySelector('#Dance');
// var thea = document.querySelector('#Theatre');
// var cafe = document.querySelector('#Cafe');

// show(freeway, document.querySelector('.video3'));
// show(observatory,document.querySelector('.video4'));
// show(dance, document.querySelector('.video1'));
// show(thea, document.querySelector('.video2'));
// show(cafe, document.querySelector('.video5'));



// thea.addEventListener('click', function() {
//   thea.classList.add('active');
//   music.pause();
// });
// dance.addEventListener('click', function() {
//   dance.classList.add('active');
//     music.pause();
// });
// cafe.addEventListener('click', function() {
//   cafe.classList.add('active');
//     music.pause();
// });
// observatory.addEventListener('click', function() {
//   observatory.classList.add('active');
//     music.pause();
// });
// freeway.addEventListener('click', function() {
//   freeway.classList.add('active');
//     music.pause();
// });



// var close =document.querySelector('.close')
// close.addEventListener('click', function(e) {             
//    wrapperEl.classList.remove('active');                   music.play();
//  //   content.classList.remove('active');
   
//    $("video").each(function(){
//      $(this).get(0).pause();   
//  });
//            })

// function clearActive(el) {
// el.classList.remove('active');
// }



// removeFromPage($('.pianowrapper')[0], 2, function() {
//   console.log(1);
// })

// functions
function removeFromPage(node, second, callback) {
  $(node).addClass('page-disappear').on('animationend', ()=> {
    $(node).remove();
    callback()
  })
}

function showPage(node, second, callback) {
  $(node).addClass('page-appear')
}

function musicOperation(node, state) {
  if(state) {
    node.play();
  }else {
    node.pause();
  }
}

function showEndorsement() {
  var endorsement = [
    {
     content: `A movie worth savoring, something that entertains and makes us feel good about being alive`,
     author: 'PETER BRADSHAW, THE GUARDIAN'
    },
    {
     content: `Soaring, romantic, extremely stylish and endlessly inventive`,
     author: 'DAVE CALHOUN, TIME OUT NEW YORK'
    }, 
    {
     content: `Gorgeous and magnificent`,
     author: 'MARA REINSTEIN, US'
    },
    {
     content: ` A sparkling cinematic love letter`,
     author: 'ALONSO FURALDE, THE WRAP'
    },
    {
     content: `My favorite movie`,
     author: 'Lizhen Zhu'
    }
    ];
    
    var $comment = $('.comment');
    var $author = $('.author')
    var $comments = $('.comments');
    
    var index = 0;
    setTimeout(function() {
      rotateEndorsement()
      setInterval(rotateEndorsement, 5000)
    }, 0)

    function rotateEndorsement() {
      var data = endorsement[index]
      $comments.addClass('hide'); 
      $comments.on('transitionend', function() {
        $comment.text(data.content);
        $author.text(data.author);
        $comments.removeClass('hide')
      })
      index++;
      if(index > endorsement.length - 1) {
      index = 0;
      }
    }
}

function InteractionInTrailer() {
  $sideBar = $('.trailer-page .page-side-bar');
  $closeBtn = $('.sidebar-close');
  $videoListContr = $('.video-list-control');
  $videoListWrapper = $('.video-list-wrap');
  $videoBg = $('.bg.full')

  function addVideoList () {
    videoList.forEach(function(eachVideo) {
      var structure = `
        <li class='each-video animated' data-src={{video-src}} >
          <div class="video-image" style="background-image: url({{bg}})"></div>
          <p class="video-title">{{video-title}}</p> 
        </li>
      `;

      structure = structure.replace('{{bg}}', eachVideo.screenShot).replace('{{video-title}}', eachVideo.title).replace('{{video-src}}', eachVideo.url);
      var el = $(structure).on('click', function(e) {
        var src = e.currentTarget.getAttribute('data-src');
        replaceBgVideo(src)
      })
      $videoListWrapper.append(el);
    })
  }

  addVideoList();

  $allVideos = $('.each-video');

  $videoListContr.on('click', function(e) {
    e.stopPropagation();
    $sideBar.addClass('active');
    blurEl($videoBg, 9);

    // add the animation class for each video
    $allVideos.each(function(index, item) {
      setTimeout(function(){
        $(item).addClass('fadeInUp');
      }, index * 200);
    })

    $sideBar.on('click', function(e){
      e.stopPropagation();
    })
    $(document.body).one('click', function() {
      closeSidebar();
    })
  })

  $closeBtn.on('click', function() {
    closeSidebar();
  })




  function closeSidebar(){
    $sideBar.removeClass('active');
    $allVideos.removeClass('fadeInUp');
    blurEl($videoBg, 0)
  }

  function replaceBgVideo(src) {
    $('.bg.full video').attr('src', src).prop('muted', false);
    musicOperation($('.global-music')[0], false)
  }
  function blurEl(node, blurness) {
    $(node).css('filter', `blur(${blurness}px)`);
  }

}
InteractionInTrailer()