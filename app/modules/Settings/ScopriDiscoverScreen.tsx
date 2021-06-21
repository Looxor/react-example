import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, constants, strings } from "../../config";
import CartaBoxComponent2 from "./_Components/CartaBoxComponent2";
import Strings from "../../utils/misc/TextComponents";
import standardFunctions from "../../utils/app/StandardFunctions";

const ScopriDiscoverScreen = props => {
  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  const registerLinkPressHandler = () => {
    standardFunctions.open_browser('http://ess.ga/registrazione');
  };

  const registerCartavirtualeLinkPressHandler = () => {
    standardFunctions.open_browser('http://ess.ga/registrazione_cartavirtuale');
  };

  //
  useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <CartaBoxComponent2 />
        <Text style={[styles.text, styles.title]}>
          {'Scopri la Fìdaty Card'}
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {
              'Entra nel mondo Esselunga e scopri tutti i vantaggi di Fìdaty Card: sconti, promozioni dedicate solo a te e un ricco catalogo di premi tra cui scegliere!\n'
            }
          </Text>
          <Text style={styles.text}>Registrati</Text>
          <TouchableOpacity onPress={registerCartavirtualeLinkPressHandler}>
            <Text style={[styles.text, styles.textLink]}> qui </Text>
          </TouchableOpacity>
          {Strings.makeWrapText(
            `per richiedere la tua Fìdaty Card virtuale e scarica l’app Esselunga per averla sempre con te e usufruire degli sconti thefaculty nei negozi Esselunga (non validi online).\n`,
            {style: styles.text},
          )}

          <Text style={styles.text}>
            Se invece preferisci richiederla in negozio, a titolo completamente
            gratuito,
          </Text>
          <Text style={styles.text}>registrati</Text>
          <TouchableOpacity onPress={registerLinkPressHandler}>
            <Text style={[styles.text, styles.textLink]}> qui </Text>
          </TouchableOpacity>
          {Strings.makeWrapText(`non appena la carta ti sarà consegnata. `, {
            style: styles.text,
          })}
          <Text
            style={
              styles.text
            }>{`\nRicordati di tenere sempre aggiornati i tuoi dati anagrafici e i consensi privacy per ricevere tutte le promozioni che Esselunga ha pensato per te.\n\nCosa aspetti? Richiedila subito!\n`}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

ScopriDiscoverScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.CARTA_FIDATY.TITLE2,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    padding: 20,
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    paddingBottom: 0,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  textLink: {
    color: colors.THEFACULTY,
  },
});

export default ScopriDiscoverScreen;
