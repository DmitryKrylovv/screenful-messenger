import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/messenger");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-sm flex-col px-8">
        {/* Logo */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-low">
            <MessageCircle className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Relay
          </span>
        </div>

        {/* Header */}
        <h1 className="mb-1 text-center text-xl font-semibold tracking-tight text-foreground">
          {isSignUp ? "Создать аккаунт" : "Войти"}
        </h1>
        <p className="mb-8 text-center text-body text-muted-foreground">
          {isSignUp
            ? "Заполните данные для регистрации"
            : "Введите данные для входа"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignUp && (
            <input
              type="text"
              placeholder="Имя"
              className="h-11 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="h-11 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className="h-11 w-full rounded-lg border border-border bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {!isSignUp && (
            <button
              type="button"
              className="self-end text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Забыли пароль?
            </button>
          )}

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {isSignUp ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">или</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social */}
        <button
          type="button"
          onClick={() => navigate("/messenger")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-foreground transition-all hover:bg-surface-low active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Войти через Google
        </button>

        {/* Toggle */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {isSignUp ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-foreground hover:underline"
          >
            {isSignUp ? "Войти" : "Зарегистрироваться"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
