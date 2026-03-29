import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChatCircleText,
  List,
  PlayCircle,
  PresentationChart,
  RocketLaunch,
  SpeakerSlash,
  Target,
  TrendUp,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import logo from './assets/logo.png';

const CTA = {
  href: '#aplicacao',
  label: 'Quero vender mais projetos',
};

const HERO_VIDEO = {
  src: '/hero/solarzap-hero-video-wvga.mp4',
};

const PROOFS = [
  {
    type: 'video',
    src: '/social-proof/solar-visitas-agendadas.mp4',
    poster: '/social-proof/solar-visitas-agendadas-poster.jpg',
    title: '5 visitas agendadas de ontem para hoje',
    note: 'Operação solar em movimento',
  },
  {
    type: 'video',
    src: '/social-proof/solar-feedback-operacao.mp4',
    poster: '/social-proof/solar-feedback-operacao-poster.jpg',
    title: 'Feedback real com clientes chegando e operação rodando',
    note: 'Print e áudio de energia solar',
  },
  {
    type: 'image',
    src: '/social-proof/solar-fechamento-print.jpeg',
    title: 'Mais um fechamento de projeto para cliente',
    note: 'Print real de energia solar',
  },
];

const PAINS = [
  {
    title: 'Lead entra e esfria',
    body: 'O time até conversa, mas a falta de cadência faz a oportunidade perder temperatura antes do próximo avanço.',
    icon: ChatCircleText,
  },
  {
    title: 'Visita não empurra a venda',
    body: 'A equipe vai para campo, mas sem roteiro comercial claro, sem contexto e sem sequência forte depois da visita.',
    icon: Target,
  },
  {
    title: 'Proposta vira arquivo solto',
    body: 'A proposta é enviada, o cliente some e ninguém sabe exatamente qual é o próximo movimento para destravar a decisão.',
    icon: PresentationChart,
  },
  {
    title: 'Gestão não enxerga o gargalo',
    body: 'O funil parece cheio, mas pouca coisa caminha com previsibilidade até o fechamento.',
    icon: TrendUp,
  },
];

const DELIVERABLES = [
  {
    title: 'Ativação da base',
    body: 'Leads, propostas e contatos parados voltam a receber contexto, prioridade, responsável e próxima ação.',
    icon: WhatsappLogo,
  },
  {
    title: 'Processo comercial mais padronizado',
    body: 'WhatsApp, ligação, visita, proposta e follow-up passam a obedecer uma sequência comercial mais clara.',
    icon: Target,
  },
  {
    title: 'Prospecção ativa implantada',
    body: 'A operação ganha uma frente de aquisição com rotina, meta, bloco e avanço registrado.',
    icon: RocketLaunch,
  },
  {
    title: 'SolarZap aplicado na rotina',
    body: 'O software deixa de ser ferramenta solta e passa a sustentar a execução do time no dia a dia.',
    icon: PresentationChart,
  },
];

const STEPS = [
  {
    index: '01',
    title: 'Ativar a base',
    body: 'Começamos pelo dinheiro que já está dentro da operação e hoje está mal trabalhado, parado ou sem sequência.',
  },
  {
    index: '02',
    title: 'Padronizar a venda',
    body: 'Organizamos WhatsApp, visita, proposta e follow-up para o time falar a mesma língua comercial.',
  },
  {
    index: '03',
    title: 'Implantar prospecção',
    body: 'Depois que a casa ganha cadência, a prospecção ativa entra com mais consistência e menos improviso.',
  },
];

const FIT = [
  'Empresas de energia solar com operação comercial ativa.',
  'Equipes que já geram demanda, mas perdem avanço por falta de processo.',
  'Operações que querem parar de depender só de esforço individual.',
  'Gestores que querem mais previsibilidade entre conversa, visita e proposta.',
];

const NOT_FIT = [
  'Quem procura uma solução mágica sem execução do time.',
  'Quem ainda não tem nenhuma operação comercial para organizar.',
  'Quem quer apenas conteúdo para assistir sem aplicar.',
  'Quem não pretende entrar em rotina, cadência e acompanhamento.',
];

