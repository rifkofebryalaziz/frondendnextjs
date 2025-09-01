"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "kurang dari 3" })
    .max(10, { message: "lebih dari 10" }),
  lastname: z.string().min(3).max(10),
  age: z.coerce.number(),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(formSchema) });

  const onSubmit: FormEventHandler<HTMLFormElement> = handleSubmit((e) => {
    console.log("submited");
    console.log(e);
  });

  return (
    <main className="flex w-full h-screen justify-center items-center flex-col gap-2">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Firstname..."
          {...register("firstname")}
        />
        <p>{errors?.firstname?.message}</p>
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Lastname..."
          {...register("lastname")}
        />
        <p>{errors?.lastname?.message}</p>

        <input
          className="p-2 border rounded-lg"
          type="number"
          placeholder="age..."
          {...register("age")}
        />
        <p>{errors?.age?.message}</p>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Page;