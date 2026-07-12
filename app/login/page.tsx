import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111F]">

      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920')",
        }}
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-[#07111F]/80 backdrop-blur-[2px]" />

      {/* Login */}

      <div className="relative z-10">
        <LoginCard />
      </div>

    </main>
  );
}