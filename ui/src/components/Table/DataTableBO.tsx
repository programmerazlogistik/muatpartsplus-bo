"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input, Select } from "@muatmuat/ui/Form";
import {
  Column,
  PaginationState,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TableBO } from "./TableBO";
import { usePagination } from "./usePagination";

// --- Type Definitions ---
export interface DataTableContextValue<TData> {
  table: Table<TData>;
  columns: Column<TData>[];
  data: TData[];
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DataTableRootProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: Column<TData>[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void;
  sorting?: SortingState;
  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  paginationData?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DataTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface DataTableSearchProps {
  className?: string;
}

export interface DataTableContentProps {
  Table?: typeof TableBO;
}

// --- DataTable Compound Component Definition ---
const DataTableContext = React.createContext<DataTableContextValue<any> | null>(
  null
);
export const useDataTableContext = <
  TData = any,
>(): DataTableContextValue<TData> => {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTableContext must be used within a DataTable.Root");
  }
  return context as DataTableContextValue<TData>;
};

const DataTableRoot = <TData,>({
  children,
  ...props
}: DataTableRootProps<TData>) => {
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

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  children,
  className,
}) => (
  <div
    className={cn("flex items-center justify-between gap-4 pb-2.5", className)}
  >
    {children}
  </div>
);

const DataTableSearch: React.FC<DataTableSearchProps> = () => {
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

const DataTableContent: React.FC<DataTableContentProps> = ({
  Table = TableBO,
}) => {
  const { table, columns } = useDataTableContext();
  return (
    <div className="rounded-[10px] border border-[#A8A8A8] bg-white px-2">
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row
              key={headerGroup.id}
              className="border-b-[2px] border-[#C6CBD4] hover:bg-white"
            >
              {headerGroup.headers.map((header) => (
                <Table.Head key={header.id} column={header.column}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-[51px]"
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

const DataTablePagination: React.FC = () => {
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
                onClick={() => table.setPageIndex(Number(pageNumber) - 1)}
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

export const DataTable = {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Search: DataTableSearch,
  Content: DataTableContent,
  Pagination: DataTablePagination,
};
