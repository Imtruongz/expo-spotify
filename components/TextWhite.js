import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextWhite = (props) => {
  return <Text style={[styles.defaultText, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  defaultText: {
    color: 'white',
  },
});

export default TextWhite;
