"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAudio } from "react-use-audio";
import switchOnSound from "./switch-on.wav";

import styles from "./ThemeButton.module.css";

const getTheme = () => {
  const themeAttribute = document.body.getAttribute("data-theme");

  return themeAttribute;
};

const setDocumentTheme = (theme: "dark" | "light") => {
  document.body.setAttribute("data-theme", theme);

  window.localStorage.setItem("theme", theme);
};

const ThemeButton = () => {
  const [theme, setTheme] = useState<string | null>();
  const { play } = useAudio(switchOnSound);

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setDocumentTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
      setDocumentTheme("dark");
    }

    play();
  };

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  if (theme !== "dark" && theme !== "light") return null;

  return (
    <button className={styles.button} onClick={handleChangeTheme}>
      <Image
        fill
        src={`/images/${theme === "dark" ? "moon" : "sun"}.svg`}
        alt="theme icon"
      />
    </button>
  );
};

export default ThemeButton;
