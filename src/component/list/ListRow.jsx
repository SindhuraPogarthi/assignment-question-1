import styles from "./ListRow.module.css";

const ListCell = ({ children,onchoose,row, setSectionFlexDirection }) => {
  return <tr className={styles.cell} onClick={()=>{onchoose(row)}} setSectionFlexDirection={setSectionFlexDirection}>{children}</tr>;
};

export default ListCell;
