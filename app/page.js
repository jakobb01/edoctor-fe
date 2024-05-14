import Image from "next/image";
import {Button} from "@/components/ui/button";
import Landing from "@/app/_components/Landing";
import CategorySearch from "@/app/_components/CategorySearch";
import PopularDoctor from "@/app/_components/PopularDoctor";

export default function Home() {
  return (
    <div>
        <Landing/>

        <CategorySearch/>

        <PopularDoctor/>

    </div>
  );
}
