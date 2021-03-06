import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from './../actions/FetchCoinData';
import CoinCard from './CoinCard';


class CryptoContainer extends Component {

  componentWillMount() {
    this.props.FetchCoinData();
    this.interval = setInterval(() => this.props.FetchCoinData(), 10 * 1000);
  }

  renderCoinCards() {
    const { crypto } = this.props;
    return crypto.data.map((coin, index) => 
      <CoinCard
        key={index}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        percent_change_24h={coin.percent_change_24h}
        percent_change_7d={coin.percent_change_7d}
      />
    );
  }

  render() {
    const { crypto } = this.props;
    const { contentContainer } = styles;
    if(crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={'Loading...'}
            textStyle={{color: '#253145'}}
            animation='fade'
          />
        </View>
      )
    }
    return ( 
      <ScrollView contentContainer={contentContainer}>
        {this.renderCoinCards()}
      </ScrollView>
    )
  }
}

const styles = {
  contentContainer: {
    paddingBottom: 0,
    paddingTop: 55
  }
}

function mapStateToProps(state) {
  let { crypto } = state;
  return {
    crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)