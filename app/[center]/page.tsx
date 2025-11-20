import CenterLanding from "@/components/CenterLanding";


export default async function CenterPage({ params }: { params: Promise<{ center: string }> }) {
  const { center } = await params; // ✅ wait for params to resolve

  return <CenterLanding centerId={center} />;
}