import React from "react";

import NothingView from "./NothingView";
import QRCodeView from "./QRCodeView";
import BarCodeView from "./BarCodeView";
import TextView from "./TextView";
import LinkView from "./LinkView";
import TimeoutView from "./TimeoutView";

const CodeView = props => {
  const {type, activation_barcode} = props;
  if (type === 'nothing') {
    return <NothingView {...props} />;
  } else if (type === 'qrcode') {
    return <QRCodeView {...props} />;
  } else if (type === 'barcode' || type === 'barcode_code128') {
    return <BarCodeView {...props} />;
  } else if (type === 'text') {
    return <TextView {...props} />;
  } else if (type === 'barcode+text') {
    return (
      <BarCodeView
        {...props}
        activation_barcode={activation_barcode}
        is_barcode_text={true}
      />
    );
  } else if (type === 'link') {
    return <LinkView {...props} />;
  } else if (type === 'timeout') {
    return <TimeoutView {...props} />;
  }
  return null;
};

export default CodeView;
export {NothingView, QRCodeView, BarCodeView, TextView, LinkView, TimeoutView};
