import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateLastSeen } from '../actions/CommonFunctions';

function asdcasdc(ComposedComponent) {
  class AuthNStatus extends Component {

    static contextTypes = {
      router: React.propTypes.object
    }

    componentWillMount() {
      if (_.isEmpty(this.props.user)) {
        this.context.router.push('SignIn')
      }
      window.addEventListener("beforeunload", this.onUnload);
      const { uid } = this.props.user;
      updateLastSeen(uid, "Online", () => {});
    }

    componentWillUpdate(nextProps) {
      if (_.isEmpty(nextProps.user)) {
        this.context.router.push('SignIn')
      }
    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.onUnload);
    }

    onUnload = e => {
      const { uid } = this.props.user;
      const lastSeen = getDateHourString();
      updateLastSeen(uid, lastSeen, () => {});
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { user: state.user }
  }

  return connect()()
}