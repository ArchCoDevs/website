import Script from 'next/script';

// const cookiebotid = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

function TrackingCode() {
  return (
    <>
      {/* <Script
        id={`Cookiebot`}
        src={`https://consent.cookiebot.com/uc.js`}
        data-cbid={cookiebotid}
        data-blockingmode={`auto`}
        type={`text/javascript`}
        strategy={`beforeInteractive`}
        async={true}
      /> */}
      <Script id="infinity-tracking" strategy="afterInteractive">
        {`(function(i,n,f,t,y,x,z) {
        y=i._its=function(){return y.queue.push(arguments)};y.version='2.0';y.queue=[];z=n.createElement(f);z.async=!0;z.src=t;x=n.getElementsByTagName(f)[0];x.parentNode.insertBefore(z,x)})(window, document,'script','https://script.infinity-tracking.com/infinitytrack.js?i=18120');
      window._its('init', '18120');
      window._its('track');`}
      </Script>
    </>
  );
}

export default TrackingCode;
