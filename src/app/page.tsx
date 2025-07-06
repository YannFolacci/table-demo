import Header from "@/components/Header/Header";
import Table from "@/components/Table/Table";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header/>
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Table/>
      </main>
    </div>
  );
}
