"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Schema validasi dengan Zod
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter" })
    .max(12, { message: "Username maksimal 12 karakter" }),
  age: z.number().min(1, { message: "Umur harus lebih dari 0" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

// 🔹 Tipe data otomatis dari schema
type FormData = z.infer<typeof schema>;

export default function Page() {
  const [users, setUsers] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // 🔹 Submit data
  const onSubmit = (data: FormData) => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = data;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, data]);
    }
    reset();
  };

  // 🔹 Hapus data
  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  // 🔹 Edit data
  const handleEdit = (index: number) => {
    reset(users[index]);
    setEditIndex(index);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 gap-6">
      <h1 className="text-2xl font-extrabold text-blue-600">
        CRUD User Form
      </h1>

      {/* 🔹 FORM CARD */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-normal text-gray-900 mb-1">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="Masukkan username"
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-normal text-gray-900 mb-1">
              Age
            </label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              placeholder="Masukkan umur"
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-normal text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Masukkan password"
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            {editIndex !== null ? "Update Data" : "Tambah Data"}
          </button>
        </form>
      </div>

      {/* 🔹 TABLE DATA */}
      <div className="w-full max-w-2xl">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada data pengguna</p>
        ) : (
          <table className="w-full border-collapse bg-white shadow-md rounded-2xl overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold text-blue-600">
                    {index + 1}
                  </td>
                  <td className="p-3 text-gray-800">{user.username}</td>
                  <td className="p-3 text-gray-800">{user.age}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-medium shadow hover:opacity-90"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow hover:opacity-90"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}