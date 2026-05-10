// SUN美SPA Landing Page Content
// Aesthetic: warm ivory + honey gold + coral, editorial mincho headlines

const PALETTES = {
  honey: {
    bg: '#F7EFDF',
    bgAlt: '#F1E4C9',
    ink: '#2B2014',
    inkSoft: '#5A4A38',
    accent: '#B7813A',
    accentSoft: '#E0B872',
    coral: '#E0998A',
    line: 'rgba(43,32,20,0.14)',
  },
  ivory: {
    bg: '#FBF7EE',
    bgAlt: '#F0E6D2',
    ink: '#231C12',
    inkSoft: '#6A5A46',
    accent: '#C2904A',
    accentSoft: '#E8C994',
    coral: '#E5A99A',
    line: 'rgba(35,28,18,0.12)',
  },
  blush: {
    bg: '#FAEFE7',
    bgAlt: '#F2DCC9',
    ink: '#2A1D17',
    inkSoft: '#705445',
    accent: '#B97755',
    accentSoft: '#E5B496',
    coral: '#DC8E78',
    line: 'rgba(42,29,23,0.13)',
  },
};

const FONTS = {
  classic: { jp: '"Shippori Mincho", serif', display: '"Italiana", serif', sans: '"Jost", sans-serif' },
  modern:  { jp: '"Zen Old Mincho", serif', display: '"Cormorant Garamond", serif', sans: '"Jost", sans-serif' },
  soft:    { jp: '"Noto Serif JP", serif', display: '"Marcellus", serif', sans: '"Jost", sans-serif' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "honey",
  "fontSet": "classic",
  "showStickyCTA": true,
  "darkSections": true
}/*EDITMODE-END*/;

// ───────── Reusable bits ─────────
function ImagePlaceholder({ label, ratio = '4/5', tone = 'warm', style = {} }) {
  const tones = {
    warm: { a: '#E5C895', b: '#D9B173' },
    cool: { a: '#EFD7B6', b: '#E2BD8A' },
    coral:{ a: '#EFC7B7', b: '#E0998A' },
    deep: { a: '#9F7438', b: '#7A5524' },
  };
  const t = tones[tone] || tones.warm;
  return (
    <div style={{
      aspectRatio: ratio, width: '100%',
      background: `repeating-linear-gradient(135deg, ${t.a} 0 14px, ${t.b} 14px 28px)`,
      position: 'relative', overflow: 'hidden',
      borderRadius: 2,
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18))',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 10, letterSpacing: 1.2, color: 'rgba(255,255,255,0.92)',
          padding: '4px 8px', background: 'rgba(0,0,0,0.28)',
          borderRadius: 999,
        }}>{label}</div>
      </div>
    </div>
  );
}

function Sun({ size = 64, color = '#B7813A', stroke = 0.7 }) {
  // tiny radiating-sun mark, used as a logomark
  const rays = Array.from({ length: 12 });
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ display: 'block' }}>
      <circle cx="0" cy="0" r="14" fill="none" stroke={color} strokeWidth={stroke} />
      {rays.map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(a) * 20, y1 = Math.sin(a) * 20;
        const x2 = Math.cos(a) * 34, y2 = Math.sin(a) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={stroke} strokeLinecap="round" />;
      })}
    </svg>
  );
}

function SectionLabel({ num, en, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: '"Jost", sans-serif', fontSize: 11,
      letterSpacing: 3, textTransform: 'uppercase', color,
    }}>
      <span style={{ opacity: 0.55 }}>{num}</span>
      <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.4 }} />
      <span>{en}</span>
    </div>
  );
}

function CTAButton({ children, primary, P, icon, onClick, full }) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none', border: 'none', cursor: 'pointer',
        width: full ? '100%' : 'auto',
        padding: '15px 22px',
        borderRadius: 999,
        fontFamily: '"Jost", sans-serif',
        fontSize: 14, fontWeight: 500, letterSpacing: 1.2,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: primary ? P.ink : 'transparent',
        color: primary ? P.bg : P.ink,
        boxShadow: primary
          ? `inset 0 0 0 1px ${P.ink}`
          : `inset 0 0 0 1px ${P.ink}`,
        transition: 'transform 0.2s ease, background 0.2s ease',
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {icon}
      <span>{children}</span>
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke={primary ? P.bg : P.ink} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

