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
    logo: "/navLogo.svg",
    author: "Kawakaze",
    authorAvatar: "/avatar.jpg",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      { text: "笔记", link: "/categories/biji/1/", icon: "Notebook" },
      { text: "小说存档", link: "/categories/xiaoshuo/1/", icon: "Archive" },
      { text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
      //{ text: 'CSDN', link: 'https://blog.csdn.net/qq_52395343?spm=1000.2115.3001.5343', icon:'Blog' },
      { text: 'Github', link: 'https://github.com/XokoukioX', icon:'LogoGithub' },
      { text: '服务器状态', link: 'https://status.0061226.xyz', icon:'Server'}
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'pte5Iy4FI2sC2Noixd54xaDq-gzGzoHsz', // your appId
        appKey: 'q9z4G1va1ix7UtnROPw8pDcP', // your appKey
      },
    },
    
    plugins: [

    //音乐播放器
    ['@vuepress-reco/vuepress-plugin-bgm-player',
      {
        audios: [
            {
                name: '강남역 4번 출구',
                artist: 'Plastic / Fallin` Dild',
                url: 'https://assets.smallsunnyfox.com/music/2.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
            },
            {
                name: '用胳膊当枕头',
                artist: '최낙타',
                url: 'https://assets.smallsunnyfox.com/music/3.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
            }
        ],
        position: {
            left: '10px',
            bottom: '10px',
            'z-index': '999999'
        },
        autoShrink: true,
        floatPosition: 'left',
        floatStyle: {
            bottom: '80px',
            'z-index': '999999'
        }
     }]
    ]
    
  })
});
