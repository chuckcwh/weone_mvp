import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { withFormik } from 'formik';
import { Table } from 'antd';
import moment from 'moment';

import { getProPlayers, getProMatches } from '../../actions/index';
import '../../assets/App.css';

class Pro extends Component {
  state = {
    tab: 'player'
  };

  componentWillMount() {
    this.props.getProPlayers();
    this.props.getProMatches();
  }

  render() {
    const {
      // handleChange,
      // values,
      // isSubmitting,
      // handleSubmit,
      proPlayers,
      proMatches
    } = this.props;
    const { tab } = this.state;

    const columnProPlayers = [
      { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Last Match',
        dataIndex: 'last_match_time',
        key: 'last_match_time'
      },
      { title: 'Team', dataIndex: 'team', key: 'team' },
      { title: 'Country', dataIndex: 'countrycode', key: 'countrycode' },
      { title: 'Steam', dataIndex: 'steam', key: 'steam' }
    ];

    const getLastMatchTime = time => {
      const matchTime = moment(time, 'YYYY-MM-DD').format('MMM Do YYYY');
      return matchTime === 'Invalid date' ? 'N/A' : matchTime;
    };

    const dataProPlayers =
      proPlayers &&
      proPlayers.map(player => ({
        key: player.account_id,
        avatar: <img src={player.avatar} />,
        name: player.name || player.personaname,
        last_match_time: getLastMatchTime(player.last_match_time),
        team: player.team_name,
        countrycode: player.loccountrycode,
        steam: player.profileurl ? (
          <a href={player.profileurl} target="_blank">
            Link
          </a>
        ) : (
          'N/A'
        )
      }));

    const columnProMatches = [
      { title: 'Match Team', dataIndex: 'match', key: 'match' },
      { title: 'League', dataIndex: 'league', key: 'league' },
      { title: 'Result', dataIndex: 'win', key: 'win' },
      { title: 'duration', dataIndex: 'duration', key: 'duration' },
      { title: 'Start Time', dataIndex: 'start_time', key: 'start_time' }
    ];

    const dataProMatches =
      proMatches &&
      proMatches.map(match => ({
        key: match.match_id,
        match: `${match.radiant_name} (${match.radiant_score}) X ${
          match.dire_name
        } (${match.dire_score})`,
        league: match.league_name,
        win: match.radiant_win ? 'WIN' : 'LOSE',
        duration: moment(match.duration).format('mm:ss'),
        start_time: moment(match.start_time).format('MMM Do YYYY')
      }));

    return (
      <div>
        <h1 style={{ color: 'blue' }}>
          Pro {tab === 'player' ? 'Players' : 'Matches'}
        </h1>

        <button onClick={() => this.setState({ tab: 'player' })}>
          Players
        </button>
        <button onClick={() => this.setState({ tab: 'match' })}>Matches</button>

        {tab === 'player' &&
          proPlayers && (
            <div>
              <Table dataSource={dataProPlayers} columns={columnProPlayers} />
            </div>
          )}
        {tab === 'match' &&
          proMatches && (
            <div>
              <Table dataSource={dataProMatches} columns={columnProMatches} />
            </div>
          )}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      proPlayers: state.player.proPlayers.data,
      proMatches: state.match.proMatches.data
    }),
    { getProPlayers, getProMatches }
  )
)(Pro);