function LineIcon({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h3v3l4-3h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"
        stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IGIcon({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.4"/>
      <circle cx="17.5" cy="6.5" r="1.1" fill={color}/>
    </svg>
  );
}

// ───────── Sections ─────────
function Hero({ P, F }) {
  return (
    <section style={{
      background: P.bg, color: P.ink,
      padding: '36px 22px 44px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Sun motif top right */}
      <div style={{ position: 'absolute', top: 28, right: -40, opacity: 0.5 }}>
        <Sun size={180} color={P.accent} stroke={0.5} />
      </div>

      {/* tiny brand row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sun size={22} color={P.accent} stroke={1} />
          <div style={{
            fontFamily: F.display, fontSize: 18, letterSpacing: 1.5, color: P.ink,
          }}>SUN美SPA</div>
        </div>
        <div style={{
          fontFamily: '"Jost", sans-serif', fontSize: 10,
          letterSpacing: 2, color: P.inkSoft, textTransform: 'uppercase',
        }}>Ebisu · Tokyo</div>
      </div>

      <SectionLabel num="01" en="Welcome" color={P.inkSoft} />

      {/* Display headline mixing JP serif + small EN */}
      <h1 style={{
        margin: '20px 0 0',
        fontFamily: F.jp, fontWeight: 500,
        fontSize: 32, lineHeight: 1.45, letterSpacing: 0.5,
        color: P.ink, textWrap: 'pretty',
      }}>
        肩こり、頭痛、<br/>
        バストの悩みまで。<br/>
        <span style={{ color: P.accent, fontFamily: F.display, fontWeight: 400, fontStyle: 'italic', fontSize: 30, letterSpacing: 1 }}>太陽のように、</span><br/>
        明るく、美しく整う<br/>
        恵比寿のプライベートサロン。
      </h1>

      <p style={{
        marginTop: 22,
        fontFamily: F.jp, fontSize: 13.5, lineHeight: 1.95,
        color: P.inkSoft, letterSpacing: 0.3,
      }}>
        年間約1,000名を施術する講師兼セラピストが、<br/>
        あなたの身体と心に寄り添い、<br/>
        軽やかで自信の持てる毎日へ導きます。
      </p>

      {/* photo placeholder */}
      <div style={{ marginTop: 28, position: 'relative' }}>
        <ImagePlaceholder label="HERO · soft daylight portrait" ratio="4/5" tone="warm" />
        {/* facts strip overlap */}
        <div style={{
          position: 'absolute', bottom: -22, left: 14, right: 14,
          background: P.bg,
          padding: '14px 16px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 4, columnGap: 14, rowGap: 10,
          border: `1px solid ${P.line}`,
          fontFamily: F.jp, fontSize: 11.5, color: P.ink, lineHeight: 1.4,
        }}>
          <Fact label="Therapist" value="Harubon 齋藤" P={P} F={F} />
          <Fact label="Access" value="恵比寿駅 徒歩2分" P={P} F={F} />
          <Fact label="Style" value="完全予約制プライベート" P={P} F={F} />
          <Fact label="Contact" value="LINE / Instagram DM" P={P} F={F} />
        </div>
      </div>

      <div style={{ height: 36 }} />

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        <CTAButton primary P={P} full icon={<LineIcon color={P.bg} />}>公式LINEで予約・相談する</CTAButton>
        <CTAButton P={P} full icon={<IGIcon color={P.ink} />}>Instagramを見る</CTAButton>
      </div>
    </section>
  );
}

function Fact({ label, value, P, F }) {
  return (
    <div>
      <div style={{
        fontFamily: '"Jost", sans-serif', fontSize: 9, letterSpacing: 2,
        textTransform: 'uppercase', color: P.accent, marginBottom: 3,
      }}>{label}</div>
      <div style={{ fontFamily: F.jp, fontSize: 12, color: P.ink }}>{value}</div>
    </div>
  );
}

function AboutSaito({ P, F }) {
  return (
    <section style={{ background: P.bgAlt, color: P.ink, padding: '60px 22px 56px' }}>
      <SectionLabel num="02" en="About Harubon" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 24,
        fontFamily: F.jp, fontWeight: 500, fontSize: 24, lineHeight: 1.55, letterSpacing: 0.4,
      }}>
        <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>"明るく、健康で、美しく。"</span><br/>
        その人らしい毎日を<br/>取り戻すお手伝いを<br/>しています
      </h2>

      {/* portrait + signature */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 12, marginBottom: 26 }}>
        <ImagePlaceholder label="Saito · portrait" ratio="3/4" tone="deep" />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <ImagePlaceholder label="hands · technique" ratio="1/1" tone="warm" />
          <div style={{
            marginTop: 10, padding: '10px 12px',
            border: `1px solid ${P.line}`,
            fontFamily: F.display, fontStyle: 'italic',
            fontSize: 18, color: P.accent, letterSpacing: 0.6,
            textAlign: 'center',
          }}>Harubon</div>
        </div>
      </div>

      <p style={{
        fontFamily: F.jp, fontSize: 13, lineHeight: 2, color: P.ink, marginBottom: 14,
        letterSpacing: 0.3,
      }}>
        年間約1,000名のお客様に施術をさせていただいている齋藤です。
        SUN美SPAでは、肩こりや頭痛、睡眠の質、バストの悩み、身体の重だるさなど、
        女性が日々感じている不調やコンプレックスに寄り添っています。
      </p>
      <p style={{
        fontFamily: F.jp, fontSize: 13, lineHeight: 2, color: P.inkSoft,
        letterSpacing: 0.3,
      }}>
        太陽のように明るく、そして健康で美しくいられるように。
        一人ひとりのお悩みや身体の状態に合わせて、施術だけでなく、
        日常のケアまで丁寧にサポートします。
      </p>

      {/* Stats grid */}
      <div style={{
        marginTop: 30,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderTop: `1px solid ${P.line}`,
        borderLeft: `1px solid ${P.line}`,
      }}>
        {[
          ['1,000', '名／年の施術実績'],
          ['5,000', '名へのトータル施術'],
          ['99', '%のリピート率（人気メニュー）'],
          ['Lecturer', '講師としても活動'],
        ].map(([n, l], i) => (
          <div key={i} style={{
            padding: '18px 14px',
            borderRight: `1px solid ${P.line}`,
            borderBottom: `1px solid ${P.line}`,
          }}>
            <div style={{
              fontFamily: F.display, fontSize: 30, fontWeight: 400,
              color: P.accent, lineHeight: 1, letterSpacing: 0.5,
            }}>{n}</div>
            <div style={{
              marginTop: 8, fontFamily: F.jp, fontSize: 11.5,
              color: P.inkSoft, lineHeight: 1.5,
            }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Concerns({ P, F }) {
  const items = [
    '背中や肩こりがつらい',
    '頭が重い、ズキズキする',
    '身体が重く、だるさが抜けない',
    '睡眠の質が悪い',
    '猫背や巻き肩が気になる',
    'バストに自信が持てない',
    '産後やダイエット後のバスト変化',
    '自律神経の乱れ・ストレス',
    '眼精疲労、首こり、肩こり',
    '更年期、PMS、生理痛など',
    '冷え、代謝の悪さ、むくみ',
  ];
  return (
    <section style={{ background: P.ink, color: P.bg, padding: '60px 22px 56px' }}>
      <SectionLabel num="03" en="Concerns" color={P.accentSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 26,
        fontFamily: F.jp, fontWeight: 500, fontSize: 22, lineHeight: 1.7, color: P.bg,
      }}>
        我慢している不調や、<br/>
        誰にも言いづらい悩みを<br/>
        <span style={{ color: P.accentSoft, fontFamily: F.display, fontStyle: 'italic', fontWeight: 400 }}>そろそろ、</span>本気で整えませんか？
      </h2>

      <ul style={{
        listStyle: 'none', padding: 0, margin: 0,
        display: 'grid', gridTemplateColumns: '1fr',
        borderTop: `1px solid rgba(255,255,255,0.18)`,
      }}>
        {items.map((t, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 4px',
            borderBottom: `1px solid rgba(255,255,255,0.12)`,
            fontFamily: F.jp, fontSize: 13.5, color: P.bg,
            letterSpacing: 0.3,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 99,
              background: P.accentSoft, flexShrink: 0,
            }} />
            <span style={{ flex: 1 }}>{t}</span>
            <span style={{
              fontFamily: '"Jost", sans-serif', fontSize: 10,
              opacity: 0.4, letterSpacing: 1,
            }}>{String(i + 1).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>

      <p style={{
        marginTop: 28,
        fontFamily: F.jp, fontSize: 13, lineHeight: 1.95,
        color: 'rgba(255,255,255,0.78)', letterSpacing: 0.4,
      }}>
        SUN美SPAでは、身体のつらさと美容の悩みを分けずに、
        <span style={{ color: P.accentSoft }}>"あなた全体"</span>
        を見ながら整えていきます。
      </p>
    </section>
  );
}

function MenuCard({ idx, en, jp, sub, price, initialPrice, body, points, ctaLabel, P, F, accentColor, expanded, onToggle, image }) {
  const open = expanded;
  return (
    <div style={{
      background: P.bg, border: `1px solid ${P.line}`,
      marginBottom: 16,
    }}>
      {/* image header */}
      <div style={{ position: 'relative' }}>
        <ImagePlaceholder label={image} ratio="16/10" tone={accentColor === 'coral' ? 'coral' : 'warm'} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: '"Jost", sans-serif', fontSize: 10, letterSpacing: 2,
          background: P.ink, color: P.bg,
          padding: '4px 8px', textTransform: 'uppercase',
        }}>No. {idx}</div>
      </div>

      <div style={{ padding: '20px 18px 22px' }}>
        <div style={{
          fontFamily: F.display, fontStyle: 'italic', fontSize: 14,
          color: P.accent, letterSpacing: 1, marginBottom: 6,
        }}>{en}</div>
        <h3 style={{
          margin: 0, fontFamily: F.jp, fontWeight: 500,
          fontSize: 20, lineHeight: 1.5, color: P.ink, letterSpacing: 0.4,
        }}>{jp}</h3>
        {sub && <p style={{
          marginTop: 10, marginBottom: 0,
          fontFamily: F.jp, fontSize: 12.5, lineHeight: 1.85,
          color: P.inkSoft,
        }}>{sub}</p>}

        {/* price block */}
        <div style={{
          marginTop: 18, padding: '14px 0',
          borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`,
          display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: '"Jost", sans-serif', fontSize: 9, letterSpacing: 2,
              color: P.inkSoft, textTransform: 'uppercase',
            }}>初回体験</div>
            <div style={{
              fontFamily: F.display, fontSize: 26, color: P.accent, lineHeight: 1,
              marginTop: 4,
            }}>¥{initialPrice}</div>
          </div>
          <div style={{ width: 1, height: 30, background: P.line }} />
          <div>
            <div style={{
              fontFamily: '"Jost", sans-serif', fontSize: 9, letterSpacing: 2,
              color: P.inkSoft, textTransform: 'uppercase',
            }}>通常</div>
            <div style={{
              fontFamily: F.jp, fontSize: 14, color: P.inkSoft, lineHeight: 1,
              marginTop: 6, textDecoration: 'line-through', opacity: 0.7,
            }}>¥{price}</div>
          </div>
        </div>

        {/* expandable details */}
        <button
          onClick={onToggle}
          style={{
            marginTop: 16, width: '100%', textAlign: 'left',
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '10px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: '"Jost", sans-serif', fontSize: 12, letterSpacing: 1.5,
            color: P.ink, textTransform: 'uppercase',
          }}
        >
          <span>{open ? 'Hide details' : 'View details'}</span>
          <span style={{
            transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
            fontSize: 18, lineHeight: 1, color: P.accent,
          }}>＋</span>
        </button>
        <div style={{
          maxHeight: open ? 1200 : 0, overflow: 'hidden',
          transition: 'max-height 0.5s ease',
        }}>
          <p style={{
            fontFamily: F.jp, fontSize: 12.5, lineHeight: 2,
            color: P.inkSoft, margin: '6px 0 14px',
          }}>{body}</p>
          {points && (
            <div>
              <div style={{
                fontFamily: '"Jost", sans-serif', fontSize: 10, letterSpacing: 2,
                color: P.accent, marginBottom: 8, textTransform: 'uppercase',
              }}>For these concerns</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {points.map((p, i) => (
                  <li key={i} style={{
                    fontFamily: F.jp, fontSize: 12.5, lineHeight: 1.8,
                    color: P.ink, padding: '4px 0',
                    display: 'flex', gap: 8,
                  }}>
                    <span style={{ color: P.accent }}>—</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ marginTop: 18 }}>
          <CTAButton P={P} full>{ctaLabel}</CTAButton>
        </div>
      </div>
    </div>
  );
}

function MenuSection({ P, F }) {
  const [open, setOpen] = React.useState({ 0: true });
  const menus = [
    {
      en: 'Tenshi-no-Hane Relax · 90min',
      jp: '天使の羽リラク 90分',
      sub: 'リピート率99%。肩・背中・頭の重さをふわっと軽くする人気コース。',
      price: '24,200', initialPrice: '16,500',
      body: 'ラジオ波、EMS、吸引、ハンドマッサージを組み合わせ、背中・肩・首まわりのこわばりを丁寧にゆるめていく人気コースです。肩こり、頭の重さ、猫背、巻き肩、睡眠の質の低下などにお悩みの方におすすめです。',
      points: ['背中、肩こりが辛い', '身体が重い、だるい', '睡眠の質が悪い', '頭が重い、ズキズキする', '猫背、巻き肩が気になる'],
      ctaLabel: '天使の羽リラクを相談する',
      image: 'back & shoulders, soft light',
    },
    {
      en: 'Bust-up Care · Trial',
      jp: 'バストアップ施術体験',
      sub: 'バストの悩みを、ひとりで抱え込まないでください。',
      price: '26,500', initialPrice: '16,500',
      body: '長年のバストへのコンプレックス、産後やダイエット後の変化、下着選びの迷いなど、女性にとって繊細な悩みを丁寧にサポートします。検索しても何が正しいかわからない、豊胸までは踏み切れない、でも自分の身体にもっと自信を持ちたい。そんな方に向けた、相談しやすいバストケアメニューです。',
      points: ['子供っぽいバストに自信が持てない', 'バストケア情報を調べすぎて迷子', '豊胸も検討したけど諦めた', 'ダイエットでバストがなくなった', '産後にバストが削げてしまった', '下着の選び方がわからない', 'ふっくらした印象を目指したい'],
      ctaLabel: 'バストアップ施術を相談する',
      image: 'silhouette · soft fabric',
      accentColor: 'coral',
    },
    {
      en: 'Holistic Beauty Program',
      jp: 'ホリスティックビューティプログラム',
      sub: '痩せるだけではなく、巡り・姿勢・美しさまで整えるダイエットコース。',
      price: '26,500', initialPrice: '20,000',
      body: '身体の重さ、代謝の低下、冷え、むくみなど、表面的なダイエットだけでは変わりにくいお悩みにアプローチ。健康的で美しい身体づくりを目指す方に向けたプログラムです。',
      points: ['代謝が落ちてきた', 'むくみ・冷えが気になる', '姿勢から整えたい', '健康的に痩せたい'],
      ctaLabel: 'ダイエットコースを相談する',
      image: 'morning movement',
    },
  ];
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '60px 18px 40px' }}>
      <div style={{ padding: '0 4px' }}>
        <SectionLabel num="04" en="Signature Menus" color={P.inkSoft} />
        <h2 style={{
          marginTop: 18, marginBottom: 26,
          fontFamily: F.jp, fontWeight: 500, fontSize: 24, lineHeight: 1.5,
          letterSpacing: 0.4,
        }}>
          <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Signature</span><br/>
          ──寄り添うように整える、<br/>
          人気の3つのメニュー。
        </h2>
      </div>
      {menus.map((m, i) => (
        <MenuCard key={i} idx={String(i + 1).padStart(2, '0')} {...m} P={P} F={F}
          expanded={!!open[i]} onToggle={() => setOpen({ ...open, [i]: !open[i] })} />
      ))}
    </section>
  );
}

function HeadSpa({ P, F }) {
  const items = ['自律神経の乱れ', 'ストレス', '頭がズキズキする', '眼精疲労', 'ホルモンバランス、更年期', '生理痛、PMS', '頭、肩、首こり', 'やる気が出ない、だるい', '顔のたるみ、むくみ'];
  return (
    <section style={{
      background: `linear-gradient(180deg, ${P.bgAlt} 0%, ${P.bg} 100%)`,
      color: P.ink, padding: '60px 22px 56px',
    }}>
      <SectionLabel num="07" en="Brain Reset Head Spa" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 22,
        fontFamily: F.jp, fontWeight: 500, fontSize: 24, lineHeight: 1.55, letterSpacing: 0.4,
      }}>
        頭・心・身体を<br/>
        ふっとゆるめる、<br/>
        <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Brain Reset.</span><br/>
        脳リセットドライヘッドスパ
      </h2>

      <ImagePlaceholder label="dry head spa · scalp work" ratio="16/10" tone="deep" />

      <p style={{
        marginTop: 22, fontFamily: F.jp, fontSize: 13, lineHeight: 2,
        color: P.inkSoft,
      }}>
        自律神経の乱れ、ストレス、頭の重さ、眼精疲労、首肩こり、
        やる気の出なさなどに。忙しい毎日で緊張し続けている頭と身体を、
        深くリセットする定番人気メニューです。
      </p>

      <div style={{
        marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 6,
      }}>
        {items.map((t, i) => (
          <span key={i} style={{
            padding: '6px 12px',
            background: P.bg,
            border: `1px solid ${P.line}`,
            borderRadius: 999,
            fontFamily: F.jp, fontSize: 11.5, color: P.ink,
          }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

function Options({ P, F }) {
  const opts = [
    { en: 'Yomogi Steaming', jp: 'よもぎ蒸し', desc: '冷え性、婦人科系のお悩み、代謝、デトックス、妊活サポートに。', img: 'herbal steam · close-up' },
    { en: 'Gut Therapy · 30min', jp: '腸セラピー 30分', desc: 'お腹まわりの張りや巡りが気になる方に。', img: 'gentle abdominal work' },
    { en: 'Foot Reflexology · 45min', jp: '足ツボ 45分', desc: '足の疲れ、むくみ、全身の巡りを整えたい方に。', img: 'foot · oil' },
  ];
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '40px 22px 56px' }}>
      <SectionLabel num="08" en="Add-on Options" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 24,
        fontFamily: F.jp, fontWeight: 500, fontSize: 22, lineHeight: 1.6, letterSpacing: 0.4,
      }}>
        その日の状態に合わせて<br/>選べるオプション
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
        {opts.map((o, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '110px 1fr', gap: 14,
            border: `1px solid ${P.line}`, padding: 12,
          }}>
            <ImagePlaceholder label={o.img} ratio="1/1" tone={i === 1 ? 'coral' : 'warm'} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                fontFamily: F.display, fontStyle: 'italic', fontSize: 12,
                color: P.accent, letterSpacing: 1, marginBottom: 4,
              }}>{o.en}</div>
              <div style={{ fontFamily: F.jp, fontSize: 15, color: P.ink, fontWeight: 500 }}>{o.jp}</div>
              <div style={{
                marginTop: 6, fontFamily: F.jp, fontSize: 11.5,
                lineHeight: 1.7, color: P.inkSoft,
              }}>{o.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Course({ P, F }) {
  return (
    <section style={{ background: P.ink, color: P.bg, padding: '60px 22px 56px' }}>
      <SectionLabel num="09" en="Practitioner Course" color={P.accentSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 22,
        fontFamily: F.jp, fontWeight: 500, fontSize: 22, lineHeight: 1.7, color: P.bg,
        letterSpacing: 0.4,
      }}>
        家族のために。<br/>
        サロンメニューに。<br/>
        開業の一歩に。<br/>
        <span style={{ color: P.accentSoft, fontFamily: F.display, fontStyle: 'italic', fontWeight: 400 }}>リピートされる、</span><br/>
        ドライヘッドスパを学ぶ
      </h2>

      <p style={{
        fontFamily: F.jp, fontSize: 13, lineHeight: 2, color: 'rgba(255,255,255,0.82)',
        marginBottom: 24,
      }}>
        約5,000名のお客様に施術してきた経験から生まれた、
        リピート率の高いSUN美SPAのドライヘッドスパ。
        家族を癒したい方、サロンのオプションに加えたい方、
        ドライヘッドスパで開業したい方まで、目的に合わせて学べる講座です。
      </p>

      {/* course detail card */}
      <div style={{
        border: '1px solid rgba(255,255,255,0.18)',
        padding: '20px 18px',
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: F.display, fontStyle: 'italic', fontSize: 14,
          color: P.accentSoft, letterSpacing: 1,
        }}>Main Course</div>
        <div style={{
          marginTop: 4, fontFamily: F.jp, fontWeight: 500, fontSize: 17, color: P.bg,
        }}>脳リセットドライヘッドスパ ヘッド45分</div>

        <dl style={{ marginTop: 18, marginBottom: 0, display: 'grid', gap: 10 }}>
          {[
            ['Schedule', '5〜6時間 × 2日間'],
            ['Tuition', '受講料 ¥99,000'],
            ['Inclusion', '施術料 ¥11,000相当の内容'],
            ['Open dates', '12月2日 / 12月12日'],
          ].map(([k, v], i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr', gap: 10,
              paddingBottom: 10,
              borderBottom: i === 3 ? 'none' : '1px solid rgba(255,255,255,0.12)',
            }}>
              <dt style={{
                fontFamily: '"Jost", sans-serif', fontSize: 10,
                letterSpacing: 2, color: P.accentSoft, textTransform: 'uppercase',
                paddingTop: 2,
              }}>{k}</dt>
              <dd style={{ margin: 0, fontFamily: F.jp, fontSize: 13, color: P.bg, lineHeight: 1.6 }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div style={{
        border: '1px solid rgba(255,255,255,0.18)',
        padding: '16px 18px', marginBottom: 22,
      }}>
        <div style={{
          fontFamily: F.display, fontStyle: 'italic', fontSize: 13,
          color: P.accentSoft, letterSpacing: 1,
        }}>Optional Bundle</div>
        <div style={{
          marginTop: 4, fontFamily: F.jp, fontWeight: 500, fontSize: 15, color: P.bg, lineHeight: 1.6,
        }}>ドライヘッド + 足つぼも一緒に</div>
        <div style={{
          marginTop: 8, fontFamily: F.jp, fontSize: 12, color: 'rgba(255,255,255,0.7)',
        }}>2日 × 5時間 / ¥88,000</div>
      </div>

      <div style={{
        fontFamily: F.jp, fontSize: 11, color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8, marginBottom: 22,
      }}>
        ※支払：銀行振込 / クレジットカード一括（手数料3.25%）<br/>
        ※振込手数料は受講者負担
      </div>

      <button style={{
        appearance: 'none', border: '1px solid rgba(255,255,255,0.4)',
        background: 'transparent', color: P.bg,
        padding: '15px 22px', borderRadius: 999,
        width: '100%', cursor: 'pointer',
        fontFamily: '"Jost", sans-serif', fontSize: 13, letterSpacing: 1.2,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        <LineIcon color={P.bg} />
        講座について公式LINEで相談する
      </button>
    </section>
  );
}

function WhyUs({ P, F }) {
  const reasons = [
    ['01', '年間約1,000名の施術実績', '多くのお客様の身体に触れてきた経験から、一人ひとりに合わせた施術を行います。'],
    ['02', 'リピート率99%の人気メニュー', '天使の羽リラクをはじめ、継続して通いたくなる技術と満足感を大切にしています。'],
    ['03', '講師としても活動する専門性', '施術者としてだけでなく、技術を伝える講師としても活動しています。'],
    ['04', '女性の繊細な悩みに寄り添う', 'バスト、PMS、更年期、産後の変化など、相談しづらい悩みも安心して話せる空間です。'],
    ['05', '恵比寿駅徒歩2分のプライベートサロン', '駅近で通いやすく、完全予約制の隠れ家空間でゆっくり過ごせます。'],
  ];
  return (
    <section style={{ background: P.bgAlt, color: P.ink, padding: '60px 22px 56px' }}>
      <SectionLabel num="10" en="Why SUN美SPA" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 28,
        fontFamily: F.jp, fontWeight: 500, fontSize: 24, lineHeight: 1.5, letterSpacing: 0.4,
      }}>
        SUN美SPAが<br/>選ばれる理由。
      </h2>
      {reasons.map(([n, t, d], i) => (
        <div key={i} style={{
          padding: '22px 0', borderTop: `1px solid ${P.line}`,
          borderBottom: i === reasons.length - 1 ? `1px solid ${P.line}` : 'none',
          display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12,
        }}>
          <div style={{
            fontFamily: F.display, fontStyle: 'italic', fontSize: 22,
            color: P.accent, lineHeight: 1, paddingTop: 2,
          }}>{n}</div>
          <div>
            <h3 style={{
              margin: 0, fontFamily: F.jp, fontWeight: 500,
              fontSize: 16, color: P.ink, letterSpacing: 0.3, lineHeight: 1.5,
            }}>{t}</h3>
            <p style={{
              margin: '8px 0 0', fontFamily: F.jp, fontSize: 12.5,
              color: P.inkSoft, lineHeight: 1.85,
            }}>{d}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Booking({ P, F }) {
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '60px 22px 50px' }}>
      <SectionLabel num="11" en="Booking" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 22,
        fontFamily: F.jp, fontWeight: 500, fontSize: 22, lineHeight: 1.7, letterSpacing: 0.4,
      }}>
        ご予約・お問い合わせは<br/>
        <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>LINE</span> または <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Instagram DM</span> から
      </h2>
      <p style={{
        fontFamily: F.jp, fontSize: 13, lineHeight: 2, color: P.inkSoft, marginBottom: 24,
      }}>
        メニュー選びに迷っている方も、まずはお気軽にご相談ください。
        お身体の状態やお悩みに合わせて、おすすめのメニューをご案内します。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CTAButton primary P={P} full icon={<LineIcon color={P.bg} />}>公式LINEで問い合わせる</CTAButton>
        <CTAButton P={P} full icon={<IGIcon color={P.ink} />}>Instagram DMで相談する</CTAButton>
      </div>
    </section>
  );
}

function Access({ P, F }) {
  return (
    <section style={{ background: P.bgAlt, color: P.ink, padding: '60px 22px 56px' }}>
      <SectionLabel num="12" en="Access" color={P.inkSoft} />
      <h2 style={{
        marginTop: 18, marginBottom: 22,
        fontFamily: F.display, fontWeight: 400, fontSize: 38, lineHeight: 1, letterSpacing: 1,
        color: P.ink, fontStyle: 'italic',
      }}>Access.</h2>

      {/* mock map */}
      <div style={{
        position: 'relative', aspectRatio: '4/3', width: '100%',
        background: P.bg, border: `1px solid ${P.line}`, marginBottom: 22,
        backgroundImage: `linear-gradient(${P.line} 1px, transparent 1px), linear-gradient(90deg, ${P.line} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        overflow: 'hidden',
      }}>
        {/* roads */}
        <div style={{ position: 'absolute', left: '8%', right: '8%', top: '52%', height: 18, background: P.bg, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}` }} />
        <div style={{ position: 'absolute', top: '8%', bottom: '8%', left: '38%', width: 14, background: P.bg, borderLeft: `1px solid ${P.line}`, borderRight: `1px solid ${P.line}` }} />
        {/* station */}
        <div style={{
          position: 'absolute', left: '14%', top: '54%',
          fontFamily: '"Jost", sans-serif', fontSize: 9, letterSpacing: 1.5,
          color: P.inkSoft, textTransform: 'uppercase',
        }}>Ebisu Stn.</div>
        {/* pin */}
        <div style={{
          position: 'absolute', left: '54%', top: '34%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            background: P.ink, color: P.bg, padding: '4px 9px',
            fontFamily: F.display, fontStyle: 'italic', fontSize: 12,
            letterSpacing: 0.5, whiteSpace: 'nowrap',
          }}>SUN美SPA</div>
          <div style={{
            width: 0, height: 0, borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent', borderTop: `8px solid ${P.ink}`,
          }} />
          <div style={{ width: 8, height: 8, borderRadius: 99, background: P.accent, marginTop: -3, boxShadow: `0 0 0 4px ${P.bg}` }} />
        </div>
      </div>

      <dl style={{ margin: 0, display: 'grid', gap: 14 }}>
        {[
          ['Salon', 'SUN美SPA'],
          ['Address', '東京都渋谷区恵比寿1-7-4\nハイライフ恵比寿 203号室'],
          ['Access', '恵比寿駅 西口改札から徒歩2分\n餃子ダンダダンの向かいのマンション'],
        ].map(([k, v], i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '88px 1fr',
            paddingBottom: 14, borderBottom: `1px solid ${P.line}`,
          }}>
            <dt style={{
              fontFamily: '"Jost", sans-serif', fontSize: 10,
              letterSpacing: 2, color: P.accent, textTransform: 'uppercase',
              paddingTop: 2,
            }}>{k}</dt>
            <dd style={{ margin: 0, fontFamily: F.jp, fontSize: 13, color: P.ink, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{v}</dd>
          </div>
        ))}
      </dl>

      <div style={{
        marginTop: 22, padding: 16,
        background: P.bg, border: `1px dashed ${P.accent}`,
        fontFamily: F.jp, fontSize: 12, lineHeight: 1.85, color: P.inkSoft,
      }}>
        <div style={{
          fontFamily: '"Jost", sans-serif', fontSize: 10,
          letterSpacing: 2, color: P.accent, textTransform: 'uppercase', marginBottom: 6,
        }}>Note for first visit</div>
        プライベートサロンのため、看板は出ておりません。
        日中は廊下の電気が付いていないため暗い場合があります。
        203号室でインターホンを押してください。<br/>
        ご予約時間の<strong style={{ color: P.ink }}>5分前</strong>から入室可能です。
      </div>
    </section>
  );
}

function Cancel({ P, F }) {
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '40px 22px' }}>
      <SectionLabel num="13" en="Cancel Policy" color={P.inkSoft} />
      <h2 style={{
        marginTop: 14, marginBottom: 14,
        fontFamily: F.display, fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: P.ink,
      }}>Cancel Policy.</h2>
      <p style={{
        fontFamily: F.jp, fontSize: 12.5, lineHeight: 2, color: P.inkSoft, margin: 0,
      }}>
        前日・当日のキャンセルは、キャンセル料として
        <span style={{ color: P.ink, fontWeight: 600 }}> ¥5,500 </span>
        を頂戴いたします。ご予約の変更・キャンセルがある場合は、できるだけ早めにご連絡ください。
      </p>
    </section>
  );
}

function FinalCTA({ P, F }) {
  return (
    <section style={{
      background: `linear-gradient(180deg, ${P.bgAlt} 0%, ${P.bg} 100%)`,
      color: P.ink, padding: '80px 22px 100px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 30, right: -50, opacity: 0.4 }}>
        <Sun size={220} color={P.accent} stroke={0.5} />
      </div>
      <SectionLabel num="14" en="Last Word" color={P.inkSoft} />
      <h2 style={{
        marginTop: 22, marginBottom: 22,
        fontFamily: F.jp, fontWeight: 500, fontSize: 28, lineHeight: 1.55,
        letterSpacing: 0.4, position: 'relative',
      }}>
        身体も心も、<br/>
        <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>もっと、</span>軽く。<br/>
        あなたらしい美しさを<br/>
        SUN美SPAで整えませんか？
      </h2>
      <p style={{
        fontFamily: F.jp, fontSize: 13, lineHeight: 2, color: P.inkSoft,
        marginBottom: 28, position: 'relative',
      }}>
        肩こり、頭痛、バストのお悩み、睡眠の質、女性特有の不調まで。
        まずは今のお悩みを、公式LINEまたはInstagram DMから
        お気軽にご相談ください。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        <CTAButton primary P={P} full icon={<LineIcon color={P.bg} />}>公式LINEで予約・相談する</CTAButton>
        <CTAButton P={P} full icon={<IGIcon color={P.ink} />}>Instagramを見る</CTAButton>
      </div>
    </section>
  );
}

function Footer({ P, F }) {
  return (
    <footer style={{
      background: P.ink, color: P.bg, padding: '36px 22px 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Sun size={28} color={P.accentSoft} stroke={1} />
        <div style={{ fontFamily: F.display, fontSize: 22, letterSpacing: 1.5, fontStyle: 'italic' }}>SUN美SPA</div>
      </div>
      <p style={{
        margin: 0, fontFamily: F.jp, fontSize: 11, lineHeight: 1.85,
        color: 'rgba(255,255,255,0.6)',
      }}>
        Harubon · 講師 兼 セラピスト<br/>
        東京都渋谷区恵比寿1-7-4 ハイライフ恵比寿 203<br/>
        恵比寿駅 徒歩2分 · 完全予約制プライベートサロン
      </p>
      <div style={{
        marginTop: 24, paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.14)',
        fontFamily: '"Jost", sans-serif', fontSize: 9, letterSpacing: 2,
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
      }}>© SUN美SPA · Harubon</div>
    </footer>
  );
}

// ───────── Sticky bottom CTA ─────────
function StickyCTA({ P, F, visible }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      transform: visible ? 'translateY(0)' : 'translateY(120%)',
      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
      padding: '10px 12px 28px',
      background: `linear-gradient(180deg, transparent 0%, ${P.bg} 30%)`,
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 30,
    }}>
      <div style={{
        background: P.ink, color: P.bg,
        padding: '10px 12px',
        borderRadius: 999,
        display: 'flex', gap: 8, alignItems: 'center',
        boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
      }}>
        <button style={{
          flex: 1, appearance: 'none', border: 'none', cursor: 'pointer',
          background: P.accent, color: P.ink,
          padding: '11px 12px', borderRadius: 999,
          fontFamily: '"Jost", sans-serif', fontSize: 12, letterSpacing: 1.2, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <LineIcon size={14} color={P.ink} /> LINEで相談
        </button>
        <button style={{
          appearance: 'none', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
          background: 'transparent', color: P.bg,
          padding: '11px 14px', borderRadius: 999,
          fontFamily: '"Jost", sans-serif', fontSize: 12, letterSpacing: 1.2,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <IGIcon size={14} color={P.bg} /> DM
        </button>
      </div>
    </div>
  );
}

// ───────── Main App ─────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const P = PALETTES[tweaks.palette] || PALETTES.honey;
  const F = FONTS[tweaks.fontSet] || FONTS.classic;
  const scrollRef = React.useRef(null);
  const [showCTA, setShowCTA] = React.useState(false);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowCTA(el.scrollTop > 600);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // dark sections opt-in
  const concernsBg = tweaks.darkSections ? P.ink : P.bgAlt;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', padding: 24, background: '#1a1410' }}>
      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks · SUN美SPA">
        <TweakSection label="Palette">
          <TweakRadio
            label="Color world"
            value={tweaks.palette}
            options={['honey', 'ivory', 'blush']}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>
        <TweakSection label="Type">
          <TweakRadio
            label="Font set"
            value={tweaks.fontSet}
            options={['classic', 'modern', 'soft']}
            onChange={(v) => setTweak('fontSet', v)}
          />
        </TweakSection>
        <TweakSection label="Behavior">
          <TweakToggle label="Sticky bottom CTA" value={tweaks.showStickyCTA} onChange={(v) => setTweak('showStickyCTA', v)} />
          <TweakToggle label="Dark concerns section" value={tweaks.darkSections} onChange={(v) => setTweak('darkSections', v)} />
        </TweakSection>
      </TweaksPanel>

      <IOSDevice width={402} height={874}>
        <div ref={scrollRef} style={{
          height: '100%', overflowY: 'auto', overflowX: 'hidden',
          background: P.bg,
          position: 'relative',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{ height: 54 }} />{/* status bar spacer */}
          <Hero P={P} F={F} />
          <AboutSaito P={P} F={F} />
          <div style={{ background: tweaks.darkSections ? P.ink : P.bgAlt }}>
            <Concerns P={tweaks.darkSections ? P : { ...P, ink: P.bgAlt, bg: P.ink }} F={F} />
          </div>
          <MenuSection P={P} F={F} />
          <HeadSpa P={P} F={F} />
          <Options P={P} F={F} />
          <Course P={P} F={F} />
          <WhyUs P={P} F={F} />
          <Booking P={P} F={F} />
          <Access P={P} F={F} />
          <Cancel P={P} F={F} />
          <FinalCTA P={P} F={F} />
          <Footer P={P} F={F} />
          <div style={{ height: tweaks.showStickyCTA ? 90 : 40, background: P.ink }} />
        </div>
        {tweaks.showStickyCTA && <StickyCTA P={P} F={F} visible={showCTA} />}
      </IOSDevice>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
