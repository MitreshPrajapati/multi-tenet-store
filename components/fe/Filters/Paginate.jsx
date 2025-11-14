"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function Paginate({ totalPages, isSearch = false }) {
  const searchParams = useSearchParams();

  // ✅ Extract safely
  const sort = searchParams.get("sort") || "asc";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // ✅ Helper to create consistent links
  const buildUrl = (pageNum) => {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      sort,
      ...(isSearch ? { query } : {}),
      ...(min ? { min } : {}),
      ...(max ? { max } : {}),
    });
    return `?${params.toString()}`;
  };

  // ✅ Calculate how many page buttons to show
  const visiblePages = Math.min(totalPages, 3);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={buildUrl(currentPage === 1 ? 1 : currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: visiblePages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={buildUrl(pageNum)}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Ellipsis if there are more pages */}
        {totalPages > 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={buildUrl(totalPages)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={buildUrl(
              currentPage === totalPages ? totalPages : currentPage + 1
            )}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
