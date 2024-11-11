import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

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
    // custom config
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
      //{ text: "分类", link: "/categories/qianduan/1/", icon: "Category" },
      //{ text: "标签", link: "/tags/javaScript/1/", icon: "Tag" },
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
              name: 'LOSER',
              artist: '米津玄師',
              url: 'https://github.com/XokoukioX/Blog-Vue/blob/main/assets/audio/%E5%8F%8B%E6%83%85%E3%81%A8%E5%8B%87%E6%B0%97%E3%81%A8%E5%85%89%E3%81%AE%E5%8F%A3%E3%83%9E%E3%83%B3.mp3',
              cover: 'https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200'
            }
          ] ,
          // 是否默认缩小
          autoShrink: true ,
          // 缩小时缩为哪种模式
          shrinkMode: 'float',
          // 悬浮窗样式
          floatStyle:{ bottom: '10px', 'z-index': '999999' }
        }
      ]
    ]
    
  })
});
