import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

interface CustomTableProps {
  headers: string[];
  rows: number;
  columns: number;
  loading?: boolean;
}

const CustomTable = ({
  headers,
  rows,
  columns,
  loading = true,
}: CustomTableProps) => {
  return (
    <TableContainer
      component={Paper}
      className="rounded-xl border border-gray-100 shadow-sm overflow-x-auto"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Table className="min-w-[400px]">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} className="font-semibold text-gray-800 whitespace-nowrap">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {loading ? <Skeleton height={24} /> : "Dato"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default CustomTable;
