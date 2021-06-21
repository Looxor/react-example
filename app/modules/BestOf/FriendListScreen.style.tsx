import { colors, constants } from "../../config";

export default {
  container: {
    padding: 5,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    flex: 1,
  },
  listCaption: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
    height: 40,
    lineHeight: 40,
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 0,
  },
  selectButton: {
    borderRadius: 10,
    width: '100%',
    height: 85,
    backgroundColor: colors.WHITE,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
  },
  selectButtonImageRight: {
    width: 20,
    height: 20,
  },
  selectButtonText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    width: 200,
    lineHeight: 20,
  },
  selectButtonText2: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
  },
};
