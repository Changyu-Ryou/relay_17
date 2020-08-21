import React, { useState } from "react";
import styled from "styled-components";

import WordCloud from "./WordCloud";
import { getChatBot } from "../../util/ReqMessage";

const ChatBot = ({ isOpen, onSetChatbotOpen }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isResponsed, setIsResponsed] = useState(true);

  const onClose = () => {
    onSetChatbotOpen();
  };

  const onSetMessage = ({ target }) => {
    setMessage(target.value);
  };

  const pressEnter = (e) => {
    if (!isResponsed) return;
    if (e.keyCode === 13) onPassMessage();
  };

  const onPassMessage = async () => {
    if (message === "") return;

    setIsResponsed(false);
    setMessageList((messageList) => [...messageList, { text: message, user: true }]);
    const response = await getChatBot(message);
    await setMessageList((messageList) => [...messageList, { text: response, user: false }]);
    setIsResponsed(true);

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
      <ContextWrap id="context">
        <ContextBody>{wordCloudList}</ContextBody>
      </ContextWrap>
      <InputBox>
        <MessageInput
          placeholder="챗봇에게 궁금한 점을 물어보세요!"
          value={message}
          onKeyDown={pressEnter}
          onChange={onSetMessage}
        ></MessageInput>
        <InputButton onClick={onPassMessage} disabled={isResponsed ? false : true}>
          보내기
        </InputButton>
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  height: 90%;
  box-shadow: 1px 1px 2px 6px #f0f0f0;
  border-radius: 10px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fd79a8;
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

const ContextWrap = styled.div`
  height: 80%;
  overflow: scroll;
`;

const ContextBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 4px;
  background-color: #ffffff;
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
  padding-left: 4px;
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
  background: #fd79a8;
  border: none;
  border-radius: 5px;
  font-size: small;
`;

export default ChatBot;
