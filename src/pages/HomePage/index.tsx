import { Avatar, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';

import { DEFAULT_APP_LIST, Container } from './constants';

export const HomePage = () => {
  return (
    <Container>
      <div className="text-center mb-8">
        <div className="absolute right-4 top-2">
          <Link to="/settings/profile">
            <Avatar name="User" showFallback src="" />
          </Link>
        </div>
        <p className="text-5xl font-bold">Just for Fun</p>
        <p className="text-xl text-[#666] mt-3">
          In me the tiger sniffs the rose
        </p>
      </div>
      <div className="w-5/6 gap-4 grid grid-cols-2 sm:grid-cols-4">
        {DEFAULT_APP_LIST.map((item, index) => (
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
    </Container>
  );
};
