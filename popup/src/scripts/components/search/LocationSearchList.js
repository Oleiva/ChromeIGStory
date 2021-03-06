import React, { Component } from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlaceIcon from '@material-ui/icons/Place';
import InstagramApi from '../../../../../utils/InstagramApi';
import {fetchStory} from '../../../../../utils/Utils';
import {setCurrentStoryObject} from '../../utils/PopupUtils';
import AnalyticsUtil from '../../../../../utils/AnalyticsUtil';

class LocationSearchList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedIndex: -1,
      downloadingIndex: -1,
      isDownloadingStory: false
    }
  }

  handleRequestChange (event, index) {
    var selectedResult = this.props.results[index];
    fetchStory(selectedResult, false, (story) => {
      setCurrentStoryObject('USER_STORY', story);
    });
    this.setState({
      selectedIndex: index,
    });
    AnalyticsUtil.track("Search List Item Clicked",
    {
      type: "location",
      result: {
        title: selectedResult.title,
        location: {
          id: location.pk,
          facebook_places_id: location.facebook_places_id
        }
      }
    });
  }

  getMenuItem(index) {
    return (
      <Tooltip
        title="Download"
        >
        <IconButton
          onClick={() => {
            if(!this.state.isDownloadingStory) {
              var selectedResult = this.props.results[index];
              this.setState({
                isDownloadingStory: true,
                downloadingIndex: index
              });
              fetchStory(selectedResult, true, (story) => {
                this.setState({isDownloadingStory: false});
                if(!story) {
                  // show 'No Story Available' Snackbar message
                  setCurrentStoryObject(null, null);
                }
              });
            }
          }}>
          {(this.state.isDownloadingStory && this.state.downloadingIndex === index) ? <CircularProgress size={24}/> : <DownloadIcon />}
        </IconButton>
      </Tooltip>
    );
  }

  render() {
    const locationSearchListData = this.props.results.map((place, key) => {
      return (
        <ListItem
          key={key}
          button
          selected={this.state.selectedIndex === key}
          onClick={event => this.handleRequestChange(event, key)}
          >
          <ListItemAvatar>
            <Avatar>
              <PlaceIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={place.title}
            secondary={place.subtitle}
            />
          {this.getMenuItem(key)}
        </ListItem>
      )
    });

    return (
      <List onChange={this.handleRequestChange.bind(this)}>
        {locationSearchListData}
      </List>
    )
  }
}

export default LocationSearchList;
