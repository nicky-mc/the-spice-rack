import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>
        Sign In to Social Media on a Spicy Level(don&apos;t be naughty! not like
        that!)
      </h1>
      <SignIn />
    </>
  );
}
