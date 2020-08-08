import React, { useState } from "react";
import styled from "styled-components";

import WordCloud from "./WordCloud";
import { getChatBot } from "../../util/ReqMessage";

const ChatBot = ({ isOpen, onSetChatbotOpen }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const onClose = () => {
    onSetChatbotOpen();
  };

  const onSetMessage = ({ target }) => {
    setMessage(target.value);
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) onPassMessage();
  };

  const onPassMessage = () => {
    message && setMessageList((messageList) => [...messageList, { text: message, user: true }]);
    // 챗봇 api가 나오면 추가하면 됨
    // const res = getChatBot({ message: message });
    // setMessageList((messageList) => [...messageList, { text: res, user: false }]);
    setMessage("");

    // 마지막에서 두번째 채팅으로 고정됨
    // dom에 접근하는 방식을 useRef 등으로 변경 필요
    var contextBody = document.getElementById("context");
    contextBody.scrollTop = contextBody.scrollHeight - 400;
  };

  const wordCloudList = messageList.map((message, index) => <WordCloud message={message} key={index} />);

  return (
    <Wrapper isOpen={isOpen}>
      <TitleBox>
        <ChatbotTitle>I Loved School 챗봇</ChatbotTitle>
        <TitleButton onClick={onClose}>X</TitleButton>
      </TitleBox>
      <ContextBody id="context">{wordCloudList}</ContextBody>
      <InputBox>
        <MessageInput
          placeholder="챗봇에게 궁금한 점을 물어보세요!"
          value={message}
          onKeyDown={pressEnter}
          onChange={onSetMessage}
        ></MessageInput>
        <InputButton onClick={onPassMessage}>보내기</InputButton>
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  width: 300px;
  height: 500px;
  box-shadow: 1px 1px 2px 6px #f0f0f0;
  border-radius: 10px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4fd2c2;
  border-radius: 10px 10px 0 0;
`;

const ChatbotTitle = styled.div`
  margin-left: 8px;
  color: #f2f2f2;
`;

const TitleButton = styled.button`
  margin-right: 8px;
  border: none;
  width: 10%;
  height: 50%;
  border-radius: 5px;
  color: #626466;
  font-weight: bold;
`;

const ContextBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  padding: 4px;
  overflow: scroll;
`;

const InputBox = styled.div`
  width: 100%;
  height: 10%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
`;

const MessageInput = styled.input`
  margin-left: 4px;
  width: 80%;
  height: 50%;
  border: none;
`;

const InputButton = styled.button`
  margin-left: 8px;
  margin-right: 4px;
  height: 70%;
  width: 20%;
  color: white;
  background: #4fd2c2;
  border: none;
  border-radius: 5px;
`;

export default ChatBot;
