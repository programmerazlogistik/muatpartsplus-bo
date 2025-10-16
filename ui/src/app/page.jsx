"use client";

import * as React from "react";

import { cn, formatDate } from "@muatmuat/lib/utils";
import { Alert } from "@muatmuat/ui/Alert";
import { Button } from "@muatmuat/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@muatmuat/ui/Dropdown";
import { Input, Select } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useGetCompanies } from "@/lib/useGetCompanies";

// --- Reusable useDataTable Hook ---
const useDataTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearchChange = (value) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const dataTableProps = {
    sorting,
    setSorting,
    pagination,
    setPagination,
    searchTerm,
    onSearchChange,
  };

  return {
    ...dataTableProps,
    dataTableProps,
  };
};

// --- DataTable Compound Component Definition ---
const DataTableContext = React.createContext(null);
const useDataTableContext = () => {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTableContext must be used within a DataTable.Root");
  }
  return context;
};

const DataTableRoot = ({ children, ...props }) => {
  const table = useReactTable({
    data: props.data || [],
    columns: props.columns,
    pageCount: props.pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination: props.pagination,
      sorting: props.sorting,
    },
    onPaginationChange: props.onPaginationChange,
    onSortingChange: props.onSortingChange,
  });

  return (
    <DataTableContext.Provider value={{ table, ...props }}>
      {children}
    </DataTableContext.Provider>
  );
};

const DataTableHeader = ({ children, className }) => (
  <div
    className={cn("flex items-center justify-between gap-4 pb-2.5", className)}
  >
    {children}
  </div>
);

const DataTableSearch = ({ c }) => {
  const { searchTerm, onSearchChange } = useDataTableContext();
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#1B1B1B]">Pencarian :</span>
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari"
        className="h-8 w-[232px] rounded-[6px] border-[#A8A8A8] text-xs"
      />
    </div>
  );
};

const DataTableContent = () => {
  const { table, columns } = useDataTableContext();
  return (
    <div className="rounded-[10px] border border-[#A8A8A8] bg-white px-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b-[2px] border-[#C6CBD4] hover:bg-white"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} column={header.column}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-[51px]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const DataTablePagination = () => {
  const { table, paginationData } = useDataTableContext();
  const { currentPage, itemsPerPage, totalItems, totalPages } =
    paginationData || {};

  const paginationRange = usePagination({
    currentPage,
    totalPages,
  });

  if (!paginationData || paginationData.totalItems === 0) {
    return null;
  }

  const firstItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pageSizeOptions = [10, 20, 30, 40, 50].map((size) => ({
    value: String(size),
    label: String(size),
  }));

  return (
    <div className="flex items-center justify-between pb-3 pt-2.5">
      <p className="flex-1 text-sm font-medium text-[#1B1B1B]">
        Menampilkan {firstItem} - {lastItem} data dari total {totalItems} data
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-[#1B1B1B]">Menampilkan</span>
          <Select
            options={pageSizeOptions}
            value={String(table.getState().pagination.pageSize)}
            onChange={(value) => table.setPageSize(Number(value))}
            className="h-[33px] w-[55px] rounded-[6px] border-[#A8A8A8] text-xs font-medium"
          />
          <span className="text-sm text-[#1B1B1B]">data</span>
        </div>
        <div className="mx-2 h-5 w-px bg-[#C6CBD4]" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft
              size={24}
              className={cn(
                "text-[#868686]",
                !table.getCanPreviousPage() && "text-[#D7D7D7]"
              )}
            />
          </button>
          {paginationRange.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-1 py-1 text-sm font-medium text-[#868686]"
              >
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => table.setPageIndex(pageNumber - 1)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-[6px] p-1.5 text-sm font-medium",
                  currentPage === pageNumber
                    ? "bg-[#176CF7] text-white"
                    : "bg-transparent text-[#868686] hover:bg-neutral-100"
                )}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight
              size={24}
              className={cn(
                "text-[#868686]",
                !table.getCanNextPage() && "text-[#D7D7D7]"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const DataTable = {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Search: DataTableSearch,
  Content: DataTableContent,
  Pagination: DataTablePagination,
};

// --- Styled Shadcn Table Components ---
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "data-[state=selected]:bg-muted border-b border-[#C6CBD4] transition-colors hover:bg-neutral-50",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(
  ({ className, column, children, ...props }, ref) => {
    const enableSorting = column?.columnDef.enableSorting !== false;
    if (enableSorting && column) {
      const sortDirection = column.getIsSorted();
      const iconSrc =
        sortDirection === "asc"
          ? "/icons/asc-sort.svg"
          : sortDirection === "desc"
            ? "/icons/desc-sort.svg"
            : "/icons/default-sort.svg";
      return (
        <th
          ref={ref}
          className={cn(
            "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
            className
          )}
          {...props}
        >
          <button
            onClick={() => column.toggleSorting()}
            className="flex min-h-8 w-full items-center gap-2 p-2 text-xs font-semibold text-[#868686] hover:bg-transparent"
          >
            {children}
            <IconComponent src={iconSrc} alt="sort icon" className="h-4 w-4" />
          </button>
        </th>
      );
    }
    return (
      <th
        ref={ref}
        className={cn(
          "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      >
        <div className="flex min-h-8 items-center px-2">{children}</div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 text-left align-middle text-xs text-[#1B1B1B] [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// --- Pagination Hook ---
const usePagination = ({
  totalPages = 0,
  currentPage = 1,
  siblingCount = 1,
}) => {
  return React.useMemo(() => {
    if (totalPages <= 1) {
      return totalPages === 1 ? [1] : [];
    }
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }
    return [];
  }, [totalPages, currentPage, siblingCount]);
};

// --- TanStack Table Column Definitions (FIXED JSX) ---
const columns = [
  {
    id: "actions",
    header: "Action",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-[33px] w-[61px] items-center justify-center gap-1 rounded-[6px] border-[#A8A8A8] px-2 py-2 text-xs font-semibold text-[#868686]"
            >
              Atur
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  },
  { accessorKey: "companyName", header: "Nama Perusahaan" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "city", header: "Kabupaten / Kota" },
  { accessorKey: "businessType", header: "Badan Usaha" },
  { accessorKey: "businessCategory", header: "Kategori Usaha" },
  { accessorKey: "totalActiveProducts", header: "Jumlah Produk" },
  {
    accessorKey: "registrationDate",
    header: "Tanggal Register",
    cell: ({ row }) => formatDate(row.original.registrationDate),
  },
];

// --- Main Page Component ---
export default function CompanyTablePage() {
  const { sorting, pagination, searchTerm, dataTableProps } = useDataTable();

  const { data, error, isLoading } = useGetCompanies({
    pagination,
    sorting,
    searchTerm,
    currentStatus: null,
  });

  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load companies.</Alert>;

  return (
    <div className="min-h-screen w-screen bg-white p-10">
      <DataTable.Root
        columns={columns}
        data={data?.sellers}
        pageCount={data?.pagination?.totalPages ?? 0}
        paginationData={data?.pagination}
        {...dataTableProps}
      >
        <DataTable.Header>
          <DataTable.Search />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Filter
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Export
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Create Link +
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Tambah +
            </Button>
          </div>
        </DataTable.Header>

        <DataTable.Content />
        <DataTable.Pagination />
      </DataTable.Root>
    </div>
  );
}
