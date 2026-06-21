import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

export function SpotlightCursorDemo() {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black overflow-hidden">
      <h1 className="text-white text-4xl font-bold z-10 pointer-events-none">
        Move your mouse!
      </h1>
      <SpotlightCursor />
    </div>
  );
}
