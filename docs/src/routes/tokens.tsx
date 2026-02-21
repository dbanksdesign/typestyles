import { createFileRoute } from '@tanstack/react-router';
import { styles } from 'typestyles';
import { color, space, font, colorLightValues, colorDarkValues } from '../tokens';
import * as palettes from '../tokens';

type Scale = Record<number, string>;

const colorScales: [string, Scale][] = [
  ['neutral', palettes.neutral],
  ['primary', palettes.primary],
  ['red', palettes.red],
  ['ruby', palettes.ruby],
  ['tomato', palettes.tomato],
  ['orange', palettes.orange],
  ['amber', palettes.amber],
  ['yellow', palettes.yellow],
  ['mint', palettes.mint],
  ['jade', palettes.jade],
  ['green', palettes.green],
  ['teal', palettes.teal],
  ['cyan', palettes.cyan],
  ['sky', palettes.sky],
  ['blue', palettes.blue],
  ['indigo', palettes.indigo],
  ['violet', palettes.violet],
  ['purple', palettes.purple],
  ['plum', palettes.plum],
  ['pink', palettes.pink],
  ['fuchsia', palettes.fuchsia],
];

const tokenNames = Object.keys(colorLightValues) as (keyof typeof colorLightValues)[];

const spaceTokens: [string, string][] = [
  ['xs', '4px'],
  ['sm', '8px'],
  ['md', '16px'],
  ['lg', '24px'],
  ['xl', '32px'],
  ['xxl', '48px'],
];

const bp = '@media (max-width: 768px)';

