"use client";

import { useState } from "react";

export function RegisterButton() {
  const [noticeShown, setNoticeShown] = useState(false);
  return (
    <div className="register">
      <button type="button" className="register-button" aria-describedby="register-note" onClick={() => setNoticeShown(true)}>
        Register
      </button>
      <p id="register-note" className="register-note" role="status">
        {noticeShown ? "Demo only: Huddle is a practice design, so nothing is registered or sent." : ""}
      </p>
    </div>
  );
}
