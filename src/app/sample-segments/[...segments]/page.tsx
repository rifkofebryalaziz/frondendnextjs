import React from "react";

type Props = { params: Promise<{ segments: string[] }> };

const page = async (props: Props) => {
  const segments = (await props.params).segments;

  return (
    <main>
      <p>segments 1: {segments[0]}</p>
      <p>segments 2: {segments[1]}</p>
    </main>
  );
};

export default page;
