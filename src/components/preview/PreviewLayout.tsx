import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewLayoutProps {
  kind: "Группа" | "Канал" | "Пользователь";
  title: string;
  subtitle: string;
  avatar: ReactNode;
  meta: { label: string; value: string }[];
  description: string;
  extra?: ReactNode;
}

const PreviewLayout = ({ kind, title, subtitle, avatar, meta, description, extra }: PreviewLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border-fine">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            Relay
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Назад
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
            {kind} в Relay
          </div>
          <div className="mb-5">{avatar}</div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>

          <Button
            size="lg"
            onClick={() => navigate("/messenger")}
            className="rounded-full px-6"
          >
            Открыть в Relay
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Нет приложения?{" "}
            <Link to="/" className="underline underline-offset-2 hover:text-foreground">
              Скачать Relay
            </Link>
          </p>
        </div>

        {/* Meta */}
        <div className="mt-14 grid grid-cols-3 gap-px bg-border-fine border border-border-fine rounded-xl overflow-hidden">
          {meta.map((m) => (
            <div key={m.label} className="bg-background p-4 text-center">
              <div className="font-mono-tabular text-lg font-semibold">{m.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            О {kind === "Пользователь" ? "пользователе" : kind === "Группа" ? "группе" : "канале"}
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line">{description}</p>
        </section>

        {extra && <section className="mt-10">{extra}</section>}

        {/* Footer CTA */}
        <div className="mt-16 border-t border-border-fine pt-8 text-center">
          <p className="text-xs text-muted-foreground mb-4">
            Чтобы участвовать в обсуждениях, открой Relay
          </p>
          <Button onClick={() => navigate("/messenger")} variant="outline" className="rounded-full">
            Открыть в Relay <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PreviewLayout;
