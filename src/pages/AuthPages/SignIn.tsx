import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="دست خط | ردپای ذهن بر روی کاغذ دیجیتال"
        description="دست خط | ردپای ذهن بر روی کاغذ دیجیتال"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
