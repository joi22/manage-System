import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../auth/SignInForm";

export default function SignIn() {
  return (
    <>
     
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
