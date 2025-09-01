import React from "react";

type Props = { params: Promise<{ id: string }> };

const page = async (props: Props) => {
  const id = (await props.params).id;
  return (
    <main>
      <div className="">Post dengan id {id}</div>
    </main>
  );
};

export default page;