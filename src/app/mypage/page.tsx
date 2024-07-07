"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { Api } from "src/api";
import { userData } from "src/api/user";

const Page = () => {
  const [userInfo, setUserInfo] = useState<userData>();

  const fetchUserInfo = async () => {
    const data = await Api.User.profile();
    setUserInfo(data);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo) return null;

  return (
    <Container>
      <MyPageWrapper>
        <UserDataFirstCharacter>
          {userInfo.name.charAt(0)}
        </UserDataFirstCharacter>
        <UserDataWrapper>
          <UserData>
            <span>이름:&nbsp;</span>
            {userInfo.name}
          </UserData>
          <UserData>
            <span>이메일:&nbsp;</span>
            {userInfo.email}
          </UserData>
          <UserData>
            <span>전화번호:&nbsp;</span>
            {userInfo.phoneNumber}
          </UserData>
        </UserDataWrapper>
      </MyPageWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 500px;
  margin: auto;
`;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const UserDataFirstCharacter = styled.div`
  font-size: 2rem;
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #f85b2b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #ffffff;
`;

const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const UserData = styled.p`
  font-size: 1.2rem;
  span {
    font-weight: 700;
  }
`;
