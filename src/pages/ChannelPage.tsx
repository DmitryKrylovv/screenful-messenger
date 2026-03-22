import { useParams, useNavigate } from "react-router-dom";
import { Send, Users, Hash, ArrowRight, Apple, Smartphone, Monitor, Globe, ExternalLink } from "lucide-react";

const channelsData: Record<string, { name: string; handle: string; description: string; members: string; messages: string; avatar: string; isVerified: boolean }> = {
  "relay-news": {
    name: "Relay News",
    handle: "@relay_news",
    description: "Официальный канал команды Relay. Обновления, новости и анонсы новых функций.",
    members: "284K",
    messages: "1.2K",
    avatar: "RN",
    isVerified: true,
  },
  "design-talks": {
    name: "Design Talks",
    handle: "@design_talks",
    description: "Сообщество дизайнеров. UI/UX, типографика, цвет, композиция. Обсуждения и ресурсы.",
    members: "52K",
    messages: "8.4K",
    avatar: "DT",
    isVerified: false,
  },
  "dev-community": {
    name: "Dev Community",
    handle: "@dev_community",
    description: "Канал для разработчиков. Open source, code review, вакансии и митапы.",
    members: "128K",
    messages: "24K",
    avatar: "DC",
    isVerified: true,
  },
};

const ChannelPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const channel = channelsData[slug || ""] || channelsData["relay-news"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
              <Send className="h-3 w-3 text-background" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold">Relay</span>
          </button>
          <button
            onClick={() => navigate("/onboarding")}
            className="h-8 rounded-lg bg-foreground px-3.5 text-xs font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Открыть в приложении
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-14">
        <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
          {/* Avatar */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface-low">
            <Hash className="h-10 w-10 text-foreground/60" strokeWidth={1.5} />
          </div>

          {/* Info */}
          <div className="mb-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{channel.name}</h1>
            {channel.isVerified && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground">
                <svg className="h-3 w-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{channel.handle}</p>
          <p className="mb-6 max-w-sm text-body text-muted-foreground leading-relaxed">{channel.description}</p>

          {/* Stats */}
          <div className="mb-8 flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{channel.members}</span>
              <span className="text-muted-foreground">подписчиков</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-medium">{channel.messages}</span>
              <span className="text-muted-foreground">сообщений</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/onboarding")}
            className="group mb-4 flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Открыть в Relay
            <ExternalLink className="h-4 w-4" />
          </button>
          <p className="mb-10 text-xs text-muted-foreground">
            Нет Relay?{" "}
            <button onClick={() => navigate("/")} className="font-medium text-foreground hover:underline">
              Скачать бесплатно
            </button>
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: Apple, label: "iOS" },
              { icon: Smartphone, label: "Android" },
              { icon: Monitor, label: "Desktop" },
              { icon: Globe, label: "Web" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {p.label}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChannelPage;
