// 背景音乐播放器
let innerAudioContext = null


Page({

  /**
   * 页面数据
   */
  data: {

    // 页面第一次打开时显示的话
    content: "夜很深，但有人陪你醒着。",

    // 音乐是否正在播放
    musicPlaying: false

  },


  /**
   * 页面加载时执行
   */
  onLoad() {

    // 创建音乐播放器
    innerAudioContext = wx.createInnerAudioContext()

    // 音乐文件位置
    innerAudioContext.src = "/music/night.mp3"

    // 循环播放
    innerAudioContext.loop = true

    // 不自动播放
    innerAudioContext.autoplay = false


    // 音乐开始播放
    innerAudioContext.onPlay(() => {

      console.log("音乐开始播放")

      this.setData({

        musicPlaying: true

      })

    })


    // 音乐暂停
    innerAudioContext.onPause(() => {

      console.log("音乐暂停")

      this.setData({

        musicPlaying: false

      })

    })


    // 音乐播放结束
    innerAudioContext.onEnded(() => {

      this.setData({

        musicPlaying: false

      })

    })


    // 音乐播放失败
    innerAudioContext.onError((res) => {

      console.log("音乐播放失败")

      console.log(res)

      wx.showToast({

        title: "音乐播放失败",

        icon: "none"

      })

    })

  },


  /**
   * 点击“换一句”
   */
  changeWord() {

    // 我们准备的深夜句子
    const words = [

      "窗外没有声音，只有夜晚陪着你。",

      "我贴在床底，不说话，只陪你听这个世界。",

      "凌晨三点，这座城市终于安静了下来。",

      "如果孤单有形状，也许就是黑夜里的影子。",

      "你睡你的，我守我的这一小片黑暗。",

      "今晚的月亮不知道你在想什么，但我知道你还没睡。",

      "灯关了以后，很多没有说出口的话才慢慢出现。",

      "别急着睡，今晚的故事才刚刚开始。",

      "床的上面是你的梦，床的下面是我的夜晚。",

      "世界已经睡着了，我们还醒着。",

      "深夜没有答案，但深夜允许你暂时不寻找答案。",

      "有些话白天不能说，那就留给凌晨。",

      "这一刻没有人催你，你可以安静地待一会儿。",

      "晚风从窗外经过，也顺便替我来看了看你。",

      "今夜很长，好在我们背靠背。"

    ]


    // 随机选择一句
    const randomIndex = Math.floor(

      Math.random() * words.length

    )


    // 修改页面显示内容
    this.setData({

      content: words[randomIndex]

    })

  },


  /**
   * 点击音乐按钮
   */
  toggleMusic() {

    // 防止播放器没有创建成功
    if (!innerAudioContext) {

      wx.showToast({

        title: "播放器还没有准备好",

        icon: "none"

      })

      return

    }


    // 如果正在播放
    if (this.data.musicPlaying) {

      // 暂停
      innerAudioContext.pause()

    } else {

      // 播放
      innerAudioContext.play()

    }

  },


  /**
   * 页面退出时执行
   */
  onUnload() {

    // 释放音乐播放器
    if (innerAudioContext) {

      innerAudioContext.destroy()

      innerAudioContext = null

    }

  }

})