import React from 'react'

const DateColumn = ({row, accessorKey}) => {
    const date = row.getValue(accessorKey);
    const originalDate = new Date(date);
    const day = originalDate.getDate();
    const month = originalDate.toLocaleString("default", {
      month: "short",
    });
    const year = originalDate.getFullYear();
  return (
     <div className="line-clamp-1">{`${day}th ${month}, ${year}`}</div>
  )
}

export default DateColumn