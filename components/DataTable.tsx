"use client";

interface Column {
  header: string;
  key: string;
}

interface Props {
  data: any[];
  columns: Column[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function DataTable({ data, columns, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="p-2 border">{col.header}</th>
          ))}
          {onEdit && <th className="p-2 border">Edit</th>}
          {onDelete && <th className="p-2 border">Delete</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={col.key} className="p-2 border">{item[col.key]}</td>
            ))}
            {onEdit && (
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onEdit(item)}>
                  Edit
                </button>
              </td>
            )}
            {onDelete && (
              <td className="p-2 border">
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(item)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
