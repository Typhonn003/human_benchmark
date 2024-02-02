import Login from "./Login";
import Register from "./Register";

export default function Header() {
  return (
    <header className="bg-lime9">
      <div className="flex justify-between items-center w-[90%] mx-auto">
        <h1>Human Benchmark</h1>
        <menu>
          <Login />
          <Register />
        </menu>
      </div>
    </header>
  );
}
