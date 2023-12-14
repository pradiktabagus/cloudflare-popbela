export const AdsMegabillboardAMP = ({ category }: { category?: string }) => {
  return (
    <amp-script script="parallax-script">
      <div id="megabillboard" className="megabillboard-container">
        <div className="close-btn" id="btn-close">
          Tutup
        </div>
        <div className="text-scroll">SCROLL UNTUK MELANJUTKAN MEMBACA</div>
        <div className="predefine-megabillboard-amp">
          <div className="wrapper-predefine">
            <amp-ad
              width="320"
              height="480"
              type="doubleclick"
              data-slot={`/253109699/PopbelaAMP/${category}`}
              data-multi-size-validation="false"
              json='{"targeting":{"pos":["mega_billboard"]}}'
            >
              <div placeholder=""></div>
            </amp-ad>
          </div>
        </div>
        <script
          id="parallax-script"
          type="text/plain"
          target="amp-script"
          dangerouslySetInnerHTML={{
            __html: `
          document.getElementById("btn-close").onclick = function(){
            document
            .getElementById('megabillboard')
            .classList.add('hiddenParallax')}
          `,
          }}
        />
        <style jsx>{`
          .megabillboard-container {
            min-height: calc(480px + 24px);
            width: 100%;
            background: white;
            position: relative;
          }
          .text-scroll {
            position: absolute;
            width: 100%;
            background-color: #d51c6a;
            color: white;
            display: block;
            text-align: center;
            bottom: 0;
            font-size: 12px;
            padding: 3px;
            font-family: BahijMitra;
            height: 24px;
            z-index: 999;
          }
          .predefine-megabillboard-amp {
            height: 480px;
            position: relative;
            width: 100%;
          }
          .wrapper-predefine {
            background-color: #e5e9ec;
            margin: 0 auto;
            max-width: 320px;
            height: 100%;
            position: relative;
            background-image: url('data:image/png;base64,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');
            background-position: 50% calc(50% - 10px);
            background-size: 38px 38px;
            background-repeat: no-repeat;
            overflow: hidden;
            z-index: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .wrapper-predefine::before {
            position: absolute;
            top: calc(50% + 10px);
            width: 100%;
            display: block;
            z-index: -1;
            content: 'Advertisement';
            font-size: 12px;
            color: #9da1a4;
            text-align: center;
            font-family: BahijMitra;
          }
          .close-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            background-color: #d51c6a;
            color: white;
            font-family: BahijMitra;
            font-size: 12px;
            padding: 5px;
            text-align: center;
            border-radius: 3px;
            min-width: 40px;
            z-index: 1;
            text-transform: uppercase;
            cursor: pointer;
          }
          .hiddenParallax {
            display: none;
          }
        `}</style>
      </div>
    </amp-script>
  );
};