// Libraries //
import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
// Configs //
import { styles } from "./CarouselPage.style";
import colors from "../../config/colors";
import constants from "../../config/constants";
import standardFunctions from "../../utils/app/StandardFunctions";
import StandardBottomButtons from "../../components/StandardBottomButtons";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import YouTube from "react-native-youtube";
import Strings from "../../utils/misc/TextComponents";
import ShareButtonTop from "../../components/ShareButtonTop";

let viewShow;

const CarouselPageScreen = props => {
  const [carousel_data, setCarousel_data] = useState({
    _id: '',
    redirect_url: '',
    page_action: '',
    subpage_title: '',
    subpage_text: '',
    page_type: '',
    page_media_url: '',
    page_youtube_id: '',
    page_title: '',
    page_text: '',
    first_button_text: '',
    second_button_text: '',
  });
  const [is_subpage, setIs_subpage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState('');
  const [quality, setQuality] = useState('');

  const {
    navigation,
    route: {params = {}},
  } = props;

  const componentDidMount = () => {
    setCarousel_data(params['carousel_data'] || {});
    setIs_subpage(params['is_subpage'] ? params['is_subpage'] : false);
  };

  const handleMainButtonPress = () => {
    standardFunctions.add_firebase_event_log(
      'carousel_page',
      'main_btn_clicked',
      {
        carousel_id: carousel_data._id,
        redirect_url: carousel_data.redirect_url
          ? carousel_data.redirect_url
          : '',
      },
    );
    if (carousel_data.page_action == '1') {
      // Go to another Title and Text page
      navigation.navigate(routes.CAROUSEL_PAGE, {
        is_subpage: true,
        subpage_title: carousel_data.subpage_title,
        subpage_text: carousel_data.subpage_text,
        carousel_data,
      });
    } else if (carousel_data.page_action == '2') {
      standardFunctions.open_inapp_action(
        navigation,
        carousel_data.redirect_url,
      );
    } else if (
      carousel_data.page_action == '3' ||
      carousel_data.page_action == '5'
    ) {
      // Go to external link
      standardFunctions.open_browser(carousel_data.redirect_url);
    }
  };

  const handleSecondaryButtonPress = () => {
    if (carousel_data.page_action == '4' || carousel_data.page_action == '5') {
      // Go to another Title and Text page
      navigation.push(routes.CAROUSEL_PAGE, {
        is_subpage: true,
        subpage_title: carousel_data.subpage_title,
        subpage_text: carousel_data.subpage_text,
      });
    }
  };

  const handleUrlPress = (url, matchIndex /*: number*/) => {
    standardFunctions.open_browser(url);
  };

  const handlePhonePress = (phone, matchIndex /*: number*/) => {};

  const handleEmailPress = (email, matchIndex /*: number*/) => {};

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {(carousel_data.page_type === 'a' || carousel_data.page_type === 'b') &&
          carousel_data.page_media_url !== '' &&
          !is_subpage && (
            <View style={[styles.imageContainer]}>
              <FastImage
                source={{uri: carousel_data.page_media_url}}
                style={styles.image}
              />
            </View>
          )}
        {(carousel_data.page_type === 'c' || carousel_data.page_type === 'd') &&
          carousel_data.page_youtube_id !== '' &&
          carousel_data.page_youtube_id != undefined &&
          !is_subpage && (
            <View style={[styles.imageContainer]}>
              {/*//@ts-ignore*/}
              <YouTube
                apiKey={constants.YOUTUBE_API_KEY}
                videoId={carousel_data.page_youtube_id}
                play={true}
                fullscreen={false}
                loop={false}
                onReady={e => setIsReady(true)}
                onChangeState={e => setStatus(e.state)}
                onChangeQuality={e => setQuality(e.quality)}
                onError={e => {}}
                style={{...StyleSheet.absoluteFillObject}}
              />
            </View>
          )}
        {carousel_data.page_title !== '' && (
          <Text style={[styles.page_title]}>
            {!is_subpage ? carousel_data.page_title : params['subpage_title']}
          </Text>
        )}
        {carousel_data.page_text !== '' && !is_subpage ? (
          carousel_data.page_text != undefined ? (
            Strings.parseCoinsText(
              carousel_data.page_text,
              undefined,
              {style: styles.page_text},
              styles.page_text_container,
            )
          ) : (
            <></>
          )
        ) : params['subpage_text'] != undefined ? (
          Strings.parseCoinsText(
            params['subpage_text'],
            undefined,
            {style: styles.page_text},
            styles.page_text_container,
          )
        ) : (
          <></>
        )}
      </ScrollView>
      {(carousel_data.page_type === 'b' || carousel_data.page_type === 'd') &&
        !is_subpage && (
          <View
            style={{
              alignItems: 'center',
              height:
                carousel_data.page_action === '4' ||
                carousel_data.page_action === '5'
                  ? 110
                  : 80,
            }}>
            <StandardBottomButtons
              main_button_label={carousel_data.first_button_text}
              main_button_color={colors.THEFACULTY}
              main_button_visible={true}
              secondary_button_label={carousel_data.second_button_text}
              secondary_button_color={colors.THEFACULTY}
              secondary_button_visible={
                carousel_data.page_action == '4' ||
                carousel_data.page_action == '5'
              }
              onPressMain={handleMainButtonPress}
              onPressSecondary={handleSecondaryButtonPress}
            />
          </View>
        )}
    </SafeAreaView>
  );
};

CarouselPageScreen.navigationOptions = props => {
  const {
    route: {params = {}},
  } = props;
  const carousel_data = params['carousel_data'] || {};
  return {
    title: !params['is_subpage']
      ? carousel_data && carousel_data.page_title
      : params['subpage_title'],
    headerRight: () =>
      false && (
        <ShareButtonTop
          onButtonPress={() => {
            if (viewShow !== undefined) {
              try {
                viewShow.capture().then(
                  uri => {
                    Share.share(
                      {
                        title: !params['is_subpage']
                          ? carousel_data.title
                          : params['subpage_title'],
                        url: uri,
                      },
                      {
                        dialogTitle: 'Condividi',
                        subject: carousel_data.title,
                        tintColor: colors.THEFACULTY,
                      },
                    );
                  },
                  error => {},
                );
              } catch (e) {
                Share.share(
                  {
                    title: !params['is_subpage']
                      ? carousel_data.text
                      : params['subpage_title'],
                    message: carousel_data.text,
                  },
                  {tintColor: colors.THEFACULTY},
                );
              }
            }
          }}
        />
      ),
  };
};

export default CarouselPageScreen;
