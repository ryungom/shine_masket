import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import TopMenuBar from '../../components/TopMenuBar/TopMenuBar';

export default function ModifyProfile() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(true);
  const [userName, setUserName] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userIntro, setUserIntro] = useState('');

  // 자식 컴포넌트에서 전달받은 isEmpty를 useState로 관리
  const getEmptyInfo = (isEmpty) => {
    setIsEmpty(isEmpty);
  };

  // 자식 컴포넌트에서 전달받은 유저 정보 useState로 관리
  const getUserInfo = (userName, userAccount, userIntro) => {
    setUserName(userName);
    setUserAccount(userAccount);
    setUserIntro(userIntro);
  };

  // 저장 받은 클릭 시 프로필 수정 적용
  const onClickSaveButton = async (e) => {
    e.preventDefault();
    const imageSrc = localStorage.getItem('image');
    try {
      const accessToken = localStorage.getItem('accessToken');
      const res = await axios.put(
        'https://mandarin.api.weniv.co.kr/user/',
        {
          user: {
            username: userName,
            accountname: userAccount,
            intro: userIntro,
            image: imageSrc,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      dispatch({
        type: 'MODIFY_PROFILE',
        UserImage: res.data.user.image,
        UserName: res.data.user.username,
        UserAccount: res.data.user.accountname,
        UserIntro: res.data.user.intro,
      });
      history.push(`/profile/${userAccount}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Conatiner>
      <h1 className="ir">프로필 수정</h1>
      <TopMenuBar saveButton={true} isEmpty={isEmpty} onClick={onClickSaveButton} />
      <ProfileForm isButton={false} getEmptyInfo={getEmptyInfo} getUserInfo={getUserInfo} />
    </Conatiner>
  );
}

const Conatiner = styled.section``;
