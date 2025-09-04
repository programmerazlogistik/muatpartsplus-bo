import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/layouts/MainLayout";

export default function MasterVoucher() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Master Voucher</h1>

      {/* Tabs */}
      <div className="flex border-b">
        <button className="border-primary bg-primary border-b-2 px-6 py-2 font-medium text-white">
          Belum Kedaluwarsa
        </button>
        <button className="px-6 py-2 font-medium text-gray-600 hover:bg-gray-100">
          Sudah Kedaluwarsa
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Cari Kode Voucher"
            className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={16}
              height={16}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Menampilkan</span>
            <select className="rounded border border-gray-300 px-2 py-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-gray-600">data</span>
          </div>

          <button className="bg-primary rounded-md px-4 py-2 text-white">
            + Tambah
          </button>

          <button className="border-primary text-primary rounded-md border px-4 py-2">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-primary text-left text-white">
            <tr>
              <th className="px-4 py-3">Aksi</th>
              <th className="px-4 py-3">
                <div className="flex items-center">
                  Tanggal Pembuatan
                  <button className="ml-1">
                    <Image
                      src="/icons/sort-ascending.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center">
                  Periode Berlaku
                  <button className="ml-1">
                    <Image
                      src="/icons/sort-ascending.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center">
                  Kode Voucher
                  <button className="ml-1">
                    <Image
                      src="/icons/sort-ascending.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3">Potongan</th>
              <th className="px-4 py-3">Maks. Potongan</th>
              <th className="px-4 py-3">Sisa/Kuota</th>
              <th className="px-4 py-3">Klaim (Jumlah/User)</th>
              <th className="px-4 py-3">Total Nilai Klaim (Rp)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-6 text-center" colSpan={9}>
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/icons/search.svg"
                    alt="No Data"
                    width={40}
                    height={40}
                    className="mb-2 opacity-40"
                  />
                  <p className="text-gray-400">Belum ada data</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-600">
          Menampilkan 0 - 0 data dari total 0 data.
        </p>

        <div className="flex gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            &lt;
          </button>
          <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-md text-white">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            3
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            4
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            5
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            ...
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            10
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
