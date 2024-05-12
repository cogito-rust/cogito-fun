import { Input, Divider } from '@nextui-org/react';
import { useState } from 'react';
import { chain } from './lang-chain';

export const GropAI = () => {
  const [value, setValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSendPrompt = async () => {
    if (!value) return;
    setIsGenerating(true);
    try {
      const response = await chain.stream({
        input: value,
      });
      let res = '';
      for await (const item of response) {
        res += item;
        setAnswer(res);
      }
    } catch (e) {
      console.log('AI generation error:', e);
    } finally {
      setIsGenerating(false);
      setValue('');
    }
  };
  return (
    <div className="flex flex-col min-h-[400px] min-w-[600px]">
      <div className="flex-1 overflow-auto">{answer}</div>
      <Divider orientation="horizontal" className="my-3" />
      <div className="px-3">
        <Input
          label="Prompt"
          placeholder="请输入你的问题"
          radius="md"
          isClearable
          value={value}
          onValueChange={setValue}
          disabled={isGenerating}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt();
            }
          }}
          endContent={
            <div
              className="pointer-events-none flex items-center"
              onClick={handleSendPrompt}
            >
              <span className="text-default-400 text-small">发送</span>
            </div>
          }
        />
      </div>
      {/* Add more content here */}
    </div>
  );
};
