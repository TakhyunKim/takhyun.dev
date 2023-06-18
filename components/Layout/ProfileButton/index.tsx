"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./ProfileButton.module.css";

const ProfileButton = () => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/");
  };

  return (
    <button onClick={handleProfileClick} className={styles.header_profile}>
      <Image src="/images/profile.jpg" alt="profile" fill />
    </button>
  );
};

export default ProfileButton;
