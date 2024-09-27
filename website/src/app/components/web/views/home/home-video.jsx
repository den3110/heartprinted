import React from "react"

const HomeVideo= ()=> {
    return (
        <div className="home-video">
        <div className="home-video-banner"><picture><source srcSet="https://routine.vn/media/wysiwyg/LoveSeri01mobile.jpg" media="(max-width: 767px)" /> <img src="https://routine.vn/media/wysiwyg/LoveSeri01.jpg" alt="Chuỗi sự kiện Love Sharing from ROUTINE 1" /></picture></div>
        <div className="home-video-hp">
          <div id="home-video-hp">
            <div className="videoWrapper"><iframe className="video ytplayer" src="https://www.youtube.com/embed/c35gwtGz2ss?loop=1&playlist=c35gwtGz2ss&showinfo=0&rel=0&enablejsapi=1" width={700} height={500} frameBorder={0} allowFullScreen="allowfullscreen" id="widget2" data-gtm-yt-inspected-7="true" title="𝗟𝗢𝗩𝗘 Serie 01 | Toàn - Tút" /></div>
          </div>
        </div>
      </div>

    )

}

export default HomeVideo