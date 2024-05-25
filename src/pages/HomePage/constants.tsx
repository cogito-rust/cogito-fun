import styled from 'styled-components';

export const DEFAULT_APP_LIST = [
  {
    title: 'AI中心',
    img: 'https://nextui.org/images/fruit-1.jpeg',
    desc: '智能与创造',
    link: '/ai',
  },
  {
    title: '编辑器',
    img: 'https://nextui.org/images/fruit-3.jpeg',
    desc: '编码与专注',
    link: '/editor',
  },
  {
    title: '数据源',
    img: 'https://nextui.org/images/fruit-4.jpeg',
    desc: '定义与连接',
    link: '/datasource',
  },
  {
    title: '配置中心',
    img: 'https://nextui.org/images/fruit-5.jpeg',
    desc: '构建与管理',
    link: '/settings',
  },
  {
    title: '数据中心',
    img: 'https://nextui.org/images/fruit-6.jpeg',
    desc: '编排与处理',
    link: '/data-center',
  },
  {
    title: 'Sandpack',
    img: 'https://nextui.org/images/fruit-7.jpeg',
    desc: '实践与预览',
    link: '/sandpack',
  },
  {
    title: '工具库',
    img: 'https://nextui.org/images/fruit-8.jpeg',
    desc: '效率与协作',
    link: '/tools',
  },
  {
    title: '监控中心',
    img: 'https://nextui.org/images/fruit-2.jpeg',
    desc: '安全与运营',
    link: '/monitor',
  },
];

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
`;
