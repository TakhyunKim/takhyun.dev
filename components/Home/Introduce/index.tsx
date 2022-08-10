import type { NextPage } from "next";

import styles from "./Introduce.module.css";

const Introduce: NextPage = () => {
  return (
    <div className={styles.my_introduce}>
      <h2 className={styles.title}>Takhyun Kim</h2>
      <h3 className={styles.description}>
        Frontend Engieer
        <br /> who likes to write documents and make plans.
      </h3>
    </div>
  );
};

export default Introduce;
