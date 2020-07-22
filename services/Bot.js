const respondToUserMessage = async (text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok'), 1000);
  });
};

export default {
  respondToUserMessage,
};
