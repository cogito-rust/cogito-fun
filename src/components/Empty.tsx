import { FC, ReactNode } from 'react';

export const Empty: FC<{
  title?: string;
  description?: string;
  icon?: ReactNode;
}> = (props) => {
  const { title = '暂无数据' } = props;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-gray-500">{title}</h3>
    </div>
  );
};
