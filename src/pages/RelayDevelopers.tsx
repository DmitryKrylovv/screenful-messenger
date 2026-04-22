import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight, Server, Network, Code2, Terminal, GitBranch,
  Shield, Boxes, Globe, Cpu, Send, ChevronRight,
} from "lucide-react";

const products = [
  {
    icon: Boxes,
    name: "Relay Hub",
    tag: "Платформа",
    desc: "Управляющий слой сети Relay. Реестр узлов, маршрутизация, идентичность и федерация. Hub связывает ноды в единую сеть и обеспечивает доставку сообщений между ними.",
    points: [
      "Глобальный реестр и discovery узлов",
      "Федеративная маршрутизация сообщений",
      "Управление идентичностью и ключами",
      "SLA, мониторинг и наблюдаемость",
    ],
  },
  {
    icon: Server,
    name: "Relay Node",
    tag: "Self-hosted",
    desc: "Собственный сервер в сети Relay. Разверни ноду — и получи изолированное пространство с полным контролем над данными, при этом оставаясь частью глобальной сети.",
    points: [
      "Полный контроль над данными и хранилищем",
      "Подключение к Hub одной командой",
      "E2E-шифрование между нодами",
      "Docker / Kubernetes / bare-metal",
    ],
  },
];

const codeSnippet = `# Установка Relay Node
curl -fsSL https://get.relaymessenger.ru | sh

# Регистрация в сети Relay
relay node init --hub=hub.relaymessenger.ru
relay node start

# Готово. Нода в сети.
relay node status`;

const RelayDevelopers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Send className="h-3.5 w-3.5 text-background" strokeWidth={2} />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Relay <span className="text-muted-foreground font-normal">/ Developers</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#products" className="transition-colors hover:text-foreground">Продукты</a>
            <a href="#quickstart" className="transition-colors hover:text-foreground">Quickstart</a>
            <a href="#architecture" className="transition-colors hover:text-foreground">Архитектура</a>
          </nav>
          <button
            onClick={() => navigate("/messenger")}
            className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Открыть Relay
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            Relay for Developers
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
            Сеть, которой
            <br />
            ты владеешь
          </h1>
          <p className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Relay — открытая федеративная сеть. Подключись к Hub
            или разверни собственный Node и стань её частью.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#quickstart"
              className="group flex h-12 items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Развернуть Node
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#products"
              className="flex h-12 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-all hover:bg-surface-low active:scale-[0.97]"
            >
              Узнать о Hub
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid w-full max-w-2xl grid-cols-2 gap-px rounded-xl border border-border bg-border md:grid-cols-4">
            {[
              { value: "1 200+", label: "нод в сети" },
              { value: "99.99%", label: "uptime Hub" },
              { value: "<40ms", label: "P95 latency" },
              { value: "Open", label: "протокол" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 bg-background px-6 py-6 first:rounded-l-xl last:rounded-r-xl">
                <span className="text-2xl font-bold tracking-tight">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Два продукта. Одна сеть.
            </h2>
            <p className="text-muted-foreground">
              Hub держит сеть связной. Node даёт тебе суверенитет.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="group rounded-xl border border-border bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-architectural"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold tracking-tight">{p.name}</h3>
                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="border-t border-border bg-surface-low py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
              <Terminal className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Своя нода за 30 секунд
            </h2>
            <p className="text-muted-foreground">
              Один скрипт. Без зависимостей. Полный контроль.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-foreground text-background">
            <div className="flex items-center justify-between border-b border-background/10 px-4 py-2.5 text-xs text-background/60">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
              </div>
              <span className="font-mono-tabular">~/relay-node</span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
              <code className="font-mono-tabular">{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Архитектура сети
            </h2>
            <p className="text-muted-foreground">
              Federation поверх открытого протокола.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Network, title: "Federation", desc: "Ноды общаются друг с другом напрямую. Hub — только для маршрутизации и discovery." },
              { icon: Shield, title: "E2E by default", desc: "Ключи никогда не покидают клиент. Hub и ноды видят только зашифрованные пакеты." },
              { icon: Code2, title: "Open protocol", desc: "Спецификация открыта. Пишите свой клиент, свою ноду, свои интеграции." },
              { icon: Cpu, title: "Lightweight", desc: "Нода работает на 256 МБ RAM. Hub — горизонтально масштабируемый кластер." },
              { icon: GitBranch, title: "Self-hosted", desc: "Полный исходный код. Деплой куда угодно: bare-metal, Docker, K8s." },
              { icon: Globe, title: "Глобальная сеть", desc: "Подключайся к публичному Hub или поднимай приватную сеть для команды." },
            ].map((f) => {
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

      {/* CTA */}
      <section className="border-t border-border bg-surface-low py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Готов стать частью сети?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-muted-foreground leading-relaxed">
            Разверни Node за минуту или подключи приложение к Hub через SDK.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#quickstart"
              className="group flex h-12 items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Развернуть Node
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/"
              className="flex h-12 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-all hover:bg-background active:scale-[0.97]"
            >
              К продукту
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-muted-foreground">
          <span>© 2025 Relay. Open network for direct communication.</span>
          <Link to="/" className="hover:text-foreground">relaymessenger.ru</Link>
        </div>
      </footer>
    </div>
  );
};

export default RelayDevelopers;
