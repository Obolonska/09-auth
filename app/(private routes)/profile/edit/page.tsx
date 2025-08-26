"use client";
import css from "./page.module.css";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/app/api/clientApi";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName, photoUrl: "" });
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
              onChange={handleChange}
            />
          </div>

          <p>Email: user_email@example.com</p>

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
