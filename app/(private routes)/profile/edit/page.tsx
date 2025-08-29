"use client";
import css from "./page.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = (formData.get("username") as string | null)?.trim();
    if (!username) return;
    if (!user) return;
    await updateMe({ username: username });
    setUser({ ...user, username: username });
    router.replace("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
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
