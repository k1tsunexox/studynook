export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Settings
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ddd8d0] py-16 text-center">
        <p className="text-sm font-light text-[#9c9890]">
          Settings coming soon.
        </p>
        <p className="mt-1 text-[10px] tracking-[0.15em] text-[#ccc8c1] uppercase">
          Check back in a future update
        </p>
      </div>
    </main>
  );
}
