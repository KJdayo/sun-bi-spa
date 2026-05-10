// SUN美SPA — Desktop Landing Page
// Editorial layout, warm ivory + honey gold + coral

const PALETTES_D = {
  honey: { bg: '#F7EFDF', bgAlt: '#F1E4C9', ink: '#2B2014', inkSoft: '#5A4A38', accent: '#B7813A', accentSoft: '#E0B872', coral: '#E0998A', line: 'rgba(43,32,20,0.14)' },
  ivory: { bg: '#FBF7EE', bgAlt: '#F0E6D2', ink: '#231C12', inkSoft: '#6A5A46', accent: '#C2904A', accentSoft: '#E8C994', coral: '#E5A99A', line: 'rgba(35,28,18,0.12)' },
  blush: { bg: '#FAEFE7', bgAlt: '#F2DCC9', ink: '#2A1D17', inkSoft: '#705445', accent: '#B97755', accentSoft: '#E5B496', coral: '#DC8E78', line: 'rgba(42,29,23,0.13)' },
};
const FONTS_D = {
  classic: { jp: '"Shippori Mincho", serif', display: '"Italiana", serif', sans: '"Jost", sans-serif' },
  modern:  { jp: '"Zen Old Mincho", serif',  display: '"Cormorant Garamond", serif', sans: '"Jost", sans-serif' },
  soft:    { jp: '"Noto Serif JP", serif',   display: '"Marcellus", serif', sans: '"Jost", sans-serif' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "honey",
  "fontSet": "classic"
}/*EDITMODE-END*/;

// ── Sample images (Unsplash) ────────────────────────────────────────
const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const IMG = {
  hero:      U('1540555700478-4be289fbecef'),  // woman in white robe, spa
  portrait:  U('1544161515-4ab6ce6db874'),     // asian woman portrait
  hands:     U('1519823551278-64ac92734fb1'),  // hands / massage
  interior:  U('1600334129128-685c5582fd35'),  // massage / interior
  shoulder:  U('1591343395082-e120087004b4'),  // back / shoulder work
  bust:      U('1515377905703-c4788e51af15'),  // soft / spa stones
  holistic:  U('1571019613454-1cb2f99b2d8b'),  // yoga / movement
  headSpa:   U('1556228852-80b6e5eeff06'),     // head / scalp
  yomogi:    U('1556228720-195a672e8a03'),     // herbs / wellness
  gut:       U('1610465299996-30f240ac2b1c'),  // gentle abdomen / care
  foot:      U('1519415943484-9fa1873496d4'),  // foot / oil
};

// ── Bits ─────────────────────────────────────────────────────────────
function ImgPH({ label, ratio = '4/5', tone = 'warm', style = {}, src }) {
  if (src) {
    return (
      <div style={{ aspectRatio: ratio, width: '100%', position: 'relative', overflow: 'hidden', background: '#E5C895', ...style }}>
        <img src={src} alt={label || ''} loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  const tones = { warm: { a: '#E5C895', b: '#D9B173' }, coral:{ a: '#EFC7B7', b: '#E0998A' }, deep: { a: '#9F7438', b: '#7A5524' }, soft: { a: '#EFD7B6', b: '#E2BD8A' } };
  const t = tones[tone] || tones.warm;
  return (
    <div style={{ aspectRatio: ratio, width: '100%', position: 'relative', overflow: 'hidden', background: `repeating-linear-gradient(135deg, ${t.a} 0 16px, ${t.b} 16px 32px)`, ...style }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18))' }}>
        <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, letterSpacing: 1.4, color: 'rgba(255,255,255,0.95)', padding: '5px 10px', background: 'rgba(0,0,0,0.30)', borderRadius: 999 }}>{label}</div>
      </div>
    </div>
  );
}

function SunMark({ size = 64, color, stroke = 0.7 }) {
  const rays = Array.from({ length: 12 });
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ display: 'block' }}>
      <circle cx="0" cy="0" r="14" fill="none" stroke={color} strokeWidth={stroke} />
      {rays.map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <line key={i} x1={Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={Math.cos(a) * 34} y2={Math.sin(a) * 34} stroke={color} strokeWidth={stroke} strokeLinecap="round" />;
      })}
    </svg>
  );
}

function SLabel({ num, en, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"Jost", sans-serif', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color }}>
      <span style={{ opacity: 0.6 }}>{num}</span>
      <span style={{ width: 28, height: 1, background: 'currentColor', opacity: 0.4 }} />
      <span>{en}</span>
    </div>
  );
}

