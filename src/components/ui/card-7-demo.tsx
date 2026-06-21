import { InteractiveProductCard } from "@/components/ui/card-7";

export function Card7Demo() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#050505] p-4">
      <InteractiveProductCard
        title="Nike M2K Tekno"
        description="Elevate Your Every Step"
        price="$149"
        imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
        logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
      />
    </div>
  );
}
