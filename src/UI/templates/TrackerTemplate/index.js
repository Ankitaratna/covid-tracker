import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './styles.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TrackerTemplate = ({ trackerData, pageName, totalStats, ...rest }) => {
  const history = useHistory();

  const [reducedList, setReducedList] = useState([]);
  const [tilesState, setTilesState] = useState([
    {
      name: 'Total Confirmed',
      count: '',
      key: 'confirmed',
    },
    {
      name: 'Active',
      count: '',
      count: '',
      key: 'tested',
    },
    {
      name: 'Recovered',
      count: '',
      count: '',
      key: 'recovered',
    },
    {
      name: 'Deceased',
      count: '',
      count: '',
      key: 'deceased',
    },
  ]);

  const tableHeaderConfig = [
    {
      name: 'State',
    },
    {
      name: 'Confirmed',
    },
    {
      name: 'Active',
    },
    {
      name: 'Recovered',
    },
    {
      name: 'Deceased',
    },
  ];

  useEffect(() => {
    setReducedList(trackerData);
  }, [trackerData]);

  useEffect(() => {
    let tempTitleState = [...tilesState];

    tempTitleState.forEach((item) => {
      item.count = totalStats[item.key];
    });
    setTilesState(tempTitleState);
  }, [totalStats]);

  const handleRedirect = (e, index, key) => {
    history.push({
      pathname: `/state/${key}`,
      stateData: trackerData && trackerData.length ? trackerData[index] : {},
    });
  };

  const handleDebounced = (fn, delay) => {
    let timeoutId;
    return (e) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(e);
      }, delay);
    };
  };

  const filterList = (event) => {
    setReducedList(
      trackerData.filter((item) => item.name.includes(event.target.value) || item.key.includes(event.target.value)),
    );
  };

  return (
    <div className="page-layout">
      <h2 className="page-header">COVID TRACKER</h2>

      <TextField
        className="search-bar"
        onChange={handleDebounced(filterList, 500)}
        variant="outlined"
        size="small"
        placeholder="Search your state.."
      />

      <span className="page-title">{pageName}</span>
      <div className="card-container">
        {tilesState.map((item) => (
          <div className="card" key={item.key}>
            <span className="card-title">{item.name}</span>
            <span>{item.count}</span>
          </div>
        ))}
      </div>
      <Table className="table-container" aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaderConfig.map((item) => (
              <StyledTableCell>{item.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!reducedList && reducedList.length > 0
            ? reducedList.map((row, index) => (
                <TableRow key={row.key} onClick={(e) => handleRedirect(e, index, row.key)}>
                  <StyledTableCell>{row?.name ?? ''}</StyledTableCell>
                  <StyledTableCell>{row?.total?.confirmed ?? ''}</StyledTableCell>
                  <StyledTableCell>{row?.total?.tested ?? ''}</StyledTableCell>
                  <StyledTableCell>{row?.total?.recovered ?? ''}</StyledTableCell>
                  <StyledTableCell>{row?.total?.deceased ?? ''}</StyledTableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackerTemplate;
