"use client";

import { Separator } from "@/components/ui/separator";
import AdvisorBox from "@/components/(admin)/teachers/AdvisorBox";
import AdvisorHeader from "@/components/(admin)/teachers/AdvisorHeader";
import MentorBox from "@/components/(admin)/teachers/MentorBox";
export default function AdvisorPage() {



  return (
    <div className="p-6 space-y-6">
      <AdvisorHeader />
      <Separator />
      <AdvisorBox />
      <Separator />
      <MentorBox />
    </div>
  );
}
