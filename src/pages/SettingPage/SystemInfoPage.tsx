import {
  platform,
  arch,
  exeExtension,
  family,
  hostname,
  locale,
  version,
} from '@tauri-apps/plugin-os';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { nStore } from 'src/utils/store';

export type OSInfo = {
  platform: string;
  arch: string;
  exeExtension: string | null;
  family: string;
  hostname: string | null;
  locale: string | null;
  version: string;
};

export const SystemInfoPage = () => {
  const [osInfo, setOsInfo] = useState<OSInfo>({
    platform: '-',
    arch: '-',
    exeExtension: '',
    family: '-',
    hostname: '-',
    locale: '-',
    version: '-',
  });

  const queryOsInfo = async () => {
    const cacheOsInfo: OSInfo | null = await nStore.get('os_info');

    if (cacheOsInfo) {
      setOsInfo(cacheOsInfo);
      return;
    }

    const curPlatform = await platform();
    const curArch = await arch();
    const curExeExtension = await exeExtension();
    const curFamily = await family();
    const curHostname = await hostname();
    const curLocale = await locale();
    const curVersion = await version();

    const info = {
      platform: curPlatform,
      arch: curArch,
      exeExtension: curExeExtension || '-',
      family: curFamily,
      hostname: curHostname,
      locale: curLocale,
      version: curVersion,
    };

    setOsInfo(info);
    await nStore.set('os_info', info);
    await nStore.save();
  };

  useEffect(() => {
    queryOsInfo();
  }, []);

  return (
    <div>
      <Accordion
        itemClasses={{
          title: 'text-sm',
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: 'auto',
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  easings: 'ease',
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  easings: 'ease',
                  duration: 0.25,
                },
                opacity: {
                  easings: 'ease',
                  duration: 0.3,
                },
              },
            },
          },
        }}
      >
        <AccordionItem key="platform" aria-label="platform" title="平台信息">
          <span>{osInfo.platform}</span>
        </AccordionItem>
        <AccordionItem key="arch" aria-label="arch" title="系统架构">
          <span>{osInfo.arch}</span>
        </AccordionItem>
        <AccordionItem
          key="exeExtension"
          aria-label="exeExtension"
          title="可执行文件扩展名"
        >
          <span>{osInfo.exeExtension}</span>
        </AccordionItem>
        <AccordionItem key="family" aria-label="family" title="平台信息">
          <span>{osInfo.family}</span>
        </AccordionItem>
        <AccordionItem key="hostname" aria-label="hostname" title="主机名">
          <span>{osInfo.hostname}</span>
        </AccordionItem>
        <AccordionItem key="locale" aria-label="locale" title="本地化信息">
          <span>{osInfo.locale}</span>
        </AccordionItem>
        <AccordionItem key="version" aria-label="version" title="版本信息">
          <span>{osInfo.version}</span>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
