// This is the effect for processing
let appliedEffect = {
  pixelValue: 100,
  proportion: 3,
};

// This is the effect linked with UI
let uiSelectedEffect = {};

let errorOccurs = false;
//Sample video effect
function videoFrameHandler(videoFrame, notifyVideoProcessed, notifyError) {
  const maxLen =
    (videoFrame.height * videoFrame.width) /
      Math.max(1, appliedEffect.proportion) - 4;

  for (let i = 1; i < maxLen; i += 4) {
    //smaple effect just change the value to 100, which effect some pixel value of video frame
    videoFrame.data[i + 1] = appliedEffect.pixelValue;
  }

  //send notification the effect processing is finshed.
  notifyVideoProcessed();

  //send error to Teams
  if (errorOccurs) {
    notifyError("some error message");
  }
}

function effectParameterChanged(effectName) {
  console.log(effectName);
  if (effectName === undefined) {
    // If effectName is undefined, then apply the effect selected in the UI
    appliedEffect = {
      ...appliedEffect,
      ...uiSelectedEffect,
    };
  } else {
    if (effectName === "c4a3ccab-5030-4af9-9c6d-7e0cbab46502") {
      appliedEffect.proportion = 2;
      appliedEffect.pixelValue = 200;
    } else {
      // if effectName is string sent from Teams client, the apply the effectName
      try {
        appliedEffect = {
          ...appliedEffect,
          ...JSON.parse(effectName),
        };
      } catch (e) {
          console.log(e);
      }
    }
  }
}

function previewStatus(arg) {
    console.log("Preview signal", arg);
}

window.onload = () => {
    microsoftTeams.initialize(() => {}, [
        "https://localhost:9000",
        "https://lubobill1990.github.io",
        "https://syed-adnan.github.io",
        "https://teams.microsoft.com"
      ]);
      microsoftTeams.appInitialization.notifySuccess();
     
      setTimeout(() => {
        microsoftTeams.video.registerForVideoEffect(effectParameterChanged);
        microsoftTeams.video.registerForPreviewStatus(previewStatus);
        microsoftTeams.video.registerForVideoFrame(videoFrameHandler, {
            format: "NV12"
          });
      }, 3000);
      
  

  // any changes to the UI should notify Teams client.
  document
    .getElementById("enable_check")
    .addEventListener("change", function () {
      if (this.checked) {
        microsoftTeams.video.notifySelectedVideoEffectChanged("EffectChanged");
      } else {
        microsoftTeams.video.notifySelectedVideoEffectChanged("EffectDisabled");
      }
    });
  document.getElementById("proportion").addEventListener("change", function () {
    uiSelectedEffect.proportion = this.value;
    microsoftTeams.video.notifySelectedVideoEffectChanged("EffectChanged");
  });
  document
    .getElementById("pixel_value")
    .addEventListener("change", function () {
      uiSelectedEffect.pixelValue = this.value;
      microsoftTeams.video.notifySelectedVideoEffectChanged("EffectChanged");
    });
};
