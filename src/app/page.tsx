import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { Scene } from '@/components/3d/Scene';

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Canvas */}
        <div className="flex-1 relative bg-gradient-to-br from-black via-slate-900 to-black">
          <Scene />
        </div>
        {/* Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}