import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { withFormik } from 'formik';
import { Table } from 'antd';
import moment from 'moment';

import { getPublicMatches } from '../../actions/index';
import '../../assets/App.css';

class Public extends Component {
  // state = {
  //   tab: 'player',
  // };

  componentWillMount() {
    this.props.getPublicMatches();
  }

  render() {
    const {
      // handleChange,
      // values,
      // isSubmitting,
      // handleSubmit,
      publicMatches
    } = this.props;
    // const { tab } = this.state;

    // const columnProPlayers = [
    //   { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
    //   { title: 'Name', dataIndex: 'name', key: 'name' },
    //   { title: 'Last Match', dataIndex: 'last_match_time', key: 'last_match_time' },
    //   { title: 'Team', dataIndex: 'team', key: 'team' },
    //   { title: 'Country', dataIndex: 'countrycode', key: 'countrycode' },
    //   { title: 'Steam', dataIndex: 'steam', key: 'steam' },
    // ];
    //
    // const getLastMatchTime = (time) => {
    //   const matchTime = moment(time, 'YYYY-MM-DD').format('MMM Do YYYY');
    //   return (matchTime === 'Invalid date') ? 'N/A' : matchTime;
    // }
    //
    // const dataProPlayers = proPlayers && proPlayers.map(player => ({
    //   key: player.account_id,
    //   avatar: <img src={player.avatar} />,
    //   name: player.name || player.personaname,
    //   last_match_time: getLastMatchTime(player.last_match_time),
    //   team: player.team_name,
    //   countrycode: player.loccountrycode,
    //   steam: player.profileurl ? <a href={player.profileurl} target='_blank'>Link</a> : 'N/A',
    // }))

    const columnPublicMatches = [
      { title: 'Match Team', dataIndex: 'match', key: 'match' },
      { title: 'Result', dataIndex: 'win', key: 'win' },
      { title: 'duration', dataIndex: 'duration', key: 'duration' },
      { title: 'Start Time', dataIndex: 'start_time', key: 'start_time' }
    ];

    const dataPublicMatches =
      publicMatches &&
      publicMatches.map(match => ({
        key: match.series_id,
        match: `[${match.radiant_team}] (${match.num_rank_tier}) X [${
          match.dire_team
        }] (${match.avg_rank_tier})`,
        win: match.radiant_win ? 'WIN' : 'LOSE',
        duration: `${Math.floor(match.duration / 60)} min ${match.duration %
          60} sec`,
        start_time: moment(match.start_time).format('MMM Do YYYY')
      }));

    return (
      <div>
        <h1 style={{ color: 'blue' }}>Public Matches</h1>

        {publicMatches && (
          <div>
            <Table
              dataSource={dataPublicMatches}
              columns={columnPublicMatches}
            />
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      publicMatches: state.match.publicMatches.data
    }),
    { getPublicMatches }
  )
)(Public);
