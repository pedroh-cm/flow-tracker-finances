type ChartDataTableProps = {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
};

export function ChartDataTable({ caption, columns, rows }: ChartDataTableProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
