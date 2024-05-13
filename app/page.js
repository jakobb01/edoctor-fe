import Image from "next/image";
import {Button} from "@/components/ui/button";
import Landing from "@/app/_components/Landing";
import CategorySearch from "@/app/_components/CategorySearch";

export default function Home() {
  return (
    <div>
        <Landing/>

        <CategorySearch/>

    </div>
  );
}
