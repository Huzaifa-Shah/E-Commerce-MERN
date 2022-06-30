import React, { useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import "../Setting/Setting.css";
import "./TOC.css";
import { LOGOUT } from "../../../store/constants/AuthConstants";
import { updateAdmin } from "../../../store/asyncMethods/AuthMethod";

export default function TOC({ history }) {
  const [admin, setAdmin] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const userId = user._id;

  //Functions
  const submitHandler = (e) => {
    e.preventDefault();
    if (!admin) {
      toast.error("Click Agree");
    } else {
      dispatch(updateAdmin(userId));
      dispatch({ type: LOGOUT });
      history.push("/login");
    }
  };

  return (
    <div className="row ml-minus-15 mr-minus-15 toc_container">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="col-8 p-15">
        <div className="create_card">
          <h3 className="card_h3">Terms and Condition</h3>
          <div className="toc_content">
            <h3 className="card_h3">Introduction</h3>
            <p className="toc_content_details">
              These Website Standard Terms and Conditions written on this
              webpage shall manage your use of our website, Webiste Name
              accessible at Website.com. These Terms will be applied fully and
              affect to your use of this Website. By using this Website, you
              agreed to accept all terms and conditions written in here. You
              must not use this Website if you disagree with any of these
              Website Standard Terms and Conditions. Minors or people below 18
              years old are not allowed to use this Website.
            </p>
            <h3 className="card_h3">Restrictions</h3>
            <p className="toc_content_details">
              <ul>
                <li>publishing any Website material in any other media;</li>
                <li>
                  selling, sublicensing and/or otherwise commercializing any
                  Website material;
                </li>
                <li>
                  publicly performing and/or showing any Website material;
                </li>
                <li>
                  using this Website to engage in any advertising or marketing.
                </li>
                <li>
                  publicly performing and/or showing any Website material;
                </li>
              </ul>
            </p>
            <h3 className="card_h3">Details</h3>
            <p className="toc_content_details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Pellentesque habitant morbi tristique senectus et. Nibh nisl
              condimentum id venenatis a condimentum vitae sapien pellentesque.
              Nisl suscipit adipiscing bibendum est ultricies integer quis
              auctor. Adipiscing elit pellentesque habitant morbi tristique
              senectus. Metus vulputate eu scelerisque felis imperdiet proin
              fermentum leo. Cras fermentum odio eu feugiat pretium nibh ipsum
              consequat nisl. Vel pretium lectus quam id leo. Lectus vestibulum
              mattis ullamcorper velit. Nunc lobortis mattis aliquam faucibus
              purus. Neque ornare aenean euismod elementum nisi quis eleifend
              quam adipiscing. Massa sed elementum tempus egestas sed sed. Elit
              duis tristique sollicitudin nibh sit amet commodo nulla. Quisque
              egestas diam in arcu cursus euismod. Ipsum faucibus vitae aliquet
              nec ullamcorper sit amet risus. Ornare arcu odio ut sem nulla
              pharetra diam sit amet. Condimentum id venenatis a condimentum
              vitae sapien pellentesque habitant. Pulvinar mattis nunc sed
              blandit. Amet mattis vulputate enim nulla aliquet porttitor.
              Adipiscing enim eu turpis egestas. Sit amet massa vitae tortor
              condimentum lacinia quis vel eros. Viverra nam libero justo
              laoreet sit amet cursus sit amet. Quis hendrerit dolor magna eget
              est lorem ipsum dolor. Netus et malesuada fames ac turpis egestas
              maecenas pharetra. Phasellus faucibus scelerisque eleifend donec
              pretium vulputate sapien. Ullamcorper eget nulla facilisi etiam.
              Ac turpis egestas sed tempus urna et pharetra pharetra massa. Eget
              mauris pharetra et ultrices. Elementum eu facilisis sed odio morbi
              quis. Mauris nunc congue nisi vitae. Quis auctor elit sed
              vulputate mi sit amet. Donec enim diam vulputate ut pharetra sit
              amet aliquam. Ultrices sagittis orci a scelerisque. Libero
              volutpat sed cras ornare arcu dui. Faucibus a pellentesque sit
              amet porttitor. Neque laoreet suspendisse interdum consectetur
              libero id. Viverra ipsum nunc aliquet bibendum enim facilisis
              gravida neque. Amet consectetur adipiscing elit duis tristique
              sollicitudin nibh sit. Elit ullamcorper dignissim cras tincidunt
              lobortis feugiat. Egestas purus viverra accumsan in. Lacus luctus
              accumsan tortor posuere ac ut consequat. Tellus in hac habitasse
              platea dictumst vestibulum rhoncus. Leo in vitae turpis massa sed.
              Condimentum vitae sapien pellentesque habitant. In massa tempor
              nec feugiat nisl pretium fusce. Integer vitae justo eget magna.
              Sit amet est placerat in egestas erat imperdiet. Quam lacus
              suspendisse faucibus interdum posuere. Cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin. Quam elementum pulvinar
              etiam non quam lacus suspendisse. Ultrices sagittis orci a
              scelerisque purus semper. Vivamus at augue eget arcu dictum. In
              pellentesque massa placerat duis ultricies lacus sed. In dictum
              non consectetur a erat nam at lectus urna. Iaculis nunc sed augue
              lacus. Quam pellentesque nec nam aliquam sem et tortor consequat
              id. Rhoncus est pellentesque elit ullamcorper dignissim. Mi proin
              sed libero enim sed faucibus turpis in. Consectetur adipiscing
              elit duis tristique sollicitudin. Volutpat maecenas volutpat
              blandit aliquam. Egestas purus viverra accumsan in nisl nisi
              scelerisque. In aliquam sem fringilla ut morbi tincidunt augue.
              Adipiscing elit duis tristique sollicitudin nibh sit amet. Nunc
              eget lorem dolor sed viverra ipsum nunc aliquet. Purus semper eget
              duis at tellus at. Semper eget duis at tellus at urna condimentum.
              Consequat id porta nibh venenatis cras. Amet nisl purus in mollis
              nunc. Augue eget arcu dictum varius duis at consectetur. Venenatis
              urna cursus eget nunc scelerisque viverra mauris. Odio aenean sed
              adipiscing diam donec adipiscing tristique risus. Mi in nulla
              posuere sollicitudin aliquam ultrices sagittis. Sit amet cursus
              sit amet dictum. Aliquam id diam maecenas ultricies mi. Orci eu
              lobortis elementum nibh tellus. Porttitor rhoncus dolor purus non
              enim. In fermentum posuere urna nec tincidunt. Nunc eget lorem
              dolor sed. Mi proin sed libero enim sed. Aliquet nec ullamcorper
              sit amet. Amet mauris commodo quis imperdiet massa tincidunt nunc
              pulvinar. Vel facilisis volutpat est velit egestas dui id ornare
              arcu. Imperdiet massa tincidunt nunc pulvinar sapien et ligula
              ullamcorper. Commodo quis imperdiet massa tincidunt nunc pulvinar
              sapien. Elit pellentesque habitant morbi tristique. Ultricies leo
              integer malesuada nunc vel risus. Curabitur gravida arcu ac
              tortor. Mollis nunc sed id semper risus in. Quam nulla porttitor
              massa id neque aliquam vestibulum. Nisl purus in mollis nunc sed.
              Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.
              Tristique et egestas quis ipsum suspendisse ultrices gravida.
              Aliquet nibh praesent tristique magna sit amet purus gravida. Vel
              eros donec ac odio tempor orci. Non quam lacus suspendisse
              faucibus interdum posuere. Dolor sit amet consectetur adipiscing
              elit ut aliquam. Urna neque viverra justo nec ultrices dui sapien
              eget mi. Ipsum nunc aliquet bibendum enim facilisis gravida neque.
              Ornare massa eget egestas purus viverra accumsan in nisl nisi. Leo
              integer malesuada nunc vel risus. In metus vulputate eu
              scelerisque felis. Mattis ullamcorper velit sed ullamcorper morbi
              tincidunt. Duis at tellus at urna. Rhoncus dolor purus non enim
              praesent elementum. Elit ut aliquam purus sit. Donec massa sapien
              faucibus et molestie ac. Arcu dui vivamus arcu felis bibendum ut
              tristique et. Facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui. Tincidunt arcu non sodales neque
              sodales. Non pulvinar neque laoreet suspendisse interdum. Sit amet
              cursus sit amet. Nisl purus in mollis nunc sed id semper risus in.
              Adipiscing at in tellus integer feugiat scelerisque varius morbi
              enim. Dictum sit amet justo donec enim diam vulputate ut pharetra.
              Senectus et netus et malesuada fames ac turpis egestas maecenas.
              Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu.
              Gravida arcu ac tortor dignissim convallis. Auctor eu augue ut
              lectus arcu bibendum at. Quis blandit turpis cursus in hac
              habitasse platea dictumst quisque. Mi quis hendrerit dolor magna
              eget. Id ornare arcu odio ut sem. Est pellentesque elit
              ullamcorper dignissim cras tincidunt lobortis. Nibh cras pulvinar
              mattis nunc sed. Id volutpat lacus laoreet non curabitur gravida.
              Convallis tellus id interdum velit laoreet id donec ultrices
              tincidunt. Feugiat in fermentum posuere urna nec tincidunt
              praesent semper. Tellus cras adipiscing enim eu turpis egestas
              pretium aenean. Neque convallis a cras semper. Senectus et netus
              et malesuada fames ac turpis egestas sed. Elit ut aliquam purus
              sit amet. Enim blandit volutpat maecenas volutpat. Eu feugiat
              pretium nibh ipsum consequat nisl vel. Urna porttitor rhoncus
              dolor purus non enim praesent. Lobortis scelerisque fermentum dui
              faucibus in ornare quam. Viverra aliquet eget sit amet. Sit amet
              purus gravida quis blandit. Nulla facilisi nullam vehicula ipsum.
              Scelerisque purus semper eget duis at tellus at urna condimentum.
              Odio tempor orci dapibus ultrices in iaculis nunc sed augue.
              Mauris vitae ultricies leo integer malesuada nunc vel risus
              commodo. Nisl suscipit adipiscing bibendum est ultricies integer
              quis. Ipsum faucibus vitae aliquet nec ullamcorper sit amet. Id
              ornare arcu odio ut sem nulla. Erat nam at lectus urna duis
              convallis convallis tellus id. Risus ultricies tristique nulla
              aliquet enim. Cras tincidunt lobortis feugiat vivamus. Morbi
              tristique senectus et netus. Nisl condimentum id venenatis a
              condimentum vitae sapien. Pellentesque sit amet porttitor eget
              dolor morbi. A diam maecenas sed enim ut sem viverra aliquet eget.
              Elit eget gravida cum sociis natoque penatibus. Amet luctus
              venenatis lectus magna fringilla urna porttitor rhoncus. Odio
              pellentesque diam volutpat commodo sed. Sagittis id consectetur
              purus ut faucibus pulvinar elementum integer.
            </p>
            <h3 className="card_h3">Governing Law & Jurisdiction</h3>
            <p className="toc_content_details">
              These Terms will be governed by and interpreted in accordance with
              the laws of the State of Country, and you submit to the
              non-exclusive jurisdiction of the state and federal courts located
              in Country for the resolution of any disputes.
            </p>
          </div>
          <div className="toc_agree_checkbox">
            <input
              type="radio"
              id="toc_agree"
              value={true}
              onChange={(e) => setAdmin(e.target.value)}
            />
            <label htmlFor="toc_agree">I Agree to Terms and Conditions</label>
          </div>
          <div>
            <button className="btn" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
