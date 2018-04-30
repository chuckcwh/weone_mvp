import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Table } from 'antd';
import moment from 'moment';

import { getMatch } from '../../actions/index';
import '../../assets/App.css';

class Match extends Component {
  render() {
    const {
      handleChange,
      values,
      isSubmitting,
      handleSubmit,
      matchData
    } = this.props;

    const columns = [
      { title: 'Match ID', dataIndex: 'match_id', key: 'match_id' },
      { title: 'Start Time', dataIndex: 'start_time', key: 'start_time' },
      { title: 'Win', dataIndex: 'win', key: 'win' },
      { title: 'Hero ID', dataIndex: 'hero_id', key: 'hero_id' },
      { title: 'Account ID', dataIndex: 'account_id', key: 'account_id' },
      { title: 'League', dataIndex: 'league', key: 'league' },
      { title: 'Replay', dataIndex: 'replay_url', key: 'replay_url' }
    ];

    const dataSource = matchData && [
      {
        key: matchData.match_id,
        match_id: matchData.match_id,
        start_time: moment(matchData.start_time).format('MMM Do YYYY'),
        win: matchData.radiant_win ? 'WIN' : 'LOSE',
        hero_id: matchData.players[0].hero_id,
        account_id: matchData.players[0].name,
        league: `${matchData.league.name} (Tier ${matchData.league.tier})`,
        replay_url: matchData.replay_url
      }
    ];

    return (
      <div>
        <h1 style={{ color: 'blue' }}>Match Explorer</h1>

        <form onSubmit={handleSubmit}>
          <h3>
            Match ID:
            <input
              type="text"
              name="match_id"
              onChange={handleChange}
              value={values.match_id}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </h3>
        </form>

        {matchData && (
          <div>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      matchData: state.match.match.data
    }),
    { getMatch }
  ),
  withFormik({
    mapPropsToValues: props => ({
      match_id: '3857361495'
    }),
    handleSubmit: (values, { props }) => {
      props.getMatch({ match_id: values.match_id });
    }
  })
)(Match);
