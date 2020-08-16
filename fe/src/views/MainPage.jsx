import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getUser } from "../util/ReqMessage";
import ChatBot from "../components/ChatBot/ChatBot";
import { postFace } from "../util/ReqMessage";

const MainPage = () => {
  const { userName } = useParams();
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", school: "", favors: "", graduatedYear: null });

  const getUserHandler = async () => {
    const user = await getUser(userName);
    setUserInfo(user);
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  const onSetChatbotOpen = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const postFaceImg = async (e) => {
    const imgFile = e.target.files[0];
    const fd = new FormData();
    fd.append('image', imgFile);
    const faceInfo = await postFace(fd);
    console.log(faceInfo);
  };

  return (
    <>
      {userInfo && (
        <>
          <Wrapper>
            <MainBody>
              <MainLeft>
                <Profile>
                  <p>이름: {userInfo.name}</p>
                  <p>학교: {userInfo.school}</p>
                  <p>졸업년도: {userInfo.graduatedYear}</p>
                  <p>관심사: {userInfo.favors}</p>
                </Profile>
                <SchoolList>School List</SchoolList>
              </MainLeft>
              <MainCenter>Center
              <input type="file" onChange={postFaceImg}/>
              </MainCenter>
              <MainRight>
                <ChatBot isOpen={chatbotOpen} onSetChatbotOpen={onSetChatbotOpen} />
                <ChatBotButton onClick={onSetChatbotOpen}>CHAT BOT</ChatBotButton>
              </MainRight>
            </MainBody>
            <MainFooter>
              <div>Footer</div>
            </MainFooter>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const MainBody = styled.div`
  height: 550px;
  display: flex;
`;

const MainLeft = styled.div`
  padding: 20px;
  width: 15%;
  background-color: #dddddd;
`;

const Profile = styled.div`
  margin: 0 0 20px 0;
  width: 100%;
  height: 30%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  display: table;
`;

const SchoolList = styled.div`
  width: 100%;
  height: 60%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

const MainCenter = styled.div`
  padding: 20px;
  width: 55%;
  background-color: #dddddd;
`;

const MainRight = styled.div`
  padding: 20px;
  width: 25%;
  background-color: #ffffff;
  display: block;
  align-items: center;
  justify-content: space-between;
`;

const MainFooter = styled.div`
  padding: 20px;
  height: 50px;
  background-color: #4fd2c2;
`;

const ChatBotButton = styled.button`
  height: 10%;
  color: white;
  background: #4fd2c2;
  border: none;
  border-radius: 5px;
  margin-top: 14px;
`;

export default MainPage;
