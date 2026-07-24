export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Account
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Settings
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DDD8D0] bg-[#F7F4EE] py-16 text-center">
        <p className="text-sm font-medium text-slate-500">
          Settings coming soon.
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Check back in a future update.
        </p>
      </div>
    </main>
  );
}
