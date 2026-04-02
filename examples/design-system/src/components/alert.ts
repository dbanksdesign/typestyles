import { styles } from 'typestyles';
import { designTokens as t } from '../tokens';

export const alert = {
  root: styles.class('alert-root', {
    display: 'flex',
    alignItems: 'flex-start',
    gap: t.space[3],
    padding: t.space[4],
    borderRadius: t.radius.md,
    lineHeight: 1.55,
  }),
  subtleInfo: styles.class('alert-subtleInfo', {
    backgroundColor: `color-mix(in srgb, ${t.color.accent.default} 12%, ${t.color.background.surface})`,
    border: `1px solid color-mix(in srgb, ${t.color.accent.default} 38%, ${t.color.border.default})`,
    color: t.color.text.primary,
  }),
  subtleSuccess: styles.class('alert-subtleSuccess', {
    backgroundColor: `color-mix(in srgb, ${t.color.success.default} 14%, ${t.color.background.surface})`,
    border: `1px solid color-mix(in srgb, ${t.color.success.default} 40%, ${t.color.border.default})`,
    color: t.color.text.primary,
  }),
  subtleWarning: styles.class('alert-subtleWarning', {
    backgroundColor: `color-mix(in srgb, ${t.color.warning.default} 16%, ${t.color.background.surface})`,
    border: `1px solid color-mix(in srgb, ${t.color.warning.default} 42%, ${t.color.border.default})`,
    color: t.color.text.primary,
  }),
  subtleDanger: styles.class('alert-subtleDanger', {
    backgroundColor: `color-mix(in srgb, ${t.color.danger.default} 12%, ${t.color.background.surface})`,
    border: `1px solid color-mix(in srgb, ${t.color.danger.default} 38%, ${t.color.border.default})`,
    color: t.color.text.primary,
  }),
  subtleTip: styles.class('alert-subtleTip', {
    backgroundColor: `color-mix(in srgb, ${t.color.info.default} 12%, ${t.color.background.surface})`,
    border: `1px solid color-mix(in srgb, ${t.color.info.default} 38%, ${t.color.border.default})`,
    color: t.color.text.primary,
  }),
  solidInfo: styles.class('alert-solidInfo', {
    backgroundColor: t.color.accent.default,
    border: `1px solid ${t.color.accent.default}`,
    color: t.color.text.onAccent,
  }),
  solidSuccess: styles.class('alert-solidSuccess', {
    backgroundColor: t.color.success.solid,
    border: `1px solid ${t.color.success.solid}`,
    color: '#ffffff',
  }),
  solidDanger: styles.class('alert-solidDanger', {
    backgroundColor: t.color.danger.solid,
    border: `1px solid ${t.color.danger.solid}`,
    color: '#ffffff',
  }),
  solidWarning: styles.class('alert-solidWarning', {
    backgroundColor: t.color.warning.default,
    border: `1px solid ${t.color.warning.default}`,
    color: t.color.warning.onSolid,
  }),
  solidTip: styles.class('alert-solidTip', {
    backgroundColor: t.color.info.default,
    border: `1px solid ${t.color.info.default}`,
    color: t.color.info.onSolid,
  }),
  icon: styles.class('alert-icon', {
    flexShrink: 0,
    display: 'inline-flex',
    marginTop: '2px',
    fontSize: t.fontSize.lg,
    lineHeight: 1,
  }),
  body: styles.class('alert-body', {
    flex: 1,
    minWidth: 0,
  }),
  title: styles.class('alert-title', {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.semibold,
    margin: 0,
  }),
  titleAccentInfo: styles.class('alert-titleAccentInfo', { color: t.color.accent.default }),
  titleAccentSuccess: styles.class('alert-titleAccentSuccess', { color: t.color.success.default }),
  titleAccentWarning: styles.class('alert-titleAccentWarning', { color: t.color.warning.default }),
  titleAccentDanger: styles.class('alert-titleAccentDanger', { color: t.color.danger.default }),
  titleAccentTip: styles.class('alert-titleAccentTip', { color: t.color.info.default }),
  content: styles.class('alert-content', {
    fontSize: t.fontSize.md,
    margin: 0,
    marginTop: t.space[1],
    color: 'inherit',
  }),
  contentFlush: styles.class('alert-contentFlush', {
    marginTop: 0,
  }),
  action: styles.class('alert-action', {
    marginTop: t.space[2],
  }),
  actionLink: styles.class('alert-actionLink', {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.medium,
    color: 'inherit',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${t.color.border.focus}`,
      outlineOffset: '2px',
      borderRadius: t.radius.sm,
    },
  }),
};
