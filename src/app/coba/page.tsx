"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Schema validasi
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter" })
    .max(12, { message: "Username maksimal 12 karakter" }),
  age: z.number().min(1, { message: "Umur harus lebih dari 0" }),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" }),
});

// 🔹 Tipe data otomatis dari schema
type FormData = z.infer<typeof schema>;

export default function Page() {
  const [users, setUsers] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 🔹 useForm dengan resolver Zod
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
    console.log("Submitted Data:", data); // 🔥 Log ke console

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
    console.log("Deleted index:", index);
  };

  // 🔹 Edit data
  const handleEdit = (index: number) => {
    reset(users[index]); // Isi ulang form
    setEditIndex(index);
    console.log("Editing user:", users[index]);
  };

  return (
    <main className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-xl font-bold">User Form (CRUD)</h1>

      {/* 🔹 FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-72"
      >
        <input
          {...register("username")}
          placeholder="Username"
          className="border p-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="Age"
          className="border p-2 rounded"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editIndex !== null ? "Update" : "Tambah"}
        </button>
      </form>

      {/* 🔹 TAMPIL DATA */}
      <div className="w-72">
        {users.length === 0 ? (
          <p className="text-gray-500">Belum ada data</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {users.map((user, index) => (
              <li
                key={index}
                className="border p-2 flex justify-between items-center"
              >
                <span>{user.username} - {user.age}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-400 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
