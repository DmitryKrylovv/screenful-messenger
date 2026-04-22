import { useParams } from "react-router-dom";
import PreviewLayout from "@/components/preview/PreviewLayout";

const UserPreview = () => {
  const { username = "alex" } = useParams();

  const display = username[0]?.toUpperCase() + username.slice(1);
  const initials = display.slice(0, 2).toUpperCase();

  return (
    <PreviewLayout
      kind="Пользователь"
      title={display}
      subtitle={`@${username}`}
      avatar={
        <div className="w-24 h-24 rounded-full bg-surface-mid text-foreground flex items-center justify-center text-2xl font-semibold">
          {initials}
        </div>
      }
      meta={[
        { label: "статус", value: "online" },
        { label: "в Relay", value: "2 г." },
        { label: "общих чатов", value: "4" },
      ]}
      description={`Дизайнер интерфейсов. Пишу о минимализме, типографике и продуктовом дизайне.\n\nДля связи — открой Relay и начни диалог. Отвечаю обычно в течение часа.`}
      extra={
        <>
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Информация
          </h2>
          <div className="border border-border-fine rounded-xl divide-y divide-border-fine">
            {[
              { k: "Имя", v: display },
              { k: "Юзернейм", v: `@${username}` },
              { k: "Био", v: "Designer · Relay community" },
              { k: "Часовой пояс", v: "UTC+3, Москва" },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between p-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {row.k}
                </span>
                <span className="text-sm font-medium">{row.v}</span>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default UserPreview;
