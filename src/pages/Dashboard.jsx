import { useState,useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [filteredOrders, setFilteredOrders] = useState(mockData.results);
  const [sectionFlexDirection, setSectionFlexDirection] = useState("column");

  const handlechoose=(x)=>{
    setSelectedOrderDetails(x.executionDetails)
    console.log(selectedOrderDetails)
    const selectedTimestamps = timestamps.results.find(
      (item) => item["&id"] === x["&id"]
    );
    setSelectedOrderTimeStamps(selectedTimestamps.timestamps);
  console.log(selectedOrderTimeStamps);
  }


  useEffect(() => {
    
    
      const filtered = mockData.results.filter((data) =>
        data["&id"].toLowerCase().includes(searchText.trim().toLowerCase())
      );
      setFilteredOrders(filtered);
    
    // console.log(filteredOrders)
    // console.log(mockData.results)
  }, [searchText]);
  


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${filteredOrders.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section} style={{flexDirection: sectionFlexDirection}}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} selectedItem={currency} timestamps={timestamps.results} onchoose={handlechoose} setSectionFlexDirection={setSectionFlexDirection}/>
      </div>
    </div>
  );
};

export default Dashboard;
