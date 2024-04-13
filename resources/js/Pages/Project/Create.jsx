import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function CreatePage({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.store"));
  };

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Add New Project
            </h2>
          </div>
        }
      >
        <Head title="Add Project" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 flex flex-col gap-4">
                <form action="" onSubmit={onSubmit}>
                  <div className="">
                    <InputLabel
                      htmlFor="project_image_path"
                      value="Project Image"
                    />
                    <TextInput
                      id="project_image_path"
                      type="file"
                      name="image"
                      className="mt-1 block w-full border border-black cursor-pointer"
                      onChange={(e) => setData("image", e.target.value)}
                    />

                    <InputError message={errors.image} className="mt-2" />
                  </div>
                  <div className="">
                    <InputLabel htmlFor="name" value="Project Name" />
                    <TextInput
                      id="name"
                      type="text"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full border border-black cursor-pointer"
                      onChange={(e) => setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                  </div>
                  <div className="">
                    <InputLabel htmlFor="status" value="Project Status" />
                    <SelectInput
                      id="status"
                      name="status"
                      className="mt-1 block w-full border border-black cursor-pointer"
                      onChange={(e) => setData("status", e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>

                    <InputError message={errors.status} className="mt-2" />
                  </div>
                  <div className="">
                    <InputLabel
                      htmlFor="description"
                      value="Project Description"
                    />
                    <TextArea
                      id="description"
                      name="description"
                      className="mt-1 block w-full border border-black cursor-pointer"
                      onChange={(e) => setData("description", e.target.value)}
                    ></TextArea>

                    <InputError message={errors.description} className="mt-2" />
                  </div>
                  <div className="">
                    <InputLabel htmlFor="name" value="Project Due Date" />
                    <TextInput
                      id="due_date"
                      type="date"
                      name="due_date"
                      value={data.due_date}
                      className="mt-1 block w-full border border-black cursor-pointer"
                      onChange={(e) => setData("due_date", e.target.value)}
                    />

                    <InputError message={errors.due_date} className="mt-2" />
                  </div>
                  <div className="text-right mt-4">
                    <Link
                      href={route("project.index")}
                      className="py-2 px-4 text-white font-bold bg-gray-600 rounded shadow transition-all hover:bg-gray-700 mr-4"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="py-2 px-4 text-white font-bold bg-green-600 rounded shadow transition-all hover:bg-green-700"
                    >
                      Add Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