function Btn({ children, primary, P, icon, full, size = 'md' }) {
  const pad = size === 'lg' ? '18px 28px' : '14px 22px';
  const fs  = size === 'lg' ? 14 : 13;
  return (
    <button style={{
      appearance: 'none', border: 'none', cursor: 'pointer',
      width: full ? '100%' : 'auto',
      padding: pad, borderRadius: 999,
      fontFamily: '"Jost", sans-serif', fontSize: fs, fontWeight: 500, letterSpacing: 1.4,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      background: primary ? P.ink : 'transparent', color: primary ? P.bg : P.ink,
      boxShadow: `inset 0 0 0 1px ${P.ink}`,
      transition: 'transform 0.2s, background 0.2s, color 0.2s',
    }}
      onMouseEnter={(e)=>{ if(!primary){ e.currentTarget.style.background = P.ink; e.currentTarget.style.color = P.bg; }}}
      onMouseLeave={(e)=>{ if(!primary){ e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = P.ink; }}}
    >
      {icon}
      <span>{children}</span>
      <svg width="16" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
    </button>
  );
}

function LineI({ size = 16, color }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M19 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h3v3l4-3h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/></svg>; }
function IGI({ size = 16, color }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.4"/><circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.4"/><circle cx="17.5" cy="6.5" r="1.1" fill={color}/></svg>; }

// ── Sections ─────────────────────────────────────────────────────────
function Nav({ P, F }) {
  const items = [['About', 'about'], ['Menu', 'menu'], ['Course', 'course'], ['Why', 'why'], ['Access', 'access']];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 56px',
      background: `${P.bg}f0`, backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${P.line}`,
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <SunMark size={26} color={P.accent} stroke={1} />
        <span style={{ fontFamily: F.display, fontSize: 22, letterSpacing: 1.5, color: P.ink, fontStyle: 'italic' }}>SUN美SPA</span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {items.map(([l, id]) => (
          <a key={id} href={`#${id}`} style={{
            fontFamily: '"Jost", sans-serif', fontSize: 12, letterSpacing: 2.5,
            textTransform: 'uppercase', color: P.inkSoft, textDecoration: 'none',
          }}>{l}</a>
        ))}
        <Btn primary P={P} icon={<LineI color={P.bg} />}>LINEで予約</Btn>
      </div>
    </nav>
  );
}

