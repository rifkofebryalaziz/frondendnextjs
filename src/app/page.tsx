import GreetingButton from "@/app/components/GreatingButton";

export default function Home() {
  const name: string = "John Doe";

  const names: string[] = ["John", "Jane", "Albert"];

  return (
    <div className="">
      <p className="text-white">Hello {name}</p>

      {names.map((name, i) => (
        <p key={i}>Hello {name}</p>
      ))}

      <GreetingButton name = {name} />
      {names.map((name, i) => (
        <GreetingButton key={i} name={name}/>
      ))}
    </div>
  );
}