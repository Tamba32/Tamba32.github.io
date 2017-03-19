import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import _ from 'underscore';

import Section from './Section.jsx';

const requestUrl = 'https://api.github.com/search/repositories?callback=?';

class App extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      repositories: [],
      users: []
    };
    
    this.updateReposState = this.updateReposState.bind(this);
    this.updateUsersState = this.updateUsersState.bind(this);
    this.timerUpdateUsers = this.timerUpdateUsers.bind(this);
  }
  
  componentDidMount() {
    this.updateReposState();
    this.updateUsersState();
    this.timerUpdateUsers();
  }
  
  timerUpdateUsers() {
    const time = 2*60*1000;
    setTimeout(() => {
      this.updateUsersState();
      this.timerUpdateUsers();
    }, time);
  }
  
  updateReposState() {
    let monthAgo = moment().subtract(1, 'months').format('YYYY[-]MM[-]DD');
    $.ajax({
      type: 'GET',
      url: requestUrl,
      data: {
        q: 'created:>' + monthAgo,
        sort: 'stars',
        order: 'desc'
      },
      dataType: "json",
      success: resp  => {
        this.setState({
          repositories: resp.data.items.slice(0,5).map(repo => (
            _.pick(repo, 'id', 'name', 'description', 'stargazers_count')
          ))
        });
    }});
  }
  
  updateUsersState() {
    let yearAgo = moment().subtract(1, 'years').format('YYYY[-]MM[-]DD');
    $.ajax({
      type: 'GET',
      url: requestUrl,
      data: {
        q: 'created:>' + yearAgo,
        sort: 'followers',
        order: 'desc'
      },
      dataType: "json",
      success: resp  => {
        this.setState({
          users: resp.data.items.slice(0,5).map(user => (
            {
              id: user.id,
              login: user.owner.login,
              avatar: user.owner.avatar_url,
              followers: user.watchers
            }
          ))
        });
    }});
  }
  
  get sectionContent() {
    return [
      {
        id: 'hot_repo',
        type: 'Repositories',
        handleClick: this.updateReposState,
        content: this.state.repositories
      },
      {
        id: 'prolific_users',
        type: 'Users',
        handleClick: this.updateUsersState,
        content: this.state.users
      },
    ];
  }
  
  get sections() {
    return this.sectionContent.map(section => (
      <Section key={section.id} {...section}/>
    ));
  }
  
  render() {
    return (
      <div id="app">
        {this.sections}
      </div>
    );
  }
}



export default App;
