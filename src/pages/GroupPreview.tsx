import { useParams } from "react-router-dom";
import { Users } from "lucide-react";
import PreviewLayout from "@/components/preview/PreviewLayout";

const GroupPreview = () => {
  const { slug = "design-team" } = useParams();

  const title = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <PreviewLayout
      kind="Группа"
      title={title}
      subtitle={`relay.app/g/${slug}`}
      avatar={
        <div className="w-24 h-24 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center">
          <Users className="w-10 h-10" strokeWidth={1.6} />
        </div>
      }
      meta={[
        { label: "участников", value: "248" },
        { label: "онлайн", value: "31" },
        { label: "сообщений", value: "12k" },
      ]}
      description={`Закрытая группа для совместной работы команды. Здесь обсуждаются задачи, делятся файлами и принимают решения.\n\nЧтобы вступить, необходимо открыть Relay по приглашению администратора.`}
      extra={
        <>
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Участники
          </h2>
          <div className="flex -space-x-2">
            {["AK", "MD", "SP", "JL", "RV", "+243"].map((i, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-full bg-surface-mid border-2 border-background flex items-center justify-center text-[11px] font-medium"
              >
                {i}
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default GroupPreview;
