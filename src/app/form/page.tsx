"use client";

import { FormEventHandler, useState } from "react";
import z from "zod";

const Page = () => {
  // const [firstname, setFirstname] = useState<string>();
  // const [lastname, setLastname] = useState<string>();

  // const onFirstnameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const value = e.target.value;
  //   setFirstname(value);
  // };

  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    age?: string;
  }>();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const _firstname = form.get("firstname");
    const _lastname = form.get("lastname");
    const _age = parseInt(form.get("age")?.toString() ?? "0");

    const formSchema = z.object({
      firstname: z.string().min(3).max(10),
      lastname: z.string().min(3).max(10),
      age: z.number(),
    });

    const formData = { firstname: _firstname, lastname: _lastname, age: _age };

    console.log("Formdata", formData);
    const validatedFormData = formSchema.safeParse(formData);
    if (!validatedFormData.success) {
      const issues = validatedFormData.error.issues;

      const firstnameError = issues.find((issue) =>
        issue.path.find((path) => path === "firstname")
      );

      const lastnameError = issues.find((issue) =>
        issue.path.find((path) => path === "lastname")
      );

      setErrors({
        firstname: firstnameError?.message,
        lastname: lastnameError?.message,
      });

      console.log("error", firstnameError);

      return;
    }
    console.log("validatedFormData", validatedFormData.data);
  };

  return (
    <main className="flex w-full h-screen justify-center items-center flex-col gap-2">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Firstname..."
          name="firstname"
          // onChange={onFirstnameChange}
        />
        <p>{errors?.firstname}</p>
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Lastname..."
          name="lastname"
        />
        <p>{errors?.lastname}</p>

        <input
          className="p-2 border rounded-lg"
          type="number"
          placeholder="age..."
          name="age"
        />
        <p>{errors?.age}</p>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Page;