import React, { useEffect } from "react";
import "../../../../../public/lib/summernote/summernote-bs4.css";
import "../../../../../public/lib/summernote/summernote-bs4.min.js";

const Editor = React.forwardRef(
  ({ lan, className, defaultValue, label }, ref) => {
    useEffect(() => {
      ref && $(ref.current)?.summernote();
    }, []);

    return (
      <div className={className}>
        <label htmlFor="text_uz" className="col-sm-12 col-form-label">
          {label || "Text"}({lan})
        </label>
        <div className="col-sm-12">
          <div
            ref={ref}
            dangerouslySetInnerHTML={{ __html: defaultValue }}
            id="summernote"
          ></div>
        </div>
      </div>
    );
  }
);

export default Editor;
