import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
  name = null,
  sortable = false,
  sortChanged = () => {},
  children,
}) {
  return (
    <th
      onClick={(e) => sortChanged(name)}
      className={"px-3 py-3 " + (sortable ? "cursor-pointer" : " ")}
    >
      <div className="flex items-center justify-between gap-1">
        {children}
        {sortable && <ChevronUpDownIcon className="w-4" />}
      </div>
    </th>
  );
}
