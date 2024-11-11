import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';


export default defineUserConfig({
  //cunstom config
  //END
  title: "Kawakaze's Blog",
  description: "与 你 的 日 常 , 就 是 奇 迹",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // https://github.com/vuepress-reco/vuepress-theme-reco/blob/main/packages/vuepress-theme-reco/src/types/options.ts
  theme: recoTheme({
    //Custom config
    autoSetSeries: true,
    //END
    style: "@vuepress-reco/style-default",
     primaryColor: '#93B5E3',
    logo: "/logo.png",
    author: "Kawakaze",
    authorAvatar: "/avatar.jpg",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      //{ text: "分类", link: "/Novels/", icon: "Category" },
      { text: "小说存档", link: "/categories/xiaoshuo/1/", icon: "Archive" },
      { text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
      //{ text: 'CSDN', link: 'https://blog.csdn.net/qq_52395343?spm=1000.2115.3001.5343', icon:'Blog' },
      { text: 'Github', link: 'https://github.com/XokoukioX', icon:'LogoGithub' }
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'pte5Iy4FI2sC2Noixd54xaDq-gzGzoHsz', // your appId
        appKey: 'q9z4G1va1ix7UtnROPw8pDcP', // your appKey
      },
    },
    
    plugins: [
      [
        '@vuepress-reco/vuepress-plugin-bgm-player',
        {
          audios: [
            {
              name: '友情と勇気と光の口マン',
              artist: 'sᴘᴇᴄɪ-ᴀʟʟʏ;',
              url: '/assets/audio/1.mp3',
              cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200'
            }
          ] ,
          // 是否自动播放
          autoplay: true,
          // 是否默认缩小
          autoShrink: true ,
          // 缩小时缩为哪种模式
          shrinkMode: 'float',
          // 播放器位置
          floatPosition: 'right',
          // 悬浮窗样式
          //floatStyle:{ bottom: '10px', 'z-index': '999999' }
        }
      ]
    ]
    
  })
});
