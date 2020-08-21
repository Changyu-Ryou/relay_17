import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getUser, getRecommand } from "../util/ReqMessage";
import ChatBot from "../components/ChatBot/ChatBot";
import { postFace } from "../util/ReqMessage";

const MainPage = () => {
  const { userName } = useParams();
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    school: "",
    favors: "",
    graduatedYear: null,
  });

  const [RecommandInfo, setRecommandInfo] = useState([]);

  const getUserHandler = async () => {
    const user = await getUser(userName);
    setUserInfo(user);
    const reqRecommand = await getRecommand({id: (Math.floor(Math.random()*10)+1).toString()}); //id 값은 랜덤
    setRecommandInfo(reqRecommand);
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  const onSetChatbotOpen = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const postFaceImg = async (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageFeild = document.getElementById("image");
      imageFeild.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);

    const fd = new FormData();
    fd.append("image", imgFile);
    const faceInfo = await postFace(fd);

    if (!faceInfo.faces.length) return;
    const rois = faceInfo.faces.map((f) => f.roi);
    console.log(rois);
    document.getElementById("rois").innerText = JSON.stringify(rois);
  };


  const renderCards = RecommandInfo.map((user, index) => {
    return (
      <Card>
       <div>{user.name}</div>
       <div>{user.school}</div>
       <div>{user.favors}</div>
      </Card>
    )

  })


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
              <MainCenter>
                <ImageCenter>
                  <input type="file" onChange={postFaceImg} />
                  <br />
                  <img id="image" />
                  <textarea id="rois"></textarea>
                </ImageCenter>
                <Recommend>
                  {renderCards}
                </Recommend>
              </MainCenter>
              <MainRight>
                <ChatBot
                  isOpen={chatbotOpen}
                  onSetChatbotOpen={onSetChatbotOpen}
                />
                <ChatBotButton onClick={onSetChatbotOpen}>
                  CHAT BOT
                </ChatBotButton>
              </MainRight>
            </MainBody>
            <MainFooter>
              <div>
                ??? : 첫번째 발표라 떨린다 ㅜㅜ
              </div>
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
  height: 800px;
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
  display: flex;
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
  background-color: #fd79a8;
  text-align: center;
`;

const ChatBotButton = styled.button`
  height: 10%;
  color: white;
  background: #fd79a8;
  border: none;
  border-radius: 5px;
  margin-top: 14px;
`;

const ImageCenter = styled.div`

`

const Recommend = styled.div`
  background: #fd79a8;
  margin-left: 600px;
  width: 150px;
  text-align: center;
  border-radius: 5px;
`

const Card = styled.div`
  border: solid white 1px;
  border-radius: 5px;
  background : white;
  margin: 5px;
`

export default MainPage;
