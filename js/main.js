let localStream;
let remoteStream;
let peerConnection;

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    document.getElementById('user-1').srcObject = localStream;
};

init();