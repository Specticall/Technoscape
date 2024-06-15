import React from 'react'
import "../../styles/Login.css"
import Icons from '../Icons';

export default function ForgotPassword() {
  return (
    <div className='container'>
      <div className="forgot-con">
        <Icons icon='forgot'></Icons>
        <div className='text'>
          To <span>reset</span> your <span>password</span>, please <br /><span>contact</span> your <span>admin</span> or <span>supervisor</span>
        </div>
      </div>
    </div>
  )
}
