import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableTasks from "../Task/TableTasks";

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";

export default function Show({ auth, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {`Project "${project.name}"`}
        </h2>
      }
    >
      <Head title={`Project "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
              <div className="">
                <img
                  src={project.image_path}
                  alt="image"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 p-6">
                <div className="flex flex-col gap-5">
                  <div className="">
                    <h5 className="text-xl font-semibold">Project Id</h5>
                    <p>{project.id}</p>
                  </div>
                  <div className="">
                    <h5 className="text-xl font-semibold">Project Name</h5>
                    <p>{project.name}</p>
                  </div>
                  <div className="">
                    <h5 className="text-xl font-semibold mb-1">
                      Project Status
                    </h5>
                    <span
                      className={
                        "px-3 py-1 text-white rounded " +
                        TASK_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </div>
                  <div className="">
                    <h5 className="text-xl font-semibold">Created By</h5>
                    <p>{project.createdBy.name}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="">
                    <h5 className="text-xl font-semibold">Due Date</h5>
                    <p>{project.due_date}</p>
                  </div>
                  <div className="">
                    <h5 className="text-xl font-semibold">Created Date</h5>
                    <p>{project.created_at}</p>
                  </div>
                  <div className="">
                    <h5 className="text-xl font-semibold">Updated By</h5>
                    <p>{project.updatedBy.name}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h5 className="text-xl font-semibold">Description</h5>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <TableTasks
                tasks={tasks}
                queryParams={queryParams}
                routeName="project.show"
                id={project.id}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
