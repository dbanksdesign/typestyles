import type { ReactNode } from 'react';
import {
  Dialog as AriaDialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';
import { Button } from './Button';

const dsDialog = styles.create('ds-dialog', {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: t.color.overlay,
    display: 'grid',
    placeItems: 'center',
    padding: t.space.lg,
  },
  modal: {
    width: 'min(480px, 100%)',
    backgroundColor: t.color.surface,
    borderRadius: t.radius.lg,
    border: `1px solid ${t.color.border}`,
    boxShadow: t.shadow.md,
    padding: t.space.lg,
  },
  content: {
    display: 'grid',
    gap: t.space.md,
  },
  heading: {
    fontSize: '18px',
    fontWeight: t.font.weightSemibold,
    margin: 0,
  },
  description: {
    margin: 0,
    fontSize: t.font.sizeSm,
    color: t.color.textMuted,
  },
});

export type DialogProps = {
  triggerLabel: string;
  title: string;
  description: ReactNode;
  closeLabel?: string;
};

export function Dialog({ triggerLabel, title, description, closeLabel = 'Close' }: DialogProps) {
  return (
    <DialogTrigger>
      <Button intent="secondary">{triggerLabel}</Button>
      <ModalOverlay className={dsDialog('overlay')}>
        <Modal className={dsDialog('modal')}>
          <AriaDialog>
            {({ close }) => (
              <div className={dsDialog('content')}>
                <Heading slot="title" className={dsDialog('heading')}>
                  {title}
                </Heading>
                <p className={dsDialog('description')}>{description}</p>
                <Button onPress={close}>{closeLabel}</Button>
              </div>
            )}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
