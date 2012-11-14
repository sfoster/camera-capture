/*
Copyright 2012 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Eric Bidelman (ericbidelman@chromium.org)
*/

/**
 * Grabs the camera feed from the browser, requesting
 * both video and audio. Requires the permissions
 * for audio and video to be set in the manifest.
 *
 * @see http://developer.chrome.com/trunk/apps/manifest.html#permissions
 */

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia; 
function getCamera() {
  if(navigator.getUserMedia) {
    navigator.getUserMedia({audio: false, video: true}, function(stream) {
      console.log("Got stream:", stream);
      document.querySelector('video').src = ('webkitURL' in window) ? webkitURL.createObjectURL(stream) : stream;
    }, function(e) {
      console.error(e);
    });
  } else {
    alert("No getUserMedia support in this browser");
  }
}

/**
 * Click handler to init the camera grab
 */
document.querySelector('button').addEventListener('click', function(e) {
  console.log("button click, setting up camera");
  getCamera();

  var sourceImage = document.getElementById("source");
  var destinationCanvas = document.getElementById("destination");
  var context = destinationCanvas.getContext("2d");

  var column = 0;
  console.log("setting up loop to render video data");
  setInterval(function() {
      context.drawImage(sourceImage, column, 0, 1, 480, column, 0, 1, 480)
      column = (column + 1) % 640;
  }, 10);

});
