import styles from "./Header.module.css";

const NotFoundHeader = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.not_found_header}>PAGE NOT FOUND</p>
      <p className={styles.not_found_sub_comment}>
        Out of
        <br /> nothing,
        <br /> something.
      </p>
      <p className={styles.not_found_comment}>
        찾으시려는 페이지는 존재하지 않습니다.
        <br />
        다른 글을 보실려면 상단 posts, projects 메뉴를 누르시거나.
        <br />
        아래에 최신글을 읽어보시길 바랍니다 :D
        <br />
      </p>
    </div>
  );
};

export default NotFoundHeader;
