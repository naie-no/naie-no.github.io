import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-[#3D148A] to-[#5A23C9] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-[#3D148A] mb-3">Siden ble ikke funnet</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Beklager, vi finner ikke siden du leter etter. Den kan ha blitt flyttet eller slettet.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
            <Link to="/">Til forsiden</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-lg border-[#5A23C9] text-[#5A23C9] hover:bg-[#ECE7FF] !bg-transparent">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Gå tilbake
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}