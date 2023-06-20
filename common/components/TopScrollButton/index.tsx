"use client";

import React from "react";
import Image from "next/image";

import styles from "./TopScrollButton.module.css";

const TopScrollButton = () => {
  const handleScrollUpButtonClick = () => {
    window.scroll(0, 0);
  };

  return (
    <button className={styles.button} onClick={handleScrollUpButtonClick}>
      <Image src="/images/top.svg" alt="top scroll" fill />
    </button>
  );
};

export default TopScrollButton;
