import { useEffect, useState } from 'react';
import { ydoc } from './yjs';

export const YjsPage = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const yarray = ydoc.getArray<number>('count');

    // observe changes of the sum
    yarray.observe((event) => {
      // print updates when the data changes
      console.log('event:', event);
      const sum = yarray.toArray().reduce((a: number, b: number) => a + b);
      setCount(sum);
      console.log(
        'new sum: ' + yarray.toArray().reduce((a: number, b: number) => a + b)
      );
    });

    // add 1 to the sum
    yarray.push([1]);
  }, []);

  return (
    <div>
      <h1>Yjs Page</h1>
      <h1>{count}</h1>
    </div>
  );
};
