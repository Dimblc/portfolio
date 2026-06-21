import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
} from "@/components/ui/card-curtain-reveal";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CardCurtainRevealDemo() {
  return (
    <div className="min-h-screen place-content-center place-items-center bg-black p-10">
      <CardCurtainReveal className="h-[560px] w-96 border border-zinc-100 bg-zinc-950 text-zinc-50 shadow">
        <CardCurtainRevealBody>
          <CardCurtainRevealTitle className="text-3xl font-medium tracking-tight">
            Behind <br />
            the Curtain
          </CardCurtainRevealTitle>
          <CardCurtainRevealDescription className="my-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium voluptate, eum quia temporibus fugiat rerum nobis modi
              dolor, delectus laboriosam, quae adipisci reprehenderit officiis
              quidem iure ducimus incidunt officia.
            </p>
          </CardCurtainRevealDescription>
          <Button variant="secondary" size="icon" className="aspect-square rounded-full">
            <ArrowUpRight />
          </Button>

          <CardCurtain className="bg-zinc-50" />
        </CardCurtainRevealBody>

        <CardCurtainRevealFooter className="mt-auto">
          <img
            width="100%"
            height="100%"
            alt="Tokyo street"
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2388&auto=format&fit=crop"
          />
        </CardCurtainRevealFooter>
      </CardCurtainReveal>
    </div>
  );
}
