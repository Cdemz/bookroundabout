import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10 text-[var(--color-text)] md:px-6">
      <div className="flex flex-col text-[var(--color-primary)] item-center text-sm md:text-lg gap-1 mb-3 lato">
        <div className="flex gap-2">
          <Link href="/" className="text-[var(--color-bg)]">
            HOME/
          </Link>

          <p className=" font-semibold -mb-3">TERMS AND CONDITIONS</p>
        </div>

        <p className="   -mb-3 text-[var(--color-primary)] text-xl font-bold">
          Terms and Conditions
        </p>
      </div>

      {/* body gan gan  */}
      <div className="flex flex-col gap-4">
        <p>
          Welcome to the Books Roundabout website. By continuing to browse and
          use this website, you are indicating your agreement to adhere to and
          be bound by the following terms and conditions of use. These terms and
          conditions, along with our privacy policy, govern the relationship
          between Books Roundabout and you concerning the use of this website.
          If you do not agree with any part of these terms and conditions, we
          kindly request that you refrain from using our website.{" "}
          <span className="block mt-3">
            {" "}
            In this text, the terms 'Books Roundabout,' 'our,' 'we,' or 'us'
            refer to the owner of the website. The term 'you' pertains to any
            user or visitor of our website.
          </span>
        </p>
        <p className="font-bold text-lg">
          Pickup: Books purchased with the option for in-store pickup must be
          collected within 7 days; otherwise, additional charges of 500 naira
          per day will apply. Please be aware that after two weeks, we cannot
          guarantee the availability or condition of your item, and we will not
          be held responsible.
        </p>

        <hr className="h-1 w-full bg-[var(--color-bg)]" />

        <div className="">
          <p className="text-[var(--color-text)] text-3xl md:text-4xl font-bold mt-6">
            Use of our website
          </p>
          <hr className=" w-full bg-[var(--color-bg)] mt-2" />
          <p>
            To access and use the Books Roundabout website, you must either be
            at least 18 years old or be under the supervision of a parent or
            legal guardian. We grant you a non-transferable and revocable
            license to use the website, subject to the terms and conditions
            outlined here, for the purpose of shopping for items available on
            the site. Any commercial use or use on behalf of a third party is
            prohibited unless explicitly permitted by us in advance. Violation
            of these terms and conditions will result in the immediate
            revocation of the granted license without prior notice.
            <span className="block mt-3">
              The content provided on this website is intended for informational
              purposes only. Product descriptions and representations on this
              site are provided by the vendors and do not represent our own
              views. Any submissions or opinions expressed on this website
              belong to the individuals who posted them and may not necessarily
              reflect our opinions.
            </span>
            <span className="block mt-3">
              Some services and features available on the website may require
              registration or subscription. If you choose to register or
              subscribe to any of these services or features, you agree to
              provide accurate and up-to-date information about yourself and to
              promptly update this information in case of any changes. It is
              your sole responsibility to keep your passwords and account
              information secure. The account owner is entirely responsible for
              all activities conducted using their password or account.
              Furthermore, you must notify us immediately if you become aware of
              any unauthorized use of your password or account. The website is
              not liable in any way for any loss or damage resulting from your
              failure to comply with these provisions.
            </span>
          </p>
        </div>
        <hr className="h-1 w-full bg-[var(--color-bg)]" />

        <div className="" id="refund">
          <p className="text-[var(--color-text)] text-3xl md:text-4xl font-bold mt-6">
            Refunds & Exchange
          </p>
          <hr className=" w-full bg-[var(--color-bg)] mt-2" />
          <div className="flex flex-col gap-2 pt-3">
            <p>
              Total refund is only available for goods that payments that were
              successful but could'nt be delivered for any reason that the
              company is liable for.
            </p>
            <p>
              Incase of damaged books(torn, soiled, missing pages.), another
              book of your choice will be delivered to you in exchange for the
              bad one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
