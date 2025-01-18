import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

/**
 * 加密消息
 * @param message 消息
 */
export const hashMessageSync = (message: string): string => {
  const hashedMessage = bcrypt.hashSync(message, salt);
  return hashedMessage;
};

/**
 * 检查消息与加密后的消息是否匹配
 * @param message 消息
 * @param hashedMessage 加密后的消息
 */
export const checkHashedMessageSync = (message: string, hashedMessage: string): boolean => {
  const isMatched = bcrypt.compareSync(message, hashedMessage);
  return isMatched;
};
