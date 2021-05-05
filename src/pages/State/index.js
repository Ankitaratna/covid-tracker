import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrackerTemplate from './../../UI/templates/TrackerTemplate';

const StatePage = (props) => {
  const history = useHistory();
  const [stateCardData, setStateCardData] = useState({});
  const [trackerListData, setTrackerListData] = useState([]);
  const [totalStats, setTotalStats] = useState({
    confirmed: null,
    tested: null,
    recovered: null,
    deceased: null,
  });
  useEffect(() => {
    const stateData = history.location.stateData;
    if (!!stateData?.districts) {
      setStateCardData(stateData);
      window.localStorage.setItem('selectedStateData', JSON.stringify(stateData));
    } else if (window.localStorage.getItem('selectedStateData')) {
      const stateData = window.localStorage.getItem('selectedStateData') || '';
      setStateCardData(JSON.parse(stateData));
    }
  }, []);

  useEffect(() => {
    let tempList = [];
    let tempTotalStats = {
      confirmed: 0,
      tested: 0,
      recovered: 0,
      deceased: 0,
    };
    if (!!stateCardData?.districts) {
      for (let item in stateCardData?.districts) {
        let tempObj = { ...stateCardData?.districts[item] };
        tempObj.name = item;
        tempObj.key = item;
        tempList.push(tempObj);

        for (let stat in stateCardData?.districts[item]?.total ?? {})
          tempTotalStats[stat] = tempTotalStats[stat] + stateCardData?.districts[item]?.total[stat];
      }
      setTrackerListData(tempList);
      setTotalStats(tempTotalStats);
    }
  }, [stateCardData]);

  return <TrackerTemplate pageName="State" trackerData={trackerListData} totalStats={totalStats} />;
};

export default StatePage;
