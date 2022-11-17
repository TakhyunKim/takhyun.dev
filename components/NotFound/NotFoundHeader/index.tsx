import type { NextPage } from "next";

import styles from "./NotFoundHeader.module.css";

const NotFoundHeader: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.not_found_header}>PAGE NOT FOUND</p>
      <h2 className={styles.not_found_status_code}>404</h2>
      <p className={styles.not_found_sub_comment}>
        Out of
        <br /> nothing,
        <br /> something.
      </p>
    </div>
  );
};

export default NotFoundHeader;
