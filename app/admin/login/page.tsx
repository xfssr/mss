import { adminLogin } from "./actions";

export default async function AdminLoginPage(props: { 
  searchParams: Promise<{ error?: string; next?: string }> 
}) {
  const searchParams = await props.searchParams;
  const next = searchParams.next ?? "/admin";
  const error = searchParams.error === "1";

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-14">
      <div className="mx-auto max-w-md cc-glass rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-[rgb(var(--blue))]">Admin</h1>
        <p className="mt-2 text-sm text-white/65">Вход по паролю (ENV: ADMIN_PASSWORD)</p>

        {error ? <div className="mt-3 text-sm text-[rgb(var(--red))]">Неверный пароль</div> : null}

        <form action={adminLogin} className="mt-5 space-y-3">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-xs text-white/55">Пароль</span>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-2 text-sm text-white hover:bg-[rgb(var(--red))]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--red))]"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
