import { FlowHoverButton } from "@/components/ui/flow-hover-button";
import { ArrowRight, Send } from "lucide-react";

export function FlowHoverButtonDemo() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center gap-4 p-10">
      <FlowHoverButton icon={<ArrowRight className="w-4 h-4" />}>Hover Over Me</FlowHoverButton>
      <FlowHoverButton href="#contact" icon={<Send className="w-4 h-4" />}>Link Button</FlowHoverButton>
    </div>
  );
}
