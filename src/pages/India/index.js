import React, { useState, useEffect } from 'react';
import './styles.css';
import TrackerTemplate from './../../UI/templates/TrackerTemplate';
const axios = require('axios').default;

const MainPage = (props) => {
  const [trackerData, setTrackerData] = useState([]);
  const [totalStats, setTotalStats] = useState({
    confirmed: null,
    tested: null,
    recovered: null,
    deceased: null,
  });

  const stateMapping = {
    AN: 'Andaman and Nicobar Islands',
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CH: 'Chandigarh',
    CT: 'Chhattisgarh',
    DN: 'Dadra and Nagar Haveli',
    DD: 'Daman and Diu',
    DL: 'Delhi',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JK: 'Jammu and Kashmir',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    LD: 'Lakshadweep',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PY: 'Puducherry',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UP: 'Uttar Pradesh',
    UT: 'Uttarakhand',
    WB: 'West Bengal',
  };
  useEffect(() => {
    axios
      .get('https://api.covid19india.org/v4/min/data.min.json')
      .then(function (response) {
        let dataList = [];
        let tempTotalStats = {
          confirmed: 0,
          tested: 0,
          recovered: 0,
          deceased: 0,
        };
        for (let item in response.data) {
          let tempObj = { ...response.data[item] };
          tempObj.name = stateMapping[item];
          tempObj.key = item;
          for (let stat in response.data[item]?.total ?? {})
            tempTotalStats[stat] = tempTotalStats[stat] + response.data[item]?.total[stat];
          dataList.push(tempObj);
        }
        setTotalStats(tempTotalStats);
        setTrackerData(dataList);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return <TrackerTemplate pageName="INDIA" trackerData={trackerData} totalStats={totalStats} />;
};

export default MainPage;
