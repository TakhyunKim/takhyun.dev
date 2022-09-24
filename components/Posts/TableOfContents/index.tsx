import React from "react";
import Link from "next/link";

import type { MouseEvent, CSSProperties } from "react";

import type {
  TableOfContent as TableOfContentType,
  TableOfContents as TableOfContentsType,
} from "../../../lib/posts";

import styles from "./TableOfContents.module.css";

interface TableOfContentProps {
  style?: CSSProperties;
  tableOfContent: TableOfContentType;
}

interface TableOfContentsProps {
  tableOfContents: TableOfContentsType[];
}

const TableOfContent = ({
  style,
  tableOfContent: { text, link },
}: TableOfContentProps) => {
  const scrollToHeader = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const linkId = link.replaceAll(
      /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi,
      ""
    );

    const HeaderElement = document.querySelector(
      `#${linkId}`
    ) as HTMLHeadingElement;

    HeaderElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <li className={styles.table_of_content} style={style} key={text}>
      <Link href={link} key={text}>
        <a onClick={scrollToHeader}>{text}</a>
      </Link>
    </li>
  );
};

const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
  return (
    <div className={styles.table_of_contents_wrapper}>
      {tableOfContents.map((tableOfContent) => (
        <ul key={tableOfContent.text}>
          <TableOfContent tableOfContent={tableOfContent} />
          {tableOfContent.items.map((tableOfH3Content) => (
            <TableOfContent
              style={{ paddingLeft: "1rem" }}
              key={tableOfH3Content.text}
              tableOfContent={tableOfH3Content}
            />
          ))}
        </ul>
      ))}
    </div>
  );
};

export default TableOfContents;
