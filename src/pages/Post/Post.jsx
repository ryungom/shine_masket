import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import PostTextBar from '../../components/PostTextBar/PostTextBar';
import Comment from '../../components/Comment/Comment';
import TopMenuBar from '../../components/TopMenuBar/TopMenuBar';
import MoreButton from '../../components/Button/MoreButton';
import HeartIcon from '../../assets/icon/icon-heart.png';
import CommentIcon from '../../assets/icon/icon-message-circle.png';

export default function Post() {
  const {
    userName,
    userAccount,
    userImage,
    content,
    postId,
    date,
    postImages,
    heartCount,
    commentCount,
  } = useSelector((state) => state.PostInfoReducer);

  useEffect(() => {
    getPost();
  }, [postId]);

  const imgErrorHandler = (e) => {
    const target = e.target.parentNode.parentNode;
    target.style.display = 'none';
  };

  const getPost = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`https://mandarin.api.weniv.co.kr/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === '존재하지 않는 게시글입니다.') {
        alert('존재하지 않는 게시글입니다.');
      }
    }
  };

  return (
    <>
      <TopMenuBar moreButton="true" />
      <Container>
        <h1 className="ir">게시글 댓글 페이지</h1>
        <Profile>
          <ProfileImg src={userImage} alt="사용자 프로필 이미지"></ProfileImg>
          <TextContainer>
            <UserName>{userName}</UserName>
            <UserId>@ {userAccount}</UserId>
          </TextContainer>
          <MoreButton size="small" />
        </Profile>
        <PostContainer>
          <PostText>{content}</PostText>
          <ImageContainer>
            {postImages.map((image) => {
              return (
                <ul key={image}>
                  <Img
                    style={
                      postImages.length > 1
                        ? {
                            minWidth: '168px',
                            minHeight: '126px',
                            backgroundImage: `url(${image})`,
                          }
                        : {
                            minWidth: '304px',
                            minHeight: '228px',
                            backgroundImage: `url(${image})`,
                          }
                    }
                    onError={imgErrorHandler}
                  />
                </ul>
              );
            })}
          </ImageContainer>
        </PostContainer>
        <ButtonContainer>
          <LikeBtn>
            <LikeCount>{heartCount}</LikeCount>
          </LikeBtn>
          <CommentBtn>
            <CommentCount>{commentCount}</CommentCount>
          </CommentBtn>
        </ButtonContainer>
        <Date>{date}</Date>
      </Container>
      <Comment />
      <PostTextBar name="post" placeholder="댓글 입력하기..." buttonText="게시" />
    </>
  );
}

const Container = styled.section`
  padding: 20px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #dbdbdb;
`;

const Profile = styled.div`
  display: flex;
  font-weight: 400;
  background-color: white;
  border: none;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  margin-top: 4px;
  margin-left: 12px;
`;

const UserName = styled.strong`
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: black;
`;

const UserId = styled.p`
  font-size: 12px;
  line-height: 15px;
  text-align: left;
  color: #767676;
`;

const PostContainer = styled.div`
  max-width: 358px;
  margin-bottom: 14.7px;
  padding: 12px 0px 0px 54px;
  box-sizing: border-box;
`;

const PostText = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 500px) {
    overflow: scroll;
  }
`;

const Img = styled.li`
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  padding-left: 54px;
  vertical-align: baseline;
`;

const LikeBtn = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 30px;
  background-image: url(${HeartIcon});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
`;

const CommentBtn = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${CommentIcon});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
`;

const LikeCount = styled.span`
  padding-left: 27px;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: #767676;
`;

const CommentCount = styled.span`
  padding-left: 27px;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: #767676;
`;

const Date = styled.p`
  margin-top: 18.7px;
  padding-left: 54px;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  color: #767676;
`;
