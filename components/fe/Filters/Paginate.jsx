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

export default function Paginate({ totalPages }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${
              currentPage == 1
                ? `?${new URLSearchParams({ page: 1 })}`
                : `?${new URLSearchParams({ page: parseInt(currentPage) - 1 })}`
            }`}
          />
        </PaginationItem>
        {totalPages <= 3 ? (
          Array.from({ length: 3 }, (_, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?${new URLSearchParams({ page: index + 1 })}`}
                  isActive={index + 1 == currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`?${new URLSearchParams({ page: index + 1 })}`}
                    isActive={index + 1 == currentPage}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {/* {totalPages <= 3 ? "" : ""} */}
        {/* {totalPages <= 3 ? "" : ""} */}
        {/* <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext
            href={`${
              currentPage == totalPages
                ? `?${new URLSearchParams({ page: totalPages })}`
                : `?${new URLSearchParams({ page: parseInt(currentPage) + 1 })}`
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
