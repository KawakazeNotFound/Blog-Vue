import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "白桃与猫",
  description: "life is like a cup of latte, and cat will make it unlonely",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // https://github.com/vuepress-reco/vuepress-theme-reco/blob/main/packages/vuepress-theme-reco/src/types/options.ts
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
     primaryColor: '#93B5E3',
    logo: "/logo.png",
    author: "illusionno",
    authorAvatar: "/avatar.jpg",
    lastUpdatedText: "最近更新",
    navbar: [
      { text: "首页", link: "/", icon: "Home" },
      { text: "分类", link: "/categories/qianduan/1/", icon: "Category" },
      { text: "标签", link: "/tags/javaScript/1/", icon: "Tag" },
      { text: '时间轴', link: '/timeline', icon: 'Time' },
      { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
      { text: 'CSDN', link: 'https://blog.csdn.net/qq_52395343?spm=1000.2115.3001.5343', icon:'Blog' },
      { text: 'Github', link: 'https://github.com/illusionno', icon:'LogoGithub' }
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'LBASBrPjFEdXbUphmWzeoJfv-gzGzoHsz', // your appId
        appKey: 'kXE2hLXZ8J0iLym26zsMh6BO', // your appKey
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
              url: 'https://www.ytmp3.cn/down/73654.mp3',
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
