// This is the static root shell, prerendered once, before any redux/locale
// signal exists (ClientLayout redirects away from here within a render or
// two). Genuinely un-localizable at this point — see ClientLayout.tsx's own
// (localized) bootstrap spinner for the equivalent case once locale is known.
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 text-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
}
