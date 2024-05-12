import { atom, useAtom } from 'jotai';
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { Link, useNavigate } from '@tanstack/react-router';

const countAtom = atom(0);

export const HomePage = () => {
  // const navigate = useNavigate();

  const appList = [
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
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '定义与连接',
      link: '/datasource',
    },
    {
      title: '配置中心',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '构建与管理',
      link: '/settings',
    },
    {
      title: '数据中心',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '编排与处理',
      link: '/data-center',
    },
    {
      title: 'Sandpack',
      img: 'https://nextui.org/images/fruit-3.jpeg',
      desc: '实践与预览',
      link: '/sandpack',
    },
    {
      title: '工具库',
      img: 'https://nextui.org/images/hero-card.jpeg',
      desc: '效率与协作',
      link: '/tools',
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-5xl font-bold">Just for Fun</p>
        <p className="text-xl text-[#666] mt-3">
          In me the tiger sniffs the rose
        </p>
      </div>
      <div className="w-5/6 gap-4 grid grid-cols-2 sm:grid-cols-4">
        {appList.map((item, index) => (
          <Link key={index} to={item.link}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => console.log('item pressed')}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.desc}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
