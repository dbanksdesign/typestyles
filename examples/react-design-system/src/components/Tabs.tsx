import type { ComponentProps, ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs as AriaTabs } from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

const dsTabs = styles.create('ds-tabs', {
  root: {
    display: 'grid',
    gap: t.space.md,
  },
  list: {
    display: 'inline-flex',
    gap: t.space.xs,
    borderBottom: `1px solid ${t.color.border}`,
  },
  tab: {
    border: 'none',
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    padding: `${t.space.sm} ${t.space.md}`,
    color: t.color.textMuted,
    cursor: 'pointer',
    fontSize: t.font.sizeMd,
    '&[data-selected]': {
      color: t.color.text,
      borderBottomColor: t.color.accent,
      fontWeight: t.font.weightSemibold,
    },
  },
  panel: {
    padding: t.space.md,
    backgroundColor: t.color.surfaceMuted,
    borderRadius: t.radius.md,
    border: `1px solid ${t.color.border}`,
  },
});

type TabDefinition = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = Omit<ComponentProps<typeof AriaTabs>, 'children'> & {
  tabs: TabDefinition[];
};

export function Tabs({ tabs, ...props }: TabsProps) {
  return (
    <AriaTabs {...props} className={dsTabs('root')}>
      <TabList className={dsTabs('list')}>
        {tabs.map((tab) => (
          <Tab key={tab.id} id={tab.id} className={dsTabs('tab')}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} className={dsTabs('panel')}>
          {tab.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}
