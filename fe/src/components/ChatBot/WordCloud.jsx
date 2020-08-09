import React from "react";
import styled from "styled-components";

const WordCloud = ({ message }) => {
  return (
    <>
      <MessageBox isUser={message.user}>
        <Message isUser={message.user}>{message.text}</Message>
      </MessageBox>
    </>
  );
};

const MessageBox = styled.div`
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  width: 100%;
  height: 10%;
  position: relative;
`;

const Message = styled.div`
  position: absolute;
  background-color: ${(props) => (props.isUser ? "#4fd2c2" : "#ddd")};
  left: ${(props) => (props.isUser ? "" : "0")};
  right: ${(props) => (props.isUser ? "0" : "")};
  margin: 5px;
  padding: 4px 10px;
  border-radius: 5px;
  width: fit-content;
  overflow-wrap: anywhere;
`;

export default WordCloud;
