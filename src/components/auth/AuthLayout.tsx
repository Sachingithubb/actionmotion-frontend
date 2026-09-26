import type { ReactNode } from "react";

interface AuthLayoutProps {
  brandPanel: ReactNode;
  formPanel: ReactNode;
  backgroundImage: string;
}

const AuthLayout = ({
  brandPanel,
  formPanel,
  backgroundImage,
}: AuthLayoutProps) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen background */}
      <div
        className="auth-background absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 lg:grid-cols-[70%_30%]">
        {/* Left Content */}
        <div className="relative hidden min-h-screen lg:block">
          {brandPanel}
        </div>

        {/* Signup / Login */}
        <div className="relative flex min-h-screen items-center justify-start p-3 lg:pl-0 lg:pr-6">
          <div className="w-full max-w-[430px]">
            {formPanel}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;