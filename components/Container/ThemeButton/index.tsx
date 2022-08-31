import { useState, useEffect } from "react";
import Image from "next/image";

import { getTheme } from "../../../common/utils/getTheme";
import { setTheme as setDocumentTheme } from "../../../common/utils/setTheme";

import styles from "./ThemeButton.module.css";

const ThemeButton = () => {
  const [theme, setTheme] = useState<string | null>();

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setDocumentTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
      setDocumentTheme("dark");
    }
  };

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  if (theme !== "dark" && theme !== "light") return null;

  return (
    <button className={styles.button} onClick={handleChangeTheme}>
      <Image
        src={`/images/${theme === "dark" ? "moon" : "sun"}.svg`}
        alt="theme icon"
        layout="fill"
      />
    </button>
  );
};

export default ThemeButton;
