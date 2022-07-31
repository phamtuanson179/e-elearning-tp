export const convertSecondToTime = (secondsInit) => {
  let minutesProcess = Math.floor(secondsInit / 60);
  let secondsProcess = Math.floor(secondsInit % 60);
  return {
    minutes: minutesProcess < 10 ? "0" + minutesProcess : minutesProcess,
    seconds: secondsProcess < 10 ? "0" + secondsProcess : secondsProcess,
  };
};

export const convertTimestampToDateString = (miliseconds) => {
  if (!miliseconds) return "";
  else {
    const date = new Date(miliseconds);
    return `${
      date.getDate() == 0
        ? "00"
        : date.getDate() < 10
        ? "0" + date.getDate()
        : date.getDate()
    }/${
      date.getMonth() + 1 == 0
        ? "00"
        : date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
};

export const convertTimestampToFullDate = (miliseconds) => {
  if (!miliseconds) return "";
  else {
    const date = new Date(miliseconds);
    return `${
      date.getHours() == 0
        ? "00"
        : date.getHours() < 10
        ? "0" + date.getHours()
        : date.getHours()
    }:${
      date.getMinutes() == 0
        ? "00"
        : date.getMinutes() < 10
        ? "0" + date.getMinutes()
        : date.getMinutes()
    }:${
      date.getSeconds() == 0
        ? "00"
        : date.getSeconds() < 10
        ? "0" + date.getSeconds()
        : date.getSeconds()
    } - ${
      date.getDate() == 0
        ? "00"
        : date.getDate() < 10
        ? "0" + date.getDate()
        : date.getDate()
    }/${
      date.getMonth() + 1 == 0
        ? "00"
        : date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
};
