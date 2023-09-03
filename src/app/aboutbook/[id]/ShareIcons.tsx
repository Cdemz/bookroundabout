import React from "react";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import "../../cssstyles/share.css";

const ShareIcons = ({ book }) => {
  const currentPageUrl = window.location.href; // Get the current page URL

  const shareOnWhatsApp = () => {
    const encodedMessage = encodeURIComponent(
      `${book.title} - ${currentPageUrl}`
    );
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${currentPageUrl}`;
    window.open(
      facebookUrl,
      "Share on Facebook",
      "width=500,height=500,top=300,left=300"
    );
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/share?url=${currentPageUrl}`;
    window.open(
      twitterUrl,
      "Share on Twitter",
      "width=500,height=500,top=300,left=300"
    );
  };

  const shareViaEmail = () => {
    const encodedSubject = encodeURIComponent(book.title);
    const encodedBody = encodeURIComponent(`Check this out: ${currentPageUrl}`);
    const emailUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = emailUrl;
  };

  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button?url=${currentPageUrl}&description=${book.title}`;
    window.open(
      pinterestUrl,
      "Share on Pinterest",
      "width=500,height=500,top=300,left=300"
    );
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentPageUrl}&title=${book.title}`;
    window.open(
      linkedInUrl,
      "Share on LinkedIn",
      "width=500,height=500,top=300,left=300"
    );
  };

  return (
    <main className="flex flex-col">
      <h1 className="text-2xl md:text-3xl tracking-wide font-semibold text-[var(--color-text)]">
        Share on
      </h1>
      <div className="social-icons share-icons share-row relative flex gap-2 text-[var(--color-text)] text-2xl mt-2">
        <div onClick={shareOnWhatsApp} className="uiverse">
          <span className="tooltip">Share on WhatsApp</span>
          <span>
            <FaWhatsapp />
          </span>
        </div>

        <div onClick={shareOnFacebook} className="uiverse">
          <span className="tooltip">Share on Facebook </span>
          <span>
            <FaFacebook />
          </span>
        </div>

        <div onClick={shareOnTwitter} className="uiverse">
          <span className="tooltip">Share on Twitter </span>
          <span>
            <FaTwitter />
          </span>
        </div>

        <div onClick={shareViaEmail} className="uiverse">
          <span className="tooltip"> Email to a Friend</span>
          <span>
            <FaEnvelope />
          </span>
        </div>

        <div onClick={shareOnPinterest} className="uiverse">
          <span className="tooltip"> Pin on Pinterest </span>
          <span>
            <FaPinterest />
          </span>
        </div>

        <div onClick={shareOnLinkedIn} className="uiverse">
          <span className="tooltip"> Share on LinkedIn</span>
          <span>
            <FaLinkedin />
          </span>
        </div>
      </div>
    </main>
  );
};

export default ShareIcons;
