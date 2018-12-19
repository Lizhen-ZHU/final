var $page = $('.trailer-page')
var $pageTransition = $('.page-transition')
var $navLi = $('.header-nav li');




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
document.body.addEventListener('keypress', firstPageInputWatcher)

// -----------------------
window.onload = function() {
// var video = document.querySelector('video');
$('video').addClass('active')

// listen on nav link 
ListenOnNavLink()
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
    screenShot: 'https://thumbs.gfycat.com/ComfortableDamagedFieldspaniel-small.gif'
  },
  {
    title: 'Observationary',
    url: 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378439/obser.mov',
    screenShot: 'https://media.giphy.com/media/xUA7aVPLS7eZaak3Ru/source.gif'
  },
  {
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




// functions
function removeFromPage(node, second, callback) {
  $(node).addClass('page-disappear').on('animationend', ()=> {
    $(node).remove();
    callback()
  })
}

function showPage(node, second, callback) {
  $(node).addClass('page-appear')
  callback()
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

// whether the storyPage is loading for the first time;
var storyPageFirstLoading = true;

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

  if(storyPageFirstLoading) {
    addVideoList();
    storyPageFirstLoading = false;
  }

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



// Add listener for the nav-link
function ListenOnNavLink() {
  $('.nav-link').on('click', (e)=> {
    
    var functionAttribute = e.currentTarget.getAttribute('data-func');
    if(functionAttribute === 'stories') {
      changeBg(false, pageNavColors[functionAttribute]);  
      changePage(functionAttribute)
    }else {
      // 改变背景色 - 分别是视频背景 和 nav颜色，第一个参数true代表隐藏视频，false代表显示视频 ； 第二个参数代表传入的nav颜色
      changeBg(true, pageNavColors[functionAttribute]);
      // transitPage('show')
      changePage(functionAttribute)
      // transitPage('disappear')
    }
  })
}

// change page function
function changePage(attr) {
  var html = pageHtmlCode[attr];
  $page.find('.content').html(html).ready(function() {
    JSCode[attr]()
  })
}





// Capitalize tool
function capitalize(s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


// HTML Code for each Page 
var pageHtmlCode = {
  cast: `
        <div class="content full peoplewrap"  >
          <div class="wrap-inner left" id='seb1'>
            <div class="img-bg seb" style="opacity: 0;" ></div>
            <div class="img-bg img-bg-shallow seb" id='pagetwo'></div>
            <pre class="tx text"></pre>
          </div>
          <div class="wrap-inner right">
            <div class="img-bg mia" style="opacity: 0;"></div>
            <div class="img-bg img-bg-shallow mia"></div>
            <pre class="tx text2"></pre>
          </div>
        </div>
        `,
  stories: `
      <div class="title-wrapper relative full flex flex-center flex-column">
        <div class="logo"></div>
        <div class="comments">
            <p class="comment"></p>
              <p class="author"></p>
        </div>
    </div>
    <div class="absolute video-list-control flex flex-center">
      <img src="https://res.cloudinary.com/dxzphanl0/image/upload/v1544581509/icon/Video.png" alt=""> 
    </div>
  `,
  map: `
      <div class='wellcomepage'>
        <div class="layer-content">
              <p class='explore'></p>
          <div class="bg-bg"></div>
      </div>
      </div>
        
      <div class="mappage">
        <div class="topper">
        <svg class='mapsvg' width="613px" height="949px" viewBox="0 0 613 949" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="#A09FCC" fill-rule="evenodd">
                <polygon id="Path" stroke="#9EA7D4" points="164.476435 1.15388145 302.744009 1.15388145 323.6557 27.8242136 323.6557 57.4461 353.676879 72.8880859 445.522183 72.8880859 456.481659 61.6316487 475.643687 61.6316487 475.643687 83.6228344 486.312221 83.6228344 486.312221 75.9138805 520.234027 75.9138805 520.234027 105.896936 503.574098 105.896936 503.574098 125.693016 489.647016 125.693016 489.647016 170.640512 387.759204 170.640512 382.078816 187.814103 358.817519 187.814103 358.817519 228.437602 376.577007 255.180168 361.807197 273.944909 368.910189 284.745872 382.078816 284.745872 439.554867 245.695465 489.647016 309.417735 516.341426 309.417735 536.984247 273.944909 548.52962 278.762504 583.727556 278.762504 583.727556 298.612759 605.397702 309.417735 595.868857 325.160695 595.868857 347.021459 611.792402 347.021459 611.792402 394.354677 569.553675 413.444471 569.553675 470.551327 509.402966 470.551327 509.402966 515.300179 480.659925 515.300179 480.659925 564.649925 489.647016 564.649925 489.647016 577.730266 498.284977 577.730266 498.284977 564.649925 520.234027 564.649925 520.234027 606.627808 495.728703 606.627808 495.728703 612.520884 466.945531 612.520884 466.945531 741.245567 439.554867 741.245567 439.554867 777.637368 466.945531 777.637368 466.945531 789.971293 516.341426 789.971293 513.490197 766.97686 531.731243 766.97686 531.731243 818.664172 489.647016 864.334006 460.773552 864.334006 460.773552 920.333276 445.522183 947.900512 427.218936 947.900512 387.759204 926.535352 395.470164 899.545987 407.192108 899.545987 407.192108 860.967107 420.374781 860.967107 420.374781 843.538691 429.779223 843.538691 429.779223 822.175538 420.374781 811.719693 420.374781 695.509519 435.824793 695.509519 435.824793 636.275779 439.554867 636.275779 442.390045 609.655609 452.749579 609.655609 452.749579 573.251769 435.824793 573.251769 435.824793 599.883978 420.374781 599.883978 413.223633 588.001514 413.223633 553.116591 391.541447 550.455979 391.541447 526.315837 358.817519 523.388361 358.817519 515.300179 365.141992 515.300179 365.141992 505.384081 388.134419 505.384081 391.541447 490.704563 400.911779 490.704563 400.911779 474.527197 388.134419 474.527197 388.134419 458.919675 382.078816 458.919675 373.5472 474.527197 329.19162 474.527197 302.744009 445.349749 289.178096 445.349749 289.178096 458.919675 306.791109 474.527197 306.791109 490.704563 282.165396 490.704563 282.165396 501.73226 294.417054 501.73226 294.417054 512.481054 282.165396 523.388361 242.878222 523.388361 242.878222 540.445575 256.173259 553.116591 271.452718 553.116591 294.417054 534.020778 306.791109 534.020778 306.791109 523.388361 325.844786 523.388361 325.844786 534.020778 353.676879 540.445575 353.676879 595.913124 289.178096 595.913124 289.178096 616.959251 271.452718 616.959251 210.092093 523.388361 210.092093 495.897372 242.878222 474.527197 242.878222 458.919675 223.009908 427.993567 208.053494 427.993567 208.053494 416.620753 197.870532 416.620753 159.77923 450.205467 146.943681 439.374407 103.962551 439.374407 103.962551 391.818467 68.3271987 366.69113 103.962551 298.612759 62.6287528 264.89361 31.6986316 264.89361 14.4347482 223 0.505659574 223 0.505659574 197.722175 14.4347482 197.722175 14.4347482 176.477406 2.8873692 176.477406 2.8873692 149.490047 25.87177 125.693016 25.87177 95.362837 56.0855724 95.362837 83.9417432 65.8613403 143.608886 65.8613403 143.608886 19.1360901"></polygon>
                <polygon id="Freeway" stroke="#979797" points="143.983937 67.9455563 143.983937 202.78463 357.042001 202.78463 358.624787 202.78463 358.624787 187.622985 381.797132 187.622985 387.802788 170.329043 489.424305 170.329043 489.424305 125.41224 503.299197 125.41224 503.299197 105.612504 520.23227 105.612504 520.23227 76.1349797 486.7023 76.1349797 486.7023 82.9389741 475.835672 82.9389741 475.835672 62.1154301 456.621697 62.1154301 445.494278 72.9840956 353.94342 72.9840956 323.599988 57.0748305 323.599988 27.8864054 302.583529 1.15388145 164.465405 1.15388145 143.983937 19.6008825"></polygon>
                <polygon id="Dance" stroke="#979797" points="143.983937 66.5562924 143.983937 241.695197 200.500255 280.904978 180.621162 339.252446 104.336378 392.579537 68.3478928 366.925805 104.336378 298.45739 62.6859181 264.8707 31.7594671 264.8707 14.5996764 223 0.505659574 223 0.505659574 197.55464 14.5996764 197.55464 14.5996764 176.629036 2.86873854 176.629036 2.86873854 149.320261 26.1466118 125.44282 26.1466118 95.0839699 55.9557934 95.0839699 84.1346819 65.5546903"></polygon>
                <polygon id="Observatory" stroke="#979797" points="382.234844 284.936494 382.234844 403.558277 446.010194 403.558277 446.010194 472.045543 401.921225 472.045543 400.359056 474.370448 388.454155 474.370448 388.454155 459.259357 382.234844 459.259357 373.550912 474.370448 329.55213 474.370448 302.751448 445.395355 289.399071 445.395355 289.399071 459.259357 306.639806 474.370448 306.639806 490.630566 282.310918 490.630566 282.310918 501.49516 294.478027 501.49516 294.478027 512.625161 282.310918 523.339465 243.326072 523.339465 243.326072 540.170488 256.375021 553.349953 271.625118 553.349953 294.478027 533.369364 306.639806 533.369364 306.639806 523.339465 325.659039 523.339465 325.659039 533.369364 353.881094 540.170488 353.881094 595.919948 289.399071 595.919948 289.399071 617.322015 271.625118 617.322015 210.061024 523.339465 210.061024 496.52301 243.326072 474.370448 243.326072 459.259357 223.07515 428.195521 208.261151 428.195521 208.261151 416.429766 198.582672 416.429766 159.854329 449.612014 147.081 439.697177 104.009438 439.697177 104.009438 392.579537 180.456329 339.382547 200.500255 281.387129 143.983937 241.369054 143.983937 202.78463 358.95187 202.78463 358.95187 226.606686 377.56877 254.693395 362.509502 274.079654 369.944903 284.936494"></polygon>
                <polygon id="Theatre" stroke="#979797" points="446.010194 473.697896 482.577535 515.140308 509.361674 515.140308 509.361674 470.284417 569.185212 470.284417 569.185212 414.010817 611.792402 394.592365 611.792402 347.361205 595.963622 347.361205 595.963622 325.36014 605.098847 309.378095 583.701155 298.681702 583.701155 279.018097 548.961792 279.018097 537.151856 273.972813 516.796578 309.378095 489.977108 309.378095 439.951052 245.719718 382.328864 284.804107 382.328864 403.370717 446.010194 403.370717"></polygon>
                <polygon id="Cafe" stroke="#979797" points="400.952863 474.386657 402.629714 471.942519 446.010194 471.942519 482.113727 515.140308 480.383304 515.140308 480.383304 564.534505 489.660266 564.534505 489.660266 577.478328 498.083911 577.478328 498.083911 564.534505 520.23227 564.534505 520.23227 606.622013 495.755693 606.622013 495.755693 612.754459 467.127902 612.754459 467.127902 741.30582 439.531111 741.30582 439.531111 777.868142 467.127902 777.868142 467.127902 789.99126 516.352076 789.99126 513.605629 767.317123 531.482345 767.317123 531.482345 818.776576 489.660266 864.56907 461.197089 864.56907 461.197089 920.557365 446.010194 947.900512 427.456038 947.900512 387.511657 926.578755 395.741546 899.486044 406.982524 899.486044 406.982524 860.799499 420.143731 860.799499 420.143731 843.496174 429.673201 843.496174 429.673201 822.38626 420.143731 811.845479 420.143731 695.689754 435.518951 695.689754 435.518951 636.507641 439.531111 636.507641 442.587094 609.811105 452.882923 609.811105 452.882923 573.107799 435.518951 573.107799 435.518951 599.760228 420.143731 599.760228 413.169316 588.046675 413.169316 553.872431 391.645111 550.4376 391.645111 526.392209 359.050054 523.566212 359.050054 515.140308 364.935973 515.140308 364.935973 505.307498 387.511657 505.307498 391.645111 490.580493 400.952863 490.580493"></polygon>
            </g>
        </svg>
        <div class="la"></div>
      </div>
      
      
      
        <div class="videowrapper">
          
              <video class='video video1 map-video' id="v1" src="" autoplay loop></video> 
              <video class='video video2 map-video' id="v2" src="" autoplay loop></video> 
              <video class='video video3 map-video' id="v3" src="" autoplay loop></video>
              <video class='video video4 map-video' id="v4" src="" autoplay loop></video>
              <video class='video video5 map-video' id="v5" src="" autoplay loop></video> 
              </div>
              
              <div class="close"></div>
        </div>
      `,
  ticket: 
    `
    <div class="invitepage">
      <div class="wordwrap"><span id="typewords"></span></div>
      <div class='invitewrap animated'>
        <input type="text" class='input-name' placeholder="name">
        <a href="#ticketpage"><button class='invite' >INVITE</button></a>
      </div>
    </div> 
      <div class="ticketpage" id='ticketpage'>
      <div class="ticketbg"></div>
      <div class="myticket">
        
          <div class="blurbg">
          
        <div class="ticketpic"></div>
      
        <div class="ticket-box">
          
        <div class="tbline tb1"><p id='p'>SCREEN</p><h3>CGV NEWYORK</h3><br><h4>IMAX 2D</h4></div>
        <div class="tbline tb2"><p id='p'>DATE/TIME</p><h3>Thur, Dec 20, 2018</h3><br><h4>19:40 - 21:31</h4></div>
          </div>
            <div class="tb3"><h4>Hi,  <span class='name'></span><br><br>Can I invite you to watch the movie 'LA LA LAND' with me?</h4></div>
        <div class="split"></div>
        <div class="tb4"><p id='p'>TICKET NO.</p><h4 id='n'>0093-1023-0605-610</h4></div>
      <button id='b' class="frankButton">INVITE<span class="circle"></span></button>
            
          </div>
        
        </div>
      <div class="blurry"></div>
        
        <div class="whitebg"></div>
      </div>
   `,

}

// JS Code for Each Page
var JSCode = {
  cast: function() {
        var string =  ` 
    Someone in the crowd 
    could be the one you need to know
    The one to finally lift you off the ground

    Someone in the crowd could take you
    where you wanna go
    If you're the someone ready to be found
    `;

    var textEl = document.querySelector('.text');
    var a = ' ';
    var i = 0;
    var id = setInterval(function(){
      a = a + string[i];
      i++;
    textEl.textContent = a;
      
      if (i === string.length)
    {
      clearInterval(id);
    }},100)


    var string2 =  `
    A rush
    A glance
    A touch
    A dance

    To look in somebody's eyes
    To light up the skies
    To open the world and send them reeling
    A voice that says, I'll be here
    And you'll be alright
    `;

    var textEl2 = document.querySelector('.text2');
    var b = ' ';
    var u = 0;
    var id2 = setInterval(function(){
      b = b + string2[u];
      u++;
    textEl2.textContent = b;
      
      if (u === string2.length)
    {
      clearInterval(id2);
    }},100)
  },
  map: function() {
          //----------------------
      var explore = document.querySelector('.explore');

      explore.addEventListener('click', function() {
            var nextEl = document.querySelector('.mappage');
            nextEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            document.body.style.overflow = 'unset';
            //修改css里面的style；
            //慢慢往下下滑
        });



      //-----------------------------------


      var wrapperEl =document.querySelector('.videowrapper')
      var video = document.querySelectorAll('video');

      function show (box, content) {
        
      box.addEventListener('click', function() {
            
        for(var i = 0; i < video.length; i++) {
          clearActive(video[i])
        }
          wrapperEl.classList.add('active');
            content.classList.add('active');
        
            if(content.getAttribute('id')=== 'v1') {
              content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378438/dance.mov'
          }
            if(content.getAttribute('id')=== 'v2') {
              content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378429/thea.mov'
          }
        
          if(content.getAttribute('id')=== 'v3') {
              content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544384214/free.mp4'
          }
        
        if(content.getAttribute('id')=== 'v4') {
              content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378439/obser.mov'
          }
          if(content.getAttribute('id')=== 'v5') {
              content.src = 'https://res.cloudinary.com/dxzphanl0/video/upload/v1544378435/jazz.mov'
          }
        })
      };
      var freeway = document.querySelector('#Freeway');
      var observatory = document.querySelector('#Observatory');
      var dance = document.querySelector('#Dance');
      var thea = document.querySelector('#Theatre');
      var cafe = document.querySelector('#Cafe');

      show(freeway, document.querySelector('.video3'));
      show(observatory,document.querySelector('.video4'));
      show(dance, document.querySelector('.video1'));
      show(thea, document.querySelector('.video2'));
      show(cafe, document.querySelector('.video5'));



      thea.addEventListener('click', function() {
          thea.classList.add('active');
          music.pause();
        });
      dance.addEventListener('click', function() {
          dance.classList.add('active');
          musicOperation($('.global-music')[0], false)
        });
      cafe.addEventListener('click', function() {
          cafe.classList.add('active');
          musicOperation($('.global-music')[0], false)
        });
      observatory.addEventListener('click', function() {
          observatory.classList.add('active');
          musicOperation($('.global-music')[0], false)
        });
      freeway.addEventListener('click', function() {
          freeway.classList.add('active');
            musicOperation($('.global-music')[0], false)
        });



        var close =document.querySelector('.close')
        close.addEventListener('click', function(e) {             
            wrapperEl.classList.remove('active');                   
            musicOperation($('.global-music')[0], true)
            
            $(".map-video").each(function(){
              $(this).get(0).pause();   
              
          });
                    })

      function clearActive(el) {
      el.classList.remove('active');
      }
  },
  stories: function() {
    showEndorsement();
    InteractionInTrailer();
  },
  ticket: function() {
          // --------
      var options = {
        strings: ['   The End ...', 'No, our story just stared ...','Tell me who is the person that you want to share this movie with...'],
        typeSpeed: 150, 
        startDelay: 500, 
        backSpeed: 50, 
        backDelay: 900, 
        loop: false, 
        showCursor: false,
        cursorChar: "|",
        onFinished: function(){
          $('.invitewrap').addClass('fadeInDown');
        },
      }
      ityped.init('#typewords', options);    

      //加入输入框，第一次的alert要关掉//


      $name = $('.name');
      $('.invite').on('click', function(){
          var value =$('.input-name')[0].value;
      $name.text(value);
      })
  }
}

var pageNavColors = {
  map: '#f4f4f4',
  ticket: '#222',
  cast: '#222',
  stories: "#f4f4f4",
}


// transit the page
function transitPage(state) {
  if(state === 'disappear') {
    $pageTransition.animate({opacity: 0}, 2500, function() {
          $pageTransition.css('z-index', -1);
    })
    // $pageTransition.animate({opacity: 0}, 500)
  }else{
    $pageTransition.css({'z-index': 10, 'opacity': 1});
  }
}

function changeBg(ifClear, navColor) {
  // chang bg
  if(ifClear) {
    $('.bg.full').animate({'opacity': 0}, 500)
    $('body').css('background', '#f4f4f4')
  }else {
    $('body').css('background', 'black')
    $('.bg.full').animate({'opacity': 1}, 500)
  }

  // change nav
  if(navColor && typeof navColor === 'string') {
    $navLi.css('color', navColor)
  }

}

// transitPage('show')


// Listen on keyinput function
function firstPageInputWatcher(e) {
  userInput = userInput + e.key;
  var inputLength = userInput.length;
  if(userInput === correctOrder.slice(0, inputLength)) {
  if(inputLength === correctOrder.length) {
    musicOperation($('.global-music')[0], true)
    removeFromPage($('.pianowrapper')[0], 2, function() {
      showEndorsement();
      showPage('.trailer-page', '', function() {
        document.body.removeEventListener('keypress', firstPageInputWatcher)
      })
    })
  }
  }else {
  userInput = '';
  alert('Please type "GHJT"')
  }
}