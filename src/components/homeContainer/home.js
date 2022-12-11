import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Peer from "simple-peer";
import { actionFriends } from "../../redux/actions/index";
import './home.css';
import { connect } from "react-redux";
import io from "socket.io-client"
import Friend from './friend';
import users from '../../data/users.json';

const socket = io.connect('http://localhost:3001');
function Home(props) {
  const [ user, setUser ] = useState({});
	const [ receivingCall, setReceivingCall ] = useState(false);
	const [ callerSignal, setCallerSignal ] = useState();
	const [ callAccepted, setCallAccepted ] = useState(false);
	const [ callEnded, setCallEnded] = useState(false);
  const [ idCaller, setIdCaller ] = useState("");
  const [ nameCaller, setNameCaller ] = useState("");
  const [ imageCaller, setImageCaller ] = useState("");
  const [ idFriends, setIdFriend ] = useState([]);
  const leftContainer = useRef();
  const rightContainer = useRef();
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
  const sendNotification = useRef();
  const idUser = localStorage.getItem("id");
  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if(users[i].id === idUser)
      {
        setUser(users[i]);
        setIdFriend(users[i].friends);
        break;
      }
    }
    for (let j = 0; j < idFriends.length; j++) {
      for (let k = 0; k < users.length; k++) {
        if(users[k].id === idFriends[j])
        {
          props.addFriends(users[k]);
        }
      }
    }
	  socket.emit("login", idUser);
		socket.on("callUser", (data) => {
			setReceivingCall(true);
			setIdCaller(data.from);
			setNameCaller(data.name);
      setImageCaller(data.image);
			setCallerSignal(data.signalData);
      sendNotification.current.style.display = "flex";
		});
	}, [idFriends]);
  function EndCall() {
    setCallEnded(true)
		connectionRef.current.destroy()
  }
  function Call(id) {
    leftContainer.current.style.display = "flex";
    rightContainer.current.style.display = "none";
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      myVideo.current.srcObject = stream;
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      })
      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: idUser,
          name: user.name,
          image: user.image
        })
      })
      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      })
      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      })
      connectionRef.current = peer;
    });
  }
  function AnswerCall() {
      sendNotification.current.style.display = "none";
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        myVideo.current.srcObject = stream;
        setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      })
      peer.on("signal", (data) => {
        console.log(idCaller);
        socket.emit("answerCall", {signal: data, to: idCaller});
      })
      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      })
      peer.signal(callerSignal);
      connectionRef.current = peer;
    });
  }
  function LogOut() {
    localStorage.removeItem("check");
    localStorage.removeItem("id");
    window.location.reload();
  }
  return (
    <>
      <div id='send-notification-container' ref={sendNotification}>
        <div id='send-notification'>
          <img src={imageCaller} alt="Caller"/>
          <span>{nameCaller}</span>
          <span>Đang gọi...</span>
          <div className='button-container'>
            <button onClick={AnswerCall}>Trả lời</button>
            <button>Từ chối</button>
          </div>
        </div>
      </div>
      <div id='chat-container'>
        <div id='left-container' ref={leftContainer}>
            <div id='video-container'>
              <video ref={userVideo} autoPlay></video>
              <video ref={myVideo} autoPlay></video>
            </div>
            <div id='user-container'>
              <div id='info-user'>
                <img src='https://vtv1.mediacdn.vn/2020/1/29/phong4-15802729396951612001638.jpg' alt='user'/>
                <span>Nhật Phong<br/>Bạn bè</span>
              </div>
              <div className='button-container'>
                <p>11:25</p>
                <button>Kết thúc</button>
              </div>
            </div>   
        </div>
        <div id='right-container' ref={rightContainer}>
          <div id='header'>
            <div>
              <img src='https://icons.veryicon.com/png/o/internet--web/website-icons/friend.png' alt='list'/>
              <p>Bạn bè</p>
            </div>
            <div>
              <img src='https://icons.veryicon.com/png/o/miscellaneous/general-icon-collection-linear-fillet/icon_add-friend.png' alt='add-friend'/>
              <img src='https://icons.veryicon.com/png/o/miscellaneous/zzcion/cc-plane.png' alt='add-friend'/>
              <div>
                <input placeholder='...'/>
                <img src='https://icons.veryicon.com/png/o/application/foundation-icon-1/search-173.png' alt='search'/>
              </div>
            </div>
          </div>
          <div id='list-friend'>
            {props.friends.map((friend, index) => {
              return <Friend Call={Call} key={friend.id} name={friend.content.name} id={friend.content.id} image={friend.content.image} />
            })}
          </div>
          <div id='account-container'>
            <div className='user'>
              <div className='info-user'>
                <img src={user.image} alt='friend'/>
                <div>
                  <span>{user.name}</span>
                  <span>{idFriends.length} bạn bè</span>
                </div>
              </div>
              <img className='call-icon' onClick={LogOut} src='https://icons.veryicon.com/png/o/miscellaneous/convenient-svn-icon/log-out-7.png' alt='log-out'/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addFriends: (content) => {
      dispatch(actionFriends(content));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);