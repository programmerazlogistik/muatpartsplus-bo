import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-full items-center justify-center">
        <main className="rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Welcome to Muatrans - BO
          </h1>
          <p className="text-lg text-neutral-700">
            This is the back office for Muatrans.
          </p>
        </main>
      </div>
    </MainLayout>
  );
}
