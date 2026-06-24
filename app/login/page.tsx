"use client";
"use Effect";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
        const { data} = await supabase.auth.getUser();
        if (data.user) {
            router.push("/dashboard");
        }
    };
    checkUser();
}, []);

  // Sign up function
  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup!");
    }
  };

  // Login function
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="p-8 bg-black rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          CleanFlow Login
        </h1>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Buttons */}
        <button
          onClick={signIn}
          className="w-full bg-blue-600 text-white p-2 rounded mb-2"
        >
          Login
        </button>

        <button
          onClick={signUp}
          className="w-full border p-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}