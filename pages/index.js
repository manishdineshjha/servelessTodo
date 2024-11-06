import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1
        className={`text-4xl font-bold mb-6 ${geistSans.variable} font-sans text-center`}
      >
        Welcome to the Todo App!
      </h1>
      <p
        className={`text-xl mb-6 ${geistMono.variable} font-mono text-center text-gray-700`}
      >
        Manage your tasks and stay organized.
      </p>
      <button
        onClick={navigateToLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs"
      >
        Go to Login
      </button>
    </div>
  );
}
