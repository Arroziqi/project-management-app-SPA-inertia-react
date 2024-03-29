import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, tasks, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("task.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <TableHeading
                      name={"id"}
                      sortable={true}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <TableHeading>Image</TableHeading>
                    <TableHeading
                      name={"name"}
                      sortable={true}
                      sortChanged={sortChanged}
                    >
                      Name
                    </TableHeading>
                    <TableHeading
                      name={"status"}
                      sortable={true}
                      sortChanged={sortChanged}
                    >
                      Status
                    </TableHeading>
                    <TableHeading
                      name={"created_at"}
                      sortable={true}
                      sortChanged={sortChanged}
                    >
                      Created Date
                    </TableHeading>
                    <TableHeading
                      name={"due_date"}
                      sortable={true}
                      sortChanged={sortChanged}
                    >
                      Due Date
                    </TableHeading>
                    <TableHeading>Created by</TableHeading>
                    <TableHeading>Updated by</TableHeading>
                    <TableHeading>Actions</TableHeading>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="Task name"
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        defaultValue={queryParams.status}
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.data.map((task) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={task.id}
                    >
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <img src={task.image_path} alt="" />
                      </td>
                      <td className="px-3 py-2">{task.name}</td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-3 py-1 text-white rounded " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2">{task.created_at}</td>
                      <td className="px-3 py-2">{task.due_date}</td>
                      <td className="px-3 py-2">{task.createdBy.name}</td>
                      <td className="px-3 py-2">{task.updatedBy.name}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("task.edit", task.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route("task.destroy", task.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={tasks.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
