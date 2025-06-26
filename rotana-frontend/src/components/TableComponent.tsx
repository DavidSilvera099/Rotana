import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export interface TableData {
  id: number;
  name: string;
  createdAt: string;
  file: string;
  fileLink: string;
  status: "Completed" | "Incomplete";
  user: string;
  hash: string;
  type: string;
}

interface Props {
  data: TableData[];
  headerTable: string[]; // <- Nuevo prop
}

const StatusBadge = ({ status }: { status: "Completed" | "Incomplete" }) => {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${
        status === "Completed"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
};

const TableComponent = ({ data, headerTable }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-md">
        <Table aria-label="Tabla de archivos" className="min-w-[1000px] text-sm">
          <TableHeader>
            {headerTable.map((title, i) => (
              <TableColumn
                key={i}
                className="bg-gray-100 text-gray-700 p-3 font-semibold"
              >
                {title}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.hash + index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <TableCell className="p-3">{item.id}</TableCell>
                <TableCell className="p-3">{item.name}</TableCell>
                <TableCell className="p-3">{item.createdAt}</TableCell>
                <TableCell className="p-3 text-blue-600 cursor-pointer">
                  {item.file}
                </TableCell>
                <TableCell className="p-3 text-blue-600 underline">
                  <a href={item.fileLink} target="_blank" rel="noreferrer">
                    {item.fileLink}
                  </a>
                </TableCell>
                <TableCell className="p-3">
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="p-3">{item.user}</TableCell>
                <TableCell className="p-3 truncate max-w-[150px]">{item.hash}</TableCell>
                <TableCell className="p-3">{item.type}</TableCell>
                <TableCell className="p-3 flex items-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-end mt-4 text-sm text-gray-600 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
