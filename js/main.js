let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [{
        urls: ['stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302']
    }]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    document.getElementById('user-1').srcObject = localStream;

    createOffer();
};

let createOffer = async () => {
    // initialize peer connection object
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    // add local streams to peer connection object
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // listen for remote user to add stream. When added, add them to local remote stream object
    peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        })
    };

    // listen for ICE candidate and console log them out
    peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
            console.log('new ICE candidate:', e.candidate);
        };
    };

    // create connection offer
    let offer = await peerConnection.createOffer();
    // add local description to offer
    await peerConnection.setLocalDescription(offer);

    console.log('offer:', offer);
}

init();