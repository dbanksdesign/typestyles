import { styles } from 'typestyles';
import { codeTheme } from './tokens';

const light = codeTheme.light;

styles.create('hljs', {
  '': {
    color: light.base,
    background: 'transparent',
    display: 'block',
    overflowX: 'auto',
  },
  '.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_':
    {
      color: light.keyword,
    },
  '.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_': {
    color: light.title,
  },
  '.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-variable,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id':
    {
      color: light.attr,
    },
  '.hljs-regexp,.hljs-string,.hljs-meta .hljs-string': {
    color: light.string,
  },
  '.hljs-built_in,.hljs-symbol': {
    color: light.builtIn,
  },
  '.hljs-comment,.hljs-code,.hljs-formula': {
    color: light.comment,
  },
  '.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo': {
    color: light.name,
  },
  '.hljs-subst': {
    color: light.base,
  },
  '.hljs-section': {
    color: light.section,
    fontWeight: 'bold',
  },
  '.hljs-bullet': {
    color: light.bullet,
  },
  '.hljs-emphasis': {
    color: light.base,
    fontStyle: 'italic',
  },
  '.hljs-strong': {
    color: light.base,
    fontWeight: 'bold',
  },
  '.hljs-addition': {
    color: light.addition,
    backgroundColor: light.additionBg,
  },
  '.hljs-deletion': {
    color: light.deletion,
    backgroundColor: light.deletionBg,
  },
});

const dark = codeTheme.dark;

styles.create('hljs-dark', {
  '.theme-docs-dark .hljs': {
    color: dark.base,
    background: 'transparent',
    display: 'block',
    overflowX: 'auto',
  },
  '.theme-docs-dark .hljs-keyword,.theme-docs-dark .hljs-meta .hljs-keyword,.theme-docs-dark .hljs-template-tag,.theme-docs-dark .hljs-template-variable,.theme-docs-dark .hljs-type,.theme-docs-dark .hljs-variable.language_':
    {
      color: dark.keyword,
    },
  '.theme-docs-dark .hljs-title,.theme-docs-dark .hljs-title.class_,.theme-docs-dark .hljs-title.class_.inherited__,.theme-docs-dark .hljs-title.function_':
    {
      color: dark.title,
    },
  '.theme-docs-dark .hljs-attr,.theme-docs-dark .hljs-attribute,.theme-docs-dark .hljs-literal,.theme-docs-dark .hljs-meta,.theme-docs-dark .hljs-number,.theme-docs-dark .hljs-operator,.theme-docs-dark .hljs-variable,.theme-docs-dark .hljs-selector-attr,.theme-docs-dark .hljs-selector-class,.theme-docs-dark .hljs-selector-id':
    {
      color: dark.attr,
    },
  '.theme-docs-dark .hljs-regexp,.theme-docs-dark .hljs-string,.theme-docs-dark .hljs-meta .hljs-string':
    {
      color: dark.string,
    },
  '.theme-docs-dark .hljs-built_in,.theme-docs-dark .hljs-symbol': {
    color: dark.builtIn,
  },
  '.theme-docs-dark .hljs-comment,.theme-docs-dark .hljs-code,.theme-docs-dark .hljs-formula': {
    color: dark.comment,
  },
  '.theme-docs-dark .hljs-name,.theme-docs-dark .hljs-quote,.theme-docs-dark .hljs-selector-tag,.theme-docs-dark .hljs-selector-pseudo':
    {
      color: dark.name,
    },
  '.theme-docs-dark .hljs-subst': {
    color: dark.base,
  },
  '.theme-docs-dark .hljs-section': {
    color: dark.section,
    fontWeight: 'bold',
  },
  '.theme-docs-dark .hljs-bullet': {
    color: dark.bullet,
  },
  '.theme-docs-dark .hljs-emphasis': {
    color: dark.base,
    fontStyle: 'italic',
  },
  '.theme-docs-dark .hljs-strong': {
    color: dark.base,
    fontWeight: 'bold',
  },
  '.theme-docs-dark .hljs-addition': {
    color: dark.addition,
    backgroundColor: dark.additionBg,
  },
  '.theme-docs-dark .hljs-deletion': {
    color: dark.deletion,
    backgroundColor: dark.deletionBg,
  },
});
