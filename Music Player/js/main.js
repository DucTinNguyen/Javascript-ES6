/**
 * Render bài hài hát
 * Scroll Top
 * Play/ Pause/Seek
 * CD rotate
 * Next / Prev
 * Random
 * Next  / Repeat when ended
 * Active Song
 * Sroll active song into view
 * Play song when click
 */
//

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Truy xuất các phần tử cần thao tác
const heading = $('header h2');
const audio = $("#audio");

// Create
const app = {
    currentIndex : 0,
    isPlaying: false,
    isRepeat: false,
  songs: [
    {
      name: "Cua Là Đổ",
      singer: "Phát Hồ",
      path: "./asset/Cua-La-Do-Phat-Ho-X2X.mp3",
    },
    {
      name: "Là Ai Từ Bỏ Ai",
      singer: "Hương Ly",
      path: "./asset/La-Ai-Tu-Bo-La-Ai-Vo-Tinh-Huong-Ly-Jombie.mp3",
    },
    {
      name: "Sau Này Nếu Có Yêu Ai",
      singer: "Ngô Kiến Huy",
      path: "./asset/Sau-Nay-Neu-Co-Yeu-Ai-Tang-Phuc-Ngo-Kien-Huy.mp3",
    },
    {
      name: "Thay Lòng",
      singer: "DMZ",
      path: "./asset/Thay-Long-DIMZ-TVk-NH4T.mp3",
    },
    {
      name: "Yêu Là Cưới",
      singer: "Phát Hồ",
      path: "./asset/Yeu-La-Cuoi-Phat-Ho-X2X.mp3",
    },
  ],
  definePropeties : function()  
  {
    Object.defineProperty(this,'currentSong',{
        get : function()
        {
            return this.songs[this.currentIndex];
        }
    })
  },


  render: function () {
    const htmls = this.songs.map(function (song,index) {
      return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}">
            <div class="thumb" style="background-image: url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `;
    });

    $('.playlist').innerHTML = htmls.join('');
    
  },


  handleEvents: function()
  {
   //   Xử lí scroll Top -> thu nhỏ ảnh lại
   const cd = $(".cd");
   const cdWidth = cd.offsetWidth;
   document.onscroll = function() {
       const scrollTop = window.scrollY || document.documentElement.scrollTop;
       
       const cdnewWidth = cdWidth - scrollTop;
       
       cd.style.width = cdnewWidth > 38 ? cdnewWidth + 'px' : 0;
       cd.style.opacity = cdnewWidth/cdWidth;
   }
   // End xử lí scroll
   //Xử lí CD xoay khi phát nhạc
   //CD dừng khi ngừng phát
      const CdAnimate = cd.animate([{
        transform: 'rotate(360deg)'
      }],{
        duration:10000,
        iterations:Infinity
      })
      CdAnimate.pause();
   const btn = $(".btn-toggle-play");
        const audio = $("#audio");
        const player = $(".player");
        _this = this;
        // Xử lí play,pause
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add("playing");
            CdAnimate.play();
        }
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove("playing");

            CdAnimate.pause();
        }
        btn.addEventListener("click", function()
        {
            if(_this.isPlaying){
               audio.pause();
            }
            else
            {
                audio.play();
            }
        })
        
    //update time chạy khi video chạy
    audio.ontimeupdate = function() {{
      const progress = $(".progress");
      const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
       
      progress.value = progressPercent;

    }}

    //Chức năng tua nhạc
   
    progress.onchange = function(e)
    {
         const seektime = Math.floor(e.target.value / 100 * audio.duration);
        audio.currentTime = seektime;
        
    }
    // Chức năng chuyển bài(next),trở về bài trước(prev)
    const btnPrev = $(".btn-prev");
    const btnNext = $(".btn-next");
    //Event Next
    btnNext.onclick = function()
    {
      _this.currentIndex ++;
      if(_this.currentIndex > _this.songs.length - 1)
      {
        _this.currentIndex = 0;
      }
      _this.loadCurrentSong();
      audio.play();
    }
    //Event previous
    btnPrev.onclick = function()
    {
      _this.currentIndex--;
      if(_this.currentIndex < 0)
      {
        _this.currentIndex = _this.songs.length -1;
      }
      _this.loadCurrentSong();
      audio.play();
    }
    //Event btn random
    const btnRandom = $(".btn-random");
    btnRandom.onclick = function()
    {
      _this.currentIndex = Math.round(Math.random()*(_this.songs.length - 1));
      _this.loadCurrentSong();
      audio.play();
    }
    //Next when ended
    audio.onended = function(){

      if(_this.isRepeat)
      {
        audio.play();
      }
      else
      {
        _this.currentIndex ++;
        if(_this.currentIndex > _this.songs.length - 1)
        {
          _this.currentIndex = 0;
        }
        _this.loadCurrentSong();
        audio.play();
      }
    }
    const btnRepeat = $(".btn-repeat");
    btnRepeat.onclick = function()
    {
      _this.isRepeat = !_this.isRepeat;
      btnRepeat.classList.toggle("active");
    }
    
    
  },

  loadCurrentSong : function () {
    
    //lấy ra thằng phần tử đầu tiên trong mảng songs
    let currentItem = this.songs[this.currentIndex];
    
    heading.innerHTML =currentItem.name;
    audio.src = currentItem.path;

    
    
  },

  

  start: function () {
    //Định nghĩa các thuộc tính cho Object
    this.definePropeties();
    //load bài hát hiện tại lên giao diện
    this.loadCurrentSong();
    //Xử lý các sự kiện
    this.handleEvents();
    
    //Render playlist songs
    this.render();
    
    
    
  },
};
app.start();
