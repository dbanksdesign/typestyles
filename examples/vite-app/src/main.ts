import { layout, button, card, spinner, badge, hint } from './styles';
import { darkTheme } from './tokens';

const app = document.getElementById('app')!;

function render() {
  app.innerHTML = `
    <div class="${layout('page')}">
      <div class="${layout('header')}">
        <h1 class="${layout('title')}">typestyles</h1>
        <p class="${layout('subtitle')}">CSS-in-TypeScript that embraces CSS instead of hiding from it</p>
      </div>

      <div class="${layout('section')}">
        <h2 class="${layout('sectionTitle')}">Buttons</h2>
        <div class="${layout('row')}">
          <button class="${button('base', 'primary')}">Primary</button>
          <button class="${button('base', 'secondary')}">Secondary</button>
          <button class="${button('base', 'outline')}">Outline</button>
          <button class="${button('base', 'primary', 'large')}">Large</button>
        </div>
      </div>

      <div class="${layout('section')}">
        <h2 class="${layout('sectionTitle')}">Cards</h2>
        <div class="${layout('row')}" style="flex-direction: column; align-items: stretch;">
          <div class="${card('base')}">
            <strong>Default card</strong>
            <p style="margin: 8px 0 0; opacity: 0.7;">Tokens provide consistent spacing and colors.</p>
          </div>
          <div class="${card('base', 'highlighted')}">
            <strong>Highlighted card</strong>
            <p style="margin: 8px 0 0; opacity: 0.7;">This card has a highlighted border using the primary color token.</p>
          </div>
        </div>
      </div>

      <div class="${layout('section')}">
        <h2 class="${layout('sectionTitle')}">Badges &amp; Spinner</h2>
        <div class="${layout('row')}">
          <span class="${badge('base', 'success')}">Success</span>
          <span class="${badge('base', 'danger')}">Error</span>
          <div class="${spinner('base')}" title="Loading spinner"></div>
        </div>
      </div>

      <div class="${layout('section')}">
        <h2 class="${layout('sectionTitle')}">Theme</h2>
        <div class="${layout('row')}">
          <button id="theme-toggle" class="${button('base', 'outline')}">Toggle dark mode</button>
        </div>
      </div>

      <div class="${hint('base')}">
        <strong>HMR Demo:</strong> Edit
        <code class="${hint('code')}">src/styles.ts</code> and save — changes appear instantly.<br />
        Try changing a color in
        <code class="${hint('code')}">src/tokens.ts</code> or an animation in
        <code class="${hint('code')}">src/animations.ts</code>.
      </div>
    </div>
  `;

  document.getElementById('theme-toggle')!.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
  });
}

render();
