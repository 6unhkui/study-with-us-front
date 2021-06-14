import React, { useCallback, useEffect, useRef, useState } from "react";
import Picker, { IEmojiData } from "emoji-picker-react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import useToggle from "@/hooks/useToggle";
import useInput from "@/hooks/useInput";
import styles from "./ChatInput.module.less";

interface ChatInputProps {
    onSubmit?: (v: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
    const inputRef = useRef<Input>(null);
    const { onToggle, isOn } = useToggle();
    const { input, onChange, reset } = useInput();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onEmojiClick = useCallback(
        (e: React.MouseEvent, emojiObject: IEmojiData) => {
            onChange(input.concat(emojiObject.emoji));
        },
        [input, onChange]
    );

    const onInputSubmit = useCallback(() => {
        onSubmit && onSubmit(input);
        reset();
    }, [onSubmit, reset, input]);

    return (
        <>
            <div className={styles.wrapper}>
                <HiOutlineEmojiHappy onClick={onToggle} className={styles.emojiBtn} />
                <Input.Search
                    name="message"
                    onChange={onChange}
                    onClick={isOn ? onToggle : undefined}
                    onSearch={onInputSubmit}
                    value={input}
                    size="large"
                    placeholder="메시지를 입력하세요."
                    enterButton={<SendOutlined />}
                    allowClear
                    className={styles.input}
                    ref={inputRef}
                />
            </div>
            {isOn && (
                <div className={styles.emojiPicker}>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            )}
        </>
    );
};

export default React.memo(ChatInput);
