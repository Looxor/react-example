import React from "react";
import { Image, Linking, Platform, Text, TouchableOpacity } from "react-native";
import { colors, constants } from "../../config";
import standardFunctions from "../app/StandardFunctions";
import ParsedText from "react-native-parsed-text";
// @ts-ignore
import MathJax from "react-native-mathjax-svg";

const OS = Platform.OS;

class TextComponents {
  makeBold = (str, props: any = {}) => {
    const boldItems = this.parseStrings4Bold(str);
    const rand = +new Date();
    return (
      <Text style={[{...props.style}]} key={`${rand}`}>
        {boldItems.map((boldItem, index) =>
          boldItem.indexOf('[bold]') > -1 ? (
            <Text
              key={`bold-${index}`}
              style={[
                {
                  ...props.style,
                  ...props.boldTextStyle,
                  fontFamily: constants.DEFAULT_FONT_BOLD,
                },
                OS === 'android' && {fontWeight: 'normal'},
              ]}>
              {boldItem.substr(6, boldItem.length - 13)}
            </Text>
          ) : (
            <ParsedText
              key={String(index)}
              parse={[
                {
                  type: 'url',
                  style: props.linkStyle
                    ? props.linkStyle
                    : {color: colors.THEFACULTY},
                  onPress: url => {
                    standardFunctions.open_browser(url);
                  },
                },
              ]}
              style={[
                {...props.style},
                OS === 'android' && {fontWeight: 'normal'},
              ]}>
              {boldItem}
            </ParsedText>
          ),
        )}
      </Text>
    );
  };

  makeMedium = (str, props: any = {}) => {
    const boldItems = this.parseStrings4Bold(str);
    return (
      <Text style={{...props.style}}>
        {boldItems.map((boldItem, index) =>
          boldItem.indexOf('[bold]') > -1 ? (
            <Text
              key={String(index)}
              style={{
                fontFamily: constants.DEFAULT_FONT_MEDIUM,
                ...props.style,
              }}>
              {boldItem.substr(6, boldItem.length - 13)}
            </Text>
          ) : (
            <ParsedText
              key={String(index)}
              parse={[
                {
                  type: 'url',
                  style: {color: colors.THEFACULTY},
                  onPress: url => {
                    standardFunctions.open_browser(url);
                  },
                },
              ]}
              style={[
                {...props.style},
                OS === 'android' && {fontWeight: 'normal'},
              ]}>
              {boldItem}
            </ParsedText>
          ),
        )}
      </Text>
    );
  };

  makeWrapText = (text, props: any = {}) => {
    const texts = text.split(/ /gi);
    const rand = +new Date();
    return texts.map((text, index) => (
      <Text key={`${rand}-${index}`} style={props.style}>
        {text}{' '}
      </Text>
    ));
  };

  makeWrapButton = (text, props: any = {}) => {
    const texts = text.split(/ /gi);
    return texts.map(text => (
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Text style={props.textStyle}>{text} </Text>
      </TouchableOpacity>
    ));
  };

  makeMathJaxText = (text, props: any = {}) => {
    const texts = this.parseStrings4MathJax(text);
    return (
      texts &&
      texts.map((text, index) => {
        if (text[0] === '$') {
          return (
            <MathJax
              fontSize={props.fontSize}
              color={props.color}
              key={String(index)}
              style={{
                alignSelf: 'center',
              }}>
              {text.substr(1, text.length - 2)}
            </MathJax>
          );
        } else {
          return text;
        }
      })
    );
  };

  humanize(str) {
    return str[0].toUpperCase() + str.substr(1);
  }

  currencyFormat(num, topDot: boolean = false) {
    if (num) {
      return num
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, topDot ? '$1ॱ' : '$1.');
    }
    return '0';
  }

  parseCoinsText(
    str: string,
    extraIconStyle: any = undefined,
    textProps: any = undefined,
    textContainer: any = undefined,
  ) {
    return (
      <Text style={textContainer}>
        {str.split(/(:.*?:)/g).map((elem, index) => {
          if (!elem) return null;
          if (elem === ':tf_coin:') {
            return (
              <Image
                key={`img-${index}`}
                resizeMode={'contain'}
                style={[{width: 15, height: 15}, extraIconStyle]}
                source={require('../../../assets/images/icons/icn_new_tf_coin.png')}
              />
            );
          }
          return this.makeBold(elem, textProps);
        })}
      </Text>
    );
  }

  parseSmartText(
    str: string,
    extraIconStyle: any = undefined,
    textProps: any = undefined,
    textContainer: any = undefined,
  ) {
    return (
      <Text style={textContainer}>
        {str.split(/(:.*?:)/g).map((elem, index) => {
          if (!elem) return <></>;
          if (elem === ':tf_coin:') {
            return (
              <Image
                key={String(index)}
                resizeMode={'contain'}
                style={[{width: 15, height: 15}, extraIconStyle]}
                source={require('../../../assets/images/icons/icn_new_tf_coin.png')}
              />
            );
          }
          return (
            <ParsedText
              key={String(index)}
              parse={[
                {
                  type: 'url',
                  style: {color: colors.THEFACULTY},
                  onPress: this.handleUrlPress,
                },
                {
                  type: 'email',
                  style: {color: colors.THEFACULTY},
                  onPress: this.handleEmailPress,
                },
              ]}>
              {this.makeBold(elem, textProps)}
            </ParsedText>
          );
        })}
      </Text>
    );
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private parseStrings4Bold(str) {
    try {
      const matches = str.split(/(\[bold\][\S\s ]+?\[\/bold\])/gim);
      if (matches) {
        return matches;
      } else return [str];
    } catch (e) {
      return [];
    }
  }

  private parseStrings4MathJax = str => {
    const matches = str.match(/([^\$]+)|(\$[^\$]+\$)/gim);
    if (matches) {
      return matches;
    } else return [str];
  };

  private handleUrlPress(url, matchIndex /*: number*/) {
    standardFunctions.open_browser(url);
  }

  private async handleEmailPress(email, matchIndex /*: number*/) {
    try {
      const result = await Linking.openURL(`mailto:${email}`);
    } catch (error) {}
  }
}

export default new TextComponents();

// makeBold = (str) => {
//   const matches = str.split(/(\[bold\].*\[\/bold\])/gim);
//   if(matches) {
//     return matches;
//   } else return [str];
// }
