import type { NextPage } from "next";
import Image from "next/image";

import styles from "./Introduce.module.css";

const Introduce: NextPage = () => {
  return (
    <div className={styles.my_introduce}>
      <div className={styles.intro_profile}>
        <Image src="/images/intro-profile.jpg" alt="intro profile" fill />
      </div>
      <div>
        <h2 className={styles.title}>김탁현</h2>
        <h3 className={styles.description}>
          프론트엔드 개발자
          <br /> 문서 작성을 즐겨하며, 배운 것들을 천천히 기록하는 것을
          좋아합니다
        </h3>
      </div>
    </div>
  );
};

export default Introduce;
