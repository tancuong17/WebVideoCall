import React from 'react';

function Friend(props) {
  return (
    <>
        <div className='user'>
            <div className='info-user'>
                <img src={props.image} alt='friend'/>
                <div>
                    <span>{props.name}</span>
                    <span>Đang hoạt động</span>
                </div>
            </div>
            <img class='call-icon' onClick={(e) => props.Call(props.id)} src='https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/video-video-1.png' alt='call'/>
        </div>
    </>
  );
}
export default Friend;