function Hero({ P, F }) {
  return (
    <section id="top" style={{ background: P.bg, color: P.ink, padding: '60px 56px 110px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 80, right: -80, opacity: 0.32 }}>
        <SunMark size={420} color={P.accent} stroke={0.35} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'end', position: 'relative' }}>
        <div>
          <SLabel num="01" en="Welcome to SUN美SPA" color={P.inkSoft} />
          <h1 style={{
            margin: '32px 0 0',
            fontFamily: F.jp, fontWeight: 500,
            fontSize: 'clamp(40px, 4.6vw, 72px)', lineHeight: 1.35,
            letterSpacing: 0.5, color: P.ink, textWrap: 'pretty',
          }}>
            肩こり、頭痛、<br/>
            バストの悩みまで。<br/>
            <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400, fontSize: '0.9em' }}>太陽のように、</span><br/>
            明るく、美しく整う<br/>
            恵比寿のプライベートサロン。
          </h1>
          <p style={{
            marginTop: 36, maxWidth: 520,
            fontFamily: F.jp, fontSize: 16, lineHeight: 2.05, color: P.inkSoft, letterSpacing: 0.4,
          }}>
            年間約1,000名を施術する講師兼セラピストが、
            あなたの身体と心に寄り添い、
            軽やかで自信の持てる毎日へ導きます。
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
            <Btn primary P={P} size="lg" icon={<LineI color={P.bg} />}>公式LINEで予約・相談する</Btn>
            <Btn P={P} size="lg" icon={<IGI color={P.ink} />}>Instagramを見る</Btn>
          </div>
          <div style={{
            marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${P.line}`, paddingTop: 22, gap: 18,
          }}>
            {[
              ['Therapist', 'Harubon 齋藤'],
              ['Access', '恵比寿駅 徒歩2分'],
              ['Style', '完全予約制'],
              ['Contact', 'LINE / IG DM'],
            ].map(([k, v], i) => (
              <div key={i}>
                <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: P.accent, marginBottom: 6 }}>{k}</div>
                <div style={{ fontFamily: F.jp, fontSize: 13, color: P.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <ImgPH src={IMG.hero} label="hero" ratio="4/5" />
        </div>
      </div>
    </section>
  );
}

function About({ P, F }) {
  return (
    <section id="about" style={{ background: P.bgAlt, color: P.ink, padding: '120px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <ImgPH src={IMG.portrait} label="Saito" ratio="3/4" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <ImgPH src={IMG.hands} label="technique" ratio="1/1" />
            <ImgPH src={IMG.interior} label="interior" ratio="1/1" />
          </div>
        </div>
        <div>
          <SLabel num="02" en="About Harubon" color={P.inkSoft} />
          <h2 style={{
            marginTop: 28, marginBottom: 36,
            fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 2.6vw, 40px)',
            lineHeight: 1.55, letterSpacing: 0.4,
          }}>
            <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>"明るく、健康で、美しく。"</span><br/>
            その人らしい毎日を取り戻す<br/>お手伝いをしています。
          </h2>
          <p style={{ fontFamily: F.jp, fontSize: 16, lineHeight: 2.1, color: P.ink, marginBottom: 18, letterSpacing: 0.3 }}>
            年間約1,000名のお客様に施術をさせていただいている齋藤です。
            SUN美SPAでは、肩こりや頭痛、睡眠の質、バストの悩み、身体の重だるさなど、
            女性が日々感じている不調やコンプレックスに寄り添っています。
          </p>
          <p style={{ fontFamily: F.jp, fontSize: 15, lineHeight: 2.1, color: P.inkSoft, letterSpacing: 0.3 }}>
            太陽のように明るく、そして健康で美しくいられるように。
            一人ひとりのお悩みや身体の状態に合わせて、施術だけでなく、
            日常のケアまで丁寧にサポートします。
          </p>

          <div style={{
            marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${P.line}`,
          }}>
            {[
              ['1,000', '名／年の施術実績'],
              ['5,000', '名へのトータル施術'],
              ['99', '%のリピート率'],
              ['Lecturer', '講師として活動'],
            ].map(([n, l], i) => (
              <div key={i} style={{ padding: '24px 18px 0 0', borderRight: i === 3 ? 'none' : `1px solid ${P.line}`, paddingLeft: i === 0 ? 0 : 22 }}>
                <div style={{ fontFamily: F.display, fontSize: 38, color: P.accent, lineHeight: 1, letterSpacing: 0.5, fontWeight: 400 }}>{n}</div>
                <div style={{ marginTop: 10, fontFamily: F.jp, fontSize: 12, color: P.inkSoft, lineHeight: 1.6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Concerns({ P, F }) {
  const items = [
    '背中や肩こりがつらい', '頭が重い、ズキズキする',
    '身体が重く、だるさが抜けない', '睡眠の質が悪い',
    '猫背や巻き肩が気になる', 'バストに自信が持てない',
    '産後やダイエット後のバスト変化', '自律神経の乱れ・ストレス',
    '眼精疲労、首こり、肩こり', '更年期、PMS、生理痛など',
    '冷え、代謝の悪さ、むくみ',
  ];
  return (
    <section style={{ background: P.ink, color: P.bg, padding: '120px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
        <div>
          <SLabel num="03" en="Concerns" color={P.accentSoft} />
          <h2 style={{
            marginTop: 28,
            fontFamily: F.jp, fontWeight: 500,
            fontSize: 'clamp(26px, 2.4vw, 36px)', lineHeight: 1.55, letterSpacing: 0.4, color: P.bg,
          }}>
            我慢している不調や、<br/>
            誰にも言いづらい悩みを<br/>
            <span style={{ color: P.accentSoft, fontFamily: F.display, fontStyle: 'italic', fontWeight: 400 }}>そろそろ、</span>本気で整えませんか？
          </h2>
          <p style={{ marginTop: 28, fontFamily: F.jp, fontSize: 14, lineHeight: 2, color: 'rgba(255,255,255,0.78)' }}>
            SUN美SPAでは、身体のつらさと美容の悩みを分けずに、
            <span style={{ color: P.accentSoft }}>"あなた全体"</span>
            を見ながら整えていきます。
          </p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          {items.map((t, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '18px 8px',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              paddingLeft: i % 2 === 0 ? 0 : 18,
              fontFamily: F.jp, fontSize: 14.5, color: P.bg, letterSpacing: 0.3,
            }}>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, opacity: 0.45, letterSpacing: 1, minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: P.accentSoft, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MenuRow({ idx, en, jp, sub, body, points, price, initialPrice, image, src, tone, P, F, reverse }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      marginBottom: 90,
    }}>
      <div style={{ order: reverse ? 2 : 1 }}>
        <ImgPH src={src} label={image} ratio="4/3" tone={tone} />
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
          <span style={{ fontFamily: F.display, fontStyle: 'italic', fontSize: 50, color: P.accent, lineHeight: 1, fontWeight: 400 }}>{idx}</span>
          <div style={{ width: 40, height: 1, background: P.line }} />
          <span style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: P.inkSoft }}>{en}</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: F.jp, fontWeight: 500, fontSize: 30, lineHeight: 1.5, color: P.ink, letterSpacing: 0.4 }}>{jp}</h3>
        {sub && <p style={{ marginTop: 12, fontFamily: F.jp, fontSize: 15, lineHeight: 1.85, color: P.inkSoft }}>{sub}</p>}
        <p style={{ marginTop: 18, fontFamily: F.jp, fontSize: 14.5, lineHeight: 2, color: P.inkSoft }}>{body}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
          {points.slice(0, 5).map((p, i) => (
            <span key={i} style={{
              padding: '6px 14px', border: `1px solid ${P.line}`, borderRadius: 999,
              fontFamily: F.jp, fontSize: 12, color: P.ink,
            }}>{p}</span>
          ))}
        </div>

        <div style={{
          marginTop: 28, padding: '18px 0',
          borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`,
          display: 'flex', alignItems: 'baseline', gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 10, letterSpacing: 2, color: P.inkSoft, textTransform: 'uppercase' }}>初回体験</div>
            <div style={{ fontFamily: F.display, fontSize: 36, color: P.accent, lineHeight: 1, marginTop: 6 }}>¥{initialPrice}</div>
          </div>
          <div style={{ width: 1, height: 36, background: P.line }} />
          <div>
            <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 10, letterSpacing: 2, color: P.inkSoft, textTransform: 'uppercase' }}>通常</div>
            <div style={{ fontFamily: F.jp, fontSize: 16, color: P.inkSoft, marginTop: 8, textDecoration: 'line-through', opacity: 0.7 }}>¥{price}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Btn P={P}>相談する</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menus({ P, F }) {
  const menus = [
    { en: 'Tenshi-no-Hane Relax · 90min', jp: '天使の羽リラク 90分',
      sub: 'リピート率99%。肩・背中・頭の重さをふわっと軽くする人気コース。',
      price: '24,200', initialPrice: '16,500',
      body: 'ラジオ波、EMS、吸引、ハンドマッサージを組み合わせ、背中・肩・首まわりのこわばりを丁寧にゆるめていく人気コースです。肩こり、頭の重さ、猫背、巻き肩、睡眠の質の低下などにお悩みの方におすすめです。',
      points: ['背中、肩こり', '身体の重さ・だるさ', '睡眠の質', '頭の重さ', '猫背、巻き肩'],
      image: 'back & shoulders', src: IMG.shoulder, tone: 'warm' },
    { en: 'Bust-up Care · Trial', jp: 'バストアップ施術体験',
      sub: 'バストの悩みを、ひとりで抱え込まないでください。',
      price: '26,500', initialPrice: '16,500',
      body: '長年のバストへのコンプレックス、産後やダイエット後の変化、下着選びの迷いなど、女性にとって繊細な悩みを丁寧にサポートします。検索しても何が正しいかわからない、豊胸までは踏み切れない、でも自分の身体にもっと自信を持ちたい。そんな方に向けた、相談しやすいバストケアメニューです。',
      points: ['バストへの自信', '産後の変化', 'ダイエット後の変化', '下着選び', 'ふっくら印象'],
      image: 'soft care', src: IMG.bust, tone: 'coral' },
    { en: 'Holistic Beauty Program', jp: 'ホリスティックビューティプログラム',
      sub: '痩せるだけではなく、巡り・姿勢・美しさまで整えるダイエットコース。',
      price: '26,500', initialPrice: '20,000',
      body: '身体の重さ、代謝の低下、冷え、むくみなど、表面的なダイエットだけでは変わりにくいお悩みにアプローチ。健康的で美しい身体づくりを目指す方に向けたプログラムです。',
      points: ['代謝', 'むくみ・冷え', '姿勢', '健康的に痩せる'],
      image: 'movement', src: IMG.holistic, tone: 'soft' },
  ];
  return (
    <section id="menu" style={{ background: P.bg, color: P.ink, padding: '120px 56px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
        <div>
          <SLabel num="04" en="Signature Menus" color={P.inkSoft} />
          <h2 style={{
            marginTop: 22,
            fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 2.8vw, 44px)',
            lineHeight: 1.45, letterSpacing: 0.4,
          }}>
            <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Signature.</span><br/>
            寄り添うように整える、人気の3つのメニュー。
          </h2>
        </div>
        <div style={{ maxWidth: 360, fontFamily: F.jp, fontSize: 14, lineHeight: 2, color: P.inkSoft }}>
          全メニュー、初回体験価格あり。回数券・サブスクのご用意もございます。詳細はLINEまたはInstagram DMからお気軽にご相談ください。
        </div>
      </div>
      {menus.map((m, i) => (
        <MenuRow key={i} idx={String(i + 1).padStart(2, '0')} {...m} P={P} F={F} reverse={i % 2 === 1} />
      ))}
    </section>
  );
}

function HeadSpa({ P, F }) {
  const items = ['自律神経の乱れ', 'ストレス', '頭痛', '眼精疲労', 'ホルモンバランス', '更年期', '生理痛・PMS', '頭肩首こり', 'やる気が出ない', '顔のたるみ・むくみ'];
  return (
    <section style={{ background: `linear-gradient(180deg, ${P.bgAlt} 0%, ${P.bg} 100%)`, color: P.ink, padding: '120px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80, alignItems: 'center' }}>
        <ImgPH src={IMG.headSpa} label="dry head spa" ratio="5/4" />
        <div>
          <SLabel num="07" en="Brain Reset Head Spa" color={P.inkSoft} />
          <h2 style={{
            marginTop: 28,
            fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.5, letterSpacing: 0.4,
          }}>
            頭・心・身体を<br/>ふっとゆるめる、<br/>
            <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Brain Reset.</span><br/>
            脳リセットドライヘッドスパ
          </h2>
          <p style={{ marginTop: 24, fontFamily: F.jp, fontSize: 15, lineHeight: 2.1, color: P.inkSoft }}>
            自律神経の乱れ、ストレス、頭の重さ、眼精疲労、首肩こり、
            やる気の出なさなどに。忙しい毎日で緊張し続けている頭と身体を、
            深くリセットする定番人気メニューです。
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {items.map((t, i) => (
              <span key={i} style={{
                padding: '8px 14px', background: P.bg, border: `1px solid ${P.line}`,
                borderRadius: 999, fontFamily: F.jp, fontSize: 12.5, color: P.ink,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Options({ P, F }) {
  const opts = [
    { en: 'Yomogi Steaming', jp: 'よもぎ蒸し', desc: '冷え性、婦人科系のお悩み、代謝、デトックス、妊活サポートに。', src: IMG.yomogi, tone: 'warm' },
    { en: 'Gut Therapy · 30min', jp: '腸セラピー 30分', desc: 'お腹まわりの張りや巡りが気になる方に。', src: IMG.gut, tone: 'coral' },
    { en: 'Foot Reflexology · 45min', jp: '足ツボ 45分', desc: '足の疲れ、むくみ、全身の巡りを整えたい方に。', src: IMG.foot, tone: 'soft' },
  ];
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '60px 56px 120px' }}>
      <div style={{ marginBottom: 56 }}>
        <SLabel num="08" en="Add-on Options" color={P.inkSoft} />
        <h2 style={{ marginTop: 22, fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(26px, 2.4vw, 36px)', lineHeight: 1.5, letterSpacing: 0.4 }}>
          その日の状態に合わせて選べるオプション
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {opts.map((o, i) => (
          <div key={i} style={{ border: `1px solid ${P.line}`, padding: 24 }}>
            <ImgPH src={o.src} label={o.en} ratio="4/3" tone={o.tone} />
            <div style={{ marginTop: 18, fontFamily: F.display, fontStyle: 'italic', fontSize: 14, color: P.accent, letterSpacing: 1 }}>{o.en}</div>
            <div style={{ marginTop: 6, fontFamily: F.jp, fontSize: 20, color: P.ink, fontWeight: 500, letterSpacing: 0.4 }}>{o.jp}</div>
            <div style={{ marginTop: 12, fontFamily: F.jp, fontSize: 13.5, lineHeight: 1.85, color: P.inkSoft }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Course({ P, F }) {
  return (
    <section id="course" style={{ background: P.ink, color: P.bg, padding: '120px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>
        <div>
          <SLabel num="09" en="Practitioner Course" color={P.accentSoft} />
          <h2 style={{
            marginTop: 28,
            fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.55, letterSpacing: 0.4, color: P.bg,
          }}>
            家族のために。<br/>サロンメニューに。<br/>開業の一歩に。<br/>
            <span style={{ color: P.accentSoft, fontFamily: F.display, fontStyle: 'italic', fontWeight: 400 }}>リピートされる、</span><br/>
            ドライヘッドスパを学ぶ。
          </h2>
          <p style={{ marginTop: 28, fontFamily: F.jp, fontSize: 15, lineHeight: 2.1, color: 'rgba(255,255,255,0.82)' }}>
            約5,000名のお客様に施術してきた経験から生まれた、
            リピート率の高いSUN美SPAのドライヘッドスパ。
            家族を癒したい方、サロンのオプションに加えたい方、
            ドライヘッドスパで開業したい方まで、目的に合わせて学べる講座です。
          </p>
        </div>
        <div>
          <div style={{ border: '1px solid rgba(255,255,255,0.18)', padding: 32, marginBottom: 18 }}>
            <div style={{ fontFamily: F.display, fontStyle: 'italic', fontSize: 16, color: P.accentSoft, letterSpacing: 1 }}>Main Course</div>
            <div style={{ marginTop: 6, fontFamily: F.jp, fontWeight: 500, fontSize: 22, color: P.bg, letterSpacing: 0.4 }}>脳リセットドライヘッドスパ ヘッド45分</div>
            <dl style={{ marginTop: 24, marginBottom: 0, display: 'grid', gap: 14 }}>
              {[
                ['Schedule', '5〜6時間 × 2日間'],
                ['Tuition', '受講料 ¥99,000'],
                ['Inclusion', '施術料 ¥11,000相当の内容'],
                ['Open dates', '12月2日 / 12月12日'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16,
                  paddingBottom: 14, borderBottom: i === 3 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}>
                  <dt style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, color: P.accentSoft, textTransform: 'uppercase', paddingTop: 2 }}>{k}</dt>
                  <dd style={{ margin: 0, fontFamily: F.jp, fontSize: 14.5, color: P.bg, lineHeight: 1.6 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.18)', padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: F.display, fontStyle: 'italic', fontSize: 14, color: P.accentSoft, letterSpacing: 1 }}>Optional Bundle</div>
              <div style={{ marginTop: 4, fontFamily: F.jp, fontWeight: 500, fontSize: 17, color: P.bg }}>ドライヘッド + 足つぼ</div>
              <div style={{ marginTop: 4, fontFamily: F.jp, fontSize: 12.5, color: 'rgba(255,255,255,0.7)' }}>2日 × 5時間</div>
            </div>
            <div style={{ fontFamily: F.display, fontSize: 24, color: P.accentSoft, letterSpacing: 0.5 }}>¥88,000</div>
          </div>
          <div style={{ fontFamily: F.jp, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 24 }}>
            ※支払：銀行振込 / クレジットカード一括（手数料3.25%）<br/>
            ※振込手数料は受講者負担
          </div>
          <Btn P={{ ...P, ink: P.bg, bg: 'transparent' }} icon={<LineI color={P.bg} />}>講座について公式LINEで相談する</Btn>
        </div>
      </div>
    </section>
  );
}

function WhyUs({ P, F }) {
  const reasons = [
    ['01', '年間約1,000名の施術実績', '多くのお客様の身体に触れてきた経験から、一人ひとりに合わせた施術を行います。'],
    ['02', 'リピート率99%の人気メニュー', '天使の羽リラクをはじめ、継続して通いたくなる技術と満足感を大切にしています。'],
    ['03', '講師としても活動する専門性', '施術者としてだけでなく、技術を伝える講師としても活動しています。'],
    ['04', '女性の繊細な悩みに寄り添う', 'バスト、PMS、更年期、産後の変化など、相談しづらい悩みも安心して話せる空間です。'],
    ['05', '恵比寿駅徒歩2分の隠れ家', '駅近で通いやすく、完全予約制のプライベート空間でゆっくり過ごせます。'],
  ];
  return (
    <section id="why" style={{ background: P.bgAlt, color: P.ink, padding: '120px 56px' }}>
      <div style={{ marginBottom: 64 }}>
        <SLabel num="10" en="Why SUN美SPA" color={P.inkSoft} />
        <h2 style={{ marginTop: 22, fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 2.8vw, 44px)', lineHeight: 1.5, letterSpacing: 0.4 }}>
          <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Why us.</span> SUN美SPAが選ばれる理由。
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: `1px solid ${P.line}` }}>
        {reasons.map(([n, t, d], i) => (
          <div key={i} style={{
            padding: '32px 22px 36px',
            borderRight: i === reasons.length - 1 ? 'none' : `1px solid ${P.line}`,
            borderBottom: `1px solid ${P.line}`,
          }}>
            <div style={{ fontFamily: F.display, fontStyle: 'italic', fontSize: 32, color: P.accent, lineHeight: 1, fontWeight: 400 }}>{n}</div>
            <h3 style={{ marginTop: 24, marginBottom: 0, fontFamily: F.jp, fontWeight: 500, fontSize: 17, color: P.ink, lineHeight: 1.55, letterSpacing: 0.3 }}>{t}</h3>
            <p style={{ marginTop: 14, marginBottom: 0, fontFamily: F.jp, fontSize: 13, lineHeight: 1.9, color: P.inkSoft }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Booking({ P, F }) {
  return (
    <section style={{ background: P.bg, color: P.ink, padding: '120px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
        <SLabel num="11" en="Booking" color={P.inkSoft} />
        <h2 style={{
          marginTop: 22, marginBottom: 22,
          fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 1.45, letterSpacing: 0.4,
        }}>
          ご予約・お問い合わせは<br/>
          <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>LINE</span> または <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>Instagram DM</span> から。
        </h2>
        <p style={{ fontFamily: F.jp, fontSize: 15, lineHeight: 2.1, color: P.inkSoft, marginBottom: 36 }}>
          メニュー選びに迷っている方も、まずはお気軽にご相談ください。
          お身体の状態やお悩みに合わせて、おすすめのメニューをご案内します。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Btn primary P={P} size="lg" icon={<LineI color={P.bg} />}>公式LINEで問い合わせる</Btn>
          <Btn P={P} size="lg" icon={<IGI color={P.ink} />}>Instagram DMで相談する</Btn>
        </div>
      </div>
    </section>
  );
}

function Access({ P, F }) {
  return (
    <section id="access" style={{ background: P.bgAlt, color: P.ink, padding: '120px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <SLabel num="12" en="Access" color={P.inkSoft} />
          <h2 style={{ marginTop: 22, marginBottom: 28, fontFamily: F.display, fontWeight: 400, fontSize: 64, lineHeight: 1, letterSpacing: 1, color: P.ink, fontStyle: 'italic' }}>Access.</h2>
          <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%', border: `1px solid ${P.line}`, overflow: 'hidden' }}>
            <iframe
              title="SUN美SPA Access"
              src="https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E6%81%B5%E6%AF%94%E5%AF%BF1-7-4&t=&z=16&ie=UTF8&iwloc=&output=embed"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'grayscale(0.2) contrast(0.95)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <dl style={{ margin: 0, display: 'grid', gap: 18 }}>
            {[
              ['Salon', 'SUN美SPA'],
              ['Address', '東京都渋谷区恵比寿1-7-4\nハイライフ恵比寿 203号室'],
              ['Access', '恵比寿駅 西口改札から徒歩2分\n餃子ダンダダンの向かいのマンション'],
              ['Hours', '完全予約制 / Instagram・LINEから'],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', paddingBottom: 18, borderBottom: `1px solid ${P.line}` }}>
                <dt style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, color: P.accent, textTransform: 'uppercase', paddingTop: 4 }}>{k}</dt>
                <dd style={{ margin: 0, fontFamily: F.jp, fontSize: 15, color: P.ink, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{v}</dd>
              </div>
            ))}
          </dl>
          <div style={{ marginTop: 28, padding: 22, background: P.bg, border: `1px dashed ${P.accent}`, fontFamily: F.jp, fontSize: 13, lineHeight: 1.9, color: P.inkSoft }}>
            <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, color: P.accent, textTransform: 'uppercase', marginBottom: 8 }}>Note for first visit</div>
            プライベートサロンのため、看板は出ておりません。
            日中は廊下の電気が付いていないため暗い場合があります。
            203号室でインターホンを押してください。<br/>
            ご予約時間の<strong style={{ color: P.ink }}>5分前</strong>から入室可能です。
          </div>
          <div style={{ marginTop: 22, padding: 22, background: P.bg, border: `1px solid ${P.line}`, fontFamily: F.jp, fontSize: 13, lineHeight: 1.9, color: P.inkSoft }}>
            <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, color: P.inkSoft, textTransform: 'uppercase', marginBottom: 8 }}>Cancel Policy</div>
            前日・当日のキャンセルは、キャンセル料として
            <span style={{ color: P.ink, fontWeight: 600 }}> ¥5,500 </span>
            を頂戴いたします。ご予約の変更・キャンセルがある場合は、できるだけ早めにご連絡ください。
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ P, F }) {
  return (
    <section style={{ background: `linear-gradient(180deg, ${P.bg} 0%, ${P.bgAlt} 100%)`, color: P.ink, padding: '140px 56px 120px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: 40, right: -120, opacity: 0.32 }}>
        <SunMark size={420} color={P.accent} stroke={0.4} />
      </div>
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
        <SLabel num="14" en="Last Word" color={P.inkSoft} />
        <h2 style={{
          marginTop: 28, marginBottom: 28,
          fontFamily: F.jp, fontWeight: 500, fontSize: 'clamp(32px, 3.6vw, 60px)', lineHeight: 1.45, letterSpacing: 0.4,
        }}>
          身体も心も、<br/>
          <span style={{ fontFamily: F.display, fontStyle: 'italic', color: P.accent, fontWeight: 400 }}>もっと、</span>軽く。<br/>
          あなたらしい美しさを<br/>
          SUN美SPAで整えませんか？
        </h2>
        <p style={{ fontFamily: F.jp, fontSize: 15, lineHeight: 2.1, color: P.inkSoft, marginBottom: 36 }}>
          肩こり、頭痛、バストのお悩み、睡眠の質、女性特有の不調まで。
          まずは今のお悩みを、公式LINEまたはInstagram DMからお気軽にご相談ください。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Btn primary P={P} size="lg" icon={<LineI color={P.bg} />}>公式LINEで予約・相談する</Btn>
          <Btn P={P} size="lg" icon={<IGI color={P.ink} />}>Instagramを見る</Btn>
        </div>
      </div>
    </section>
  );
}

function Footer({ P, F }) {
  return (
    <footer style={{ background: P.ink, color: P.bg, padding: '64px 56px 36px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <SunMark size={32} color={P.accentSoft} stroke={1} />
            <span style={{ fontFamily: F.display, fontSize: 26, letterSpacing: 1.5, fontStyle: 'italic' }}>SUN美SPA</span>
          </div>
          <p style={{ margin: 0, fontFamily: F.jp, fontSize: 12.5, lineHeight: 1.95, color: 'rgba(255,255,255,0.6)' }}>
            Harubon · 講師 兼 セラピスト<br/>
            年間約1,000名 / トータル約5,000名の施術実績<br/>
            完全予約制プライベートサロン
          </p>
        </div>
        <FooterCol title="Menu" items={['天使の羽リラク', 'バストアップ施術', 'ホリスティックビューティ', '脳リセットドライヘッドスパ', 'よもぎ蒸し / 腸セラピー / 足ツボ']} P={P} F={F} />
        <FooterCol title="Salon" items={['About Harubon', '養成講座', '選ばれる理由', 'Cancel Policy']} P={P} F={F} />
        <FooterCol title="Contact" items={['公式LINE', 'Instagram DM', '東京都渋谷区恵比寿1-7-4', 'ハイライフ恵比寿 203']} P={P} F={F} />
      </div>
      <div style={{ marginTop: 56, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.14)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: '"Jost", sans-serif', fontSize: 10.5, letterSpacing: 2, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
        <span>© SUN美SPA · Harubon</span>
        <span>Ebisu · Tokyo · Japan</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, P, F }) {
  return (
    <div>
      <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 11, letterSpacing: 2.5, color: P.accentSoft, textTransform: 'uppercase', marginBottom: 16 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontFamily: F.jp, fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const P = PALETTES_D[tweaks.palette] || PALETTES_D.honey;
  const F = FONTS_D[tweaks.fontSet] || FONTS_D.classic;

  return (
    <div style={{ background: P.bg, color: P.ink, minHeight: '100vh' }}>
      <TweaksPanel title="Tweaks · SUN美SPA">
        <TweakSection label="Palette">
          <TweakRadio label="Color world" value={tweaks.palette}
            options={['honey', 'ivory', 'blush']} onChange={(v) => setTweak('palette', v)} />
        </TweakSection>
        <TweakSection label="Type">
          <TweakRadio label="Font set" value={tweaks.fontSet}
            options={['classic', 'modern', 'soft']} onChange={(v) => setTweak('fontSet', v)} />
        </TweakSection>
      </TweaksPanel>

      <Nav P={P} F={F} />
      <Hero P={P} F={F} />
      <About P={P} F={F} />
      <Concerns P={P} F={F} />
      <Menus P={P} F={F} />
      <HeadSpa P={P} F={F} />
      <Options P={P} F={F} />
      <Course P={P} F={F} />
      <WhyUs P={P} F={F} />
      <Booking P={P} F={F} />
      <Access P={P} F={F} />
      <FinalCTA P={P} F={F} />
      <Footer P={P} F={F} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
