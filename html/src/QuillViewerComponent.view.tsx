import React from "react";
import * as ReactQuill from "react-quill"; // Typescript
import "react-quill/dist/quill.bubble.css"; // ES6
import { DeltaOperation } from "quill";

const SHOW_DEBUG_INFORMATION = true;

interface Props {
  debugMessages: string[];
  defaultValue: string | DeltaOperation[];
  handleChange: (
    htmlContent: string,
    delta: DeltaOperation[],
    source: any,
    editor: any
  ) => void;
  height?: number;
  onQuillRef: (quillRef: any) => void;
  content?: string | DeltaOperation[];
}

const getReactQuillComponent = (
  defaultValue: string | DeltaOperation[],
  handleChange: (
    htmlContent: string,
    delta: DeltaOperation[],
    source: any,
    editor: any
  ) => void,
  height: number,
  onQuillRef: (quillRef: any) => void,
  content: string | DeltaOperation[] | undefined
) => {
  return (
    // @ts-ignore
    <ReactQuill
      defaultValue={defaultValue}
      modules={{
        toolbar: false
      }}
      onChange={handleChange}
      readOnly={true}
      ref={(component: any) => {
        onQuillRef(component);
      }}
      style={{ height }}
      value={content}
    />
  );
};

const QuillViewerComponentView = ({
  debugMessages = [],
  defaultValue,
  handleChange,
  height=100,
  onQuillRef,
  content
}: Props) => {
  return (
    <>
      {getReactQuillComponent(
        defaultValue,
        handleChange,
        height,
        onQuillRef,
        content
      )}
      {SHOW_DEBUG_INFORMATION ? (
        <div
          style={{
            backgroundColor: "orange",
            maxHeight: "200px",
            overflow: "auto",
            padding: 5,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 15000
          }}
          id="messages"
        >
          <ul>
            {debugMessages.map((message: string, index: number) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default QuillViewerComponentView;
