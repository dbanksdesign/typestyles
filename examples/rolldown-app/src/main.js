import {
  button,
  card,
  layoutPage,
  layoutTitle,
  layoutSubtitle,
  layoutRow,
  spinner,
} from './styles.js';

const app = globalThis.document.getElementById('app');

if (!app) {
  throw new Error('Missing #app root element.');
}

app.innerHTML = `
  <div class="${layoutPage}">
    <h1 class="${layoutTitle}">typestyles + Rolldown</h1>
    <p class="${layoutSubtitle}">
      Build mode emits static CSS with no runtime style insertion.
    </p>

    <div class="${layoutRow}">
      <button class="${button({ variant: 'hover' })}">Primary button</button>
      <div class="${spinner}" title="Loading"></div>
    </div>

    <div class="${card}">
      This card is animated using keyframes emitted to <code>typestyles.css</code>.
    </div>
  </div>
`;
