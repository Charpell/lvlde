import React from "react";
import styled from 'styled-components/native';

import PropTypes from "prop-types";
export default function PostItem(props) {
  const { style, children, title, description, onPress, image } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
      
      <Cover>
        <Text  style={{ marginBottom: 6 }}>
          {title}
        </Text>
        <Text >{description}</Text>
      </Cover>
    </TouchableOpacity>
  );
}

PostItem.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func
};

PostItem.defaultProps = {
  image: "",
  title: "",
  description: "",
  style: {},
  onPress: () => {}
};



const TouchableOpacity = styled.TouchableOpacity`

`

const Cover = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7cc;
  margin-left: 12px;
`

const Text = styled.Text``