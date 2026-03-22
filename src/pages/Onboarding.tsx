import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Shield, Zap, ArrowRight } from "lucide-react";

const slides = [
  {
    title: "Relay",
    subtitle: "Общение без лишнего",
    description: "Минималистичный мессенджер, который не отвлекает от главного — ваших разговоров.",
    icon: MessageCircle,
  },
  {
    title: "Приватность",
    subtitle: "Ваши данные — только ваши",
    description: "Сквозное шифрование, отсутствие рекламы и трекеров. Полный контроль над информацией.",
    icon: Shield,
  },
  {
    title: "Скорость",
    subtitle: "Мгновенная доставка",
    description: "Оптимизированный протокол обмена сообщениями. Работает даже при слабом соединении.",
    icon: Zap,
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate("/login");
    } else {
      setCurrentSlide((s) => s + 1);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-md flex-col items-center px-8">
        {/* Icon */}
        <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface-low">
          <Icon className="h-9 w-9 text-foreground" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-foreground">
          {slide.title}
        </h1>
        <p className="mb-1 text-center text-sm font-medium text-foreground/70">
          {slide.subtitle}
        </p>
        <p className="mb-12 text-center text-body text-muted-foreground max-w-xs">
          {slide.description}
        </p>

        {/* Action */}
        <button
          onClick={handleNext}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-background text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {isLast ? "Начать" : "Далее"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Пропустить
          </button>
        )}

        {/* Dots */}
        <div className="mt-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
