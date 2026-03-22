import { useNavigate } from "react-router-dom";
import {
  MessageCircle, Shield, Zap, Cloud, Music, Bot, Users, Lock,
  ArrowRight, Apple, Monitor, Smartphone, Globe, Send, ChevronRight
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Мгновенные сообщения",
    desc: "Текст, голосовые, изображения, файлы, геолокация — всё в одном чате с молниеносной доставкой.",
  },
  {
    icon: Bot,
    title: "AI-агенты",
    desc: "Встроенные AI-ассистенты для кода, дизайна, аналитики и текстов. Прямо в мессенджере.",
  },
  {
    icon: Cloud,
    title: "Облачное хранилище",
    desc: "Храните файлы, документы и медиа в облаке. Доступ с любого устройства.",
  },
  {
    icon: Music,
    title: "Музыка",
    desc: "Встроенный плеер с библиотекой треков. Слушайте, не покидая приложение.",
  },
  {
    icon: Shield,
    title: "Сквозное шифрование",
    desc: "Все сообщения защищены E2E-шифрованием. Ваши данные — только ваши.",
  },
  {
    icon: Zap,
    title: "Мгновенная синхронизация",
    desc: "Работает на всех устройствах одновременно. Бесшовный переход между платформами.",
  },
];

const platforms = [
  { icon: Apple, name: "iOS", label: "App Store", available: true },
  { icon: Smartphone, name: "Android", label: "Google Play", available: true },
  { icon: Monitor, name: "macOS", label: "Mac App Store", available: true },
  { icon: Monitor, name: "Windows", label: "Microsoft Store", available: true },
  { icon: Monitor, name: "Linux", label: ".deb / .rpm / Snap", available: true },
  { icon: Globe, name: "Web", label: "Открыть в браузере", available: true },
];

const stats = [
  { value: "10M+", label: "пользователей" },
  { value: "99.9%", label: "аптайм" },
  { value: "50ms", label: "задержка" },
  { value: "256-bit", label: "шифрование" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Send className="h-3.5 w-3.5 text-background" strokeWidth={2} />
            </div>
            <span className="text-base font-semibold tracking-tight">Relay</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Функции</a>
            <a href="#platforms" className="transition-colors hover:text-foreground">Платформы</a>
            <a href="#security" className="transition-colors hover:text-foreground">Безопасность</a>
          </nav>
          <button
            onClick={() => navigate("/")}
            className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Открыть приложение
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
            <Send className="h-7 w-7 text-background" strokeWidth={1.5} />
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            Версия 2.0 — уже доступна
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
            Общение
            <br />
            без лишнего
          </h1>
          <p className="mb-10 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Relay — мессенджер нового поколения. Минималистичный, быстрый,
            безопасный. С AI-агентами, облаком и музыкой внутри.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="group flex h-12 items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Начать бесплатно
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#platforms"
              className="flex h-12 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-all hover:bg-surface-low active:scale-[0.97]"
            >
              Скачать
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-px rounded-xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-background px-6 py-6 first:rounded-l-xl last:rounded-r-xl">
              <span className="text-2xl font-bold tracking-tight">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Всё, что нужно. Ничего лишнего.
            </h2>
            <p className="text-muted-foreground">
              Мощный функционал в минималистичной оболочке.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-architectural"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-low transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
                  <p className="text-body text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="border-t border-border bg-surface-low py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
            <Lock className="h-6 w-6 text-foreground" strokeWidth={1.5} />
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Безопасность на первом месте
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-muted-foreground leading-relaxed">
            Сквозное шифрование по умолчанию. Открытый протокол.
            Без рекламы, без трекеров, без компромиссов.
          </p>
          <div className="mx-auto grid max-w-2xl gap-4 md:grid-cols-3">
            {[
              { title: "E2E шифрование", desc: "AES-256 + Signal Protocol" },
              { title: "Открытый код", desc: "Аудит безопасности доступен всем" },
              { title: "Без трекеров", desc: "Никакой рекламы и аналитики" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                <h3 className="mb-1 text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Доступен везде
            </h2>
            <p className="text-muted-foreground">
              Скачайте Relay для вашей платформы или откройте в браузере.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.name}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:border-foreground/20 hover:shadow-architectural active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-low">
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.label}</div>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-foreground py-24 text-background">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Попробуйте Relay сегодня
          </h2>
          <p className="mb-8 text-background/60">
            Бесплатно. Без рекламы. Без ограничений.
          </p>
          <button
            onClick={() => navigate("/")}
            className="group flex h-12 items-center gap-2 rounded-lg bg-background px-8 text-sm font-medium text-foreground transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Создать аккаунт
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
              <Send className="h-3 w-3 text-background" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold">Relay</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
            <a href="#" className="hover:text-foreground transition-colors">Блог</a>
            <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 Relay. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
