import React, { useEffect, useState } from "react";
import { colors } from "../../../../config";
import ProgressBar from "../../../../components/ProgressBar";
import { delay } from "../../../../utils/misc/Timer";

let gTimerProgressBarInterval: any = 0;
let gTimerProgress = {
  last: 0,
  step: 0,
};
const TimerProgressBar = props => {
  const {style, timeout, onTimeout, onProgress} = props;
  const [progress, setProgress] = useState(100);
  const updateProgress = () => {
    gTimerProgress.last -= gTimerProgress.step;
    if (gTimerProgress.last <= 5) {
      clearInterval(gTimerProgressBarInterval);
      setProgress(0);
      onTimeout && onTimeout();
    } else {
      setProgress(gTimerProgress.last);
      onProgress(gTimerProgress.last);
    }
  };

  const startTimer = async () => {
    await delay(500);
    gTimerProgress.last = 100;
    gTimerProgress.step = 100 / timeout;

    clearInterval(gTimerProgressBarInterval);
    gTimerProgressBarInterval = setInterval(updateProgress, 1000);
  };
  const componentDidMount = () => {
    if (timeout && timeout > 0) startTimer();
    return () => {
      clearInterval(gTimerProgressBarInterval);
    };
  };
  useEffect(componentDidMount, [timeout]);
  return (
    <ProgressBar
      progress={progress}
      height={10}
      color={colors.BESTOF2.BG1}
      backBarColor={colors.BESTOF2.BG3}
      style={style}
    />
  );
};

export default TimerProgressBar;
