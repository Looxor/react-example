import { strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { CommonActions as NavigationActions } from "@react-navigation/native";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";

const MESSAGE_TYPE = {
  CARD_FRONT_INVALID: 1,
  CARD_BACK_INVALID: 2,
  ERROR_SAVING_URLS: 3,
  SUCCESS_SAVING_URLS: 4,
  ERROR_ALREADY_SENT: 5,
};

const BASE_STORAGE_PATH_FRONT = 'tax_card_front';
const BASE_STORAGE_PATH_BACK = 'tax_card_back';

const showMessage = async message_type => {
  let message;
  switch (message_type) {
    case MESSAGE_TYPE.CARD_FRONT_INVALID:
      message = strings.SETTINGS.CARD_REGISTER_TAX.ERROR_INVALID_CARD_FRONT;
      break;
    case MESSAGE_TYPE.CARD_BACK_INVALID:
      message = strings.SETTINGS.CARD_REGISTER_TAX.ERROR_INVALID_CARD_BACK;
      break;
    case MESSAGE_TYPE.ERROR_SAVING_URLS:
      message = strings.SETTINGS.CARD_REGISTER_TAX.ERROR_SAVING_URLS;
      break;
    case MESSAGE_TYPE.SUCCESS_SAVING_URLS:
      message = strings.SETTINGS.CARD_REGISTER_TAX.SUCCESS_SAVING_URLS;
      break;
    case MESSAGE_TYPE.ERROR_ALREADY_SENT:
      message = strings.SETTINGS.CARD_REGISTER_TAX.ERROR_ALREADY_SENT;
      break;
  }
  await standardFunctions.show_alert_async(
    strings.SETTINGS.CARD_REGISTER_TAX.TITLE,
    message,
  );
};

const WithTaxCard = (props, state) => {
  return {
    labels: {
      headerLabel: strings.SETTINGS.CARD_REGISTER_TAX.HEADER_LABEL,
      placeHolder1: strings.SETTINGS.CARD_REGISTER_TAX.PLACE_HOLDER1,
      placeHolder1_uploaded:
        strings.SETTINGS.CARD_REGISTER_TAX.PLACE_HOLDER1_UPLOADED,
      placeHolder2: strings.SETTINGS.CARD_REGISTER_TAX.PLACE_HOLDER2,
      placeHolder2_uploaded:
        strings.SETTINGS.CARD_REGISTER_TAX.PLACE_HOLDER2_UPLOADED,
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

      const [tax_card_front_image_url, tax_card_back_image_url] = [
        state.card1_image_url,
        state.card2_image_url,
      ];
      const id_card_front_image_url = props.navigation.getParam(
        'id_card_front_image_url',
      );
      const id_card_back_image_url = props.navigation.getParam(
        'id_card_back_image_url',
      );

      try {
        const request: any = await CallServerPromise.send_verification({
          id_card_front_image_url,
          id_card_back_image_url,
          tax_card_front_image_url,
          tax_card_back_image_url,
        });
        if (request.success) {
          await showMessage(MESSAGE_TYPE.SUCCESS_SAVING_URLS);
          // props.navigation.pop(3);
          NavigationActions.navigate(routes.CONTEST_NAVIGATOR, {
            screen: routes.CONTEST_PRIZE_REQUEST1,
          });
        } else {
          if (request.error === 'already sent documentation') {
            await showMessage(MESSAGE_TYPE.ERROR_ALREADY_SENT);
            props.navigation.pop(3);
          } else {
            await showMessage(MESSAGE_TYPE.ERROR_SAVING_URLS);
          }
        }
      } catch (error) {
        await showMessage(MESSAGE_TYPE.ERROR_SAVING_URLS);
      }
    },
  };
};

WithTaxCard.CARD_TYPE = 'TaxCard';
WithTaxCard.TITLE = strings.SETTINGS.CARD_REGISTER_TAX.TITLE;
export default WithTaxCard;
