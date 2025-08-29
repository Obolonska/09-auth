"use client";
import { useRouter } from "next/navigation";
import css from "./page.module.css";
import { useState } from "react";
import { register } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";
import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

type ApiErrorResponse = {
  error: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  // Отримуємо метод із стора
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const user = Object.fromEntries(formData) as UserRequest;
      // Виконуємо запит
      const res = await register(user);

      // Виконуємо редірект або відображаємо помилку
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      setError(
        axiosError.response?.data?.error ??
          axiosError.message ??
          "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
