import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <>
      <h1>Welcome back {this.props.username}!</h1>
      <h2>Logged in with: {this.props.email}</h2>
      </>
    )
  }
}

export default Profile;