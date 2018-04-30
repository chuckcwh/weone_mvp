import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Table } from 'antd';
import moment from 'moment';

import { getPlayerRankingsByHero } from '../../actions/index';
import '../../assets/App.css';

class Match extends Component {
  render() {
    const {
      handleChange,
      values,
      isSubmitting,
      handleSubmit,
      playerRankingsByHero
    } = this.props;

    const columns = [
      { title: 'USER ID', dataIndex: 'id', key: 'id' },
      { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Rank', dataIndex: 'rank', key: 'rank' },
      { title: 'Score', dataIndex: 'score', key: 'score' },
      { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' }
    ];

    const dataSource =
      playerRankingsByHero &&
      playerRankingsByHero.rankings &&
      playerRankingsByHero.rankings.map(player => ({
        key: player.account_id,
        id: player.account_id,
        avatar: <img src={player.avatar} />,
        name: player.name || player.personaname,
        rank: player.rank_tier,
        score: player.score,
        last_login: moment(player.last_login, 'YYYY-MM-DD').format('MMM Do YYY')
      }));

    return (
      <div>
        <h1 style={{ color: 'blue' }}>Rankings</h1>

        <form onSubmit={handleSubmit}>
          <h3>
            Hero ID:
            <input
              type="text"
              name="hero_id"
              onChange={handleChange}
              value={values.hero_id}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </h3>
        </form>

        {playerRankingsByHero && (
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
      playerRankingsByHero: state.player.playerRankingsByHero.data
    }),
    { getPlayerRankingsByHero }
  ),
  withFormik({
    mapPropsToValues: props => ({
      hero_id: '1'
    }),
    handleSubmit: (values, { props }) => {
      props.getPlayerRankingsByHero({ hero_id: values.hero_id });
    }
  })
)(Match);
