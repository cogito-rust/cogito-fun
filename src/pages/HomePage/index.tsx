import { atom, useAtom } from 'jotai';
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { Link, useNavigate } from '@tanstack/react-router';

const countAtom = atom(0);

export const HomePage = () => {
  const navigate = useNavigate();
  navigate;

  const appList = [
    {
      title: 'AI',
      img: 'https://nextui.org/images/hero-card.jpeg',
      desc: '智能助手',
      link: '/ai',
    },
    {
      title: '编辑器',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: 'WEB编辑',
      link: '/editor',
    },
    {
      title: '数据源管理',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '数据编辑与处理',
      link: '/datasource',
    },
    {
      title: '配置中心',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '个人/应用/系统信息',
      link: '/settings',
    },
    {
      title: '数据中心',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '数据管理',
      link: '/data-center',
    },
    {
      title: '工具库',
      img: 'https://nextui.org/images/hero-card.jpeg',
      desc: '超级小工具',
      link: '/tools',
    },
  ];
  return (
    <section className="flex items-center justify-center h-screen w-screen">
      <div className="w-5/6 h-4/6 gap-2 grid grid-cols-2 sm:grid-cols-4">
        {appList.map((item, index) => (
          <Card
            key={index}
            isFooterBlurred
            radius="lg"
            className="border-none bg-gray-900"
          >
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={item.img}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">{item.desc}</p>
              <Link className="text-tiny text-white bg-black/20" to={item.link}>
                详情
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
