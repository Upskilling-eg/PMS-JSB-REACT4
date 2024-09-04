import React from "react";

type PaginationParams = {
  currentPage: number;
  totalNumberOfPages: number;
  requiredNumberOfPages: number;
};
/**
 * paginate takes in 3 parameters, the current page, the total number of pages
 * and the required number of pages. It returns an array of numbers from the
 * start page to the end page. If the required number of pages is greater than
 * the total number of pages, it will return an array of numbers from the
 * start page to the end page. If the required number of pages is less than or
 * equal to the total number of pages, it will return an array of numbers from
 * the start page to the end page. If the current page plus the required number
 * of pages is greater than the total number of pages, it will return an array of
 * numbers from the start page to the end page. If the start page plus the
 * required number of pages is less than or equal to the total number of pages,
 * it will return an array of numbers from the start page to the end page.
 *
 * @param {number} currentPage - the current page.
 * @param {number} totalNumberOfPages - the total number of pages in the list.
 * @param {number} requiredNumberOfPages - the required number of pages.
 * @returns {number[]} - an array of numbers from the start page to the end page.
 */

export const paginate = ({
  currentPage,
  totalNumberOfPages,
  requiredNumberOfPages,
}: PaginationParams) => {
  //  required number of pages is bigger than the total number of pages in our list, we should show only total number of pages
  if (requiredNumberOfPages > totalNumberOfPages) {
    return range({ start: 1, end: requiredNumberOfPages });
  } else if (totalNumberOfPages > requiredNumberOfPages) {
    // making sure that we are not exceeding the total number of pages.
    if (currentPage + requiredNumberOfPages <= totalNumberOfPages) {
      return range({
        start: currentPage,
        end: currentPage + requiredNumberOfPages,
      });
    } else {
      return range({
        start: totalNumberOfPages - requiredNumberOfPages + 1,
        end: totalNumberOfPages + 1,
      });
    }
  }
};

type RangeParams = {
  start?: number;
  end: number;
  step?: number;
};
/**
 * Return an array of numbers from start to end, incrementing by step.
 * If start is not given, start at 0.
 *
 * @param {number} start - the number to start at
 * @param {number} end - the number to end at
 * @param {number} [step=1] - the incrementor
 * @returns {number[]} - an array of numbers from start to end
 */
export const range = ({ start, end, step = 1 }: RangeParams) => {
  const output = [];

  if (start) {
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
  }

  if (!start) {
    for (let i = 0; i < end; i += step) {
      output.push(i);
    }
  }

  return output;
};

range({ start: 1, end: 10 });
export default paginate;
