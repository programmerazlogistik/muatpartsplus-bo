import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex max-w-md flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-[170px] w-[200px] items-center justify-center rounded-lg bg-neutral-300">
          <span className="text-4xl text-neutral-600">404</span>
        </div>

        <h1 className="mb-3 text-6xl font-bold text-blue-600">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-neutral-800">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mb-8 text-base text-neutral-600">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/transporter"
            className="flex h-10 min-w-[140px] items-center justify-center gap-1 rounded-[24px] border border-neutral-900 bg-neutral-50 py-3 text-sm font-semibold leading-[16.8px] text-neutral-900 transition-colors md:h-8 md:px-6"
          >
            <span className="pt-0.5">Kembali ke Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
