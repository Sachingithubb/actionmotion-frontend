import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";
import narutoTheme from "../assets/images/narutotheme.png";

const Signup = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08050D] text-[#17121F]">
      <AuthLayout
        backgroundImage={narutoTheme}
        brandPanel={<AuthBrandPanel />}
        formPanel={<SignupForm />}
      />
    </main>
  );
};

export default Signup;