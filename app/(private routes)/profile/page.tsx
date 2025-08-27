import Image from "next/image";
import css from "./page.module.css";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <div>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-vbaf-p-avatarka-png-11.png"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.userName}</p>
            <p>Email:{user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
