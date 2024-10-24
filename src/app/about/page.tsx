import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
      <main className="flex flex-col gap-8 items-center">
        <Image
          className="dark:invert"
          src="/spice.png"
          alt="The Spice Rack logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold text-white text-center">
          About The Spice Rack
        </h1>
        <p className="text-lg text-white text-center">
          The Spice Rack is a social media platform designed to add a little
          spice to your online interactions. Our aim is to create a vibrant and
          engaging community where users can share their thoughts, ideas, and
          experiences in a fun and dynamic way.
        </p>
        <p className="text-lg text-white text-center">
          Whether you&apos;re here to connect with friends, discover new
          interests, or simply have a good time, The Spice Rack has something
          for everyone. Join us and be part of a community that values
          creativity, inclusivity, and a touch of spice! 🌶
        </p>
        <p className="text-3xl font-bold text-white text-center mt-8">
          Don&apos;t be naughty! Not like that!
        </p>
        <Link href="/" className="mt-8 text-lg text-white underline">
          Return to Home
        </Link>
      </main>
    </div>
  );
}
