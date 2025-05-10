import Creator from "./components/creator";
import MyWardrobe from "./components/myWardrobe";
import Assistant from "./components/assistant";

export default function WardrobePage() {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6">虚拟衣橱</h1> */}

      <div className=" grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <Creator className="lg:col-span-2 " />
        <div className="flex flex-col gap-4 lg:col-span-1">
          <MyWardrobe />
          <Assistant />
        </div>
      </div>
    </div>
  );
}
