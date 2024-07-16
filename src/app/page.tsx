import Image from "next/image";
import TodoList from "./_components/todoList";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
        <Sidebar/>
      </div>
    </div>
  );
}
