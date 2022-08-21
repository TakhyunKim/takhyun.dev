import React from "react";
import Image from "next/image";

import styles from "./TopScrollButton.module.css";

const TopScrollButton = () => {
  const handleScrollupButtonClick = () => {
    window.scroll(0, 0);
  };

  return (
    <button className={styles.button} onClick={handleScrollupButtonClick}>
      <Image src="/images/top.svg" alt="top scroll" layout="fill" />
    </button>
  );
};

export default TopScrollButton;
