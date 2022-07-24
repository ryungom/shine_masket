import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MoreIcon from '../../assets/icon/icon-more-vertical.png';
import MoreIconSmall from '../../assets/icon/s-icon-more-vertical.png';
import Modal from '../../components/Modal/Modal';

export default function Button({ size }) {
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [ref, setRef] = useState('');
  const onClickMoreBtn = () => {
    setModal(true);
  };

  const handlecloseModal = (e) => {
    if (e.target !== ref.current && e.target !== ref.current.childNodes[1]) {
      console.log(e.target, ref.current.childNodes[1]);
      setModal(false);
    }
  };

  const getRef = (data) => {
    useEffect(() => {
      setRef(data);
    }, [data]);
  };

  return (
    <>
      <ButtonComponent onClick={onClickMoreBtn} size={size}>
        {size === 'large' ? (
          <Img src={MoreIcon} />
        ) : size === 'small' ? (
          <Img src={MoreIconSmall} />
        ) : null}
      </ButtonComponent>
      {modal ? (
        <Modal
          getRef={getRef}
          modal={modal}
          onClick={handlecloseModal}
          text={
            location.pathname === '/chat-list' ? ['설정 및 개인정보', '로그아웃'] : ['수정', '삭제']
          }
        />
      ) : null}
    </>
  );
}

const ButtonComponent = styled.button`
  width: ${(props) => (props.size === 'large' ? '22px' : props.size === 'small' ? '18px' : null)};
  margin-top: 5px;
  border: none;
  margin-left: auto;
`;

const Img = styled.img`
  width: ${(props) => (props.size === 'large' ? '22px' : props.size === 'small' ? '18px' : null)};
`;
