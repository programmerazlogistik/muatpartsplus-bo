"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Dropdown from "@/components/Dropdown/Dropdown";

import { IconComponent } from "@/components";

const VendorInternationalTable = ({
  data = [],
  loading = false,
  onSearch,
  onFilter,
  onSort,
  onPageChange,
  onPerPageChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  perPage = 10,
}) => {
  const router = useRouter();

  const columns = useMemo(() => {
    // Define columns for the vendor table
    const tableColumns = [
      {
        key: "actions",
        header: "Action",
        width: "106px",
        headerClassName: "!justify-center",
        sortable: false,
        render: (row) => {
          const getOptions = (status) => {
            const baseOptions = [
              { name: "Detail", value: "detail" },
              { name: "Ubah", value: "edit" },
            ];
            if (status === "active") {
              baseOptions.push({
                name: '<span style="color:#F71717">Nonaktifkan</span>',
                value: "deactivate",
              });
            } else if (status === "pending") {
              baseOptions.push({
                name: '<span style="color:#176CF7">Kirim ulang Email</span>',
                value: "resend",
              });
            } else if (status === "inactive") {
              baseOptions.push({ name: "Aktifkan", value: "activate" });
            }
            return baseOptions;
          };

          const handleAction = (selected) => {
            if (selected.length > 0) {
              const action = selected[0].value;
              if (action === "detail") {
                router.push(`/vendor-internasional/${row.id}/detail`);
              } else if (action === "edit") {
                router.push(`/vendor-internasional/${row.id}/edit`);
              } else if (action === "deactivate") {
                // Handle deactivate
                console.log("Deactivate", row.id);
              } else if (action === "resend") {
                // Handle resend email
                console.log("Resend email", row.id);
              } else if (action === "activate") {
                // Handle activate
                console.log("Activate", row.id);
              }
            }
          };

          return (
            <Dropdown
              placeholder="Atur"
              options={getOptions(row.status)}
              onSelected={handleAction}
              className="!w-[100px]"
            />
          );
        },
      },
      {
        key: "companyName",
        header: "Company Name",
        sortable: true,
        width: "200px",
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
        width: "200px",
      },
      {
        key: "country",
        header: "Country",
        sortable: true,
        width: "100px",
      },
      {
        key: "companyType",
        header: "Company Type",
        sortable: true,
        width: "120px",
      },
      {
        key: "totalProducts",
        header: "Total Products",
        sortable: true,
        headerClassName: "text-center",
        className: "text-center",
        width: "120px",
      },
      {
        key: "registrationDate",
        header: "Registration Date",
        sortable: true,
        width: "150px",
      },
    ];

    return tableColumns;
  }, [router]);

  const headerActions = (
    <div className="flex items-center justify-end gap-[15px]">
      <div className="rounded-md border p-1.5 shadow-md hover:cursor-pointer hover:bg-neutral-200">
        <IconComponent src="/icons/bell.svg" height={16} />
      </div>
      <Button
        variant="muatparts-primary-secondary"
        onClick={() => router.push("/vendor-internasional/tambah")}
        className="!h-[32px] px-4 font-semibold"
      >
        Filter
      </Button>
      <Button
        variant="muatparts-primary-secondary"
        onClick={() => router.push("/vendor-internasional/tambah")}
        className="!h-[32px] px-4 font-semibold"
      >
        Export
      </Button>
      <Button
        variant="muatparts-primary-secondary"
        onClick={() => router.push("/vendor-internasional/tambah")}
        className="!h-[32px] px-4 font-semibold"
      >
        Create Link +
      </Button>
      <Button
        variant="muatparts-primary-secondary"
        onClick={() => router.push("/vendor-internasional/tambah")}
        className="!h-[32px] px-4 font-semibold"
      >
        Tambah +
      </Button>
    </div>
  );

  return (
    <DataTableBO
      columns={columns}
      data={data}
      loading={loading}
      searchPlaceholder={"Cari Nama Perusahaan atau Email"}
      onSearch={onSearch}
      onFilter={onFilter}
      onSort={onSort}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      perPage={perPage}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      showFilter={true}
      showSearch={true}
      showPagination={true}
      showTotalCount={true}
      totalCountLabel={"vendor"}
      headerActions={headerActions}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <p className="text-xs font-semibold text-[#868686]">
            Belum ada data vendor
          </p>
        </div>
      }
    />
  );
};

export default VendorInternationalTable;
