import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { withFormik } from 'formik';
import { Table } from 'antd';
import moment from 'moment';

import { getPlayer, getPlayerWL, getPlayerRanking } from '../../actions/index';
import '../../assets/App.css';

class Profile extends Component {
  componentWillMount() {
    this.props.getPlayer({ account_id: 399573907 });
    this.props.getPlayerWL({ account_id: 399573907 });
    this.props.getPlayerRanking({ account_id: 399573907 });
  }

  render() {
    const {
      handleChange,
      values,
      isSubmitting,
      handleSubmit,
      profile,
      profileWL,
      profileRanking
    } = this.props;

    const columns = [
      { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Wins', dataIndex: 'wins', key: 'wins' },
      { title: 'Losses', dataIndex: 'losses', key: 'losses' },
      { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' },
      { title: 'Win Rate', dataIndex: 'win_rate', key: 'win_rate' },
      { title: 'Heroes', dataIndex: 'heros', key: 'heros' },
      { title: 'Rankings', dataIndex: 'rankings', key: 'rankings' },
      { title: 'Steam', dataIndex: 'steam', key: 'steam' }
    ];

    const dataSource = profile &&
      profileWL &&
      profileRanking && [
        {
          key: profile.profile.name || profile.profile.personaname,
          avatar: <img src={profile.profile.avatar} />,
          name: profile.profile.name || profile.profile.personaname,
          last_login: moment(profile.profile.last_login, 'YYYY-MM-DD').format(
            'MMM Do YYYY'
          ),
          wins: profileWL.win,
          losses: profileWL.lose,
          win_rate:
            profileWL.win + profileWL.lose > 0
              ? profileWL.win / (profileWL.win + profileWL.lose)
              : 'N/A',
          rankings: profileRanking.length ? profileRanking : 'N/A',
          steam: <a href={profile.profile.profileurl}>Link</a>
        }
      ];

    return (
      <div>
        <h1 style={{ color: 'blue' }}>Profile</h1>

        {profile && (
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
      profile: state.profile.profile.data,
      profileWL: state.profile.profileWL.data,
      profileRanking: state.profile.profileRanking.data
    }),
    { getPlayer, getPlayerWL, getPlayerRanking }
  )
)(Profile);
