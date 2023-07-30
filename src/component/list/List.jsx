import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows,selectedItem,timestamps}) => {
  // console.log(selectedItem)
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {selectedItem}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
      {rows.map((row, index) => {
          const orderTimestamp = timestamps.find((x) => x["&id"] === row["&id"]);
          // console.log(orderTimestamp["&id"])
          return (
            <ListRow key={index}>
              <ListRowCell>{row["&id"]}</ListRowCell>
              <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
              <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
              <ListRowCell>{orderTimestamp? orderTimestamp.timestamps.orderSubmitted : ""}</ListRowCell>
              <ListRowCell>{row.bestExecutionData.orderVolume[selectedItem]}</ListRowCell>
            </ListRow>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
