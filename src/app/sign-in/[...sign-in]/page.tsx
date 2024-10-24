import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>Sign In to Social Media on a Spicy Level</h1>
      <SignIn />
    </>
  );
}
