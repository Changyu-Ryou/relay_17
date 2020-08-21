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
  float: ${(props) => (props.isUser ? "right" : "left")};
  width: 100%;
`;

const Message = styled.div`
  background-color: ${(props) => (props.isUser ? "#fd79a8" : "#ddd")};
  float: inherit;
  margin: 5px;
  padding: 4px 10px;
  border-radius: 5px;
  width: fit-content;
  overflow-wrap: anywhere;
`;

export default WordCloud;