const FAQS = [
  {
    question: 'Isso é para quem está começando ou para quem já vende?',
    answer:
      'Faz mais sentido para empresas que já possuem alguma operação comercial e querem parar de perder venda por falta de processo e cadência.',
  },
  {
    question: 'Preciso já usar o SolarZap?',
    answer:
      'Não. A implantação já considera a entrada do SolarZap como parte da nova rotina comercial.',
  },
  {
    question: 'Isso é mentoria, consultoria ou treinamento?',
    answer:
      'É uma mentoria de implantação comercial. Existe material de apoio, mas o foco é colocar a operação para rodar.',
  },
  {
    question: 'Em quanto tempo começo a sentir diferença?',
    answer:
      'A proposta dos 21 dias é criar clareza, cadência e avanço operacional. O ganho aparece quando a equipe para de depender de improviso.',
  },
];

const PRICING = [
  {
    title: '21D Playbook',
    price: 'R$ 997',
    note: 'Para quem quer aplicar a estrutura com mais autonomia.',
  },
  {
    title: '21D Guiada',
    price: 'R$ 1.497',
    note: 'Formato recomendado para quem quer implantação acompanhada e mais velocidade de ajuste.',
    featured: true,
  },
  {
    title: '30D Premium',
    price: 'R$ 1.997',
    note: 'Para operações que querem mais profundidade, refinamento e suporte.',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const PRIMARY_BUTTON_STYLE = {
  backgroundImage: 'linear-gradient(135deg, #f68d2e 0%, #ffb154 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 18px 40px rgba(246,141,46,0.28)',
  filter: 'brightness(1.02) saturate(1.05)',
};

function Button({ href, children, className = '', secondary = false, motionStyle = undefined }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={`${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
      style={{ x: springX, y: springY, ...motionStyle }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.a>
  );
}

function SectionHead({ eyebrow, title, body, dark = false, center = false }) {
  const wrap = center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl';
  const badge = dark
    ? 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-300'
    : 'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-600 shadow-sm';
  const heading = dark ? 'text-white' : 'text-slate-950';
  const copy = dark ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={wrap}>
      <span className={badge}>{eyebrow}</span>
      <h2 className={`mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl md:leading-[0.94] ${heading}`}>{title}</h2>
      {body ? <p className={`mt-5 text-base leading-8 md:text-lg ${copy}`}>{body}</p> : null}
    </div>
  );
}

function ProofMedia({ item }) {
  const mediaClass =
    item.type === 'image'
      ? 'aspect-[9/16] w-full transform-gpu object-cover object-top scale-[1.04]'
      : 'aspect-[9/16] w-full object-cover';

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-[#050b16] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${item.type === 'video' ? 'bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.7)]' : 'bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.7)]'}`}
          />
          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/82">
            {item.type === 'video' ? 'Vídeo real' : 'Print real'}
          </span>
        </div>
        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Operação solar</span>
      </div>

      <div className="overflow-hidden rounded-[1.45rem] border border-white/6 bg-black/30">
        {item.type === 'video' ? (
          <video controls playsInline preload="metadata" poster={item.poster} className={mediaClass}>
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <img src={item.src} alt={item.title} className={mediaClass} loading="lazy" />
        )}
      </div>
    </div>
  );
}

function HeroVideoPanel() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef(null);

  const syncAudioState = (muted) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = muted;
    video.muted = muted;
    video.volume = 1;
  };

  const toggleAudio = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !isMuted;
    syncAudioState(nextMuted);
    setIsMuted(nextMuted);

    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  const handleVideoReady = () => {
    syncAudioState(isMuted);
  };

  const handleVideoEnded = (event) => {
    event.currentTarget.currentTime = 0;
    const playPromise = event.currentTarget.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  return (
    <motion.div
      className="hero-video-shell surface-panel-strong mx-auto w-full overflow-hidden p-3 md:p-4"
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-video-frame">
        <div className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/48 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/82 backdrop-blur-md md:left-4 md:top-4">
          <span className="h-2 w-2 rounded-full bg-[var(--color-ember-400)] shadow-[0_0_16px_rgba(246,141,46,0.78)]" />
          Aceleração SolarZap
        </div>

        <video
          ref={videoRef}
          className="hero-video-player"
          autoPlay
          muted={isMuted}
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleVideoReady}
          onEnded={handleVideoEnded}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
          Seu navegador não conseguiu reproduzir o vídeo.
        </video>

        <button
          type="button"
          className="hero-video-audio-toggle"
          onClick={toggleAudio}
          aria-pressed={!isMuted}
          aria-label={isMuted ? 'Clique para ativar o áudio do vídeo' : 'Clique para silenciar o áudio do vídeo'}
        >
          <AnimatePresence initial={false}>
            {isMuted ? (
              <motion.div
                className="hero-video-audio-card"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="hero-video-audio-chip">
                  <span className="hero-video-audio-icon">
                    <SpeakerSlash size={16} weight="fill" />
                  </span>
                  Som desligado
                </span>
                <span className="hero-video-audio-title">Clique para ativar o áudio</span>
                <span className="hero-video-audio-copy">O vídeo já está rodando. Toque uma vez para ouvir a mensagem completa.</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

function ProofCard({ item, index }) {
  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      variants={reveal}
    >
      <div className="bg-[#0b111d] p-4">
        <ProofMedia item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold tracking-tight text-slate-950">{item.title}</p>
        <p className="mt-2 text-sm leading-7 text-slate-600">{item.note}</p>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });
  const navButtonBackground = useTransform(scrollY, (value) => {
    const phase = 0.5 + 0.5 * Math.sin(value * 0.008 - Math.PI / 2);
    const emberX = 88 - phase * 52;
    const blueX = 24 + phase * 18;
    const emberAlpha = (0.08 + phase * 0.18).toFixed(3);
    const emberTrail = (0.05 + phase * 0.09).toFixed(3);
    const blueAlpha = (0.24 - phase * 0.06).toFixed(3);

    return `linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 48%, rgba(255,255,255,0) 100%), radial-gradient(circle at ${emberX.toFixed(2)}% 48%, rgba(255,193,118,${emberAlpha}) 0%, rgba(255,193,118,${emberTrail}) 14%, rgba(255,193,118,0) 38%), radial-gradient(circle at ${blueX.toFixed(2)}% 22%, rgba(125,170,255,${blueAlpha}) 0%, rgba(125,170,255,0) 42%), linear-gradient(135deg, #16357f 0%, #2563eb 52%, #132e70 100%)`;
  });
  const navButtonShadow = useTransform(scrollY, (value) => {
    const phase = 0.5 + 0.5 * Math.sin(value * 0.008 - Math.PI / 2);
    const blueShadow = (0.28 - phase * 0.06).toFixed(3);
    const emberShadow = (0.06 + phase * 0.1).toFixed(3);

    return `inset 0 1px 0 rgba(255,255,255,0.28), 0 14px 32px rgba(17,42,103,${blueShadow}), 0 8px 22px rgba(246,141,46,${emberShadow})`;
  });
  const navButtonFilter = useTransform(scrollY, (value) => {
    const phase = 0.5 + 0.5 * Math.sin(value * 0.008 - Math.PI / 2);
    const brightness = (1.005 + phase * 0.03).toFixed(3);
    const saturate = (1.03 + phase * 0.08).toFixed(3);

    return `brightness(${brightness}) saturate(${saturate})`;
  });
  const showPricing = useMemo(
    () => typeof window !== 'undefined' && /\/oferta\/?$/.test(window.location.pathname.toLowerCase()),
    [],
  );
  const primaryButtonStyle = PRIMARY_BUTTON_STYLE;
  const navButtonStyle = {
    backgroundImage: navButtonBackground,
    boxShadow: navButtonShadow,
    filter: navButtonFilter,
    color: '#f8fafc',
  };

  const navItems = showPricing
    ? [
        ['Resultados', '#provas'],
        ['Onde trava', '#dores'],
        ['Mentoria', '#mentoria'],
        ['Oferta', '#oferta'],
        ['FAQ', '#faq'],
      ]
    : [
        ['Resultados', '#provas'],
        ['Onde trava', '#dores'],
        ['Mentoria', '#mentoria'],
        ['FAQ', '#faq'],
      ];

  return (
    <div className="page-frame">
      <a href="#topo" className="skip-link">
        Ir para o topo
      </a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <div className="sticky top-0 z-50 pt-4">
        <div className="shell">
          <div className="nav-shell">
            <a href="#topo" className="flex items-center gap-3">
              <img src={logo} alt="SolarZap" className="h-10 w-10 rounded-2xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Aceleração SolarZap</p>
                <p className="text-sm font-semibold text-white">Mentoria de implantação comercial</p>
              </div>
            </a>

            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} className="nav-link">
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <Button href={CTA.href} className="px-5 py-3 text-sm" motionStyle={navButtonStyle}>
                <ArrowRight size={18} weight="bold" />
                {CTA.label}
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                className="surface-panel mt-3 overflow-hidden px-4 py-4 lg:hidden"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex flex-col gap-2">
                  {navItems.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.04]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <Button href={CTA.href} className="mt-4 w-full justify-center" motionStyle={navButtonStyle}>
                  <ArrowRight size={18} weight="bold" />
                  {CTA.label}
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <main>
        <section id="topo" className="shell relative min-h-[100dvh] pt-3 pb-12 md:pt-5 md:pb-14">
          <div className="background-grid" />
          <div className="background-glow background-glow-left" />
          <div className="background-glow background-glow-right" />
          <div className="background-noise" />

          <div className="hero-stage relative z-10 mx-auto flex flex-col items-center text-center">
            <motion.div initial="hidden" animate="visible" className="flex w-full flex-col items-center text-center">
              <motion.span custom={0} variants={reveal} className="eyebrow">
                Exclusivo para empresas de energia solar
              </motion.span>

              <motion.h1
                custom={1}
                variants={reveal}
                className="hero-display mt-3 text-[2rem] font-semibold tracking-[-0.07em] text-white sm:text-[2.7rem] md:text-[3.35rem] md:leading-[0.9] lg:text-[3.7rem]"
              >
                <span className="block">Mais projetos vendidos</span>
                <span className="block">do WhatsApp ao fechamento.</span>
              </motion.h1>

              <motion.div custom={2} variants={reveal} className="mt-4 w-full md:mt-5">
                <HeroVideoPanel />
              </motion.div>

              <motion.div custom={3} variants={reveal} className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={CTA.href} className="px-5 py-3 text-sm md:px-6 md:py-3.5" motionStyle={primaryButtonStyle}>
                  <ArrowRight size={18} weight="bold" />
                  {CTA.label}
                </Button>
                <Button href="#provas" secondary className="px-5 py-3 text-sm md:px-6 md:py-3.5">
                  <PlayCircle size={18} weight="fill" />
                  Ver provas reais
                </Button>
              </motion.div>

            </motion.div>
          </div>
        </section>
        <div className="relative -mt-8 rounded-t-[2.75rem] bg-[#f7f8fb] text-slate-900 shadow-[0_-30px_80px_rgba(4,7,13,0.24)]">
          <section id="provas" className="shell pt-14 pb-20 md:pt-18 md:pb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div custom={0} variants={reveal}>
                <SectionHead
                  eyebrow="Provas reais"
                  title="Resultados e feedbacks reais de operações solares"
                  body="Vídeos e prints reais que mostram visitas agendadas, feedbacks e fechamentos acontecendo na prática."
                  center
                />
              </motion.div>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PROOFS.map((item, index) => (
                <ProofCard key={item.title} item={item} index={index + 1} />
              ))}
            </div>
          </section>

          <section id="dores" className="shell py-20 md:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <motion.div custom={0} variants={reveal}>
                  <SectionHead
                    eyebrow="Onde o comercial trava"
                    title="Se o seu time conversa bastante, mas avança pouco, o problema costuma estar aqui."
                    body="A maioria das operações solares não perde venda por falta de esforço. Perde entre a conversa, a visita, a proposta e o acompanhamento."
                  />
                </motion.div>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2">
                {PAINS.map(({ title, body, icon: Icon }, index) => (
                  <motion.article
                    key={title}
                    className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={index + 1}
                    variants={reveal}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon size={22} weight="duotone" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-8 text-slate-600">{body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="mentoria" className="shell py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div custom={0} variants={reveal}>
                <SectionHead
                  eyebrow="O que a mentoria coloca de pé"
                  title="Você não entra para assistir conteúdo. Entra para organizar a operação e vender com mais cadência."
                  body="A mentoria combina software, método e acompanhamento aplicado para organizar base, processo e prospecção dentro da rotina comercial."
                  center
                />
              </motion.div>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {DELIVERABLES.map(({ title, body, icon: Icon }, index) => (
                <motion.article
                  key={title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index + 1}
                  variants={reveal}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-8 text-slate-600">{body}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="shell py-6 md:py-10">
            <motion.div
              className="overflow-hidden rounded-[2.5rem] bg-[#0b1220] px-6 py-8 text-white md:px-10 md:py-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={reveal}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-sky-300">Diagnóstico estratégico</p>
                  <h3 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                    Se sua operação já gera demanda, mas ainda perde venda por falta de cadência, faz sentido conversar.
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                    A reunião existe para entender o gargalo comercial atual e avaliar se a Aceleração SolarZap faz sentido para o momento da sua empresa.
                  </p>
                </div>
                <div>
                  <Button href={CTA.href} motionStyle={primaryButtonStyle}>
                    <ArrowRight size={18} weight="bold" />
                    {CTA.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="shell py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div custom={0} variants={reveal}>
                <SectionHead
                  eyebrow="Como funciona"
                  title="Em 21 dias, a operação sai da improvisação para uma rotina comercial mais clara."
                  body="A implantação avança em três movimentos: primeiro a base acorda, depois a venda ganha padrão e só então a prospecção entra com mais consistência."
                  center
                />
              </motion.div>
            </motion.div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {STEPS.map(({ index, title, body }, itemIndex) => (
                <motion.article
                  key={index}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={itemIndex + 1}
                  variants={reveal}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-blue-600">{index}</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600">{body}</p>
                </motion.article>
              ))}
            </div>
          </section>
          <section id="aplicacao" className="shell py-20 md:py-24">
            <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <motion.div custom={0} variants={reveal}>
                  <SectionHead
                    eyebrow="Para quem é"
                    title="A mentoria faz mais sentido para operações solares que já têm venda para organizar."
                    body="Ela foi desenhada para empresas que já estão no jogo e agora precisam de mais cadência, clareza e acompanhamento dentro da operação comercial."
                  />
                </motion.div>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.article
                  className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-7 shadow-[0_24px_60px_-28px_rgba(5,150,105,0.18)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={1}
                  variants={reveal}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-emerald-600">Perfil ideal</p>
                  <div className="mt-5 space-y-4">
                    {FIT.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300 bg-white text-emerald-600">
                          <CheckCircle size={12} weight="fill" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>

                <motion.article
                  className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7 shadow-[0_24px_60px_-28px_rgba(245,158,11,0.18)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={2}
                  variants={reveal}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-amber-600">Quando não faz sentido</p>
                  <div className="mt-5 space-y-4">
                    {NOT_FIT.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {showPricing ? (
            <section id="oferta" className="shell py-20 md:py-24">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <motion.div custom={0} variants={reveal}>
                  <SectionHead
                    eyebrow="Formatos de entrada"
                    title="Escolha o formato que melhor acompanha o momento da sua operação."
                    body="Os formatos abaixo mudam o nível de acompanhamento, mas todos seguem a mesma lógica de implantação comercial."
                    center
                  />
                </motion.div>
              </motion.div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {PRICING.map((plan, index) => (
                  <motion.article
                    key={plan.title}
                    className={`rounded-[2rem] border p-7 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] ${plan.featured ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={index + 1}
                    variants={reveal}
                  >
                    {plan.featured ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white">
                        Recomendado
                      </div>
                    ) : null}
                    <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-500">{plan.title}</p>
                    <p className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950">{plan.price}</p>
                    <p className="mt-4 text-sm leading-8 text-slate-600">{plan.note}</p>
                  </motion.article>
                ))}
              </div>
            </section>
          ) : null}

          <section id="faq" className="shell py-20 md:py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div custom={0} variants={reveal}>
                <SectionHead
                  eyebrow="FAQ"
                  title="Dúvidas frequentes"
                  body="Respostas diretas para as objeções mais comuns antes da reunião."
                  center
                />
              </motion.div>
            </motion.div>

            <div className="mx-auto mt-10 max-w-4xl space-y-4">
              {FAQS.map(({ question, answer }, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={question}
                    className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.14)]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={index + 1}
                    variants={reveal}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-base font-semibold leading-7 text-slate-950">{question}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                        {isOpen ? <X size={16} weight="bold" /> : <ArrowRight size={16} weight="bold" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm leading-8 text-slate-600">{answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Button href={CTA.href} motionStyle={primaryButtonStyle}>
                <ArrowRight size={18} weight="bold" />
                {CTA.label}
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="shell py-10">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#0b111d] px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SolarZap" className="h-11 w-11 rounded-2xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">Aceleração SolarZap</p>
              <p className="text-sm text-slate-400">Mentoria de implantação comercial para energia solar</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
