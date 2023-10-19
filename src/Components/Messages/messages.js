import { message } from "antd";

export const Success = (messages) => {
    message.success({
        className: "ant-message",
        content: messages,
        duration: 1
    });
}
export const Error = (messages) => {
    message.error({
        className: "ant-message",
        content: messages,
        duration: 1,
        style: { marginTop: '100px' }
    });
}
export const Warning = (messages) => {
    message.warning({
        className: "ant-message",
        content: messages,
        duration: 1
    });
}
