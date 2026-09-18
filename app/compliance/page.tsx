import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComplianceData,
} from "@/content/compliance/getCompliance";
import {
  getComplianceMetadata,
} from "@/content/compliance/metadata";
import {
  CompliancePageView,
} from "@/components/compliance/CompliancePage";

export async function generateMetadata(): Promise<Metadata> {
  return getComplianceMetadata();
}

export default async function CompliancePage() {
  const page = await getComplianceData();

  console.log(page);

  if (!page) {
    return notFound();
  }

  return <CompliancePageView page={page} />;
}
