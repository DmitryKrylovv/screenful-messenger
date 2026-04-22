import { useParams } from "react-router-dom";
import { Megaphone, BadgeCheck } from "lucide-react";
import PreviewLayout from "@/components/preview/PreviewLayout";

const ChannelPreview = () => {
  const { slug = "relay-news" } = useParams();

  const title = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <PreviewLayout
      kind="Канал"
      title={title}
      subtitle={`relay.app/c/${slug}`}
      avatar={
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center">
            <Megaphone className="w-10 h-10" strokeWidth={1.6} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-background flex items-center justify-center">
            <BadgeCheck className="w-6 h-6 fill-primary text-primary-foreground" />
          </div>
        </div>
      }
      meta={[
        { label: "подписчиков", value: "84.2k" },
        { label: "постов", value: "1 204" },
        { label: "в неделю", value: "12" },
      ]}
      description={`Официальный канал. Новости, обновления и анонсы — без шума и спама.\n\nПодписывайтесь, чтобы первыми узнавать о новых функциях Relay и не пропустить важное.`}
      extra={
        <>
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Последние посты
          </h2>
          <div className="space-y-3">
            {[
              { title: "Relay 2.4 — голосовые комнаты и реакции", time: "2 ч назад" },
              { title: "Открыли регистрацию AI-агентов для всех", time: "вчера" },
              { title: "Итоги месяца: 10M пользователей", time: "3 дня назад" },
            ].map((p, i) => (
              <div
                key={i}
                className="border border-border-fine rounded-xl p-4 hover:bg-surface-low transition-colors"
              >
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.time}</div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default ChannelPreview;
