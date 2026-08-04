import { useEffect, useState, useRef } from "react";
import { FaGlobeAsia, FaChevronDown } from "react-icons/fa";

const GoogleTranslate = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dropdownRef = useRef(null);

  // ============================
  // Google Translate Load
  // ============================
  useEffect(() => {

    window.googleTranslateElementInit = () => {

      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      setLoaded(true);
    };


    if (!document.getElementById("google-translate-script")) {

      const script = document.createElement("script");

      script.id = "google-translate-script";

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);

    } else {

      setLoaded(true);

    }



    // Hide Google Translate Banner

    const hideGoogleBanner = () => {

      const banner =
        document.querySelector(".goog-te-banner-frame");


      if (banner) {
        banner.style.display = "none";
      }


      const iframe =
        document.querySelector(
          "iframe.goog-te-banner-frame"
        );


      if (iframe) {
        iframe.style.display = "none";
      }


      document.body.style.top = "0px";

    };


    const interval =
      setInterval(
        hideGoogleBanner,
        300
      );



    // Outside Click

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      clearInterval(interval);

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  }, []);



  // ============================
  // Change Language
  // ============================

  const changeLanguage = (lang) => {

    let attempts = 0;


    const timer = setInterval(() => {


      const select =
        document.querySelector(
          ".goog-te-combo"
        );


      if(select){

        select.value = lang;


        select.dispatchEvent(
          new Event("change")
        );


        clearInterval(timer);

        setOpen(false);

        return;

      }


      attempts++;


      if(attempts > 20){

        clearInterval(timer);

        alert(
          "Google Translate is still loading. Please try again."
        );

      }


    },300);

  };



  return (

    <>

      {/* Hidden Google Widget */}

      <div
        id="google_translate_element"
        style={{
          display:"none"
        }}
      />



      {/* Floating Container */}

      <div
        ref={dropdownRef}
        className="
          language-container

          fixed
          right-0
          top-1/2
          -translate-y-1/2

          z-[99999]
        "
      >


        <div className="relative">


          {/* Button */}

          <button

            disabled={!loaded}

            onClick={() =>
              setOpen(!open)
            }

            className={`

              flex
              items-center
              gap-2

              rounded-l-2xl

              shadow-2xl

              px-3
              sm:px-5

              py-3

              transition-all
              duration-300


              ${
                loaded

                ?

                "bg-[#082B3A] hover:bg-[#0E4156] text-white hover:scale-105"

                :

                "bg-gray-400 cursor-not-allowed text-white"

              }

            `}
          >


            <div
              className="
                w-9
                h-9

                sm:w-10
                sm:h-10

                rounded-xl

                bg-gradient-to-r
                from-blue-500
                to-cyan-400

                flex
                items-center
                justify-center
              "
            >

              <FaGlobeAsia />

            </div>



            <div className="
              hidden
              xs:block
              text-left
            ">

              <p className="
                text-[10px]
                text-gray-300
                uppercase
              ">
                Website
              </p>


              <p className="
                font-semibold
                text-sm
                sm:text-base
              ">
                Language
              </p>

            </div>



            <FaChevronDown

              className={`
                hidden
                sm:block

                transition

                ${
                  open
                  ?
                  "rotate-180"
                  :
                  ""
                }
              `}

            />


          </button>




          {/* Dropdown */}

          {open && (

            <>


              {/* Mobile Overlay */}

              <div

                onClick={() =>
                  setOpen(false)
                }

                className="
                  fixed
                  inset-0

                  bg-black/40

                  backdrop-blur-sm

                  z-[99998]
                "

              />




              {/* Language Card */}

              <div

                onClick={(e)=>
                  e.stopPropagation()
                }

                className="

                  fixed

                  left-1/2
                  top-1/2

                  -translate-x-1/2
                  -translate-y-1/2


                  w-[90%]
                  max-w-sm


                  sm:absolute

                  sm:left-auto
                  sm:right-0

                  sm:top-full

                  sm:translate-x-0
                  sm:translate-y-0

                  sm:mt-3

                  sm:w-72



                  bg-white

                  rounded-3xl

                  shadow-2xl

                  border

                  overflow-hidden


                  z-[999999]

                "

              >



                {/* Header */}

                <div className="
                  px-5
                  py-4

                  bg-gradient-to-r
                  from-[#082B3A]
                  to-[#0E4156]
                ">

                  <h3 className="
                    text-white
                    font-bold
                  ">
                    🌐 Select Language
                  </h3>


                  <p className="
                    text-gray-300
                    text-xs
                    mt-1
                  ">
                    Choose your preferred language
                  </p>


                </div>





                {/* Languages */}

                {[
                  {
                    code:"en",
                    flag:"🇬🇧",
                    title:"English",
                    sub:"Default Language"
                  },

                  {
                    code:"ur",
                    flag:"🇵🇰",
                    title:"اردو",
                    sub:"Urdu Language"
                  },


                  {
                    code:"ar",
                    flag:"🇸🇦",
                    title:"العربية",
                    sub:"Arabic Language"
                  }

                ].map((item,index)=>(


                  <div key={item.code}>


                    <button

                      onClick={() =>
                        changeLanguage(item.code)
                      }

                      className="
                        w-full

                        flex
                        items-center
                        justify-between

                        px-5

                        py-4

                        hover:bg-gray-100

                        transition
                      "

                    >

                      <div className="
                        flex
                        items-center
                        gap-4
                      ">


                        <span className="
                          text-3xl
                        ">
                          {item.flag}
                        </span>


                        <div className="text-left">

                          <h3 className="
                            font-semibold
                            text-gray-800
                          ">
                            {item.title}
                          </h3>


                          <p className="
                            text-xs
                            text-gray-500
                          ">
                            {item.sub}
                          </p>


                        </div>


                      </div>


                      <span>
                        ✓
                      </span>


                    </button>


                    {
                      index !== 2 &&
                      <div className="
                        mx-4
                        border-t
                      "/>
                    }


                  </div>


                ))}


              </div>


            </>

          )}



        </div>


      </div>


    </>

  );

};


export default GoogleTranslate;