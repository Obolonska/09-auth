"use client";
import css from "./page.module.css";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  // Отримуємо поточного користувача зі стану, щоб використовувати його дані
  const currentUser = useAuthStore((state) => state.user);

  // useEffect для заповнення полів форми даними користувача
  useEffect(() => {
    // Якщо дані користувача вже в стані, використовуємо їх, щоб уникнути зайвого запиту
    if (currentUser) {
      setUsername(currentUser.username ?? "");
      setEmail(currentUser.email ?? "");
    } else {
      // Якщо дані не завантажені (наприклад, при першому рендері), робимо API-запит
      getMe().then((user) => {
        setUsername(user.username ?? "");
        setEmail(user.email ?? "");
      });
    }
  }, [currentUser]); // Додаємо currentUser як залежність, щоб оновити форму, якщо він зміниться

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Використовуємо async/await для більш чистого коду
      const updatedUser = await updateMe({ username: username });

      // Оновлюємо стан глобального сховища за допомогою setUser
      setUser(updatedUser);

      // Перенаправляємо користувача на сторінку профілю
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user", error);
      // Можна додати обробку помилки для користувача (наприклад, тост-повідомлення)
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={handleUsernameChange}
              value={username} // Додаємо value для контрольованого компонента
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
