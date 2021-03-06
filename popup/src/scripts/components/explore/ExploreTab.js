import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// import RefreshIndicator from '@material-ui/core/RefreshIndicator';
import LiveFriendVideosList from '../friends/LiveFriendVideosList';
import SuggestedStoriesList from './SuggestedStoriesList';
import LiveTab from '../live/LiveTab';
import $ from 'jquery';

import {TAB_CONTAINER_HEIGHT, TAB_BACKGROUND_COLOR_WHITE} from '../../../../../utils/Constants';

class ExploreTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullPopup: false
    }
  }
  
  render() {
    const styles = {
      container: {
        background: TAB_BACKGROUND_COLOR_WHITE,
        minHeight: (this.props.isFullPopup) ?  $(window).height() - 112 : TAB_CONTAINER_HEIGHT + 'px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: (this.props.isFullPopup) ?  $(window).height() - 112 : TAB_CONTAINER_HEIGHT + 'px'
      },
      refreshIndicator: {
        position: 'relative',
        margin: '0 auto'
      },
    };
    
    return (
      <div style={styles.container}>
        {/*this.props.exploreStories.tray.length === 0 && 
          <RefreshIndicator
            size={40}
            left={10}
            top={0}
            status="loading"
            style={styles.refreshIndicator}/>
        */}
        <LiveTab/>
        <SuggestedStoriesList stories={this.props.exploreStories}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exploreStories: state.stories.exploreStories,
    currentStoryItem: state.popup.currentStoryItem,
    isFullPopup: state.popup.isFullPopup
  };
};

export default connect(mapStateToProps)(ExploreTab);