const s = styles.create('docs-tokens-page', {
  page: {
    paddingTop: space.xl,
    paddingBottom: space.xxl,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
    marginBottom: space.sm,
    color: color.text,
  },
  subtitle: {
    fontSize: '16px',
    color: color.textMuted,
    lineHeight: 1.6,
    marginBottom: space.xxl,
  },
  section: {
    marginBottom: space.xxl,
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.015em',
    color: color.text,
    marginBottom: space.lg,
    paddingBottom: space.sm,
    borderBottom: `1px solid ${color.border}`,
  },
  scaleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    marginBottom: '6px',
  },
  scaleName: {
    width: '72px',
    flexShrink: 0,
    fontSize: '12px',
    fontWeight: 500,
    color: color.textMuted,
    fontFamily: font.mono,
  },
  swatches: {
    display: 'flex',
    gap: '2px',
    flex: 1,
  },
  swatch: {
    flex: 1,
    aspectRatio: '1',
    borderRadius: '4px',
    minWidth: 0,
    border: '1px solid rgba(0,0,0,0.06)',
    cursor: 'default',
    position: 'relative',
  },
  stepLabels: {
    display: 'flex',
    gap: '2px',
    flex: 1,
    marginBottom: space.sm,
  },
  stepLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: 500,
    color: color.textFaint,
    fontFamily: font.mono,
  },

  semanticTable: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderRadius: '8px',
    border: `1px solid ${color.border}`,
    overflow: 'hidden',
  },
  semanticHeader: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: color.textFaint,
    padding: `${space.sm} ${space.md}`,
    borderBottom: `1px solid ${color.border}`,
    textAlign: 'left',
  },
  semanticHeaderCenter: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: color.textFaint,
    padding: `${space.sm} ${space.md}`,
    borderBottom: `1px solid ${color.border}`,
    textAlign: 'center',
  },
  semanticRow: {
    borderBottom: `1px solid ${color.border}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  semanticCell: {
    padding: `6px ${space.md}`,
    verticalAlign: 'middle',
  },
  semanticName: {
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: font.mono,
    color: color.text,
    textAlign: 'left',
    [bp]: {
      fontSize: '11px',
    },
  },
  semanticSwatchCell: {
    padding: `6px ${space.md}`,
    verticalAlign: 'middle',
  },
  semanticSwatchPair: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
  },
  semanticSwatch: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    flexShrink: 0,
  },
  semanticLightSwatch: {
    border: '1px solid rgba(0,0,0,0.08)',
  },
  semanticDarkSwatch: {
    border: '1px solid rgba(255,255,255,0.1)',
  },
  semanticSwatchValue: {
    fontSize: '10px',
    fontFamily: font.mono,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
  lightValueText: {
    color: color.textFaint,
  },
  darkValueText: {
    color: color.textFaint,
  },
  darkCell: {
    padding: `6px ${space.md}`,
    verticalAlign: 'middle',
    backgroundColor: palettes.neutral[12],
    borderLeft: `1px solid ${color.border}`,
  },
  darkCellHeader: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: `${space.sm} ${space.md}`,
    borderBottom: `1px solid ${color.border}`,
    textAlign: 'left',
    backgroundColor: palettes.neutral[12],
    color: palettes.neutral[6],
    borderLeft: `1px solid ${color.border}`,
  },

  spaceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space.md,
    marginBottom: space.sm,
  },
  spaceLabel: {
    width: '48px',
    fontSize: '13px',
    fontWeight: 500,
    color: color.textMuted,
    fontFamily: font.mono,
    textAlign: 'right',
  },
  spaceBar: {
    height: '24px',
    borderRadius: '4px',
    backgroundColor: color.primary,
    opacity: 0.7,
  },
  spaceValue: {
    fontSize: '12px',
    color: color.textFaint,
    fontFamily: font.mono,
  },
  fontSample: {
    marginBottom: space.lg,
  },
  fontName: {
    fontSize: '12px',
    fontWeight: 500,
    color: color.textFaint,
    fontFamily: font.mono,
    marginBottom: space.xs,
  },
  fontPreview: {
    fontSize: '20px',
    color: color.text,
    lineHeight: 1.5,
  },
});

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

function ColorScale({ name, scale }: { name: string; scale: Scale }) {
  return (
    <div className={s('scaleRow')}>
      <span className={s('scaleName')}>{name}</span>
      <div className={s('swatches')}>
        {steps.map((step) => (
          <div
            key={step}
            className={s('swatch')}
            style={{ backgroundColor: scale[step] }}
            title={`${name}.${step}\n${scale[step]}`}
          />
        ))}
      </div>
    </div>
  );
}

function extractVar(tokenRef: string): string {
  const match = tokenRef.match(/var\(([^)]+)\)/);
  return match ? match[1] : tokenRef;
}

function TokensPage() {
  return (
    <div className={s('page')}>
      <h1 className={s('title')}>Design Tokens</h1>
      <p className={s('subtitle')}>
        Visual reference for all color palettes, semantic tokens, and design primitives.
      </p>

      <div className={s('section')}>
        <h2 className={s('sectionTitle')}>Color Palettes</h2>
        <div className={s('scaleRow')}>
          <span className={s('scaleName')} />
          <div className={s('stepLabels')}>
            {steps.map((step) => (
              <span key={step} className={s('stepLabel')}>
                {step}
              </span>
            ))}
          </div>
        </div>
        {colorScales.map(([name, scale]) => (
          <ColorScale key={name} name={name} scale={scale} />
        ))}
      </div>

      <div className={s('section')}>
        <h2 className={s('sectionTitle')}>Semantic Tokens</h2>
        <table className={s('semanticTable')}>
          <thead>
            <tr>
              <th className={s('semanticHeader')}>Token</th>
              <th className={s('semanticHeader')}>Light</th>
              <th className={s('darkCellHeader')}>Dark</th>
            </tr>
          </thead>
          <tbody>
            {tokenNames.map((name) => (
              <tr key={name} className={s('semanticRow')}>
                <td className={`${s('semanticCell')} ${s('semanticName')}`}>{name}</td>
                <td className={s('semanticSwatchCell')}>
                  <div className={s('semanticSwatchPair')}>
                    <div
                      className={`${s('semanticSwatch')} ${s('semanticLightSwatch')}`}
                      style={{ backgroundColor: colorLightValues[name] }}
                    />
                    <span className={`${s('semanticSwatchValue')} ${s('lightValueText')}`}>
                      {colorLightValues[name]}
                    </span>
                  </div>
                </td>
                <td className={s('darkCell')}>
                  <div className={s('semanticSwatchPair')}>
                    <div
                      className={`${s('semanticSwatch')} ${s('semanticDarkSwatch')}`}
                      style={{ backgroundColor: colorDarkValues[name] }}
                    />
                    <span className={`${s('semanticSwatchValue')} ${s('darkValueText')}`}>
                      {colorDarkValues[name]}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s('section')}>
        <h2 className={s('sectionTitle')}>Space</h2>
        {spaceTokens.map(([name, value]) => (
          <div key={name} className={s('spaceRow')}>
            <span className={s('spaceLabel')}>{name}</span>
            <div className={s('spaceBar')} style={{ width: value }} />
            <span className={s('spaceValue')}>{value}</span>
          </div>
        ))}
      </div>

      <div className={s('section')}>
        <h2 className={s('sectionTitle')}>Fonts</h2>
        <div className={s('fontSample')}>
          <div className={s('fontName')}>font.sans</div>
          <div className={s('fontPreview')} style={{ fontFamily: `var(${extractVar(font.sans)})` }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
        <div className={s('fontSample')}>
          <div className={s('fontName')}>font.mono</div>
          <div className={s('fontPreview')} style={{ fontFamily: `var(${extractVar(font.mono)})` }}>
            const style = tokens.create()
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/tokens')({
  component: TokensPage,
  head: () => ({
    meta: [{ title: 'Design Tokens — typestyles' }],
  }),
});
