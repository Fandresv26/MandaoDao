import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import CommentList from './CommentList'; 
import CommentAdd from './CommentAdd'; 
import { Comments } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";
import {Route, NavLink, HashRouter} from "react-router-dom";

import { ChatMessages } from "../api/posts";
import { Chats } from "../api/posts";
import ChatMessageAdd from './ChatMessageAdd'; 


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

  }

  

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onAdd(text){
     if (Meteor.userId() === null) 
    {
      window.alert ("You are not registered! Please sign in."); 
      return; 
    }

    ChatMessages.insert({
      text:text, 
      chatId: this.props.chat._id
    });
  }

  renderPosts() {
    return this.props.chatMessages.map((p,i) =>
      <div className="col-sm-4">
      <div className="box3">
      <Chat chatMessage = {p} key = {i} > </Chat>
      </div>
      </div>
    );
  }


  onChangeChatID(){
    this.props.updateChatID(this.props.chat._id);
  }

  onChangeUser1(){
    this.props.updateUser1(this.props.chat.user1);
  }

  onChangeUser2(){
    this.props.updateUser2(this.props.chat.user2);

  }  

  render() {

    return (
      <div id="Chat">
     <p> Chat members: {this.props.chat.user1} & {this.props.chat.user2} </p>
     <NavLink to="/chatchat"> <button className="my-btn-2" onClick={(event) => {this.props.updateChatID(this.props.chat._id);
                                                      this.props.updateUser1(this.props.chat.user1);
                                                      this.props.updateUser2(this.props.chat.user2);}}> Click to chat </button> </NavLink>

      </div>
      );
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired
};

export default(Chat);
