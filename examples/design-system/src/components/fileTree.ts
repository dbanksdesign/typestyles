import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

export const fileTree = {
  root: styles.class('fileTree-root', {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: t.fontSize.sm,
    lineHeight: 1.5,
    color: t.color.text.primary,
    margin: `${t.space[3]} 0`,
    padding: t.space[3],
    borderRadius: t.radius.md,
    border: `1px solid ${t.color.border.default}`,
    backgroundColor: t.color.background.subtle,
    overflowX: 'auto',
  }),
  list: styles.class('fileTree-list', {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }),
  item: styles.class('fileTree-item', {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }),
  listNested: styles.class('fileTree-listNested', {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginTop: t.space[1],
    paddingLeft: t.space[4],
    borderLeft: `1px solid ${t.color.border.default}`,
  }),
  row: styles.class('fileTree-row', {
    display: 'block',
    padding: `${t.space[1]} 0`,
    color: t.color.text.primary,
  }),
  folder: styles.class('fileTree-folder', {
    fontWeight: t.fontWeight.semibold,
    color: t.color.text.primary,
  }),
  file: styles.class('fileTree-file', {
    color: t.color.text.secondary,
  }),
};
