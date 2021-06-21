import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { StackActions } from "@react-navigation/native";
import WithTaxCard from "./WithTaxCard";
import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const MESSAGE_TYPE = {
  CARD_FRONT_INVALID: 1,
  CARD_BACK_INVALID: 2,
};

const BASE_STORAGE_PATH_FRONT = 'id_card_front';
const BASE_STORAGE_PATH_BACK = 'id_card_back';

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.CARD_FRONT_INVALID:
      message = strings.SETTINGS.CARD_REGISTER_ID.ERROR_INVALID_CARD_FRONT;
      break;
    case MESSAGE_TYPE.CARD_BACK_INVALID:
      message = strings.SETTINGS.CARD_REGISTER_ID.ERROR_INVALID_CARD_BACK;
      break;
  }
  await standardFunctions.show_alert_async(
    strings.SETTINGS.CARD_REGISTER_ID.TITLE,
    message,
  );
};

const WithIDCard = (props, state) => {
  return {
    labels: {
      headerLabel: strings.SETTINGS.CARD_REGISTER_ID.HEADER_LABEL,
      placeHolder1: strings.SETTINGS.CARD_REGISTER_ID.PLACE_HOLDER1,
      placeHolder1_uploaded:
        strings.SETTINGS.CARD_REGISTER_ID.PLACE_HOLDER1_UPLOADED,
      placeHolder2: strings.SETTINGS.CARD_REGISTER_ID.PLACE_HOLDER2,
      placeHolder2_uploaded:
        strings.SETTINGS.CARD_REGISTER_ID.PLACE_HOLDER2_UPLOADED,
    },
    constants: {
      card1_dest_path: BASE_STORAGE_PATH_FRONT,
      card2_dest_path: BASE_STORAGE_PATH_BACK,
    },
    onContinue: async () => {
      if (!state.card1_image_url) {
        await showMessage(MESSAGE_TYPE.CARD_FRONT_INVALID);
        return false;
      }

      if (!state.card2_image_url) {
        await showMessage(MESSAGE_TYPE.CARD_BACK_INVALID);
        return false;
      }

      props.navigation.dispatch(
        StackActions.push(routes.SETTINGS_CARD_REGISTER, {
          cardType: WithTaxCard.CARD_TYPE,
          id_card_front_image_url: state.card1_image_url,
          id_card_back_image_url: state.card2_image_url,
        }),
      );
    },
  };
};

WithIDCard.CARD_TYPE = 'IDCard';
WithIDCard.TITLE = strings.SETTINGS.CARD_REGISTER_ID.TITLE;
export default WithIDCard;
